<script setup lang="ts">
import { usePosts } from '../../composables/usePosts'
import PostItem from '../../components/post-item/PostItem.vue'
const posts = usePosts()
</script>

<template>
  <div class="post">
    <div v-for="post in posts" :key="post.meta.slug">
      <RouterLink :to="`/${post.meta.slug}`">
        <PostItem :post="post" />
      </RouterLink>
    </div>
  </div>
</template>
