<template>
    <product-detail></product-detail>
    <related-product :products="relatedProducts" v-if="relatedProductsStatus"></related-product>
</template>


<script setup>
import ProductDetail from '../detail/ProductDetail.vue';
import RelatedProduct from '../detail/RelatedProduct.vue';

import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const productListStatus = ref(false);
const productList = ref([]);
const relatedProductsStatus = ref(false);
const relatedProducts = ref([]);

const currentProductDetail = computed(() => store.state.product.productDetail);

onMounted(async () => {
    try {
        await store.dispatch("product/getProductData");
        productList.value = store.state.product.products;
        productListStatus.value = true;

        await store.dispatch("product/getProductDetail", currentProductDetail.value.id);

        await store.dispatch("product/getRelatedProduct", currentProductDetail.value.category);
        relatedProducts.value = store.state.product.relatedProducts;
        relatedProductsStatus.value = true;

    } catch (error) {
        console.log(error);
    }
});
</script>