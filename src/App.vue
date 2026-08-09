<script setup lang="ts">
import NavBar from './components/navbar/NavBar.vue'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Proxima — Un blog personal',
  titleTemplate: (title) =>
    title ? `${title} | Proxima — Un blog personal` : 'Proyecto Próxima',
  meta: [
    {
      name: 'description',
      content:
        'Blog personal donde comparto experiencias sobre Linux, desarrollo de software, videojuegos y temas de interés general.',
    },
  ],
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
