import type { Post, Lang } from '../../hooks/usePosts'
import { formattedDate, formattedReadTime } from '../../utils/date'
import styles from './PostItem.module.css'

interface PostItemProps {
  post: Post
  lang?: Lang
}

export default function PostItem({ post, lang = 'es' }: PostItemProps) {
  const dateLocale = lang === 'en' ? 'en-US' : 'es-CL'

  return (
    <div className={styles.post_item}>
      <p className={styles.post_title}>{post.meta.title}</p>
      <p className={styles.post_date}>
        {formattedDate(post.meta.date, dateLocale)} ·{' '}
        {formattedReadTime(post.meta.readTime, lang)}
      </p>
      <p className={styles.post_spoiler}>{post.meta.spoiler}</p>
    </div>
  )
}
