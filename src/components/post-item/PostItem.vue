<script setup lang="ts">
defineProps<{
  post: {
    title: string
    date: string
    subtitle: string
  }
}>()
</script>

<template>
  <div class="post_item">
    <h2 class="post_title">{{ post.title }}</h2>
    <p class="post_date">{{ post.date }}</p>
    <p class="post_subtitle">{{ post.subtitle }}</p>
  </div>
</template>

<style scoped>
.post_item {
  padding: 16px 0;
  cursor: pointer;
}

.post_item:hover {
  opacity: 0.8;
}

.post_title {
  font-size: 20px;
  font-weight: 800;
  color: var(--primary);
  transition: opacity 0.3s ease;
}

.post_date {
  font-size: 12px;
  color: var(--gray-700);
}

.post_subtitle {
  font-size: 14px;
}
</style>
