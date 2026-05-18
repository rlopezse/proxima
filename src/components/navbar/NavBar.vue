<script setup lang="ts">
console.log('Bar component loaded')
</script>

<template>
  <nav class="navbar">
    <div class="navbar_containter">
      <RouterLink to="/" class="navbar_logo">Proxima</RouterLink>
      <RouterLink to="/about" class="navbar_myself">Sobre Mí</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 16px 0;
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
  cursor: pointer;
}

.navbar_myself {
  cursor: pointer;
  transition: color 0.3s ease;
}

.navbar_myself:hover {
  color: var(--primary);
}
</style>
