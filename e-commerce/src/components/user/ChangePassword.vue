<template>
    <div
      class="col-md-7"
      style="border: 1px solid lightgray; padding: 20px; width: 900px; border-radius: 10px;"
    >
      <div class="content" style="padding-bottom: 60px;">
        <h4>Change Password</h4>
        <form @submit.prevent="changePassword">
          <hr />

          <div class="mb-3">
            <label for="currentPassword" class="form-label"><b>Old Password</b> <span style="color: red;">*</span></label>
            <input type="password" placeholder="Old Password" class="form-control" id="currentPassword" v-model="currentPassword" required />
            <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" v-if="oldPasswordIncorrect">
              Password lama tidak sesuai.
            </p>
          </div>

          <div class="mb-3">
            <label for="newPassword" class="form-label"><b>New Password</b> <span style="color: red;">*</span></label>
            <input type="password" placeholder="New Password" class="form-control" id="newPassword" v-model="newPassword" required />
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label"><b>Confirmation New Password</b> <span style="color: red;">*</span></label>
            <input type="password" placeholder="Confirm Password" class="form-control" id="confirmPassword" v-model="confirmPassword" required />
            <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" v-if="confirmPasswordDoesNotMatch">
              Konfirmasi password tidak cocok.
            </p>
          </div>

          <base-button style="float: right;">
            Change Password
          </base-button>
        </form>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../ui/BaseButton.vue';
import { useStore } from 'vuex'; 

const store = useStore(); 
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const oldPasswordIncorrect = ref(false);
const confirmPasswordDoesNotMatch = ref(false);

const changePassword = async () => {
  oldPasswordIncorrect.value = false;
  confirmPasswordDoesNotMatch.value = false;

  const isOldPasswordCorrect = await store.dispatch("auth/verifyCurrentPassword", { currentPassword: currentPassword.value });
  
  if (!isOldPasswordCorrect) {
    oldPasswordIncorrect.value = true;
    return;
  }

  if (newPassword.value !== confirmPassword.value || newPassword.value.length < 8) {
    confirmPasswordDoesNotMatch.value = true;
    newPassword.value = '';
    confirmPassword.value = '';
    return;
  }

  const result = await store.dispatch("auth/changePassword", {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
  });

  if (result) {
    alert("Password berhasil diubah!");
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  } else {
    alert("Gagal mengubah password. Silakan coba lagi.");
  }
};
</script>
