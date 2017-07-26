import { Injectable } from '@angular/core';
import { TreeModel } from './tree.dendo.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TreeService {
  treeModel: TreeModel= new TreeModel();
  private _treeData: any;

  constructor() {}

  createChart(chartContainer: any, treeData: any): void {
    let element = chartContainer.nativeElement;
    element.innerHTML= "";
    this.treeModel.addSvgToContainer(chartContainer);

    this.treeModel.createLayout();

    this._treeData= treeData;
    this.treeModel.createTreeData(treeData);

  }

  update(){
    this.treeModel.update(this.treeModel.root);
  }

  setNodeChangedListener(callable){
    this.treeModel.nodechanged= callable;
  }
  setNodeSelectedListener(callable){
    this.treeModel.nodeselected= callable;
  }

  addNode(node: any){
    this._treeData.push(node);
    this.treeModel.createTreeData(this._treeData);
    this.update();
  }

}
