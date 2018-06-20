import { Component } from '@angular/core';

import { AngularD3TreeLibService } from 'angular-d3-tree-lib';
import dataTreeSimple from '../assets/data-tree-simple';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any[];
  selectedNode: any;
  constructor(private treeService: AngularD3TreeLibService) {
    this.data= dataTreeSimple.result;
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
