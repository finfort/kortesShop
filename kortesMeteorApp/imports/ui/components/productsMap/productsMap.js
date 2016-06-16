import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';
 
import template from './productsMap.html';
 
/**
 * ProductsMap component
 */
class ProductsMap {
  constructor() {
    this.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 8
    };
  }
}
 
const name = 'productsMap';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  'nemLogging', // https://github.com/angular-ui/angular-google-maps/issues/1633
  'uiGmapgoogle-maps'
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  bindings: {
    products: '='
  },
  controller: ProductsMap
});