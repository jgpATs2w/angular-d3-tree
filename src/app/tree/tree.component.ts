import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as d3 from 'd3';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TreeComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private treeData: any= [];
  private margin: any = { top: 20, bottom: 90, left: 100, right: 90};
  private width: number;
  private height: number;
  private root: any;
  private tree: any;
  private svg: any;
  private i: number;
  private duration: number= 750;

  constructor() {
    Observable.from(this.treeData).subscribe(()=>this.update);
  }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {}

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .append("g")
      .attr("transform", "translate("
            + this.margin.left + "," + this.margin.top + ")");

    d3.select("svg").call(d3.zoom()
        .on("zoom", zoomed));

    function zoomed() {
      d3.select("g").attr("transform", d3.event.transform);
    }

    this.tree = d3.tree()
    	.size([this.height, this.width])
      .separation((a,b)=>{return a.parent == b.parent ? 10 : 20});

    this.update();
  }

  update() {console.info('updating');
    this.i = 0;
    this.root = d3.stratify<any>()
          .id(function(d) { return d.ID; })
          .parentId(function(d) { return d.PARENT_ID; })
          (this.treeData);

    //this.root = d3.hierarchy(this.treeData, function(d) { return d.children; });
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;
    const root= this.root;

    //this.root.children.forEach(collapse);

    // Collapse the node and all it's children
    function collapse(d) {
      if(d.children) {
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null
      }
    }
    const treeData = this.tree(this.root);
    const self= this;

    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    nodes.forEach(function(d){ d.y = d.depth * 180});

    var node = this.svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++this.i); });

    var nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function(d) {
          return "translate(" + root.y0 + "," + root.x0 + ")";
      })
      .on('click', click);

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeEnter.append('text')
        .attr("dy", ".2px")
        .attr("x", function(d) {
            return d.children || d._children ? -1 : 1;
        })
        .attr("text-anchor", function(d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d) { return d.data.DESCRIPCION; });

    var nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(this.duration)
      .attr("transform", function(d) {
          return "translate(" + d.y + "," + d.x + ")";
       });

    nodeUpdate.select('circle.node')
      .attr('r', 1)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');

    var nodeExit = node.exit().transition()
        .duration(this.duration)
        .attr("transform", function(d) {
            return "translate(" + root.y + "," + root.x + ")";
        })
        .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    var link = this.svg.selectAll('path.link')
        .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
          var o = {x: root.x0, y: root.y0}
          return diagonal(o, o)
        });

    var linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(this.duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

    var linkExit = link.exit().transition()
        .duration(this.duration)
        .attr('d', function(d) {
          var o = {x: root.x, y: root.y}
          return diagonal(o, o)
        })
        .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

      const path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

      return path
    }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      self.update();
    }

    d3.selectAll('.node')
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
    function dragstarted(d) {
      d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
      d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }

  }
}
