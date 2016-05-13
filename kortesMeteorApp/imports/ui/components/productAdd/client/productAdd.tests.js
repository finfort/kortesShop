import { name as ProductAdd } from '../productAdd';
import { Products } from '../../../../api/products';
import 'angular-mocks';
 
describe('ProductAdd', () => {
  beforeEach(() => {
    window.module(ProductAdd);
  });
 
  describe('controller', () => {
    let controller;
    const product = {
      name: 'Foo',
      description: 'Birthday of Foo'
    };
 
    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(ProductAdd, {
          $scope: $rootScope.$new(true)
        });
      });
    });
 
    describe('reset()', () => {
      it('should clean up product object', () => {
        controller.product = product;
        controller.reset();
 
        expect(controller.product).toEqual({});
      });
    });
 
    describe('submit()', () => {
      beforeEach(() => {
        spyOn(Products, 'insert');
        spyOn(controller, 'reset').and.callThrough();
 
        controller.product = product;
 
        controller.submit();
      });
 
      it('should insert a new product', () => {
        expect(Products.insert).toHaveBeenCalledWith(product);
      });
 
      it('should call reset()', () => {
        expect(controller.reset).toHaveBeenCalled();
      });
    });
  });
});