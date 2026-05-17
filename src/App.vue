<script setup lang="ts">
import Home from './pages/home/Home.vue'
import NavBar from './components/navbar/NavBar.vue'
console.log('App component loaded');
</script>

<template>
  <NavBar />
  <div class="container">
    <Home />
  </div>
</template>

<style scoped>
.container {
  max-width: 672px;
  width: calc(100% - 32px);
  margin: 0 auto;
}
</style>
