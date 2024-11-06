
const state = {
    favoriteItems: JSON.parse(localStorage.getItem("favoriteItems")) || [], // Load data from localStorage if available
  };
  
  const mutations = {
    addToFavorite(state, product) {
      const existingItem = state.favoriteItems.find((item) => item.id === product.id);
      if (!existingItem) {
        state.favoriteItems.push(product);
        localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems)); // Save updated favoriteItems to localStorage
      }
    },
    
    removeFromFavorite(state, productId) {
      state.favoriteItems = state.favoriteItems.filter((item) => item.id !== productId);
      localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems)); // Update localStorage after removal
    },
    
    loadFavoriteItems(state) {
      const storedItems = JSON.parse(localStorage.getItem("favoriteItems"));
      if (storedItems) {
        state.favoriteItems = storedItems;
      }
    }
  };
  
  const getters = {
    favoriteItems: (state) => state.favoriteItems,
    listFavoCount(state) {
      return state.favoriteItems.length;
  }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    getters,
  };