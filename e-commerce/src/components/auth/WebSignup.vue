<template>
    <div class="register-card container-fluid" style="width: 30rem; margin-top: 160px">
      <div class="card-body" >
        <router-link to="/" type="button" class="btn-close" aria-label="Close" style="float: right;"></router-link>
        <h2 style="text-align: center; margin-top: -10px;">Sign Up</h2>
        <p style="text-align: center; margin-bottom: 10px;">Enter your details below</p>
        <form class="mt-3" @submit.prevent="register">
            <div class="my-4">
              <base-input 
                type="text"
                identity="fullname"
                placeholder="ex: Jack"
                label="Fullname"
                v-model="signupData.fullname">
              </base-input>
            </div>
          <div class="my-4">
              <base-input 
                type="text"
                identity="username"
                placeholder="Your username"
                label="Username"
                v-model="signupData.username">
              </base-input>
          </div>
          <div class="my-4">
              <base-input 
                type="email"
                identity="email"
                placeholder="Your email address"
                label="Email"
                v-model="signupData.email">
              </base-input>
          </div>
          <div class="my-4">
              <base-input 
                type="password"
                identity="password"
                placeholder="Your Password"
                label="Password"
                v-model="signupData.password" @keyInput="passwordCheck">
              </base-input>
              <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{ display: passwordStatusDisplay }">
                The password field must be at least 8 characters
              </p>
          </div>
          <div class="my-4">
                <base-input 
                  type="password"
                  identity="confirmationPassword"
                  placeholder="Same with password"
                  label="Confirmation Password"
                  v-model="signupData.confirmationPassword" @keyInput="confirmationPasswordCheck">
                </base-input>
                <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{ display: confirmPasswordDoesNotMatch }">
                The password confirmation does not match
              </p>
              <p class="text-success mt-1 fw-medium" style="font-size: 11px;" :style="{ display: confirmPasswordMatch }">
                The password confirmation does match
              </p>
          </div>
          <div class="my-4">

            <base-input
              type="file"
              identity="userImage"
              label="Profile Photo"
              isImage="true"
              @input="checkImage">
              <div>
                <div class="border p-1 mt-1 rounded-circle">
                  <img :src="signupData.imageLink" class="rounded-circle" width="150" height="150" style="object-fit: cover;">
                </div>
                <div class="text-center" style="transform: translateY(-24px)">
                  <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
                </div>
              </div>
            </base-input>
          </div>
          <div class="mb-3 form-check agree-btn">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">By clicking sign up, I hereby agree
                and consent to <span style="color: blueviolet;">Term & Conditions;</span> I confirm that I have read <span style="color: blueviolet;">Privacy Policy.</span>
            </label>
          </div>
          <base-button class="login w-100 my-3">
          Register
          </base-button>
        </form>
        <div class="text-center mt-4">
          <p class="fw-semibold">
            Already have account?<span style="color: #4c4ddc"
              ><router-link to="/login" class="text-decoration-none"> Login</router-link></span
            >
          </p>
        </div>
      </div>
    </div>
</template>

<script setup>
  import BaseInput from "../ui/BaseInput.vue"
  import BaseButton from "../ui/BaseButton.vue"
  import { reactive, ref } from 'vue';
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";

  const store = useStore()
  const router = useRouter()

    const signupData = reactive({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmationPassword: "",
      isLogin: false,
      imageLink: "",
    })

    const register = async () => {
    // console.log({ signupData })
    if (
      signupData.password !== signupData.confirmationPassword || signupData.password.length < 8
    ) {
      signupData.confirmationPassword = "";
      signupData.password = "";
      confirmPasswordDoesNotMatch.value = "none";
      confirmPasswordMatch.value = "none";
    } else {
      const result = await store.dispatch("auth/getRegisterData", signupData);
      if(result){
        alert("Berhasil Mendaftar!")
      }
      // console.log({ result })
      router.push("/");
    }
  };

    const passwordStatusDisplay = ref("none")

    const passwordCheck = () => {
    if ( signupData.password.length < 8 ) {
      passwordStatusDisplay.value = "block"
    } else {
      passwordStatusDisplay.value = "none"
    }
  }

  const confirmPasswordDoesNotMatch = ref("none");
  const confirmPasswordMatch = ref("none");

  const confirmationPasswordCheck = () => {
    if (signupData.confirmationPassword === "") {
      confirmPasswordDoesNotMatch.value = "none";
      confirmPasswordMatch.value = "none";
      return;
    }

    if (signupData.password !== signupData.confirmationPassword) {
      confirmPasswordDoesNotMatch.value = "block";
      confirmPasswordMatch.value = "none";
      return;
    }

    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "block";
  };

  const checkImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      signupData.imageLink = reader.result;
    });
  };

</script>