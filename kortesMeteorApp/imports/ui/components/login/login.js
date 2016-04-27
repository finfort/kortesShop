import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './login.html';
class Login {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

       
    }
}

const name = 'login';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Login
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      template: '<login></login>'
      
    });
}