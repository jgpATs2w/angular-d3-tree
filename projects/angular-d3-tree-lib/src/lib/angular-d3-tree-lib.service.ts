import { Injectable } from '@angular/core';
import { TreeModel } from './tree.dendo.model';

@Injectable({
  providedIn: 'root'
})
export class AngularD3TreeLibService {
  treeModel: TreeModel= new TreeModel();

  constructor() { }

  createChart(chartContainer: any, treeData: any): void {
    let element = chartContainer.nativeElement;
    element.innerHTML= "";
    this.treeModel.addSvgToContainer(chartContainer);

    this.treeModel.createLayout();

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
    this.treeModel.addNode(node);
  }

}
