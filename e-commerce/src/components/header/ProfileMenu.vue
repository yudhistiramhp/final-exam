<template>
  <div class="d-flex align-items-center" style="margin-right: 30px; margin-top: -15px;">
    <router-link to="/cart">
      <div class="icon position-relative">
        <i class="fa-solid fa-cart-shopping"></i>
        <span class="badge bg-danger position-absolute top-0 start-100 translate-middle">
          {{ cartCount }}
        </span>
      </div>
    </router-link>
    <router-link to="/favorite">
      <div class="icon">
        <i class="fa-regular fa-heart"></i>
      </div>
    </router-link>
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
        >
          <img
            :src="userData.imageLink"
            alt="Profile"
            width="36"
            height="36"
            class="prof rounded-circle"
            style="object-fit: cover;"
          />
        </a>
        <ul class="dropdown-menu">
          <router-link to="/user/profile-detail" class="dropdown-item">
            <i class="fa-solid fa-user"></i> Profile
          </router-link>
          <router-link to="/order" class="dropdown-item">
            <i class="fa-solid fa-receipt"></i> Orders
          </router-link>
          <li><hr class="dropdown-divider" /></li>
          <li class="dropdown-item" @click.prevent="showLogoutModal = true">
            <i class="out fa-solid fa-right-from-bracket"></i> <a href="" style="text-decoration: none;"><span style="color: red;">Logout</span></a>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <div v-if="showLogoutModal" class="modal show modal-custom">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Confirm Logout</h5>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to logout?</p>
        </div>
        <div class="modal-footer">
          <button @click="showLogoutModal = false" class="btn btn-secondary">Cancel</button>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';

const store = useStore();
const router = useRouter();

const cartCount = computed(() => {
  return store.getters['cart/cartCount']; 
});

const showLogoutModal = ref(false);
const logout = () => {
  store.commit("auth/setUserLogout");
  showLogoutModal.value = false;
  router.push("/");
};

const userData = computed(() => {
  return store.state.auth.userLogin;
});

onMounted(() => {
  store.dispatch('cart/loadCartItems');
});
</script>

<style scoped>
.d-flex {
  align-items: center; 
}

.icon i {
  font-size: 24px;
  margin-right: 50px;
  color: #138496; 
}

.prof {
  margin-top: 0; 
}

.out {
  color: red;
}

.navbar-nav .dropdown-menu {
  position: absolute; 
  z-index: 300; 
}

.badge {
  margin-left: -50px;
  border-radius: 1.25em;
  font-size: 0.75em;
}

.modal-custom {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 400; 
  background: rgba(0, 0, 0, 0.5); 
}

</style>
