import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';

import './footerContent.html';

const name = 'footerContent';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name
});