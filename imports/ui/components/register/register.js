import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Accounts } from 'meteor/accounts-base';

import template from './register.html';

class Register {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    let credentials = {
      email: '',
      password: '',
      fullName: '',
      registrationDate: new Date(),
      dealerGroup: '',
      staffGroup: '',
      isActive: true,
      phone: '',
      internalNotes: ''
    };

    this.error = '';
  }

  register() {
    debugger;
    Accounts.createUser(this.credentials,
      this.$bindToContext((err) => {
        // 
        if (!err) {
          Meteor.users.update({_id: Meteor.userId()}, {
            $set: {
              fullName: this.credentials.fullName,
              registrationDate: this.credentials.registrationDate,
              dealerGroup: this.credentials.dealerGroup,
              staffGroup: this.credentials.staffGroup,
              isActive: this.credentials.isActive,
              phone: this.credentials.phone,
              internalNotes: this.credentials.internalNotes
            }
          });
        }
        
        if (err) {
          this.error = err;
        } else {
          this.$state.go('products');
        }
      })
    );
  }
}

const name = 'register';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
])
  .component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Register
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('register', {
    url: '/register',
    template: '<register></register>'
  });
}