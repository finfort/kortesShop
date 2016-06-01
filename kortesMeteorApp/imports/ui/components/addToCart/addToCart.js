import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';


import './addToCart.html';
class AddToCart {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.helpers({

        });
    }

}

const name = 'addToCart';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    ngCart
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    bindings: {
        id: '@',
        name: '@',
        quantity: '@',
        quantityMax: '@',
        price: '@',
        data: '='
    },
    controller: AddToCart
});