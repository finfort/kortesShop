
class storeService {
    constructor($reactive, $window) {
        'ngInject';
        this.$window = $window;
        // $reactive(this).attach($scope);
    };

    get(key) {
        if (this.$window.localStorage.getItem(key)) {
            var cart = angular.fromJson(this.$window.localStorage.getItem(key));
            return JSON.parse(cart);
        }
        return false;

    };


    set(key, val) {
        if (val === undefined) {
            this.$window.localStorage.removeItem(key);
        } else {
            this.$window.localStorage.setItem(key, angular.toJson(val));
        }
        return this.$window.localStorage.getItem(key);
    };

}

const name = 'storeService';

// create a module
export default angular.module(name, [
    angularMeteor
]).service(name, storeService);
