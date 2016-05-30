import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Products } from '../../../api/products/index';
import { name as ProductAdd } from '../productAdd/productAdd';
import { name as ProductRemove } from '../productRemove/productRemove';
import { name as ProductsSort } from '../productsSort/productsSort';
// import { name as ProductAddButton } from '../productAddButton/productAddButton';
import { name as ProductImage } from '../productImage/productImage';

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

        this.searchText = '';
        this.subscribe('users');
        this.subscribe('images');

        this.subscribe('products', () => [{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')
        ]);

        this.helpers({
            products() {
                return Products.find({}, {
                    sort: this.getReactively('sort')
                });
            },
            productsCount() {
                return Counts.get('numberOfProducts');
            },
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUserId() {
                return Meteor.userId();
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }

    isOwner(product) {
        return this.isLoggedIn && product.owner === this.currentUserId;
    }
}

const name = 'productsList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    utilsPagination,
    ProductsSort,
    ProductAdd,
    ProductRemove,
    ProductImage
    //,
    // ProductAddButton
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