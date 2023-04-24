<template>
    <NavBar />
    <router-view />
</template>

<script setup>
import NavBar from '@/components/admin/NavBar.vue'

//import static
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
</script>

<style scoped>
@import '@/assets/css/bootswatch.css';
</style>