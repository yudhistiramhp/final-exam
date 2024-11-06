export default {
    namespaced: true,
    state() {
        return {
            transactionHistory: JSON.parse(localStorage.getItem('transactionHistory')) || [],
            transactionError: null, 
        };
    },
    mutations: {
        addToHistory(state, items) {
            state.transactionHistory.push(...items);
            localStorage.setItem('transactionHistory', JSON.stringify(state.transactionHistory)); 
        },
        clearHistory(state) {
            state.transactionHistory = [];
            localStorage.removeItem('transactionHistory')
        },

    },
    actions: {

    },
    getters: {
        transactionHistory: state => state.transactionHistory
        },
};
