
class Store {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
    };

    get(key) {
        if ($window.localStorage.getItem(key)) {
            var cart = angular.fromJson($window.localStorage.getItem(key));
            return JSON.parse(cart);
        }
        return false;

    };


    set(key, val) {

        if (val === undefined) {
            $window.localStorage.removeItem(key);
        } else {
            $window.localStorage.setItem(key, angular.toJson(val));
        }
        return $window.localStorage.getItem(key);
    };

}

const name = 'store';

// create a module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    controllerAs: name,
    controller: Store
});
