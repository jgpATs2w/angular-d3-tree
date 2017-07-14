import {
  Component, OnInit, OnChanges, ViewChild, ElementRef,
  Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as d3 from 'd3';

import { TreeService } from './tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TreeComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private treeData: any= [];
  @Output() onNodeChanged: EventEmitter<any>= new EventEmitter();
  @Output() onNodeSelected: EventEmitter<any>= new EventEmitter();


  constructor(private treeService: TreeService) {

    treeService.setNodeChangedListener((node)=>{
      this.onNodeChanged.emit(node);
    })
    treeService.setNodeSelectedListener((node)=>{
      this.onNodeSelected.emit(node);
    })
  }

  ngOnInit() {
    this.seedTree();
  }

  ngOnChanges(changes: any) {
    this.seedTree();
  }

  seedTree(){
      this.treeService.createChart(this.chartContainer, this.treeData);
      this.treeService.update();
  }

}
