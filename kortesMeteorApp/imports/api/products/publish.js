import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Products } from './collection';

if (Meteor.isServer) {
  Meteor.publish('products', function (options, searchString) {
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

    // mongo regex for searching products by name
    if (typeof searchString === 'string' && searchString.length) {
      selector.name = {
        $regex: `.*${searchString}.*`,
        $options: 'i'
      };
    }

    //https://github.com/percolatestudio/publish-counts query only  products that should be available to that specific client
    Counts.publish(this, 'numberOfProducts', Products.find(selector), {
      noReady: true
    });

    return Products.find(selector, options);
  });
}

Schema = {};
/**
 * Product Schema
 */
Schema.Product = new SimpleSchema({
  _id: {
    type: String,
    label: "Product Id"
  },
  // ancestors: {
  //   type: [String],
  //   defaultValue: []
  // },
  title: {
    type: String,
    defaultValue: ""
  },
  pageTitle: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  },
  type: {
    label: "Type",
    type: String,
    defaultValue: "simple"
  },
  vendor: {
    type: String,
    optional: true
  },
  // metafields: {
  //   type: [ReactionCore.Schemas.Metafield],
  //   optional: true
  // },
  positions: {
    type: Object, // ReactionCore.Schemas.ProductPosition
    blackbox: true,
    optional: true
  },
  // // Denormalized field: object with range string, min and max
  // price: {
  //   label: "Price",
  //   type: ReactionCore.Schemas.PriceRange
  // },
  price: {
    label: "Price",
    type: Number,
    decimal: true,
    min: 0,
    optional: true,
    defaultValue: 0
  },
  // Denormalized field: Indicates when at least one of variants
  // `inventoryQuantity` are lower then their `lowInventoryWarningThreshold`.
  // This is some kind of marketing course.
  isLowQuantity: {
    label: "Indicates that the product quantity is too low",
    type: Boolean,
    optional: true
  },
  // Denormalized field: Indicates when all variants `inventoryQuantity` is zero
  isSoldOut: {
    label: "Indicates when the product quantity is zero",
    type: Boolean,
    optional: true
  },
  // Denormalized field. It is `true` if product not in stock, but customers
  // anyway could order it.
  isBackorder: {
    label: "Indicates when the seller has allowed the sale of product which" +
    " is not in stock",
    type: Boolean,
    optional: true
  },
  requiresShipping: {
    label: "Require a shipping address",
    type: Boolean,
    defaultValue: true,
    optional: true
  },
  // parcel: {
  //   type: ReactionCore.Schemas.ShippingParcel,
  //   optional: true
  // },
  hashtags: {
    type: [String],
    optional: true,
    index: 1
  },
  metaDescription: {
    type: String,
    optional: true
  },
  // handle: {
  //   type: String,
  //   optional: true,
  //   index: 1,
  //   autoValue: function () {
  //     let slug = this.value || getSlug(this.siblingField("title").value) ||
  //       this.siblingField("_id").value || "";
  //     if (this.isInsert) {
  //       return slug;
  //     } else if (this.isUpsert) {
  //       return {
  //         $setOnInsert: slug
  //       };
  //     }
  //   }
  // },
  isVisible: {
    type: Boolean,
    index: 1,
    defaultValue: false
  },
  templateSuffix: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    },
    optional: true
  },
  publishedAt: {
    type: Date,
    optional: true
  },
  publishedScope: {
    type: String,
    optional: true
  }
});

Products.attachSchema(Schema.Product);