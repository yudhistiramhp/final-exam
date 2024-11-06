<template>
    <div style="margin-top: 40px;">
        <h3>Settings</h3>
    </div>
    <div class="col-lg-3 mb-4" style="margin-top: 50px;">
      <ul>
        <li class="list-group-item user-menu"
        @click="menuClicked('profile-detail')">
          <i class="fa-solid fa-user pe-2"></i>Profile Detail
        </li>
        <li class="list-group-item user-menu"
        @click="menuClicked('change-password')">
            <i class="fa-solid fa-key pe-2"></i>Change Password
        </li>
        <li class="list-group-item user-menu"
        @click="menuClicked('transaction-history')">
            <i class="fa-solid fa-clock-rotate-left pe-2"></i>Transaction History
        </li>
        <li class="list-group-item user-menu"
        @click="menuClicked('user-product')">
            <i class="fa-solid fa-shirt pe-2"></i>My Product
        </li>
      </ul>
    </div>
</template>

  
  <style scoped>
  .user-menu:hover {
    cursor: pointer;
  }
  
  .active-color {
    color: #4c4ddc;
  }
  
  .inactive-color {
    color: #404040;
  }

  .list-group-item {
    margin-bottom: 30px;
  }
  </style>

<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  
  const emit = defineEmits(['changeComponent'])

  const menuClicked = option => {
      emit("changeComponent", option)
  }
  const store = useStore()


</script>