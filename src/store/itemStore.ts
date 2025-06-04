import {create} from 'zustand';

interface CartItem {
  productId: string;
  title: string;
  description: string;
  quantity: number;
}

interface ItemStore {
  cart: CartItem[];
  addToCart: (productId: string, title: string, description: string) => void;
  removeFromCart: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getQuantity: (productId: string) => number;
}

export const useItemStore = create<ItemStore>((set, get) => ({
  cart: [],
  addToCart: (id, title, description) => {
    const existing = get().cart.find(item => item.productId === id);
    if (existing) {
      set(state => ({
        cart: state.cart.map(item =>
          item.productId === id ? {...item, quantity: item.quantity + 1} : item,
        ),
      }));
    } else {
      set(state => ({
        cart: [...state.cart, {productId: id, title, description, quantity: 1}],
      }));
    }
  },
  removeFromCart: id => {
    set(state => ({
      cart: state.cart.filter(item => item.productId !== id),
    }));
  },
  decreaseQuantity: id => {
    set(state => ({
      cart: state.cart.map(item =>
        item.productId === id && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    }));
  },

  getQuantity: id => {
    const found = get().cart.find(cartItem => cartItem.productId === id);
    return found ? found.quantity : 0;
  },
}));
