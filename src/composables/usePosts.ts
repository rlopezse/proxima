const modules = import.meta.glob('/src/data/post/**/index.md', { eager: true })
import { parseDate } from '../utils/date'

export interface PostMeta {
  title: string
  slug: string
  subtitle: string
  date: string
}

export interface Post {
  meta: PostMeta
  component: any
}

export function usePosts(): Post[] {
  return Object.values(modules)
    .sort((a: any, b: any) => {
      return parseDate(b.date) - parseDate(a.date)
    })
    .map((mod: any) => ({
      meta: {
        title: mod.title,
        slug: mod.slug,
        subtitle: mod.subtitle,
        date: mod.date,
      },
      component: mod.default,
    }))
}
