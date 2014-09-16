Directive - a marker
Module


Expressions - allow you to insert dynamic values into HTML

# Steps to create an angular application
## Step One - Create a Module
1. Create a module
`var app = angular.module('store', [ ]);`

2. Attach module to HTML page using a directive
`<html ng-app="gemStore">`

3. Add an expression to the HTML
`{{Hello world!}}`

## Step Two: Create a Controller
1. Create a controller
```
app.controller('StoreController', function(){
  
});
```

2. Add controller to HTML using a controller directive
`<div ng-controller="StoreController as store">`

3. Add values to display
```
<div ng-controller="StoreController as store">
  <h1> {{store.product.name}} </h1>
</div>
```


## Directives
ng-app
ng-controller
ng-show - conditionally show an element
ng-hide - conditionally hide an element
ng-repeat - loop through a collection
ng-src - display an image
ng-click - do something on click
ng-init - evaluate an expression in the current scope
ng-class - sets class; takes an object with key as name of class and value as expression which if true will add the class

## Expressions
.length

## Filters

`{{ data | filter:options }}`
- pipe data through the filter

Examples:

date
`{{ '1388123412323' | date:'MM/dd.yyy @ h:mma' }}` = 12/27/2013 @ 12:50AM

uppercase & lowercase
`{{ 'octagon gem' | uppercase }}` = OCTAGON GEM

limitTo
`{{ 'My Description' | limitTo:8 }} = My Descr
`<li ng-repeat="product in store.products | limitTo:3">`

orderBy
`<li ng-repeat="product in store.products | orderBy:'-price'">`

