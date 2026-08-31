<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosts, type Lang } from '../../composables/usePosts'
import PostItem from '../../components/post-item/PostItem.vue'
import { useHead } from '@unhead/vue'

const route = useRoute()
const lang = computed<Lang>(() => (route.meta.lang as Lang) ?? 'es')
const posts = computed(() => usePosts(lang.value))
const linkPrefix = computed(() => (lang.value === 'en' ? '/en/' : '/'))

useHead({
  title: '',
})
</script>

<template>
  <div class="post">
    <div v-for="post in posts" :key="post.meta.slug">
      <RouterLink :to="`${linkPrefix}${post.meta.slug}`">
        <PostItem :post="post" :lang="lang" />
      </RouterLink>
    </div>
  </div>
</template>
