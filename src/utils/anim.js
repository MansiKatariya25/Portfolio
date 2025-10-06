import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false
export function ensureGSAP() {
  if (!registered) {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }
    registered = true
  }
  return { gsap, ScrollTrigger }
}

export { gsap, ScrollTrigger }

