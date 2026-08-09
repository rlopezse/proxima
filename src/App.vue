<script setup lang="ts">
import NavBar from './components/navbar/NavBar.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Proxima — Un blog personal',
  titleTemplate: (title) =>
    title
      ? `${title} | Proxima — Un blog personal`
      : 'Proxima — Un blog personal',
})
</script>

<template>
  <NavBar />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 632px;
  width: calc(100% - 32px);
  margin: 0 auto;
}
</style>
