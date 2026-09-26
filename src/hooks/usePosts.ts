import { useMemo } from 'react'
import { parseDate } from '../utils/date'

export type Lang = 'es' | 'en'

const modulesByLang = {
  es: import.meta.glob('/src/data/post/**/index.md', { eager: true }),
  en: import.meta.glob('/src/data/post-en/**/index.md', { eager: true }),
}

export interface PostMeta {
  title: string
  slug: string
  spoiler: string
  date: string
}

export interface Post {
  meta: PostMeta
  component: any
}

function getPosts(lang: Lang): Post[] {
  return Object.values(modulesByLang[lang])
    .filter((mod: any) => !mod.draft)
    .sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date))
    .map((mod: any) => ({
      meta: {
        title: mod.title,
        slug: mod.slug,
        spoiler: mod.spoiler,
        date: mod.date,
      },
      component: mod.default,
    }))
}

export function usePosts(lang: Lang = 'es'): Post[] {
  return useMemo(() => getPosts(lang), [lang])
}
