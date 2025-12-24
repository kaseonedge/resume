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

    const getTransform = () => {
      switch (direction) {
        case 'up':
          return { translateY: [50, 0] }
        case 'down':
          return { translateY: [-50, 0] }
        case 'left':
          return { translateX: [50, 0] }
        case 'right':
          return { translateX: [-50, 0] }
        case 'scale':
          return { scale: [0.8, 1] }
        default:
          return { translateY: [50, 0] }
      }
    }

    animate(ref.current, {
      ...getTransform(),
      opacity: [0, 1],
      duration,
      delay,
      ease: 'outExpo',
    })
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

    const getTransform = () => {
      switch (direction) {
        case 'up':
          return { translateY: [30, 0] }
        case 'down':
          return { translateY: [-30, 0] }
        case 'left':
          return { translateX: [30, 0] }
        case 'right':
          return { translateX: [-30, 0] }
        case 'scale':
          return { scale: [0.9, 1] }
        default:
          return { translateY: [30, 0] }
      }
    }

    animate(items, {
      ...getTransform(),
      opacity: [0, 1],
      duration,
      delay: stagger(staggerDelay),
      ease: 'outExpo',
    })
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

