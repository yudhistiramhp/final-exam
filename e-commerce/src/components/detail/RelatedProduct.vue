<template>    
    <div class="container ms-5 recipe__list-recipe row">
        <div><h3>Related Product</h3></div>
        <div class="col-12 col-lg-2 col-sm-2 position-relative mt-3" v-for="product in relatedProducts" :key="product.id">
            <router-link :to="`/product/${product.id}`" class="list-item text-decoration-none">
                <img :src="product.image" :alt="product.name" class="product-image">
                <h6 style="color: #138496; margin-top: 10px;">{{ formatRupiah(product.price) }}</h6>
                <p class="small" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: black;">{{ product.name }}</p>
            </router-link>
            <div class="d-flex justify-content-between">
                <p>B/M</p>
                <span><i class="fa-regular fa-heart"></i>12</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const relatedProducts = computed(() => {
    return store.state.product.relatedProducts;
});

function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    }).format(price);
}

onMounted(async () => {
    const categoryType = store.state.product.productDetail.category;
    await store.dispatch('product/getRelatedProduct', categoryType);
});
</script>

<style scoped>

.product-image {
    width: 100%; 
    height: 250px; 
}
</style>