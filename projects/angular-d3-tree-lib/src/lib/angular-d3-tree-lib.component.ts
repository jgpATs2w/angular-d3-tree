import { Component, OnInit, OnChanges, ViewChild, ElementRef,
   Input, Output, EventEmitter} from '@angular/core';

import { AngularD3TreeLibService } from './angular-d3-tree-lib.service';
@Component({
  selector: 's2w-angular-d3-tree-lib',
  template: `
    <div
      class="d3-chart"
      #chart></div>
  `,
  styleUrls: ['./angular-d3-tree-lib.component.css']
})
export class AngularD3TreeLibComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private treeData: any= [];
  @Output() onNodeChanged: EventEmitter<any>= new EventEmitter();
  @Output() onNodeSelected: EventEmitter<any>= new EventEmitter();

  constructor( private treeService: AngularD3TreeLibService ) {
    treeService.setNodeChangedListener((node)=>{
      this.onNodeChanged.emit(node);
    })
    treeService.setNodeSelectedListener((node)=>{
      this.onNodeSelected.emit(node);
    })
  }

  ngOnInit() {
  }
  ngOnChanges(changes: any) {
    this.seedTree();
  }
  seedTree(){
    if(!!this.treeData){
      this.treeService.createChart(this.chartContainer, this.treeData);
      this.treeService.update();
    }
  }
}
