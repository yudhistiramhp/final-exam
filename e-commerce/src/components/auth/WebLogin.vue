<template>
        <div class="login-card container-fluid" style="width: 30rem">
        <router-link to="/" type="button" class="btn-close" aria-label="Close" style="float: right;"></router-link>
        <h2>LOGIN</h2>
        <p>Enter your details below</p>
        <form class="mt-3" @submit.prevent="login" style="text-align: left;">
                <div class="my-4">
                    <base-input 
                        type="email"
                        identity="email"
                        placeholder="Your email address"
                        label="Email"
                        v-model="loginData.email">
                    </base-input>
                </div>
                <div class="my-4">
                    <base-input 
                        type="password"
                        identity="password"
                        placeholder="Your Password"
                        label="Password"
                        v-model="loginData.password">
                    </base-input>
                </div>
                <base-button class="login w-100 my-3">
                    Login
                </base-button>
            </form>
            <div class="text-center mt-4">
                <p class="fw-semibold">
                    Don’t have an account?<span style="color: #4c4ddc">
                        <router-link to="/signup" class="text-decoration-none">
                            Signup</router-link></span>
                </p>
            </div>
    </div>
</template>

<script setup>
    import BaseButton from '../ui/BaseButton.vue';
    import BaseInput from '../ui/BaseInput.vue';
    import { reactive } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const store = useStore()
    const router = useRouter()

    const login = async () => {
        await store.dispatch("auth/getLoginData", loginData);
        router.push("/")
    }

    const loginData = reactive({
        email: "",
        password: "",
        isLogin: true
    })
</script>