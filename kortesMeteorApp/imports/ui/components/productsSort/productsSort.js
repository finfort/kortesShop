import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './productsSort.html';

class ProductsSort {
  constructor() {
    this.changed();
  }

  changed() {
    this.onChange({
      sort: {
        [this.property]: parseInt(this.order)
      }
    });
  }
}

const name = 'productsSort';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    onChange: '&',
    property: '@',
    order: '@'
  },
  // an expression that is called on every sort change
  // a value with field's name that will be used in sorting
  // a value with default order (1 or -1)
  controllerAs: name,
  controller: ProductsSort
});