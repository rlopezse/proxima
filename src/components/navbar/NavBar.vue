<script setup lang="ts">
  console.log('Bar component loaded');
</script>

<template>
  <nav class="navbar">
    <div class="navbar_containter">
      <div class="navbar_logo">Proxima</div>
      <div class="navbar_myself">Sobre Mí</div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 16px;
  border-bottom: 1px solid var(--grey-300);
}

.navbar_containter {
  max-width: 672px;
  width: calc(100% - 32px);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar_logo {
  font-size: 24px;
  font-family: 'Ultra';
}
</style>
