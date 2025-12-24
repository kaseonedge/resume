import React, { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  className?: string
  threshold?: number
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 800,
  direction = 'up',
  className = '',
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  useEffect(() => {
    if (!isVisible || !ref.current) return

    const baseParams = {
      opacity: [0, 1],
      duration,
      delay,
      ease: 'outExpo' as const,
    }

    switch (direction) {
      case 'up':
        animate(ref.current, { ...baseParams, translateY: [50, 0] })
        break
      case 'down':
        animate(ref.current, { ...baseParams, translateY: [-50, 0] })
        break
      case 'left':
        animate(ref.current, { ...baseParams, translateX: [50, 0] })
        break
      case 'right':
        animate(ref.current, { ...baseParams, translateX: [-50, 0] })
        break
      case 'scale':
        animate(ref.current, { ...baseParams, scale: [0.8, 1] })
        break
      default:
        animate(ref.current, { ...baseParams, translateY: [50, 0] })
    }
  }, [isVisible, delay, duration, direction])

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  )
}

// Staggered reveal for multiple children
interface StaggerRevealProps {
  children: React.ReactNode[]
  staggerDelay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  className?: string
  childClassName?: string
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  staggerDelay = 100,
  duration = 800,
  direction = 'up',
  className = '',
  childClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !containerRef.current) return

    const items = containerRef.current.querySelectorAll('.stagger-item')

    const baseParams = {
      opacity: [0, 1],
      duration,
      delay: stagger(staggerDelay),
      ease: 'outExpo' as const,
    }

    switch (direction) {
      case 'up':
        animate(items, { ...baseParams, translateY: [30, 0] })
        break
      case 'down':
        animate(items, { ...baseParams, translateY: [-30, 0] })
        break
      case 'left':
        animate(items, { ...baseParams, translateX: [30, 0] })
        break
      case 'right':
        animate(items, { ...baseParams, translateX: [-30, 0] })
        break
      case 'scale':
        animate(items, { ...baseParams, scale: [0.9, 1] })
        break
      default:
        animate(items, { ...baseParams, translateY: [30, 0] })
    }
  }, [isVisible, staggerDelay, duration, direction])

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={`stagger-item ${childClassName}`} style={{ opacity: 0 }}>
          {child}
        </div>
      ))}
    </div>
  )
}

export default ScrollReveal
