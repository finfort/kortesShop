import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Products } from '../../../api/products';
 
import './productRemove.html';
 
class ProductRemove {
  remove() {
    console.log('remove product' + JSON.stringify(this.product));
     if (this.product) {
      Products.remove(this.product._id);
    }
  }
}
 
const name = 'productRemove';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  bindings: {
    product: '<'
  }, // one way binding in ang 1.5 give link to this.product in remove method
  controllerAs: name,
  controller: ProductRemove
});