import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';
 
import { Products } from '../../../api/products/index';
import { name as ProductAdd } from '../productAdd/productAdd';
import { name as ProductRemove } from '../productRemove/productRemove';


import './productsList.html';
class ProductsList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };

        this.subscribe('products', () => [{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }
        ]);

        this.helpers({
            products() {
                return Products.find({}, {
                    sort: this.getReactively('sort')
                });
            },
            productsCount() {
                return Counts.get('numberOfProducts');
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }
}

const name = 'productsList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    utilsPagination
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