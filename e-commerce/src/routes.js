import HomePage from "./components/pages/HomePage.vue"
import SignupPage from "./components/pages/SignupPage.vue"
import LoginPage from "./components/pages/LoginPage.vue"
import ProductPage from "./components/pages/ProductPage.vue"
import DetailPage from "./components/pages/DetailPage.vue"
import UserPage from "./components/pages/UserPage.vue"
import NewProductPage from "./components/pages/NewProductPage.vue"
import CartPage from "./components/pages/CartPage.vue"
import FavoritePage from "./components/pages/FavoritePage.vue"
import EditProductPage from "./components/pages/EditProductPage.vue"
import OrderPage from "./components/pages/OrderPage.vue"
import Cookies from "js-cookie"
import { store } from "./store"

export const routes = [
    { path: "/", name: "homePage", component: HomePage, beforeEnter: () => {
        checkAuth();
        },
    },
    { path: "/signup", name: "signup", component: SignupPage },
    { path: "/login", name: "login", component: LoginPage },
    { path: "/product", name: "product", component: ProductPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({name: "login"});
        },
     },
    { path: "/product/:id", name: "detailPage", component: DetailPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({name: "login"});
        },
     },
     { 
        path: "/user/:component", name: "userPage", component: UserPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({name: "login"});
        },

    },
    {
        path: "/new-product", name: "newProductPage", component: NewProductPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({name: "login"});
        },
    },
    { path: "/cart", name: "cart", component: CartPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({name: "login"});
        },
     },
     { path: "/favorite", name: "favorite", component: FavoritePage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({name: "login"});
        },
     },
    {
        path: "/product/edit/:id", name: "EditProductPage", component: EditProductPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({name: "login"});
        },
    },
    { path: "/order", name: "order", component: OrderPage,
        beforeEnter: (to, from, next) => {
            checkAuth() ? next() : next({name: "login"});
        },
     },
]

const checkAuth = () => {
    const jwtCookie = Cookies.get("jwt");
    const expirationDate = Cookies.get("tokenExpirationDate");
    const userId = Cookies.get("UID");

    if (jwtCookie) {
        if (new Date().getTime() < +expirationDate) {
            store.commit("auth/setToken", {
                idToken: jwtCookie,
                expiresIn: expirationDate,
        });
        store.dispatch("auth/getUser", userId);
        return true;
        } else {
            store.commit("auth/setUserLogout");
            return false;
        } 

    } else {
        return false;
    }
}