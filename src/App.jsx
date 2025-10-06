import './App.css'
import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Process from './components/Process'
import Loader from './components/Loader'
import { ensureGSAP } from './utils/anim'

function App() {
  const [loading, setLoading] = useState(true)
  const shellRef = useRef(null)

  useEffect(() => {
    const done = () => setLoading(false)
    if (document.readyState === 'complete') {
      // Give a small delay to show loader animation
      const t = setTimeout(done, 900)
      return () => clearTimeout(t)
    }
    const onLoad = () => done()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (!loading) {
      const { gsap } = ensureGSAP()
      const ctx = gsap.context(() => {
        gsap.from('.app-fade-in', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
      }, shellRef)
      return () => ctx.revert()
    }
  }, [loading])

  return (
    <div ref={shellRef} className="min-h-screen bg-violet-100 text-gray-900 relative">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className="app-fade-in">
        <Navbar />
        <main>
          <section id="home" className="pt-24">
            <Hero />
          </section>
          <section id="skills" className="pt-24">
            <Skills />
          </section>
          <section id="work" className="py-24">
            <Work />
          </section>
          <section id="process" className="">
            <Process />
          </section>
          <section id="contact" className="pt-28 bg-white/60">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
