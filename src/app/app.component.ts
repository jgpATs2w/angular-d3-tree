import {Component } from '@angular/core';

import dataTreeSimple from './godiva-10-es-geografia';
import dataTreeComplex from './godiva-10-es';

import { TreeService } from './tree/tree.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  data: any[];
  treeService: TreeService;

  constructor(treeService: TreeService) {
    this.setDataSource("simple");
    this.treeService= treeService;
  }

  setDataSource(dataSource: string){
    const data= (dataSource=="simple")? dataTreeSimple: dataTreeComplex;
    this.data= data.result.sort((a,b) => {return +a.ID - +b.ID});
  }

  nodeUpdated(node:any){
    console.info("app detected node change");
  }
  nodeSelected(node:any){
    console.info("app detected node selected");
    console.info(node);
  }

  addNode():void{
    /*let data= this.data.slice(0);
    data.push({DESCRIPCION: "nuevo", PARENT_ID: '1'});
    this.data= data.sort((a,b) => {return +a.ID - +b.ID});*/
    this.treeService.addNode({DESCRIPCION: "nuevo"});
  }

}
