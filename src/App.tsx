import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import HomePage from './pages/HomePage'
import ForDistrictsPage from './pages/ForDistrictsPage'
import AboutPage from './pages/AboutPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <ScrollToTop />
      <SiteNav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/for-districts" element={<ForDistrictsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Reserved for post-launch pillars — do not build yet:
              /for-teachers, /for-families (see CLAUDE.md) */}
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}
