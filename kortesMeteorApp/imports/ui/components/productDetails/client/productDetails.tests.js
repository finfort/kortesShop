import { name as ProductDetails } from '../productDetails';
import { Products } from '../../../../api/products';
import 'angular-mocks';

describe('ProductDetails', () => {
    beforeEach(() => {
        window.module(ProductDetails);
    });

    describe('controller', () => {
        let controller;
        const product = {
            _id: 'productId',
            name: 'Foo',
            description: 'Birthday of Foo'
        };

        beforeEach(() => {
            inject(($rootScope, $componentController) => {
                controller = $componentController(ProductDetails, {
                    $scope: $rootScope.$new(true)
                });
            });
        });
        //     //save is not a function? controller.save();
        // describe('save()', () => {
        //   beforeEach(() => {
        //     spyOn(Products, 'update');
        //     controller.product = product;
        //     controller.save();
        //   });

        //   it('should update a proper product', () => {
        //     expect(Products.update.calls.mostRecent().args[0]).toEqual({
        //       _id: product._id
        //     });
        //   });

        //   it('should update with proper modifier', () => {
        //     expect(Products.update.calls.mostRecent().args[1]).toEqual({
        //       $set: {
        //         name: product.name,
        //         description: product.description
        //       }
        //     });
        //   });
        // });
    });
});