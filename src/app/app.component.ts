import { Component} from '@angular/core';

import tagsFromGodiva from './godiva-10-es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  tags: any[];

  constructor() {
    //Observable.from(this.treeData).subscribe(()=>this.update);
    this.tags= tagsFromGodiva.result.sort((a,b) => {return +a.ID - +b.ID});
/*
    let roots:any[]= [];
    let nodes: any[]= [];

    this.tags.map((tag) => nodes[+tag.ID]= tag);

    this.tags
      .map((tag) => {
      const parent= nodes[+tag.PARENT_ID];

      if(roots.indexOf(parent)<0){
        roots.push(parent);
      }
    });



    console.info(`imported ${this.tags.length} tags, with ${roots.length} roots`);
    //console.info(leafs);
    var map = {}, node, roots = [];
    for (var i = 0; i < this.tags.length; i += 1) {
        node = this.tags[i];
        node.children = [];
        map[node.ID] = i; // use map to look-up the parents
        if (node.PARENT_ID !== "0") {
            this.tags[map[node.PARENT_ID]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    console.log(roots);*/
  }

}
