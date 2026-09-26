import { Helmet } from 'react-helmet-async'
import styles from './About.module.css'

export default function About() {
  return (
    <>
      <Helmet>
        <title>Sobre mí</title>
      </Helmet>
      <section className={styles.about_container}>
        <ul className={styles.about_block}>
          <li>
            <a
              href="https://www.linkedin.com/in/rlopezse/"
              target="_blank"
              className={styles.about_link}
            >
              - Sobre mí (Profesionalmente)
            </a>
          </li>
          <li>
            <a
              href="https://github.com/rlopezse"
              target="_blank"
              className={styles.about_link}
            >
              - Mis proyectos personales
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}
