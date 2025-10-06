import { useEffect, useRef, useState } from 'react'
import { ensureGSAP } from '../utils/anim'

const TECH = {
  react: { slug: 'react', label: 'React', color: '61DAFB' },
  nodedotjs: { slug: 'nodedotjs', label: 'Node.js', color: '339933' },
  express: { slug: 'express', label: 'Express', color: '000000' },
  mongodb: { slug: 'mongodb', label: 'MongoDB', color: '47A248' },
  springboot: { slug: 'springboot', label: 'Spring Boot', color: '6DB33F' },
  tailwind: { slug: 'tailwindcss', label: 'Tailwind CSS', color: '06B6D4' },
}

const projects = [
  {
    title: 'Aspire Connect',
    desc: 'A web platform that connects users with mentors, provides location-based job listings, and offers AI-powered mock interviews with an interactive community section.',
    image: 'aspire.png',
    link: 'https://aspire-connect-woad.vercel.app/',
    stack: ['react','tailwind', 'nodedotjs', 'springboot', 'mongodb'],
  },
  {
    title: 'Video Proctoring System',
    desc: 'An AI-powered MERN application that detects candidate distractions and suspicious activities (phones, books, multiple faces) in real time using Mediapipe, generating integrity reports for interviewers.',
    image: 'video.png',
    link: 'https://video-proctor-two.vercel.app/',
    stack: ['mongodb', 'express', 'react', 'nodedotjs', 'tailwind'],
  },
  {
    title: 'Manju Surgikraft',
    desc: 'A responsive full-stack website for a medical instruments manufacturer to showcase and manage products with a secure admin panel for easy product updates and organization.',
    image: 'surgi.png',
    link: 'https://manju-surgikraft.vercel.app/',
    stack: ['mongodb', 'express', 'react', 'nodedotjs', 'tailwind'],
  },
  {
    title: 'Real time Code Editor',
    desc: 'A collaborative coding platform built with React, Node.js, and Express-ws, allowing multiple users to code simultaneously with syntax highlighting and secure session management using MongoDB.',
    image: 'code.png',
    link: 'https://code-editor-ashy-gamma.vercel.app/',
    stack: ['mongodb', 'express', 'react', 'nodedotjs', 'tailwind'],
  },
  {
    title: 'Foodieland',
    desc: 'Built a recipe web app with user authentication, detailed recipes, cooking times, and nutrition info, featuring an intuitive UI for seamless navigation.',
    image: 'food.png',
    link: 'https://foodieland-1w6r.vercel.app/',
    stack: ['mongodb', 'express', 'react', 'nodedotjs', 'tailwind'],
  },
]

// Build-safe URL to public/ assets that respects Vite base path
const publicUrl = (path) => {
  const base = import.meta.env.BASE_URL || '/'
  const b = base.endsWith('/') ? base.slice(0, -1) : base
  const p = path.startsWith('/') ? path : `/${path}`
  return `${b}${p}`
}

export default function Work() {
  const [hover, setHover] = useState({ active: false, link: null })
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const root = useRef(null)

  useEffect(() => {
    const { gsap } = ensureGSAP()
    const ctx = gsap.context(() => {
      gsap.from('.work-head', { y: 10, opacity: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
      gsap.from('.work-item', { y: 24, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12, scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  const openLive = (url) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div ref={root} className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16 work-head">
        <span className="inline-block px-4 py-1 rounded-full border border-gray-800 bg-white text-sm font-medium mb-6">
          ✦ MY WORKS
        </span>
        <h2 className="roboto-slab text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Check out some of my awesome<br />
          projects with creative ideas.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {projects.map((p) => (
          <article key={p.title} className="flex flex-col work-item">
            <div className="rounded-3xl border-2 border-gray-900 overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div
                className={`aspect-[3/2] bg-gradient-to-br from-violet-200 to-violet-300 relative ${
                  hover.active && hover.link === p.link ? 'cursor-none' : 'cursor-pointer'
                }`}
                onMouseEnter={() => setHover({ active: true, link: p.link })}
                onMouseLeave={() => setHover({ active: false, link: null })}
                onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
                onClick={() => openLive(p.link)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLive(p.link)
                  }
                }}
              >
                <img
                  src={publicUrl(p.image)}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover z-20"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <h3 className="text-2xl font-bold text-gray-900 roboto-slab">{p.title}</h3>
                {p.stack && (
                  <div className="flex items-center gap-2">
                    {p.stack.map((key) => {
                      const info = TECH[key]
                      if (!info) return null
                      const url = `https://cdn.simpleicons.org/${info.slug}/${info.color}`
                      return (
                        <img
                          key={key}
                          src={url}
                          alt={info.label}
                          title={info.label}
                          className="h-7 w-7 shrink-0"
                          loading="lazy"
                        />
                      )
                    })}
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-base leading-relaxed quicksand">{p.desc}</p>
            </div>
          </article>
        ))}
      </div>

      {hover.active && (
        <div
          className="pointer-events-none fixed z-[9999]"
          style={{ left: `${cursor.x}px`, top: `${cursor.y}px`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="h-20 w-20 rounded-full bg-sky-100/90 border-2 border-gray-900 flex items-center justify-center shadow-md">
            <span className="text-[10px] font-bold text-gray-900 tracking-wide uppercase text-center px-2 leading-tight">
              Live Preview
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
