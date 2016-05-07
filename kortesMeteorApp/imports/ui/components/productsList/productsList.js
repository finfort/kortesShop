import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './productsList.html';
class ProductsList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.helpers({
            products() {
                return Products.find({});
            }
        });
    }
}

const name = 'productsList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: ProductsList
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('products', {
      url: '/products',
      template: '<products-list></products-list>'
    });
}