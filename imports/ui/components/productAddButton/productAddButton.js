import angular from 'angular';
import angularMeteor from 'angular-meteor';

import buttonTemplate from './productAddButton.html';
import modalTemplate from './productAddModal.html';
import { name as ProductAdd } from '../productAdd/productAdd';

class ProductAddButton {
  constructor($scope, $uibModal) {
    // constructor($mdDialog, $mdMedia) {
    'ngInject';

    // this.$mdDialog = $mdDialog;
    // this.$mdMedia = $mdMedia
  }

  // open(event) {
  //   var modalInstance = $uibModal.open({
  //     controller($uibModal) {
  //       'ngInject';

  //       this.cancel = () => {
  //         $uibModal.dismiss('cancel');
  //       }
  //     },
  //     controllerAs: 'productAddModal',
  //     templateUrl: `imports/ui/components/productAddModal/productAddModal.html`,
  //     targetEvent: event,
  //     parent: angular.element(document.body)
  //   });
  // }
}

const name = 'productAddButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  ProductAdd,
  'ui.bootstrap'
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  //   template: buttonTemplate,
  controllerAs: name,
  controller: ProductAddButton
});