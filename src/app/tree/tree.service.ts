import { Injectable } from '@angular/core';
import { TreeModel } from './tree.dendo.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TreeService {
  treeModel: TreeModel= new TreeModel();

  constructor() {}

  setDatum(data:any){
    this.treeModel.treeData= data;
    Observable.from(this.treeModel.treeData).subscribe(()=>this.update);
  }

  createChart(chartContainer: any, treeData: any): void {

    this.treeModel.addSvgToContainer(chartContainer);

    this.treeModel.createLayout();

    this.treeModel.createTreeData(treeData);

    return this.treeModel.root;
  }

  update(source){
    this.treeModel.update(source);
  }

}
