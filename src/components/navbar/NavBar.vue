<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Lang } from '../../composables/usePosts'

const route = useRoute()
const lang = computed<Lang>(() => (route.meta.lang as Lang) ?? 'es')
const homeLink = computed(() => (lang.value === 'en' ? '/en' : '/'))
const switchLink = computed(() => (lang.value === 'en' ? '/' : '/en'))
const switchLabel = computed(() => (lang.value === 'en' ? 'ES' : 'EN'))
</script>

<template>
  <nav class="navbar">
    <div class="navbar_container">
      <RouterLink :to="homeLink" class="navbar_logo">Proxima</RouterLink>
      <a
        href="https://ronaldlz.dev/"
        target="_blank"
        rel="noopener"
        class="navbar_myself"
      >
        <span>{{ lang === 'en' ? 'About Me' : 'Sobre Mí' }}</span>
      </a>
      <RouterLink :to="switchLink" class="lang_toggle">{{
      switchLabel
      }}</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 16px 0;
  border-bottom: 1px solid var(--gray-200);
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

.lang_toggle {
  padding: 8px 12px;
  font-size: 13px;
  color: var(--B);
  cursor: pointer;
}

.lang_toggle:hover {
  opacity: 0.8;
}

.navbar_myself {
  margin-left: auto;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  padding: 0 12px;
  border-right: 1px solid var(--gray-200);
}

.navbar_myself:hover {
  color: var(--primary);
}
</style>
