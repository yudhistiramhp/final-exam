<template>
  <div class="col-sm-8 col-4 py-0">
    <div class="d-none d-sm-block">
      <div class="input-group align-items-center border rounded-2 mt-3" style="height: 40px;">
        <span class="px-2"><i class="fa-solid fa-magnifying-glass"></i></span>
        <input
          type="text"
          class="form-control form-control-sm border-0"
          placeholder="Search Item"
          v-model="searchQuery"
          @keyup.enter="searchProduct"
        />
      </div>
    </div>
    <div class="d-block d-sm-none border-end text-end px-3">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const searchQuery = ref('');
const router = useRouter();

const searchProduct = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'product', query: { search: searchQuery.value } });
  }
};


watch(searchQuery, (newValue) => {
  if (!newValue) {
    router.push({ name: 'product', query: { search: '' } });
  }
});
</script>
