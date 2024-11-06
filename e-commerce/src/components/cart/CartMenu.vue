<template>
  <div class="container" style="margin-top: 150px; margin-bottom: 150px;">
    <div class="row">
      <div class="col-md-8">
        <h3 style="margin-bottom: 40px;">Cart</h3>
        <div v-if="cartItems.length === 0" class="py-5 text-center empty-cart">
          <i class="fas fa-shopping-cart empty-cart-icon"></i>
          <div class="empty-cart-text">
            <h3>Your cart is still empty</h3>
            <p>Find your favorite items and add to cart before checkout.</p>
          </div>
          <router-link to="/product" class="find-products-btn">Find Products</router-link>
        </div>
        <div v-else>
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="cart-item-details">
              <img :src="item.image" alt="Product Image" class="cart-item-image" />
              <div class="product-info">
                <h6 class="product-name">{{ item.name }}</h6>
                <p>{{ formatRupiah(item.price) }} ( x{{ item.quantity }} )</p>
                <div class="quantity-controls">
                  <button class="plus" @click="increaseQuantity(item.id)">+</button>
                  <span class="quantity-display">{{ item.quantity }}</span>
                  <button class="minus" @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">-</button>
                </div>
              </div>
              <button class="remove-btn" @click="removeFromCart(item.id)">Remove</button>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <div class="order-summary">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Order Summary</h5>
            <p class="card-text">{{ cartItems.length }} items</p>
            <p class="card-text text-muted">Not include shipping fee</p>
            <h6 class="total-price mb-3">{{ calculateTotal() }}</h6>
            <hr>
            <button class="checkout-btn" :disabled="cartItems.length === 0" @click="handleCheckout">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const cartItems = computed(() => store.getters['cart/cartItems']);

function removeFromCart(productId) {
    store.commit('cart/removeFromCart', productId);
}

function increaseQuantity(productId) {
    store.commit('cart/increaseQuantity', productId);
}

function decreaseQuantity(productId) {
    store.commit('cart/decreaseQuantity', productId);
}

function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(price);
  }

function calculateTotal() {
    return formatRupiah(cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0));
}

function handleCheckout() {
    if (cartItems.value.length > 0) {
        router.push("/order");
    }
}
</script>

<style scoped>

.plus {
  background-color: #28a745;
  border: 2px solid;
  border-radius: 5px;
  color: white;
  border-color: #248c3d;
}

.plus:hover {
  background-color: #248c3d;
}

.minus {
  background-color: red;
  border: 2px solid;
  border-radius: 5px;
  color: white;
  border-color: rgb(178, 34, 34);
}

.minus:hover {
  background-color: rgb(178, 34, 34);
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 80px;
}
.cart-item-details {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%; 
}
.product-info {
  flex-grow: 1; 
  margin-right: 10px; 
}
.product-name {
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}
.cart-item-image {
  width: 100px; 
  height: auto;
  margin-right: 15px;
}
.quantity-controls {
  display: flex;
  align-items: center;
  margin: 0 10px; 
}
.quantity-controls button {
  margin: 0 5px;
  padding: 5px 10px;
}
.quantity-display {
  padding: 5px 10px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  text-align: center; 
}
.empty-cart {
  text-align: center;
}
.empty-cart-icon {
  font-size: 50px;
  color: #138496;
}
.empty-cart-text h3 {
  font-weight: bold;
  margin-top: 20px;
}
.empty-cart-text p {
  color: #666;
  margin-bottom: 30px;
}
.find-products-btn {
  background-color: #138496;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  margin-top: 40px;
  text-decoration: none;
}
.remove-btn {
  background-color: red; 
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}
.remove-btn:hover {
  background-color: darkred; 
}
.order-summary {
  width: 25%;
}
.order-summary .total-price {
  font-weight: bold;
  font-size: 1.5rem;
}
.checkout-btn {
  width: 100%;
  background-color: #138496; 
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
}
.checkout-btn:disabled {
  background-color: #ccc;
}
</style>
