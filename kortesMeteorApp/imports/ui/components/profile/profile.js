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

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
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