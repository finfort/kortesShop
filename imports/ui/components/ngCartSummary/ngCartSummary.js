import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';

import { name as NgCart } from '../../../api/ngCart/ngCart';


import './ngCartSummary.html';
class NgCartSummary {
    constructor($scope, $reactive, NgCart) {
        'ngInject';
        this.NgCart = NgCart;

        $reactive(this).attach($scope);
    }

}

const name = 'ngCartSummary';

// create a module
export default angular.module(name, [
    angularMeteor,
    NgCart
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: NgCartSummary
});