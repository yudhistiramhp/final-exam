import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            products: [],
            productDetail: {},
            relatedProducts: []
        }
    },
    getters: {},
    mutations: {
        setProductData(state, payload) {
            state.products = payload
        },

        setProductDetail(state, payload) {
            state.productDetail = payload
        },

        setRelatedProduct(state, products) {
            state.relatedProducts = products
        },
        setNewProduct(state, payload) {
            state.products.push(payload);
        },
        clearSearchResults(state) {
            state.products = [];
        }
    },
    actions: {
        async getProductData({commit}) {
            try {
                const { data } = await axios.get(
                    "https://e-commerce-c85cf-default-rtdb.firebaseio.com/products.json"
                )

                const arr = []
                for( let key in data ) {
                    arr.push({id: key, ...data[key]})
                }

                commit("setProductData", arr)
            } catch (err) {
                console.log(err)
            }
        },

        async getProductDetail({commit}, payload) {
            try {
                const { data } = await axios.get(
                    `https://e-commerce-c85cf-default-rtdb.firebaseio.com/products/${payload}.json`
                )
                console.log("Product Detail Data:", data);
                    commit("setProductDetail", data)
            } catch (err) {

            }
        },

        async getRelatedProduct({ commit, state }, categoryType) {
            try {
                const { data } = await axios.get("https://e-commerce-c85cf-default-rtdb.firebaseio.com/products.json");
                const arr = [];
                for (let key in data) {
                    if (data[key].category === categoryType && key !== state.productDetail.id) {
                        arr.push({ id: key, ...data[key] });
                    }
                }
                commit("setRelatedProduct", arr);
            } catch (error) {
                console.log(error);
            }
        },
        async addNewProduct({ commit, rootState}, payload) {
            try {
                const newData = {
                    ...payload,
                    username: rootState.auth.userLogin.username,
                    createdAt: Date.now(),
                    likeCount: 0,
                    userId: rootState.auth.userLogin.userId,
                };
        
                const { data } = await axios.post(
                    `https://e-commerce-c85cf-default-rtdb.firebaseio.com/products.json?auth=${rootState.auth.token}`, newData);
        
                commit("setNewProduct", { id: data.name, ...newData });
        
            
            } catch (err) {
                console.log(err);
            }
        },

        async updateProduct({ dispatch, rootState }, { id, newProduct }) {
            try {
                const { data } = await axios.put(
                    `https://e-commerce-c85cf-default-rtdb.firebaseio.com/products/${id}.json?auth=${rootState.auth.token}`, newProduct
                );

                await dispatch("getProductData")
            } catch (error) {
                console.log(error);
            }
        },
        

        async deleteProduct({ dispatch, rootState }, payload) {
            try {
                const { data } = await axios.delete(
                    `https://e-commerce-c85cf-default-rtdb.firebaseio.com/products/${payload}.json?auth=${rootState.auth.token}`);
                await dispatch("getProductData")

            } catch (err) {
                console.log(err);
            }
        },
    }
}