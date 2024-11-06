<template>
    <ul class="list-group">
      <li class="list-group-item">
        <div class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
          <div class="mb-3 mb-sm-0">
            <p class="my-0 fs-4 fw-semibold">My Product</p>
            <p class="my-0 text-secondary">Add your original Product here</p>
          </div>
          <RouterLink to="/new-product">
            <base-button class="add-btn px-3 py-2 rounded-pill">
              <i class="fa-solid fa-circle-plus pe-2"></i>Add Product
            </base-button>
          </RouterLink>
        </div>
      </li>
      <li class="list-group-item">
        <p class="mt-2 mb-4 fs-5 fw-semibold">Product</p>
        <div class="row">
          <user-product-card v-for="product in productList"
          :key="product.id"
          :product="product"
          :buttonName="['Delete', 'Edit']"
          @btnRemove="deleteProduct(product.id)"
          @btnEdit="editProduct(product.id)">
          <p>{{ new Date(product.createdAt).toDateString() }}</p>

          </user-product-card>
        </div>
      </li>
    </ul>
  </template>

<script setup>
import BaseButton from '../ui/BaseButton.vue';
  import { RouterLink } from 'vue-router';
  import { computed, onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import UserProductCard from './UserProductCard.vue';
  import { useRouter } from 'vue-router';
import ProductList from '../product/ProductList.vue';

  const store = useStore();
  const router = useRouter();
const productList = ref();

const products = computed(() => {
    console.log ("yaaaaaaaaaaaa")
    return store.state.product.products

  });

  const deleteProduct = async (id) => {
    await store.dispatch("product/deleteProduct", id);
  }

  const editProduct = (id) => {
    router.push({name: "EditProductPage", params: {id}})
  }

  onMounted(async() => {
    try {
      await store.dispatch("product/getProductData");
      productList.value = products.value;
    } catch (error) {
      console.log(error);
    }
  })


</script>