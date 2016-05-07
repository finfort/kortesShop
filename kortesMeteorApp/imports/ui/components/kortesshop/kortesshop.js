import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './kortesshop.html';

import { name as ProductsList } from '../productsList/productsList';
import { name as Navigation } from '../navigation/navigation';
import { name as Login } from '../login/login';
import { name as ProductAdd } from '../productAdd/productAdd';
import { name as ProductRemove } from '../productRemove/productRemove';

class KortesShop {
  //  constructor($scope, $reactive) {
  //       'ngInject';

  //       $reactive(this).attach($scope);

  //       this.helpers({
  //           currentUser() {
  //               return Meteor.user();
  //           },
  //           loggingIn() {
  //               return Meteor.loggingIn();
  //           }
  //       })

  //   }
}


const name = 'kortesshop';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ProductsList,
  Login,
  Navigation,
  'accounts.ui', // dotansimha:accounts-ui-angular
  ProductAdd,
  ProductRemove

]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: KortesShop
})
  .config(config);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/products');
}