import { ProductCategory } from './product-category';

describe('ProductCategory', () => {
  it('should create an instance', () => {
    expect(new ProductCategory(4,"mousePads")).toBeTruthy();
  });
});
