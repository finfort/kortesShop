import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import { Products } from '../../../api/products/index';
import { name as ProductUpload } from '../productUpload/productUpload';
// import { name as ProductsSChema } from '../../../api/products/index';

import './productAdd.html';

class ProductAdd {
    constructor() {
        this.product = {};
    }

    submit() {
        this.product.owner = Meteor.user()._id;
        console.log('submit:', JSON.stringify(this.product));
        Products.insert(this.product, function (error, result) {
            if(error){  
                console.log(error.invalidKeys);
            }
            
            //The insert will fail, error will be set,
            //and result will be undefined or false because "copies" is required.
            //
            //The list of errors is available on `error.invalidKeys` or by calling Books.simpleSchema().namedContext().invalidKeys()
        });

        // isValid = Products.namedContext('').validate(this.product);

        // if(this.done) {
        //     this.done();
        // }

        this.reset();
    }

    reset() {
        this.product = {};
    }
}

const name = 'productAdd';

// create a module
export default angular.module(name, [
    angularMeteor,
    ProductUpload
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    // bindings: {
    //     done: '&?'
    // },
    controllerAs: name,
    controller: ProductAdd
});