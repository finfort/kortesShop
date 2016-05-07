import angular from 'angular';
import angularMeteor from 'angular-meteor';
 
import './productAdd.html';
 
class ProductAdd {}
 
const name = 'productAdd';
 
// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: ProductAdd
});