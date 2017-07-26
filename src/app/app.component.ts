import {Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import dataTreeSimple from './data-tree-simple';
import dataTreeComplex from './data-tree-complex';

import { TreeService } from './tree/tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  data: any[];
  treeService: TreeService;
  selectedNode: any;

  constructor(treeService: TreeService) {
    this.setDataSource("simple");
    this.treeService= treeService;
  }

  setDataSource(dataSource: string){
    const data= (dataSource=="simple")? dataTreeSimple: dataTreeComplex;
    this.data= data.result;//.sort((a,b) => {return +a.id - +b.id});
  }

  nodeUpdated(node:any){
    console.info("app detected node change");
  }
  nodeSelected(node:any){
    console.info("app detected node selected", node);
    this.selectedNode= node;
  }

  addNode():void{
    const parent= this.selectedNode? this.selectedNode.id: "1";
    const name= window.prompt("new node name");
    this.treeService.addNode({id: "999", descripcion: name, parent: parent});
  }

}
