<template>
     <main>
        <div class="card position-relative">
            <img src="../../assets/images/bg2.jpg" class="img-fluid" alt="...">
            <div class="position-absolute w-60 h-20 start-25 translate-middle"
                style="top: 25%; left: 20%; border-radius: 10px; background-color: rgb(255, 255, 255); box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);">
                <div class="card-body">
                    <h5 class="mt-2 mb-2 w-75">Ready to declutter your closet?</h5>
                <router-link to="/product">
                    <button class="shop w-100 mt-3" type="submit">Shop Now</button>
                </router-link>
                </div>
            </div>
        </div>

        <div class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="nav-link disabled" aria-disabled="true" style="font-size: 25px;"><b>Popular Product</b></a>
            <a class="navbar-link" style="text-decoration: none; color: #138496;" href="#" type="none">See all</a>
        </div>
    </div>
        <div>
            <product-list :products="productList.slice(5, 10)" v-if="productListStatus"></product-list>
        </div>
        <div>
            <sort-brand-list></sort-brand-list>
        </div>
        
        <div class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="nav-link disabled" aria-disabled="true" style="font-size: 25px;"><b>New Product</b></a>
            <a class="navbar-link" style="text-decoration: none; color: #138496;" href="#" type="none">See all</a>
        </div>
    </div>
        <div>
        <product-list :products="productList.slice(0, 5)" v-if="productListStatus"></product-list>
    </div>
    </main>
</template>

<script setup>
    import ProductList from '../product/ProductList.vue';
    import SortBrandList from '../product/SortBrandList.vue';
    import { onMounted, ref } from 'vue';
    import { useStore } from 'vuex';
    

    const store = useStore();
    const productListStatus = ref(false);
    const productList = ref();

    onMounted(async () => {
        try {
            await store.dispatch("product/getProductData");
            productListStatus.value = true;
            productList.value = store.state.product.products;
        } catch (error) {
            console.log(error);
        }
    })
</script>

<style>
.shop {
    border: 1px solid;
    color: white;
    background-color: #138496;
    border-radius: 10px;
    padding: 10px 0;
}

.shop:hover {
    background-color: #105e6a;
}
</style>