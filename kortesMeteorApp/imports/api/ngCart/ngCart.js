import { name as NgCartItem } from './ngCartItem';
import { name as storeService } from './store';

class NgCart {

    constructor($reactive, $window, storeService, NgCartItem) {
        'ngInject';
        // $reactive(this).attach($scope);
        // console.log("ngcart service constructor");
        store = storeService;
        this.NgCartItem = NgCartItem;

        //  $rootScope.$on('ngCart:change', function(){ // i shouldn't user rooutscope here
        //     ngCart.$save();
        // });
        if (angular.isObject(store.get('cart'))) {
            this.$restore(store.get('cart'));
        } else {
            this.init();
        }
    }

    $onChanges($cart){
        this.$save();
    }

    init() {
        
        this.$cart = {
            shipping: null,
            taxRate: null,
            tax: null,
            items: []
        };

    };

    addItem(id, name, price, quantity, data) {

        var inCart = this.getItemById(id);

        if (typeof inCart === 'object') {
            //Update quantity of an item if it's already in the cart
            // inCart.quantity += quantity;
            inCart.setQuantity(quantity, false);
            // $rootScope.$broadcast('ngCart:itemUpdated', inCart);
        } else {
            var newItem = this.NgCartItem.item(id, name, price, quantity, data);
            this.$cart.items.push(newItem);
            // $rootScope.$broadcast('ngCart:itemAdded', newItem);
        }
        // $rootScope.$broadcast('ngCart:change', {});
    };

    getItemById(itemId) {
        var items = this.getCart().items;
        var build = false;

        angular.forEach(items, function (item) {
            if (item.id === itemId) {
                build = item;
            }
        });
        return build;
    }

    setShipping(shipping) {
        this.$cart.shipping = shipping;
        return this.getShipping();
    };

    getShipping() {
        if (this.getCart().items.length == 0) return 0;
        return this.getCart().shipping;
    };

    setTaxRate(taxRate) {
        this.$cart.taxRate = +parseFloat(taxRate).toFixed(2);
        return this.getTaxRate();
    };

    getTaxRate() {
        return this.$cart.taxRate
    };

    getTax() {
        return +parseFloat(((this.getSubTotal() / 100) * this.getCart().taxRate)).toFixed(2);
    };

    setCart(cart) {
        this.$cart = cart;
        return this.getCart();
    };

    getCart() {
        return this.$cart;
    };

    getItems() {
        // console.log("getItems()");
        // console.log(this.getCart().items);
        return this.getCart().items;
    };

    getTotalItems() {
        var count = 0;
        var items = this.getItems();
        angular.forEach(items, function (item) {
            count += item.quantity;
        });
        return count;
    };

    getTotalUniqueItems() {
        return this.getCart().items.length;
    };

    getSubTotal() {
        var total = 0;
        angular.forEach(this.getCart().items, function (item) {
            total += item.total;
        });
        return +parseFloat(total).toFixed(2);
    };

    totalCost() {
        
        return +parseFloat(this.getSubTotal() + this.getShipping() + this.getTax()).toFixed(2);
    };

    removeItem(index) {
        var item = this.$cart.items.splice(index, 1)[0] || {};
        // $rootScope.$broadcast('ngCart:itemRemoved', item);
        // $rootScope.$broadcast('ngCart:change', {});

    };

    removeItemById(id) {
        var item;
        var cart = this.getCart();
        angular.forEach(cart.items, function (item, index) {
            if (item.id === id) {
                item = cart.items.splice(index, 1)[0] || {};
            }
        });
        this.setCart(cart);

        // $rootScope.$broadcast('ngCart:itemRemoved', item);
        // $rootScope.$broadcast('ngCart:change', {});
    };

    empty() {

        // $rootScope.$broadcast('ngCart:change', {});
        this.$cart.items = [];
        $window.localStorage.removeItem('cart');
    };

    isEmpty() {

        return (this.$cart.items.length > 0 ? false : true);

    };

    toObject() {

        if (this.getItems().length === 0) return false;

        var items = [];
        angular.forEach(this.getItems(), function (item) {
            items.push(item.toObject());
        });

        return {
            shipping: this.getShipping(),
            tax: this.getTax(),
            taxRate: this.getTaxRate(),
            subTotal: this.getSubTotal(),
            totalCost: this.totalCost(),
            items: items
        }
    };


    $restore(storedCart) {
        var _self = this;
        _self.init();
        _self.$cart.shipping = storedCart.shipping;
        _self.$cart.tax = storedCart.tax;

        angular.forEach(storedCart.items, function (item) {
            _self.$cart.items.push(this.NgCartItem.item(item._id, item._name, item._price, item._quantity, item._data));
        });
        this.$save();
    };

    $save() {
        return store.set('cart', JSON.stringify(this.getCart()));
    }



}

const name = 'NgCart';

// create a module
export default angular.module(name, [
    angularMeteor,
    storeService,
    NgCartItem
]).service(name, NgCart);
