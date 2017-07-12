import * as d3 from 'd3';

export class TreeModel {

  root: any;
  treeLayout: any;
  svg: any;

  treeData: any;

  height: number;
  width: number;
  margin: any = { top: 20, bottom: 90, left: 100, right: 90};
  duration: number= 750;
  nodeWidth: number = 1;
  nodeHeight: number = 1;
  nodeRadius: number = 5;
  horizontalSeparationBetweenNodes: number = 1;
  verticalSeparationBetweenNodes: number = 1;
  nodeTextDistanceY: string= "-5px";
  nodeTextDistanceX: number= 5;

  constructor(){}

  addSvgToContainer(chartContainer: any){
    let element = chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .append("g")
      .attr("transform", "translate("
            + this.margin.left + "," + this.margin.top + ")");

    d3.select("svg").call(d3.zoom()
        .on("zoom", this.zoomed));

  }

  zoomed() {
    d3.select("g").attr("transform", d3.event.transform);
  }

  createLayout(){
    this.treeLayout = d3.tree()
      .size([this.height, this.width])
      //.nodeSize([this.nodeWidth + this.horizontalSeparationBetweenNodes, this.nodeHeight + this.verticalSeparationBetweenNodes])
      .separation((a,b)=>{return (
        a.parent == b.parent ? 1 : 2)/a.depth});
  }

  createTreeData(treeData: any){
    this.root = d3.stratify<any>()
          .id(function(d) { return d.ID; })
          .parentId(function(d) { return d.PARENT_ID; })
          (treeData);
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;

    this.root.children.map((d)=>this.collapse(d));
  }

  collapse(d) {
    if(d.children) {
      d._children = d.children
      d._children.map((d)=>this.collapse(d));
      d.children = null
    }
  }

  update(source) {
    const treeData = this.treeLayout(this.root);

    this.setNodes(source, treeData);

    this.setLinks(source, treeData);

  }

  setNodes(source:any, treeData: any){
    let nodes = treeData.descendants();
    let i = 0;

    var node = this.svg.selectAll('g.node')
        .data(nodes, function(d) {return d.id || (d.id = ++this.i); })
        .enter().append("g")
        .attr("class", (d) => { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", (d) => { return "translate(" + this.radialPoint(d.x, d.y) + ")"; });

    node.append("circle")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", function(d) { return d.x < Math.PI === !d.children ? 6 : -6; })
        .attr("text-anchor", function(d) { return d.x < Math.PI === !d.children ? "start" : "end"; })
        .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
        .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
  }

  setLinks( source: any, treeData: any){

    let links = treeData.links();

    var link = this.svg.selectAll('path.link')
                .data(links, function(d) { return d.id; })
                .enter().append("path")
                  .attr("class", "link")
                  .attr("d", d3.linkRadial()
                      .angle(function(d) {
                        return d[0]; })
                      .radius(function(d) { return d[1]; }));

  }

  click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
  }

  // Creates a curved (diagonal) path from parent to the child nodes
  diagonalCurvedPath(s, d) {

    const path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  radialPoint(x, y) {
    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
  }
}
