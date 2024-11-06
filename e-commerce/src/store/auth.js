import axios from "axios";
import Cookies from "js-cookie";

export default {
    namespaced: true,
    state() {
        return {
            token: null,
            tokenExpirationDate: null,
            userLogin: {},
            isLogin: false,
        };
    },
    mutations: {
        setToken(state, { idToken, expiresIn }) {
            state.token = idToken;
            state.tokenExpirationDate = expiresIn;
            Cookies.set("tokenExpirationDate", expiresIn);
            Cookies.set("jwt", idToken);
        },

        setUserLogin(state, { userData, loginStatus }) {
            state.userLogin = userData;
            state.isLogin = loginStatus;
        },

        setUserLogout(state) {
            state.token = null;
            state.userLogin = {};
            state.isLogin = false;
            state.tokenExpirationDate = null;
            Cookies.remove("jwt");
            Cookies.remove("tokenExpirationDate");
            Cookies.remove("UID");
        }
    },
    actions: {
        async getRegisterData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyAvoZ-5vmYintFUsW8mmlbh7QaJDYk_Tbg";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });

                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000,
                });

                const newUserData = {
                    userId: data.localId,
                    fullname: payload.fullname,
                    username: payload.username,
                    email: payload.email,
                    imageLink: payload.imageLink,
                };

                Cookies.set("UID", newUserData.userId);
                await dispatch("addNewUser", newUserData);

                return data;
            } catch (err) {
                console.log(err);
            }
        },

        async addNewUser({ commit, state }, payload) {
            try {
                const { data } = await axios.put(
                    `https://e-commerce-c85cf-default-rtdb.firebaseio.com/user.json?auth=${state.token}`,
                    payload
                );
                commit("setUserLogin", { userData: payload, loginStatus: true });
            } catch (err) {
                console.log(err);
            }
        },

        async getLoginData({ commit, dispatch }, payload) {
            const APIkey = "AIzaSyAvoZ-5vmYintFUsW8mmlbh7QaJDYk_Tbg";
            const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
            try {
                const { data } = await axios.post(authUrl + APIkey, {
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true,
                });
                commit("setToken", {
                    idToken: data.idToken,
                    expiresIn: new Date().getTime() + Number.parseInt(data.expiresIn) * 1000
                });
                await dispatch("getUser", data.localId);
            } catch (err) {
                console.log(err);
            }
        },

        async getUser({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://e-commerce-c85cf-default-rtdb.firebaseio.com/user.json`
                );
                for (let key in data) {
                    if (data[key].userId === payload) {
                        Cookies.set("UID", data[key].userId);
                        commit("setUserLogin",
                            { userData: data[key], loginStatus: true }
                        );
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

        async verifyCurrentPassword({ commit, state }, { currentPassword }) {
            const user = state.userLogin;
            try {
                const response = await axios.post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvoZ-5vmYintFUsW8mmlbh7QaJDYk_Tbg",
                    {
                        email: user.email,
                        password: currentPassword,
                        returnSecureToken: true,
                    }
                );
                return response.data; 
            } catch (error) {
                return false; 
            }
        },

        async changePassword({ dispatch, state }, { currentPassword, newPassword }) {
            const user = state.userLogin; 
            const verified = await dispatch('verifyCurrentPassword', { currentPassword });
            if (!verified) {
                return false; 
            }
            
            try {
                await axios.post(
                    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAvoZ-5vmYintFUsW8mmlbh7QaJDYk_Tbg",
                    {
                        idToken: state.token,
                        password: newPassword,
                        returnSecureToken: true,
                    }
                );
                return true; 
            } catch (error) {
                console.log(error);
                return false; 
            }
        },

        async updateUserProfile({ commit, state }, payload) {
            try {
                const userId = state.userLogin.userId;
                if (!userId) {
                    console.error("userId is not available");
                    return;
                }

                const { data } = await axios.put(
                    `https://e-commerce-c85cf-default-rtdb.firebaseio.com/user/${userId}.json?auth=${state.token}`,
                    payload
                );

                commit("setUserLogin", { userData: { ...state.userLogin, ...payload }, loginStatus: true });

                return data;
            } catch (error) {
                console.error('Error updating user profile:', error);
                throw error;
            }
        }
    }
};
