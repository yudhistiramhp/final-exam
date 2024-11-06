<template>
    <div class="col-md-7" style="border: 1px solid lightgray; padding: 20px; width: 900px; border-radius: 10px;">
        <div class="content" style="padding-bottom: 60px;">
            <h4>Edit Profile</h4>
            <form @submit.prevent="updateUserProfile">
                <div class="row mb-3 align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="me-3">
                            <label for="profilePhoto" class="form-label mb-0" style="margin-right: 200px;">
                                <b>Photo</b>
                            </label>
                        </div>
                        <div class="me-3">
                            <img :src="previewImage || userData.imageLink" alt="Profile Picture" class="rounded-circle" width="100" height="100" style="object-fit: cover;" />
                        </div>
                        <div>
                            <input type="file" class="form-control" id="profilePhoto" accept=".jpg, .jpeg, .png" @change="onFileChange" />
                            <small class="form-text text-muted">JPG, JPEG, or PNG, 1 MB max.</small>
                        </div>
                    </div>
                </div>

                <hr />

                <div class="mb-3">
                    <label for="fullName" class="form-label">Full name <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" id="fullName" 
                           v-model="userData.fullname" />
                </div>

                <div class="mb-3">
                    <label for="username" class="form-label">Username <span style="color: red;">*</span></label>
                    <input type="text" class="form-control" id="username" 
                           v-model="userData.username" />
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email <span style="color: red;">*</span></label>
                    <input type="email" class="form-control" id="email" 
                           v-model="userData.email" />
                </div>

                <base-button type="submit" style="float: right;">
                    Update Profile
                </base-button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';

const store = useStore();
const userData = computed(() => store.state.auth.userLogin);
const userId = computed(() => userData.value.userId);
const imageLink = ref(userData.value.imageLink);
const previewImage = ref(null); 

const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 1048576) { 
        const reader = new FileReader();
        reader.onload = (e) => {
            imageLink.value = e.target.result;
            previewImage.value = e.target.result; 
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select a valid image file under 1 MB.");
    }
};

const updateUserProfile = async () => {
    const updatedData = {
        fullname: userData.value.fullname,
        username: userData.value.username,
        email: userData.value.email,
        imageLink: imageLink.value || userData.value.imageLink,
    };

    try {
        await store.dispatch('auth/updateUserProfile', { userId: userId.value, ...updatedData });
        console.log('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

</script>
