<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts, type Lang } from '../../composables/usePosts'
import { formattedDate } from '../../utils/date'
import './Post.css'

const route = useRoute()
const lang = computed<Lang>(() => (route.meta.lang as Lang) ?? 'es')
const posts = computed(() => usePosts(lang.value))
const backLink = computed(() => (lang.value === 'en' ? '/en' : '/'))
const dateLocale = computed(() => (lang.value === 'en' ? 'en-US' : 'es-CL'))

const post = computed(() =>
  posts.value.find((p) => p.meta.slug === route.params.slug),
)

const linkPrefix = computed(() => (lang.value === 'en' ? '/en/' : '/'))

const currentIndex = computed(() =>
  posts.value.findIndex((p) => p.meta.slug === route.params.slug),
)

// posts are sorted newest-first, so "previous" (older) is the next index
// and "next" (newer) is the previous index
const previousPost = computed(() => posts.value[currentIndex.value + 1])
const nextPost = computed(() =>
  currentIndex.value > 0 ? posts.value[currentIndex.value - 1] : undefined,
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
        <span>{{ formattedDate(post.meta.date, dateLocale) }}</span>
      </div>
      <div @click="ClicEvent">
        <component :is="post.component" />
      </div>
      <hr class="post_divider" />
      <div class="post_nav">
        <RouterLink
          v-if="previousPost"
          :to="`${linkPrefix}${previousPost.meta.slug}`"
          class="post_nav_link"
        >
          {{ lang === 'en' ? 'Previous' : 'Anterior' }}:
          <span class="post_nav_link_title">{{ previousPost.meta.title }}</span>
        </RouterLink>
        <RouterLink
          v-if="nextPost"
          :to="`${linkPrefix}${nextPost.meta.slug}`"
          class="post_nav_link"
        >
          {{ lang === 'en' ? 'Next' : 'Siguiente' }}:
          <span class="post_nav_link_title">{{ nextPost.meta.title }}</span>
        </RouterLink>
      </div>
      <div class="post_back">
        <RouterLink :to="backLink">proxima</RouterLink>
      </div>
    </div>
    <div v-else>
      {{ lang === 'en' ? 'Post not found.' : 'Post no encontrado.' }}
    </div>
  </div>
</template>

<script lang="ts"></script>
