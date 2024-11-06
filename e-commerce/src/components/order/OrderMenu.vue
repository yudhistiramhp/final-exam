<template>
    <div class="container" style="margin-top: 150px; margin-bottom: 150px;">
        <div class="row">
            <div class="col-md-8">
                <h3 style="margin-bottom: 40px;">Order Summary</h3>
                <div v-if="cartItems.length === 0" class="py-5 text-center empty-order">
                    <i class="fas fa-shopping-cart empty-order-icon"></i>
                    <div class="empty-order-text">
                        <h3>Your order is empty</h3>
                        <p>It seems you haven't placed any orders yet.</p>
                        <router-link to="/product" class="find-products-btn">Find Products</router-link>
                    </div>
                </div>
                <div v-else>
                    <div v-for="item in cartItems" :key="item.id" class="order-item">
                        <div class="order-item-details">
                            <img :src="item.image" alt="Product Image" class="order-item-image" />
                            <div class="product-info">
                                <h6 class="product-name">{{ item.name }}</h6>
                                <p>{{ formatRupiah(item.price) }} ( x{{ item.quantity }} )</p>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
                <div class="address-section">
                    <h5>Shipping Address</h5>
                    <input v-model="shippingAddress" placeholder="Enter your address" class="form-control" style="margin-bottom: 20px;" />
                </div>
                <div class="payment-method-section">
                    <h5>Payment Method</h5>
                    <select v-model="selectedPaymentMethod" class="form-control">
                        <option disabled value="">Select Payment Method</option>
                        <option v-for="method in paymentMethods" :key="method.id" :value="method.name">{{ method.name }}</option>
                    </select>
                </div>
            </div>
            <div class="order-summary">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Order Details</h5>
                        <p class="card-text">{{ cartItems.length }} items</p>
                        <p class="card-text text-muted">Shipping: {{ formatRupiah(shippingCost) }}</p>
                        <h6 class="total-price mb-3">{{ calculateTotal() }}</h6>
                        <hr>
                        <select v-model="selectedShipping" @change="updateShippingCost" class="shipping-select">
                            <option disabled value="">Select Shipping</option>
                            <option v-for="option in shippingOptions" :key="option.id" :value="option.price">{{ option.name }} - {{ formatRupiah(option.price) }}</option>
                        </select>
                        <button class="order-now-btn" @click="handleOrderNow" :disabled="!shippingAddress || !selectedPaymentMethod || cartItems.length === 0">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const cartItems = computed(() => store.getters['cart/cartItems']); 

const shippingOptions = [
    { id: 1, name: 'Standard Shipping', price: 5000 },
    { id: 2, name: 'Express Shipping', price: 15000 },
    { id: 3, name: 'Free Shipping', price: 0 }
];

const paymentMethods = [
    { id: 1, name: 'Credit Card' },
    { id: 2, name: 'PayPal' },
    { id: 3, name: 'Bank Transfer' }
];

const selectedShipping = ref('');
const selectedPaymentMethod = ref('');
const shippingAddress = ref('');
const shippingCost = ref(0);

function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(price);
  }

function calculateTotal() {
    return formatRupiah(cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0) + shippingCost.value);
}

function updateShippingCost() {
    shippingCost.value = selectedShipping.value ? parseFloat(selectedShipping.value) : 0;
}


function handleOrderNow() {
    try {
        const existingTransactions = JSON.parse(localStorage.getItem('transactionHistory')) || [];
        
        const updatedTransactions = [...existingTransactions, ...cartItems.value];

        localStorage.setItem('transactionHistory', JSON.stringify(updatedTransactions));
        
        store.commit('cart/clearCart');


        router.push({ name: "userPage", params: { component: "transaction-history" } });
    } catch (error) {
        console.error("Error placing order: ", error);
        alert("There was an error placing your order. Please try again.");
    }
}

</script>

<style scoped>
.order-item {
    display: flex;
    align-items: center;
    margin-bottom: 80px;
}
.order-item-details {
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
.order-item-image {
    width: 100px; 
    height: auto;
    margin-right: 15px;
}
.empty-order {
    text-align: center;
}
.empty-order-icon {
    font-size: 50px;
    color: #138496;
}
.empty-order-text h3 {
    font-weight: bold;
    margin-top: 20px;
}
.empty-order-text p {
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
.order-summary {
    width: 25%;
}
.order-summary .total-price {
    font-weight: bold;
    font-size: 1.5rem;
}
.shipping-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
}
.order-now-btn {
    width: 100%;
    background-color: #138496; 
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 10px;
}
.order-now-btn:disabled {
    background-color: #ccc;
}
</style>