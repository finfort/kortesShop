import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import admin from './admin.html';


const name = 'admin';

class Admin {
    constructor($scope, $reactive, $state) {
        'ngInject';

        this.$state = $state;
        $reactive(this).attach($scope);
        this.subscribe('users');


        this.helpers({
            
            isLoggedIn() {
                return !!Meteor.userId();
            }
            ,
            currentUser() {
                return Meteor.user();
            }
        });


        this.autorun(() => {
            let user = Meteor.user();
            console.log(user);
            if (user && user.roles && user.roles.__global_roles__.length > 0) {
                if (Roles.userIsInRole(user, ["admin"])) {
                    console.log("admin user granted");
                } else {
                    this.$state.go('products');
                    throw new Meteor.Error(403, "Not authorized to be at this page");
                }
            }
        });
    }



}

// create a module
export default angular.module(name, [
    angularMeteor,
    'angular-meteor.auth'
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Admin
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('admin', {
            url: '/admin',
            template: '<admin></admin>',
            // resolve: {
            //     user: ($q) => {
            //         let user = Meteor.user();
            //         console.log(Meteor.user());
            //         console.log(Meteor.userId());
            //         // let user = $auth.currentUser;
            //         var user1 = Meteor.users.findOne({ _id: Meteor.userId() });
            //         console.log(user);
            //         console.log(user1);
            //         if (Meteor.userId() === null) {
            //             console.log("null user");
            //             return $q.reject();
            //         } else if (Roles.userIsInRole(user, ["admin"])) {
            //             console.log("admin user");
            //             return $q.resolve();
            //         }
            //         else {
            //             console.log("reject");
            //             return $q.reject();
            //         }
            //     }
            // }
        });
}