import { useEffect, useRef, useState } from 'react'
import { ensureGSAP } from '../utils/anim'

const steps = [
  {
    n: '01.',
    title: 'Research & Ideation',
    desc: 'I start by understanding your brand, audience, and goals — gathering insights and sparking ideas that shape the foundation.',
    bg: '#EAF6D6',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    n: '02.',
    title: 'Concept Development',
    desc: 'I start by understanding your brand, audience, and goals gathering insights and sparking ideas that will shape the foundation of the design.',
    bg: '#F6DAEB',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="14" rx="2"/>
        <path d="M8 21h8"/>
        <path d="M12 17v4"/>
        <path d="M8 7h8M8 11h6"/>
      </svg>
    )
  },
  {
    n: '03.',
    title: 'Prototyping & Testing',
    desc: 'I start by understanding your brand, audience, and goals gathering insights and sparking ideas that will shape the foundation of the design.',
    bg: '#FCE9E1',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    )
  },
  {
    n: '04.',
    title: 'Finalize Product',
    desc: 'I start by understanding your brand, audience, and goals gathering insights and sparking ideas that will shape the foundation of the design.',
    bg: '#FFF5C2',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none" strokeWidth="1.5">
        <path d="M20 7h-3a2 2 0 0 1-2-2V2"/>
        <path d="M9 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-1"/>
        <circle cx="12" cy="16" r="2"/>
      </svg>
    )
  },
]

function ProcessCard({ step, index }) {
  return (
    <div className="group">
      <div 
        className="rounded-3xl border-2 border-gray-900 shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 h-full"
        style={{ backgroundColor: step.bg }}
      >
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <div className="grid place-items-center w-16 h-16 rounded-full border-2 border-gray-900 bg-white">
              <div className="text-gray-900">
                {step.icon}
              </div>
            </div>
            <span className="text-gray-900 font-bold text-xl roboto-slab">{step.n}</span>
          </div>
          <h3 className="roboto-slab text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
          <p className="quicksand text-gray-800 text-sm leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  const root = useRef(null)
  useEffect(() => {
    const { gsap } = ensureGSAP()
    const ctx = gsap.context(() => {
      gsap.from('.process-card', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-gray-900 bg-white text-sm font-semibold mb-6">
            ✦ PROCESS
          </span>
          <h2 className="roboto-slab text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            My workflow is centered around being highly productive.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="process-card"><ProcessCard step={step} index={index} /></div>
          ))}
        </div>
      </div>
    </div>
  )
}
