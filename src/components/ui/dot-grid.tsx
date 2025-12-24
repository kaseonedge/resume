import React, { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'

interface DotGridProps {
  rows?: number
  cols?: number
  dotSize?: number
  gap?: number
  color?: string
  interactive?: boolean
}

export const DotGrid: React.FC<DotGridProps> = ({
  rows = 12,
  cols = 20,
  dotSize = 3,
  gap = 24,
  color = '#10b981',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const dots = containerRef.current.querySelectorAll('.dot')
    
    // Initial staggered fade in from center
    animate(dots, {
      scale: [0, 1],
      opacity: [0, 0.3],
      delay: stagger(30, { grid: [cols, rows], from: 'center' }),
      duration: 800,
      ease: 'outElastic(1, 0.5)',
    })

    // Ambient pulse animation
    animationRef.current = animate(dots, {
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.6, 0.3],
      delay: stagger(100, { grid: [cols, rows], from: 'center' }),
      loop: true,
      duration: 1600,
      ease: 'inOutSine',
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.pause()
      }
    }
  }, [mounted, rows, cols])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const maxDistance = 150

    const dots = containerRef.current.querySelectorAll('.dot')
    
    // Animate each dot based on distance from cursor
    dots.forEach((dot) => {
      const dotRect = dot.getBoundingClientRect()
      const dotX = dotRect.left - rect.left + dotRect.width / 2
      const dotY = dotRect.top - rect.top + dotRect.height / 2
      const distance = Math.sqrt(Math.pow(x - dotX, 2) + Math.pow(y - dotY, 2))
      
      const scale = distance < maxDistance ? Math.max(1, 2 - distance / maxDistance) : 1
      const opacity = distance < maxDistance ? 0.8 : 0.3
      
      animate(dot, {
        scale,
        opacity,
        duration: 300,
        ease: 'outQuad',
      })
    })
  }

  const handleMouseLeave = () => {
    if (!interactive || !containerRef.current) return

    const dots = containerRef.current.querySelectorAll('.dot')
    
    animate(dots, {
      scale: 1,
      opacity: 0.3,
      duration: 600,
      ease: 'outQuad',
    })
  }

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 0 }}
    >
      <div
        className="grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${gap}px)`,
          gridTemplateRows: `repeat(${rows}, ${gap}px)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div
            key={i}
            className="dot flex items-center justify-center"
            style={{ width: gap, height: gap }}
          >
            <div
              className="rounded-full"
              style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
                boxShadow: `0 0 ${dotSize * 2}px ${color}40`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DotGrid

