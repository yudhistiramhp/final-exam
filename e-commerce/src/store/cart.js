import axios from "axios";
import Cookies from "js-cookie";

export default {
  namespaced: true,
  state() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
      transactions: [] 
    };
  },

  mutations: {
    addToCart(state, product) {
      const existingItem = state.cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += product.quantity; 
      } else {
        const itemToAdd = { ...product, quantity: product.quantity || 1 };
        state.cartItems.push(itemToAdd);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    increaseQuantity(state, productId) {
      const item = state.cartItems.find(item => item.id === productId);
      if (item) {
        item.quantity++;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); 
      }
    },

    decreaseQuantity(state, productId) {
      const item = state.cartItems.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); 
      }
    },

    removeFromCart(state, productId) {
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems)); 
    },

    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },

    saveTransaction(state, transaction) {
      state.transactions.push(transaction);
      localStorage.setItem('transactions', JSON.stringify(state.transactions));
    },

    setCartItems(state, items) {
      state.cartItems = items;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },

  getters: {
    cartItems(state) {
      return state.cartItems;
    },
    cartCount: (state) => {
      return new Set(state.cartItems.map(item => item.id)).size;
    },
    transactions: (state) => state.transactions,
  },

  actions: {
    async getCartData({ commit }) {
      try {
        const { data } = await axios.get(
          "https://e-commerce-c85cf-default-rtdb.firebaseio.com/cart.json"
        );

        const arr = [];
        for (let key in data) {
          arr.push({ id: key, ...data[key] });
        }

        commit("setCartItems", arr);
      } catch (err) {
        console.log(err);
      }
    },

    loadCartItems({ commit }) {
      const items = JSON.parse(localStorage.getItem('cartItems')) || [];
      commit('setCartItems', items);  
    },

    checkout({ commit, state }) { 
      const transaction = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        total: state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        items: [...state.cartItems],  
      };
      commit('saveTransaction', transaction);  
      commit('clearCart');  
    },
  },
};
