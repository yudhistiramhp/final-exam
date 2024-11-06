<template>
    <li class="list-group-item">
        <form @submit.prevent="addNewProduct">
            <div>
                <p class="my-3 fs-5 fw-semibold">General Information</p>
                <div>
                    <base-input type="file" identity="productImage" label="Photo Product" class="mb-3" @input="checkImage"></base-input>

                    <div>
                        <img v-if="productData.image" :src="productData.image" :alt="productData.name" class="image" />
                    </div>

                    <base-input type="text" identity="productTitle" placeholder="Give your product a title" label="Product Title" class="mb-3" v-model="productData.name"></base-input>

                    <base-text-area identity="productDescription" label="Description" placeholder="Share description about your product" class="mb-3" v-model="productData.description"></base-text-area>

                    <h6>Category <span style="color: red;">*</span></h6>
                    <base-select :data="['T-shirt','Sweater','Batik','Jacket']" identity="productCategory" label="Category" class="mb-3" v-model="productData.category"></base-select>
                    
                    <h6>Size <span style="color: red;">*</span></h6>
                    <base-select :data="['S','M','L','XL']" class="mb-3" identity="productSize" label="Size" v-model="productData.size"></base-select>

                    <base-input type="text" identity="productColor" placeholder="Color" label="Color" class="mb-3" v-model="productData.color"></base-input>
                </div>
            </div>

            <div class="border-top py-1">
                <p class="my-3 fs-5 fw-semibold">Price</p>
                <div>
                    <base-input type="number" identity="price" placeholder="0" label="Price" class="mb-3" v-model="productData.price"></base-input>

                    <base-input type="number" identity="shipping" placeholder="0" label="Shipping" class="mb-3" v-model="productData.shipping"></base-input>
                </div>
            </div>

            <div class="border-top py-3 d-flex my-4 justify-content-end">
                <base-button class="cancel-btn px-3 py-2 ms-1" @click="cancelEdit">
                    Cancel
                </base-button>

                <base-button type="submit" class="px-3 py-2 ms-1">
                    Submit
                </base-button>
            </div>
        </form>
    </li>
</template>

<script setup>
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseTextArea from '../ui/BaseTextArea.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
    isEdit: {
        type: Boolean,
        default: false
    }
});

const route = useRoute();
const store = useStore();
const router = useRouter();

const productData = ref({
    image: "",
    name: "",
    description: "",
    category: "",
    size: "",
    color: "",
    price: 0,
    shipping: 0,
});

onMounted(async () => {
    if (props.isEdit) {
        await store.dispatch('product/getProductDetail', route.params.id);
        Object.assign(productData.value, store.state.product.productDetail);
    }
});

const checkImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
        productData.value.image = reader.result;
    };
};

const cancelEdit = () => {
    router.push("/user/user-product");
};

const addNewProduct = async () => {
    if (props.isEdit) {
        await store.dispatch("product/updateProduct", {
            id: route.params.id,
            newProduct: productData.value,
        });
    } else {
        await store.dispatch("product/addNewProduct", productData.value);
    }
    router.push("/user/user-product");
};
</script>
