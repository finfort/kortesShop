import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import { name as DisplayNameFilter } from '../../filters/displayNameFilter';

import profile from './profile.html';


const name = 'profile';

class Profile {
    constructor($scope, $reactive) {
        'ngInject';

        var userProfile = Meteor.user();

        $reactive(this).attach($scope);

        this.subscribe('users');

        this.helpers({
            isLoggedIn() {
                return !!Meteor.userId();
            },
            currentUser() {
                return Meteor.user();
            }
        });
         var user = Meteor.users.findOne({ _id: Meteor.userId() });
         debugger;
    }
    save() {
        Meteor.users.update({
            _id: Meteor.userId() //Get the current user id, or null if no user is logged in. A reactive data source.
        }, {
                $set: {
                    fullName: this.currentUser.fullName,
                    registrationDate: this.currentUser.registrationDate,
                    dealerGroup: this.currentUser.dealerGroup,
                    staffGroup: this.currentUser.staffGroup,
                    isActive: this.currentUser.isActive,
                    phone: parseInt(this.currentUser.phone),
                    internalNotes: this.currentUser.internalNotes
                }
            }, (error) => {
                if (error) {
                    console.log('Oops, unable to update the user...');
                    console.log(error);
                } else {
                    console.log('Done updating user!');
                }
            });
    }


}

// create a module
export default angular.module(name, [
    angularMeteor,
    DisplayNameFilter,
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Profile
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('profile', {
            url: '/profile',
            template: '<profile></profile>'
        });
}