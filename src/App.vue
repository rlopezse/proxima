<script setup lang="ts">
import NavBar from './components/navbar/NavBar.vue'
</script>

<template>
  <NavBar />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 672px;
  width: calc(100% - 32px);
  margin: 0 auto;
}
</style>
