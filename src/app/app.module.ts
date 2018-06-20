import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularD3TreeLibModule } from 'angular-d3-tree-lib';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularD3TreeLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
