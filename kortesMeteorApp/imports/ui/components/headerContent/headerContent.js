import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';

import './headerContent.html';

const name = 'headerContent';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name
});