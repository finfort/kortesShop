import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';

import { name as ngCart } from '../../../api/ngCart/ngCart';


import './addToCart.html';
class AddToCart {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        // this.attrs = attrs;


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