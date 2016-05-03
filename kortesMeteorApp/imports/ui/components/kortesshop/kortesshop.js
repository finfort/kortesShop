import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
 
import './kortesshop.html';

import { name as PartiesList } from '../partiesList/partiesList';
import { name as Navigation } from '../navigation/navigation';
import { name as Login } from '../login/login';

class KortesShop {}
 
const name = 'kortesshop';
 
// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PartiesList,
  Login,
  Navigation,
  'accounts.ui' // dotansimha:accounts-ui-angular
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: KortesShop
})
  .config(config);
 
function config($locationProvider, $urlRouterProvider) {
  'ngInject';
 
  $locationProvider.html5Mode(true);
 
  $urlRouterProvider.otherwise('/parties');
}