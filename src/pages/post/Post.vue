<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../../composables/usePosts'
import './Post.css'

const route = useRoute()
const posts = usePosts()

const post = computed(() =>
  posts.find((p) => p.meta.slug === route.params.slug),
)
</script>

<template>
  <div v-if="post" class="post_content">
    <component :is="post.component" />
  </div>
  <div v-else>Post no encontrado.</div>
</template>
