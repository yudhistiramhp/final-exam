<template>
    <div class="d-flex px-4 pe-4">
        <div class="mt-3">
            <login-menu v-if="menuComponent === 'signup-menu'"></login-menu>
            <signup-menu v-if="menuComponent === 'signup-menu'"></signup-menu>

            <profile-menu v-if="menuComponent === 'profile-menu'"></profile-menu>
        </div>
        <div class="mt-1">
            <language-menu></language-menu>
        </div>
    </div>
</template>

<script setup>
    import LoginMenu from './LoginMenu.vue';
    import SignupMenu from './SignupMenu.vue';
    import LanguageMenu from './LanguageMenu.vue';
    import ProfileMenu from './ProfileMenu.vue';
    import { computed, ref, watch } from 'vue';
    import { useStore } from 'vuex';

    const menuComponent = ref('signup-menu'); 
    const store = useStore();

    const getToken = computed(() => store.state.auth.token);

    menuComponent.value = getToken.value ? 'profile-menu' : 'signup-menu';

    watch(getToken, (newValue) => {
        menuComponent.value = newValue ? 'profile-menu' : 'signup-menu';
    });
</script>
