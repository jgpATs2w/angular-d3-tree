import { Component} from '@angular/core';

import dataTreeSimple from './godiva-10-es-geografia';
import dataTreeComplex from './godiva-10-es';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  tags: any[];

  constructor() {
    this.setDataSource("simple");
  }

  setDataSource(dataSource: string){
    const data= (dataSource=="simple")? dataTreeSimple: dataTreeComplex;
    this.tags= data.result.sort((a,b) => {return +a.ID - +b.ID});
  }

  nodeUpdated(node:any){
    console.info("app detected node change");
  }

}
