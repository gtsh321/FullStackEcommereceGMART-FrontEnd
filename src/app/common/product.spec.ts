import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(
      'SKU123',          // sku
      'Sample Product',  // name
      'Product Description', // description
      99.99,             // unitPrice
      'https://example.com/image.jpg', // imageUrl
      true,              // active
      10,                // unitsInStock
      new Date(),        // dateCreated
      new Date()         // lastUpdated
    )).toBeTruthy();
  });
});
