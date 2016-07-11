import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';

import './headerContent.html';

class HeaderContent {

  constructor($scope, $reactive, $location) {
    'ngInject';
    this.$location = $location;

  };

  isActive(viewLocation) {
    return viewLocation === this.$location.path();
  };

  isInRole(role) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
      !Roles.userIsInRole(loggedInUser,
        [role])) {
      return false;
    } else {
      return true;
    }
  }

}
const name = 'headerContent';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  templateUrl: `imports/ui/components/${name}/${name}.html`,
  controllerAs: name,
  controller: HeaderContent
});