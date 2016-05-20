import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import angularMeteor from 'angular-meteor';
import { Products } from '../../../api/products/index';
import './productAdd.html';

class ProductAdd {
    constructor() {
        this.product = {};
    }

    submit() {
        this.product.owner = Meteor.user()._id;
        console.log('submit:', JSON.stringify(this.product));
        Products.insert(this.product);
        
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
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    // bindings: {
    //     done: '&?'
    // },
    controllerAs: name,
    controller: ProductAdd
});