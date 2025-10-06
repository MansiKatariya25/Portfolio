import { useEffect, useRef } from 'react'
import { ensureGSAP } from '../utils/anim'

export default function Loader({ onDone }) {
  const root = useRef(null)

  useEffect(() => {
    const { gsap } = ensureGSAP()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' }
      })
      tl.from('.loader-mark', { y: 20, opacity: 0, duration: 0.6 })
        .from('.loader-dots > span', { opacity: 0, scale: 0, stagger: 0.15, duration: 0.4 }, '-=0.2')
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Failsafe auto-complete if parent doesn't hide manually
    const timer = setTimeout(() => onDone?.(), 1800)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div ref={root} className="fixed inset-0 z-[99999] grid place-items-center bg-white">
      <div className="text-center">
        <div className="loader-mark text-3xl md:text-4xl font-extrabold logo text-gray-900">Mansi</div>
        <div className="loader-dots mt-4 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-900"></span>
          <span className="h-2 w-2 rounded-full bg-gray-900"></span>
          <span className="h-2 w-2 rounded-full bg-gray-900"></span>
        </div>
      </div>
    </div>
  )
}

