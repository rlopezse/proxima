<script setup lang="ts">
console.log('Bar component loaded')
</script>

<template>
  <nav class="navbar">
    <div class="navbar_container">
      <RouterLink to="/" class="navbar_logo">Proxima</RouterLink>
      <RouterLink to="/about" class="navbar_myself">
        <span>Sobre Mí</span><img src="../../assets/avatar.jpeg"
      /></RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 16px 0;
  border-bottom: 1px solid var(--grey-300);
}

.navbar_container {
  max-width: 632px;
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
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

.navbar_myself img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.navbar_myself:hover {
  color: var(--primary);
}
</style>
