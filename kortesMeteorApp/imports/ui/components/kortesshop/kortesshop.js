import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './kortesshop.html';

import { name as FooterContent } from '../footerContent/footerContent';
import { name as HeaderContent } from '../headerContent/headerContent';

import { name as ProductsList } from '../productsList/productsList';
import { name as Login } from '../login/login';
import { name as ProductAdd } from '../productAdd/productAdd';
import { name as ProductRemove } from '../productRemove/productRemove';
import { name as ProductDetails } from '../productDetails/productDetails';
import { name as Auth } from '../auth/auth';
import { name as Profile } from '../profile/profile';
import { name as NgCartSummary } from '../ngCartSummary/ngCartSummary';
import { name as NgCartCart } from '../ngCartCart/ngCartCart';

class KortesShop {

}
const name = 'kortesshop';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  ProductsList,
  Login,
  'accounts.ui', // dotansimha:accounts-ui-angular
  ProductAdd,
  ProductRemove,
  ProductDetails,
  'ui.bootstrap',
  Auth,
  FooterContent,
  HeaderContent,
  Profile,
  NgCartSummary,
  NgCartCart

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