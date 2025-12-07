import { gsap } from 'gsap'

export const animateTaskMove = (element) => {
  gsap.fromTo(element,
    { scale: 0.8, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
  )
}

export const animateColumnHighlight = (element) => {
  gsap.to(element, {
    backgroundColor: 'rgba(66, 153, 225, 0.1)',
    duration: 0.2,
    yoyo: true,
    repeat: 1
  })
}