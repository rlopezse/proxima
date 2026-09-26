import { Link } from 'react-router-dom'
import { usePosts, type Lang } from '../../hooks/usePosts'
import PostItem from '../../components/post-item/PostItem'

interface HomeProps {
  lang?: Lang
}

export default function Home({ lang = 'es' }: HomeProps) {
  const posts = usePosts(lang)
  const linkPrefix = lang === 'en' ? '/en/' : '/'

  return (
    <div className="post">
      {posts.map((post) => (
        <div key={post.meta.slug}>
          <Link to={`${linkPrefix}${post.meta.slug}`}>
            <PostItem post={post} lang={lang} />
          </Link>
        </div>
      ))}
    </div>
  )
}
