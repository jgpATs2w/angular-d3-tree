# angular-d3-tree

This is a component to easily integrate [D3](https://d3js.org/) into your Angular app.

[![NPM](https://nodei.co/npm/angular-d3-tree.png?downloads=true&stars=true)](https://nodei.co/npm/angular-d3-tree/)

## [Demo](https://angular-d3-tree.stackblitz.io)

Check out [the live demo](https://angular-d3-tree.stackblitz.io).


## Installation

    npm install d3 angular-d3-tree --save // OR
    yarn add d3 angular-d3-tree

**Notice**: the latest version on NPM may not reflect the branch `master`. Open an issue and tag me if you need it to be published.


## Configuration

Ensure you import the module and the dependencies:

```javascript
import { AngularD3TreeLibModule } from 'angular-d3-tree';

@NgModule({
   imports: [
       AngularD3TreeLibModule,
       ...OtherModules
   ] // along with your other modules
})
export class AppModule {}
```
## Coding

In your component:  
 + Add to the html:
```
<s2w-angular-d3-tree-lib
  [(treeData)]="data"
  (onNodeChanged)="nodeUpdated($event)"
  (onNodeSelected)="nodeSelected($event)"></s2w-angular-d3-tree-lib>
```

 + Add to the typescript:
 ```
 ...
 import { AngularD3TreeLibService } from 'angular-d3-tree';
 ...

 export class MyComponent {
   data: any[];
   ...
   constructor(private treeService: AngularD3TreeLibService) {
     this.data= YOUR_DATA;
   }
   nodeUpdated(node:any){
     console.info("app detected node change");
   }
   nodeSelected(node:any){
     console.info("app detected node selected", node);
   }
 ```

## Collaboration - yes, please -

Make issues and pull requests to help improving!!
