import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';

import { name as NgCart } from '../../../api/ngCart/ngCart';


import './addToCart.html';
class AddToCart {
    constructor($scope, $reactive, NgCart) {
        'ngInject';
        this.NgCart = NgCart;

        $reactive(this).attach($scope);
        // debugger;
    }

    $onInit() {
        // debugger;
        if (this.inCart()) {
            this.q = this.NgCart.getItemById(this.id).getQuantity();
        } else {
            this.q = parseInt(this.quantity);
        }

        this.qtyOpt = [];
        for (var i = 1; i <= this.quantityMax; i++) {
            this.qtyOpt.push(i);
        }

    }

    inCart() {
        // console.log("cart " + this.NgCart);
        // console.dir(this.NgCart);
        return this.NgCart.getItemById(this.id);
    }

}

const name = 'addToCart';

// create a module
export default angular.module(name, [
    angularMeteor,
    NgCart
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

// http://www.befundoo.com/university/tutorials/angularjs-2-services/
// http://plnkr.co/edit/yMjghOFhFWuY8G1fVIEg?p=preview
// http://stackoverflow.com/questions/34900338/how-to-inject-upgraded-angular-1-service-factory-to-angular-2-component-in-es5