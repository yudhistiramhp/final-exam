<template>
    <header class="navbar bg-body-tertiary position-fixed px-5">
            <router-link to="/" class="navbar-brand" style="margin-top: 10px;"><img src="../../assets/images/logo.png" style="width: 50px; margin-bottom: 10px;">Vintage</router-link>
            <search-bar></search-bar>
            <navigation-bar></navigation-bar>   
    </header>
</template>

<script setup>
    import SearchBar from './SearchBar.vue';
    import NavigationBar from './NavigationBar.vue';
</script>
