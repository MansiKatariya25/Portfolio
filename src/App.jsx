import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Process from './components/Process'

function App() {
  return (
    <div className="min-h-screen bg-violet-100 text-gray-900">
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
  )
}

export default App
