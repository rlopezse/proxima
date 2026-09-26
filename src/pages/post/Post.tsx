import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePosts, type Lang } from '../../hooks/usePosts'
import { formattedDate } from '../../utils/date'
import './Post.css'

interface PostProps {
  lang?: Lang
}

export default function Post({ lang = 'es' }: PostProps) {
  const { slug } = useParams()
  const posts = usePosts(lang)
  const backLink = lang === 'en' ? '/en' : '/'
  const linkPrefix = lang === 'en' ? '/en/' : '/'
  const dateLocale = lang === 'en' ? 'en-US' : 'es-CL'

  const currentIndex = posts.findIndex((p) => p.meta.slug === slug)
  const post = currentIndex === -1 ? undefined : posts[currentIndex]

  // posts are sorted newest-first, so "previous" (older) is the next index
  // and "next" (newer) is the previous index
  const previousPost = posts[currentIndex + 1]
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : undefined

  const contentRef = useRef<HTMLDivElement>(null)
  const [enlargedSrc, setEnlargedSrc] = useState<string | null>(null)

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLImageElement

    if (target.tagName === 'IMG') {
      setEnlargedSrc((current) => (current === target.src ? null : target.src))
    }
  }

  // A post's HTML comes from dangerouslySetInnerHTML, so the <img> node
  // clicked below can be replaced by a fresh, class-less one on a later
  // re-render (e.g. from prev/next navigation). Re-syncing the "enlarged"
  // class here on every render — instead of toggling it once inside
  // handleClick — keeps it in sync with state regardless of node identity.
  useEffect(() => {
    const images = contentRef.current?.querySelectorAll('img') ?? []
    images.forEach((img) => {
      img.classList.toggle('enlarged', img.src === enlargedSrc)
    })
  })

  useEffect(() => {
    document.body.classList.toggle('enlarged', enlargedSrc !== null)
    document.body.style.overflow = enlargedSrc !== null ? 'hidden' : ''

    return () => {
      document.body.classList.remove('enlarged')
      document.body.style.overflow = ''
    }
  }, [enlargedSrc])

  if (!post) {
    return (
      <div className="post">
        <div>{lang === 'en' ? 'Post not found.' : 'Post no encontrado.'}</div>
      </div>
    )
  }

  const PostContent = post.component

  return (
    <div className="post">
      <div className="post_content">
        <div className="post_header">
          <h1>{post.meta.title}</h1>
          <span>{formattedDate(post.meta.date, dateLocale)}</span>
        </div>
        <div ref={contentRef} onClick={handleClick}>
          <PostContent />
        </div>
        <hr className="post_divider" />
        <div className="post_nav">
          {previousPost && (
            <Link
              to={`${linkPrefix}${previousPost.meta.slug}`}
              className="post_nav_link"
            >
              {lang === 'en' ? 'Previous' : 'Anterior'}:{' '}
              <span className="post_nav_link_title">
                {previousPost.meta.title}
              </span>
            </Link>
          )}
          {nextPost && (
            <Link
              to={`${linkPrefix}${nextPost.meta.slug}`}
              className="post_nav_link"
            >
              {lang === 'en' ? 'Next' : 'Siguiente'}:{' '}
              <span className="post_nav_link_title">{nextPost.meta.title}</span>
            </Link>
          )}
        </div>
        <div className="post_back">
          <Link to={backLink}>proxima</Link>
        </div>
      </div>
    </div>
  )
}
