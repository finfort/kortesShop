import * as angular  from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './about.html';
class About {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
    }
   
}

const name = 'about';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter   
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: About
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('about', {
            url: '/about',
            template: '<about></about>'
        });
}