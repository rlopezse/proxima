import { Helmet } from 'react-helmet-async'
import NavBar from './components/navbar/NavBar'
import AppRoutes from './router'
import styles from './App.module.css'

export default function App() {
  return (
    <>
      <Helmet
        titleTemplate="%s | Proxima — Un blog personal"
        defaultTitle="Proxima — Un blog personal"
      />
      <NavBar />
      <div className={styles.container}>
        <AppRoutes />
      </div>
    </>
  )
}
