<template>
    <div class="cart-container">
      <div class="cart-items">
        <i class="fa-solid fa-heart-crack empty-cart-icon"></i>
        <div class="empty-cart-text">
          <h3>No favorite items yet</h3>
          <p>When add item to favorite, the item will appear on the favorite list.</p>
        </div>
        <router-link to="/product" class="find-products-btn">Find Products</router-link>
      </div>
    </div>
</template>

<style scoped>
.cart-container {
  padding: 20px;
  max-width: 1200px;
  margin: 200px auto;
  margin-right: 170px;
}
.cart-items,
.order-summary {
  padding: 20px;
}
.cart-items {
  width: 70%;
  text-align: center;
}
.cart-items .empty-cart-icon {
  font-size: 100px;
  color: #138496;
}
.cart-items .empty-cart-text h3 {
  font-weight: bold;
  margin-top: 20px;
}
.cart-items .empty-cart-text p {
  color: #666;
  margin-bottom: 30px;
}
.cart-items .find-products-btn {
  background-color: #138496;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  margin-top: 40px;
  text-decoration: none;
}
</style>