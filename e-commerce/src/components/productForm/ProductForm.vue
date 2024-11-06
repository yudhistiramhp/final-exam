<template>
    <ul class="list-group">
        <product-form-body :isEdit="isEdit"></product-form-body>
    </ul>
</template>

<script setup>
    import ProductFormBody from './ProductFormBody.vue';

    const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
});
</script>