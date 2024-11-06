<template>
    <main>
        <div class="container-md my-5 py-5">
            <product-form v-if="detailData && !isLoading" :isEdit="true"></product-form>
        </div>
    </main>
</template>

<script setup>
    import ProductForm from '../productForm/ProductForm.vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import { onMounted, ref } from 'vue';

    const store = useStore();
    const route = useRoute();
    const detailData = ref(null);
    const isLoading = ref(false);

    onMounted(async () => {
        isLoading.value = true;
        try {
            await store.dispatch('getProductDetail', route.params.id)
            detailData.value = store.state.product.productDetail;
        } catch (err) {
            console.log(err)
        }
        isLoading.value = false;
    })
</script>