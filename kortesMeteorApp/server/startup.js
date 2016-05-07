import { Meteor } from 'meteor/meteor';
import { Products } from '../imports/api/products';

Meteor.startup(() => {
  if (Products.find().count() === 0) {
    const products = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.'
    }, {
      'name': 'All dubstep all the time',
      'description': 'Get it on!'
    }, {
      'name': 'Savage lounging',
      'description': 'Leisure suit required. And only fiercest manners.'
    }];
 
    products.forEach((product) => {
      Products.insert(product)
    });
  }
});