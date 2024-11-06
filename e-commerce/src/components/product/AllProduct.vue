<template>
  <div class="container" style="margin-top: 100px;">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="my-4">Items</h2>
      <div class="d-flex">
        <select v-model="selectedCategory" @change="applyFilters" class="form-select w-auto me-2">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        <button @click="toggleSortOrder" class="btn btn-outline-secondary">
          Sort by {{ sortOrder === 'asc' ? 'Name ↑' : sortOrder === 'desc' ? 'Name ↓' : 'Name' }}
        </button>
      </div>
    </div>
    <hr />
    <div class="row mx-auto">
      <div v-if="filteredProducts.length === 0" class="text-center my-5">
        <i class="fa-solid fa-circle-xmark" style="font-size: 100px; color: #138496;"></i>
        <h3 class="mt-3">Product Not Found</h3>
        <p>We cannot find what you are looking for,</p>
        <p style="margin-top: -15px;">try to use other keywords!</p>
      </div>

      <div v-else class="card col-2 border border-0" v-for="(product, index) in filteredProducts" :key="product.id">
        <router-link :to="`/product/${product.id}`">
          <img :src="product.image" :alt="product.name" style="width: 100%; height: 100%; object-fit: cover;">
        </router-link>
        <div class="card-body">
          <h5><span style="color: #138496;">{{ formatRupiah(product.price) }}</span></h5>
          <p>{{ product.name }}</p>
          <p>{{ product.size }}<i class="fa-regular fa-heart" style="float: right;"> 12</i></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const products = computed(() => store.state.product.products);
const route = useRoute();
const searchQuery = computed(() => route.query.search || '');

const selectedCategory = ref('');
const sortOrder = ref(null); // null indicates "None" sorting

const categories = computed(() => [...new Set(products.value.map(product => product.category))]);

function formatRupiah(price) {
  return new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }).format(price);
}

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (searchQuery.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }

  if (sortOrder.value === 'asc' || sortOrder.value === 'desc') {
    filtered = filtered.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortOrder.value === 'asc') {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });
  } else {
    // Default sorting by product id if sortOrder is "None" (null)
    filtered = filtered.sort((a, b) => a.id - b.id);
  }

  return filtered;
});

function toggleSortOrder() {
  if (sortOrder.value === 'asc') {
    sortOrder.value = 'desc';
  } else if (sortOrder.value === 'desc') {
    sortOrder.value = null;
  } else {
    sortOrder.value = 'asc';
  }
}

onMounted(async () => {
  await store.dispatch("product/getProductData");
});
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

.form-select, .btn-outline-secondary {
  min-width: 150px;
  border-color: #138496;
  color: #138496;
}

.btn-outline-secondary:hover {
  background-color: #138496;
  color: white;
}

.row .card-body {
  padding: 0.5rem;
}

.text-center i {
  font-size: 3rem;
  color: #138496;
}

.text-center p {
  margin-top: 1rem;
}
</style>
