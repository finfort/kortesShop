import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Products } from './collection';

if (Meteor.isServer) {
  Meteor.publish('products', function (options) {
    const selector = {
      $or: [{
        // the public products
        $and: [{
          public: true
        }, {
            public: {
              $exists: true
            }
          }]
      }, {
          // when logged in user is the owner
          $and: [{
            owner: this.userId
          }, {
              owner: {
                $exists: true
              }
            }]
        }]
    };
    //https://github.com/percolatestudio/publish-counts query only  products that should be available to that specific client
    Counts.publish(this, 'numberOfProducts', Products.find(selector), {
      noReady: true
    });

    return Products.find(selector, options);
  });
}