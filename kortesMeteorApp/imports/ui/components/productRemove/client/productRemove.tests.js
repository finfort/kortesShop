import { name as ProductRemove } from '../productRemove';
import { Products } from '../../../../api/products';
import 'angular-mocks';
 
describe('ProductRemove', () => {
  beforeEach(() => {
    window.module(ProductRemove);
  });
 
  describe('controller', () => {
    let controller;
    const product = {
      _id: 'productId'
    };
 
    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(ProductRemove, {
          $scope: $rootScope.$new(true)
        }, {
          product
        });
      });
    });
 
    describe('remove()', () => {
      beforeEach(() => {
        spyOn(Products, 'remove');
        controller.remove();
      });
 
      it('should remove a product', () => {
        expect(Products.remove).toHaveBeenCalledWith(product._id);
      });
    });
  });
});