<template>
    <div class="transaction-history">
        <h4 style="float: left; color: grey; font-size: 20px;">My Order</h4>

        <!-- Menampilkan pesan kesalahan jika ada -->
        <div v-if="transactionError" class="order-error">
            <p>Error: {{ transactionError }}</p>
        </div>

        <!-- Menampilkan daftar transaksi jika ada -->
        <div v-else-if="transactionHistory && valueTransactionHistory?.length">
            <div v-for="item in valueTransactionHistory" :key="item.orderNumber" class="transaction-card mb-4 p-3">
                <div class="transaction-header d-flex align-items-center justify-content-between text-center">
                    <div>
                        <i class="icon-shopping"></i>
                    </div>
                    <span>{{ item.date }}</span>
                    <span class="status">{{ item.status }}</span>
                    <span>{{ item.orderNumber }}</span>
                </div>
                <div class="transaction-body d-flex align-items-center text-center">
                    <img :src="item.image" alt="Product Image" class="product-image me-3" />
                    <div class="product-details flex-grow-1">
                        <a class="done">Done</a>
                        <i>ORD-240222/1772830911</i>
                        <h6>{{ item.name }}</h6>
                        <p>{{ item.quantity }} product x {{ formatRupiah(item.price) }}</p>
                        <p>{{ item.size }}</p>  
                    </div>
                    <div class="total-price text-end">
                        <span>Total price</span>
                        <h6>{{ formatRupiah(item.price * item.quantity) }}</h6>
                    </div>
                    <router-link to="/product">
                    <button class="buy-again-btn ms-3">Buy Again</button>
                    </router-link>
                </div>
            </div>
        </div>

        <div v-else class="order-empty">
            <div class="order-icon">
                <i class="fa-solid fa-bag-shopping"></i>
            </div>
            <div class="order-message">
                <h3>No orders yet</h3>
            </div>
            <div class="order-message">
                When you buy an item, your order about it will appear here!
            </div>
            <div>
                <router-link to="/product">
                    <base-button>Shop Now</base-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';

const store = useStore();
const transactionHistory = () =>  {
    const history = localStorage.getItem("transactionHistory");
    const parsedHistory = history ? JSON.parse(history) : null

    return Array.isArray(parsedHistory) ? parsedHistory : [];
}

const valueTransactionHistory = transactionHistory()

console.log({ valueTransactionHistory })

const transactionError = computed(() => store.getters['transaction/transactionError']); 

function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(price);
  }
</script>

<style scoped>
.done {
    background-color: rgb(221, 255, 219);
    border-color: green;
    color: rgb(30, 128, 0);
    border-radius: 10px;
    width: 50px;
    margin-left: 80px;
    margin-right: 250px;
    text-decoration: none;
}

.order-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
.order-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}
.order-empty {
    text-align: center;
    margin-top: 50px;
}
.order-icon {
    font-size: 50px;
    color: #138496;
}
.order-message {
    font-size: 1.2rem;
    margin-top: 10px;
}
.order-list {
    margin-top: 20px;
}
.order-item {
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
}
.order-error {
    color: red; 
    margin-bottom: 20px;
}
.transaction-history {
    text-align: center;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 20px; 
}
.transaction-card { 
    padding: 20px; 
    margin: 30px 0; 
}
.product-image {
    width: 80px;
    height: auto;
}
.total-price {
    font-weight: bold;
}
.buy-again-btn {
    background-color: #138496;
    border: none;
    color: white;
    padding: 10px 10px;
    border-radius: 5px;
}
.buy-again-btn:hover {
    background-color: #105e6a;

}
</style>
