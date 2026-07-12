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
      {/* WCAG 2.4.1 bypass block: visually hidden until keyboard-focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-cta focus:text-navy focus:font-body focus:font-semibold focus:px-4 focus:py-3 focus:rounded-md"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <SiteNav />
      <main id="main-content" className="flex-1">
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
