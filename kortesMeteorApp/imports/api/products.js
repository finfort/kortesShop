import { Mongo } from 'meteor/mongo';

// export const Parties = new Mongo.Collection('parties'); // throws  ReferenceError: Parties is not defined
export const Products = new Mongo.Collection('products');

Products.allow({
    insert(userId, product) {
        return userId && product.owner === userId; // insert if you logged in
    },
    update(userId, product, fields, modifier) {
        return userId && product.owner === userId;
    },
    remove(userId, product) {
        return userId && product.owner === userId;
    }
});