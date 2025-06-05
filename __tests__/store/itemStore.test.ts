import {useItemStore} from '../../src/store/itemStore';

describe('ItemStore (Cart)', () => {
  beforeEach(() => {
    useItemStore.setState({cart: []}); // Reset cart before each test
  });

  it('should add a product to the cart', () => {
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');
    const cart = useItemStore.getState().cart;

    expect(cart).toHaveLength(1);
    expect(cart[0]).toMatchObject({
      productId: '1',
      title: 'Test Product',
      description: 'Description',
      quantity: 1,
    });
  });

  it('should increase quantity if product is already in the cart', () => {
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');

    const cart = useItemStore.getState().cart;

    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(2);
  });

  it('should remove a product from the cart', () => {
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');
    useItemStore.getState().removeFromCart('1');

    const cart = useItemStore.getState().cart;

    expect(cart).toHaveLength(0);
  });

  it('should decrease quantity if product quantity > 1', () => {
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');
    useItemStore.getState().decreaseQuantity('1');

    const cart = useItemStore.getState().cart;

    expect(cart[0].quantity).toBe(1);
  });

  it('should not decrease quantity below 1', () => {
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');
    useItemStore.getState().decreaseQuantity('1');

    const cart = useItemStore.getState().cart;

    expect(cart[0].quantity).toBe(1);
  });

  it('should return the correct quantity from getQuantity()', () => {
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');
    useItemStore.getState().addToCart('1', 'Test Product', 'Description');

    const qty = useItemStore.getState().getQuantity('1');
    expect(qty).toBe(2);
  });

  it('should return 0 quantity for a non-existent product', () => {
    const qty = useItemStore.getState().getQuantity('999');
    expect(qty).toBe(0);
  });
});
