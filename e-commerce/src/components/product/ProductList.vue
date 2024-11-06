<template>
    <div class="row mx-auto container">
        <div class="card col-2 border border-0" v-for="(product, index) in products" :key="product.id">
        <router-link :to="`/product/${product.id}`">
            <img :src="product?.image" :alt="product?.name" style="width: 100%; height: 100%; object-fit: cover;">
        </router-link>
            <div class="card-body">
                <h5><span style="color: #138496;">{{ formatRupiah(product.price) }}</span></h5>
                <p>{{ product.name }}</p>
                <p>{{ product.size }} <i class="fa-regular fa-heart" style="float: right;"> 12</i></p>
            </div>
        </div>
        <div class="card col-2 alert alert-info" style="display: flex; text-align: center; justify-content: center;">
            <h5><router-link to="/product" style="text-decoration: none; color: black;">See All Products</router-link></h5>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        products: Array
    })

    function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    }).format(price);
}


</script>