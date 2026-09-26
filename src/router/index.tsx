import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/home/Home'
import Post from '../pages/post/Post'
import About from '../pages/about/About'

function GtagPageView() {
  const location = useLocation()

  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: location.pathname + location.search,
    })
  }, [location.pathname, location.search])

  return null
}

export default function AppRoutes() {
  return (
    <>
      <GtagPageView />
      <Routes>
        <Route path="/" element={<Home lang="es" />} />
        <Route path="/about" element={<About />} />
        <Route path="/en" element={<Home lang="en" />} />
        <Route path="/en/:slug" element={<Post lang="en" />} />
        <Route path="/:slug" element={<Post lang="es" />} />
      </Routes>
    </>
  )
}
