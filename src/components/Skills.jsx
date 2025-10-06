const skills = [
  {
    group: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'GSAP', 'AOS'],
    bg: '#EAF6D6',
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'Spring Boot', 'REST'],
    bg: '#F6DAEB',
  },
  {
    group: 'Database',
    items: ['PostgreSQL', 'MongoDB', 'Mongoose'],
    bg: '#FCE9E1',
  },
  {
    group: 'Tools',
    items: ['Git', 'Docker', 'CI/CD', 'AWS', 'Postman'],
    bg: '#FFF5C2',
  },
]

function SkillPill({ label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-900/20 bg-white px-3 py-1.5 text-sm font-medium text-gray-900">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
      {label}
    </span>
  )
}

import { useEffect, useRef } from 'react'
import { ensureGSAP } from '../utils/anim'

export default function Skills() {
  const root = useRef(null)
  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGSAP()
    const ctx = gsap.context(() => {
      gsap.from('.skill-card', {
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-gray-900 bg-white text-sm font-semibold mb-6">
            ✦ SKILLS
          </span>
          <h2 className="roboto-slab text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            A modern full-stack toolkit
          </h2>
          <p className="quicksand text-gray-700 mt-4 text-lg">Clean, scalable, and production-ready.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map(({ group, items, bg }, idx) => (
            <div key={group} className="relative h-full group skill-card">
              <div 
                className="relative h-full rounded-3xl border-2 border-gray-900 backdrop-blur shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                style={{ backgroundColor: bg }}
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="roboto-slab text-xl font-bold text-gray-900">{group}</h3>
                    <span className="roboto-slab text-gray-900 font-bold text-xl">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                  </div>

                  <div className="quicksand flex flex-wrap gap-2">
                    {items.map((s) => (
                      <SkillPill key={s} label={s} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
