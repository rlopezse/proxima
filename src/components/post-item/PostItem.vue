<script setup lang="ts">
import { formattedDate } from '../../utils/date'

defineProps<{
  post: {
    meta: {
      title: string
      date: string
      spoiler: string
    }
  }
}>()
</script>

<template>
  <div class="post_item">
    <p class="post_title">{{ post.meta.title }}</p>
    <p class="post_date">{{ formattedDate(post.meta.date) }}</p>
    <p class="post_spoiler">{{ post.meta.spoiler }}</p>
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
  font-size: 24px;
  font-weight: 800;
  color: var(--primary);
  transition: opacity 0.3s ease;
}

.post_date {
  font-size: 12px;
  margin-bottom: 4px;
  color: var(--gray-700);
}

.post_spoiler {
  font-size: 14px;
}
</style>
