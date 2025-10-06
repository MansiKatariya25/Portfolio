import React, { useEffect, useRef, useState } from 'react'
import { ensureGSAP } from '../utils/anim'

const AccentUnderline = ({ children }) => (
  <span className="relative">
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-x-0 -bottom-1 h-2 bg-violet-300/70 rounded-full z-0"></span>
  </span>
)

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGSAP()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 80%'
        }
      })
      tl.from('.hero-chip', { y: 10, opacity: 0, duration: 0.4 })
        .from('.hero-title', { y: 20, opacity: 0, duration: 0.6 }, '-=0.1')
        .from('.hero-desc', { y: 10, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.hero-cta', { y: 8, opacity: 0, duration: 0.4 }, '-=0.25')
        .from('.hero-visual', { scale: 0.9, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="hero-chip inline-block px-4 py-2 rounded-full border-2 border-gray-900 bg-white text-sm font-semibold">
            ✶ HELLO!
          </span>
          <h1 className="hero-title roboto-slab text-4xl sm:text-[40px] md:text-[58px] font-extrabold leading-tight text-gray-900">
            I'm Mansi Katariya,
            <br />
            <span className="relative inline-block">
              a full-stack developer
            </span>
          </h1>
          <p className="hero-desc quicksand text-[20px] text-gray-700 max-w-prose leading-relaxed">
            I'm a freelancer and full-stack developer who loves building clean, fast, and user-friendly web apps. I'm passionate about solving real problems and delivering reliable software.
          </p>
          <div className="hero-cta">
            <a
              href="#work"
              className="roboto-slab inline-flex items-center rounded-xl border-2 border-gray-900 bg-white px-8 py-4 font-semibold shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] transition-all"
            >
              See My Work
            </a>
          </div>
        </div>

        <div className="hero-visual relative flex items-center justify-center">
          {/* Main circular container */}
          <div className="relative w-[50%] aspect-square">
            {/* Large circular background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-200 via-violet-300 to-purple-300 border-2 border-gray-900"></div>
            
            {/* Rotating badge */}
            <div className="absolute -top-4 left-12 -translate-x-1/2 z-20">
              <div className="relative w-24 h-24 animate-spin" style={{ animationDuration: '10s' }}>
                {/* Circular badge background */}
                <div className="absolute inset-0 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[12px] font-bold fill-gray-900 uppercase tracking-wider">
                      <textPath href="#circlePath" startOffset="0%">
                        I AM AVAILABLE • FOR FREELANCE •
                      </textPath>
                    </text>
                  </svg>
                </div>
                {/* Arrow icon in center (counter-rotate to keep upright) */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spin 10s linear infinite reverse' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-900">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-8 right-8 animate-bounce" style={{ animationDuration: '3s' }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z" fill="#FFD700" stroke="#000" strokeWidth="1.5"/>
              </svg>
            </div>

            <div className="absolute top-20 -right-4 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <path d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z" fill="#FFD700" stroke="#000" strokeWidth="1.5"/>
              </svg>
            </div>

            {/* Wavy lines decoration */}
            <div className="absolute bottom-12 -right-8 z-10">
              <svg width="100" height="50" viewBox="0 0 120 60" fill="none">
                <path d="M0 30 Q 15 15, 30 30 T 60 30 T 90 30 T 120 30" stroke="#000" strokeWidth="2" fill="none"/>
                <path d="M0 40 Q 15 25, 30 40 T 60 40 T 90 40 T 120 40" stroke="#000" strokeWidth="2" fill="none"/>
                <path d="M0 50 Q 15 35, 30 50 T 60 50 T 90 50 T 120 50" stroke="#000" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            {/* Image container - positioned to show from waist up */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center overflow-hidden rounded-b-full">
              <img
                src="./mansi.png"
                alt="Mansi Katariya portrait"
                className="h-full z-40 scale-200 translate-y-10 -translate-x-3"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 grid place-items-center text-gray-700 p-4">
                  <span className="text-sm opacity-70 text-center">Add your PNG at public/mansi.png</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
