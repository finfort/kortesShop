import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Products } from '../../../api/products/index';
import './productDetails.html';

class ProductDetails {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';
        
        $reactive(this).attach($scope);

        this.productId = $stateParams.productId;
        
        this.subscribe('products');
        this.subscribe('users');

        this.helpers({
            product() {
                return Products.findOne({
                    _id: $stateParams.productId
                });
            },
            users() {
                return Meteor.users.find({});
            }
        });
    }

    save() {
        Products.update({
            _id: this.product._id
        }, {
                $set: {
                    name: this.product.name,
                    description: this.product.description,
                    public: this.product.public
                }
            }, (error) => {
                if (error) {
                    console.log('Oops, unable to update the product...');
                } else {
                    console.log('Done!');
                }
            });
    }
}


const name = 'productDetails';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
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