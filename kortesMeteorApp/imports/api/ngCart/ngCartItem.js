class NgCartItem {
    constructor($reactive,  $log) {
        'ngInject';

        // $reactive(this).attach($scope);
        this.$log = $log;
    };

    item (id, name, price, quantity, data) {
        this.setId(id);
        this.setName(name);
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setData(data);
        // how to return here real object not toObject function????
        // to work properly with inCart.setQuantity(quantity, false);
        return this.toObject();
    };


    setId(id) {
        if (id) this._id = id;
        else {
            this.$log.error('An ID must be provided');
        }
    };

    getId() {
        // debugger;
        return this._id;
    };


    setName(name) {
        if (name) this._name = name;
        else {
            this.$log.error('A name must be provided');
        }
    };
    getName() {
        return this._name;
    };

    setPrice(price) {
        var priceFloat = parseFloat(price);
        if (priceFloat) {
            if (priceFloat <= 0) {
                this.$log.error('A price must be over 0');
            } else {
                this._price = (priceFloat);
            }
        } else {
            this.$log.error('A price must be provided');
        }
    };
    getPrice() {
        return this._price;
    };


    setQuantity(quantity, relative) {
        var quantityInt = parseInt(quantity);
        if (quantityInt % 1 === 0) {
            if (relative === true) {
                this._quantity += quantityInt;
            } else {
                this._quantity = quantityInt;
            }
            if (this._quantity < 1) this._quantity = 1;

        } else {
            this._quantity = 1;
            this.$log.info('Quantity must be an integer and was defaulted to 1');
        }
    };

    getQuantity() {
        return this._quantity;
    };

    setData(data) {
        if (data) this._data = data;
    };

    getData() {
        if (this._data) return this._data;
        else this.$log.info('This item has no data');
    };

    getTotal() {
        return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
    };

    toObject() {
        return {
            id: this.getId(),
            name: this.getName(),
            price: this.getPrice(),
            quantity: this.getQuantity(),
            data: this.getData(),
            total: this.getTotal()
        }
    };

}

const name = 'NgCartItem';

// create a module
export default angular.module(name, [
    angularMeteor
]).service(name, NgCartItem);
