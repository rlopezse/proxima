<script setup lang="ts">
import posts from '../../data/json/posts.json'
import PostItem from '../../components/post-item/PostItem.vue'
</script>
<template>
  <div class="post">
    <PostItem v-for="post in posts.data" :key="post.id" :post="post" />
  </div>
</template>
<style scoped></style>
