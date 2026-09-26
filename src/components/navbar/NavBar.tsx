import { Link, useLocation } from 'react-router-dom'
import type { Lang } from '../../hooks/usePosts'
import styles from './NavBar.module.css'

export default function NavBar() {
  const location = useLocation()
  const lang: Lang = location.pathname.startsWith('/en') ? 'en' : 'es'
  const homeLink = lang === 'en' ? '/en' : '/'
  const switchLink = lang === 'en' ? '/' : '/en'
  const switchLabel = lang === 'en' ? 'ES' : 'EN'

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_container}>
        <Link to={homeLink} className={styles.navbar_logo}>
          Proxima
        </Link>
        <a
          href="https://ronaldlz.dev/"
          target="_blank"
          rel="noopener"
          className={styles.navbar_myself}
        >
          <span>{lang === 'en' ? 'About Me' : 'Sobre Mí'}</span>
        </a>
        <Link to={switchLink} className={styles.lang_toggle}>
          {switchLabel}
        </Link>
      </div>
    </nav>
  )
}
