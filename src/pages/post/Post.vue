<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts } from '../../composables/usePosts'
import { formattedDate } from '../../utils/date'
import './Post.css'

const route = useRoute()
const posts = usePosts()

const post = computed(() =>
  posts.find((p) => p.meta.slug === route.params.slug),
)

const isFullscreen = ref(false)

function ClicEvent(event: MouseEvent) {
  const target = event.target as HTMLImageElement

  if (target.tagName === 'IMG') {
    isFullscreen.value = !isFullscreen.value
    document.body.style.overflow = isFullscreen.value ? 'hidden' : ''
    document.body.classList.toggle('enlarged', isFullscreen.value)
    target.classList.toggle('enlarged', isFullscreen.value)
  }
}
</script>

<template>
  <div class="post">
    <div v-if="post" class="post_content">
      <div class="post_header">
        <h1>{{ post.meta.title }}</h1>
        <span>{{ formattedDate(post.meta.date) }}</span>
      </div>
      <div @click="ClicEvent">
        <component :is="post.component" />
      </div>
      <div class="post_back">
        <RouterLink to="/">proxima</RouterLink>
      </div>
    </div>
    <div v-else>Post no encontrado.</div>
  </div>
</template>

<script lang="ts"></script>
