<template>
  <div class="container text-center mt-5 mb-5" style="padding-top: 50px;">
    <div class="row justify-content-between mt-5">
      <div class="col-6" style="max-width: 1100px;">
        <div>
          <img :src="productDetail?.image" :alt="productDetail?.name" class="product-image">
        </div>
      </div>
      <div class="card col-6 product-card">
        <div class="card-body" style="line-height: 1;">
          <h2 class="card-title">
            <span class="price">{{ formatRupiah(productDetail?.price) }}</span>
          </h2>
          <i class="fa-regular fa-heart position-absolute top-0 end-0 m-3"></i>
          <h6 class="card-subtitle mb-2 text-body">{{ productDetail?.name }}</h6>
          <p class="card-subtitle mb-2 text-body">
            <span>{{ productDetail?.size }}</span>
            <span class="mx-2">•</span>
            <span>Denpasar</span>
            <span class="mx-2">•</span>
            <span>Very Good</span>
          </p>
          <hr>
          <p class="card-text">Item Description</p>
          <h6 class="card-text" style="margin-bottom: 30px;">{{ productDetail?.description }}</h6>
          <div class="container">
            <div class="row">
              <div class="col-6">
                <p><strong>Category</strong></p>
                <p><strong>Size</strong></p>
                <p><strong>Condition</strong></p>
                <p><strong>Color</strong></p>
                <p><strong>Uploaded</strong></p>
                <p><strong>Shipping</strong></p>
              </div>
              <div class="col-6">
                <p>{{ productDetail?.category }}</p>
                <p>{{ productDetail?.size }}</p>
                <p>Very Good</p>
                <p>{{ productDetail?.color }}</p>
                <p>5 hours ago</p>
                <p>{{ formatRupiah(productDetail?.shipping) }}</p>
              </div>
            </div>
          </div>
          <hr>
          <div class="d-grid gap-2">
            <button class="signup" @click="handleCheckout" style="border: none;">Buy</button>
            <button class="login" @click="handleAddToCart">Add to Cart</button>
          </div>
          <div class="card mt-3 p-3 seller-info">
            <div class="d-flex align-items-center">
              <img src="/src/assets/images/vincent.jpeg" alt="Seller Profile" class="rounded-circle me-3 seller-image">
              <div>
                <h6 class="mb-0">Vincent</h6>
                <div class="text-warning">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <span class="text-muted ms-2">(54)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" v-show="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addToCartModalLabel">Successfully Added to Cart</h5>
            <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <i class="fa-solid fa-cart-shopping fa-2x text-success"></i>
            <p>{{ productDetail?.name }} successfully added to cart. Check now on the cart or continue shopping.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Continue Shopping</button>
            <router-link to="/cart" class="btn btn-primary">Go to Cart</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

function formatRupiah(price) {
  return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
  }).format(price);
}

const store = useStore();
const route = useRoute();
const router = useRouter();
const showModal = ref(false);

const productDetail = computed(() => {
  return store.state.product.productDetail;
});

onMounted(async () => {
  await store.dispatch("product/getProductDetail", route.params.id);
});

function handleAddToCart() {
  const productToAdd = {
    id: productDetail.value.id,
    name: productDetail.value.name,
    price: productDetail.value.price,
    image: productDetail.value.image,
    qty: 1 
  };

  store.commit('cart/addToCart', productToAdd);
  showModal.value = true; 
}

function handleCheckout() {
  const productToAdd = {
      id: productDetail.value.id,
      name: productDetail.value.name,
      price: productDetail.value.price,
      image: productDetail.value.image,
      quantity: 1,
  };

  store.commit('cart/addToCart', productToAdd);
  router.push("/order");
}
</script>

<style scoped>
.product-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.product-card {
  text-align: left;
  width: 500px;
}

.price {
  color: #138496;
}

.seller-info {
  text-align: left;
}

.modal {
  z-index: 1050 !important;
}

.seller-image {
  width: 50px;
  height: 50px;
}
</style>
