import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Products } from '../../../api/products/index';
import { name as ProductMap } from '../productMap/productMap';


import './productDetails.html';

class ProductDetails {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.productId = $stateParams.productId;

        // this.subscribe('products');
        this.subscribe('products', () => [], {
            onReady: function () {
                this.helpers({
                    product: () => {
                        var locProductsSub = Products.findOne({ _id: this.productId });
                        return locProductsSub;
                    }
                });
            }
        });
        this.subscribe('users');

        this.helpers({
            product() {
                var curProduct = Products.findOne({
                    _id: this.productId
                });
                return curProduct;

            },
            users() {
                return Meteor.users.find({});
            },
            isLoggedIn() {
                return !!Meteor.userId();
            }
        });
    }

    save() {
        Products.update({
            _id: this.product._id
        }, {
                $set: {
                    title: this.product.title,
                    description: this.product.description,
                    isVisible: this.product.isVisible,
                    price: this.product.price,
                    prlocation: this.product.prlocation
                }
            }, (error) => {
                if (error) {
                    console.log('Oops, unable to update the product...');
                } else {
                    console.log('Done!');
                }
            });
    }

    isOwner(product) {
        return this.isLoggedIn && product.owner === this.currentUserId;
    }
}


const title = 'productDetails';

// create a module
export default angular.module(title, [
    angularMeteor,
    uiRouter,
    ProductMap
]).component(title, {
    templateUrl: `imports/ui/components/${title}/${title}.html`,
    controllerAs: title,
    controller: ProductDetails
})
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('productDetails', {
        url: '/products/:productId',
        template: '<product-details></product-details>'
    });
}