import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './partiesList.html';
class PartiesList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.helpers({
            parties() {
                return Parties.find({});
            }
        });
    }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: PartiesList
})
  .config(config);
 
function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('parties', {
      url: '/parties',
      template: '<parties-list></parties-list>'
    });
}