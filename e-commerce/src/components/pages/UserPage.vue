<template>
    <div class="container-md my-5 py-5">
      <div class="row">
          <user-menu @changeComponent="$router.push($event)"></user-menu>
            <div class="col-lg-9">
            <component :is="component[getRoute]"></component>
          </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import UserMenu from '../user/UserMenu.vue';
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import TransactionHistory from '../user/TransactionHistory.vue';
    import ProfileDetail from '../user/ProfileDetail.vue';
    import ChangePassword from '../user/ChangePassword.vue';
    import UserProduct from '../user/UserProduct.vue';
  
    const route = useRoute();
  
    const component = {
      "profile-detail": ProfileDetail,
      "change-password": ChangePassword,
      "transaction-history": TransactionHistory,
      "user-product": UserProduct
    }
  
    const getRoute = computed(() => {
      return route.params.component
    })
    
  </script>