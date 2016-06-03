import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';

import { name as ngCart } from '../../../api/ngCart/ngCart';


import './addToCart.html';
class AddToCart {
    constructor($scope, $reactive, ngCart) {//
        //ngCart object here should service return function?
        //angular_angular.js?hash=08f63d2…:13439 TypeError: _apiNgCartNgCart.name.getItemById is not a function
        'ngInject';
        //$reactive(this).attach($scope);
        
        if (this.inCart()) {
            this.q = ngCart.getItemById(this.id).getQuantity();
        } else {
            this.q = parseInt(this.quantity);
        }

        this.qtyOpt = [];
        for (var i = 1; i <= this.quantityMax; i++) {
            this.qtyOpt.push(i);
        }
    }

    inCart() {
        console.log("cart " + ngCart);
        return ngCart.getItemById(this.id);
    }

}

const name = 'addToCart';

// create a module
export default angular.module(name, [
    angularMeteor,
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


        // this.attrs = attrs;
        // http://www.befundoo.com/university/tutorials/angularjs-2-services/
        // http://plnkr.co/edit/yMjghOFhFWuY8G1fVIEg?p=preview
        // http://stackoverflow.com/questions/34900338/how-to-inject-upgraded-angular-1-service-factory-to-angular-2-component-in-es5