import React, { useEffect, useRef, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'

interface Agent {
  id: string
  name: string
  role: string
  color: string
  icon: string
}

const agents: Agent[] = [
  { id: 'rex', name: 'Rex', role: 'Orchestrator', color: '#10b981', icon: '🦖' },
  { id: 'blaze', name: 'Blaze', role: 'Implementer', color: '#f97316', icon: '🔥' },
  { id: 'morgan', name: 'Morgan', role: 'Architect', color: '#8b5cf6', icon: '📐' },
  { id: 'sentinel', name: 'Sentinel', role: 'Security', color: '#ef4444', icon: '🛡️' },
  { id: 'pixel', name: 'Pixel', role: 'Frontend', color: '#06b6d4', icon: '🎨' },
  { id: 'echo', name: 'Echo', role: 'QA', color: '#eab308', icon: '🔍' },
]

export const AgentVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeAgent, setActiveAgent] = useState(0)
  const [mounted, setMounted] = useState(false)
  const activeLineRef = useRef<SVGLineElement>(null)

  const radius = 55
  const centerX = 90
  const centerY = 70

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initial animation on mount
  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const agentNodes = containerRef.current.querySelectorAll('.agent-node')
    const hub = containerRef.current.querySelector('.hub')

    // Animate hub first
    anime({
      targets: hub,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutElastic(1, 0.5)',
    })

    // Then stagger in agent nodes from center
    anime({
      targets: agentNodes,
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(100, { from: 'center' }),
      duration: 800,
      easing: 'easeOutElastic(1, 0.6)',
    })
  }, [mounted])

  // Rotating active agent with pulse
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [mounted])

  // Pulse animation for active agent
  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const activeNode = containerRef.current.querySelector(`.agent-node-${activeAgent}`)
    if (!activeNode) return

    anime({
      targets: activeNode,
      scale: [1, 1.15, 1],
      duration: 600,
      easing: 'easeInOutQuad',
    })

    // Animate connection line from hub to active agent
    if (activeLineRef.current) {
      const angle = (activeAgent * 60 - 90) * (Math.PI / 180)
      const endX = centerX + radius * Math.cos(angle)
      const endY = centerY + radius * Math.sin(angle)

      anime({
        targets: activeLineRef.current,
        x2: endX,
        y2: endY,
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1, 1, 0],
        duration: 1500,
        easing: 'easeInOutSine',
      })
    }
  }, [activeAgent, mounted])

  // Hub breathing animation
  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const hub = containerRef.current.querySelector('.hub')
    
    anime({
      targets: hub,
      boxShadow: [
        '0 0 0 0 rgba(16, 185, 129, 0)',
        '0 0 30px 15px rgba(16, 185, 129, 0.4)',
        '0 0 0 0 rgba(16, 185, 129, 0)',
      ],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine',
    })
  }, [mounted])

  // Orbit ring pulse
  useEffect(() => {
    if (!mounted || !svgRef.current) return

    const rings = svgRef.current.querySelectorAll('.orbit-ring')
    
    anime({
      targets: rings,
      opacity: [0.1, 0.3, 0.1],
      strokeWidth: [1, 2, 1],
      duration: 3000,
      delay: anime.stagger(500),
      loop: true,
      easing: 'easeInOutSine',
    })
  }, [mounted])

  if (!mounted) return <div className="w-[180px] h-[160px]" />

  return (
    <div ref={containerRef} className="relative w-[180px] h-[160px]">
      {/* SVG for connection lines and orbit rings */}
      <svg ref={svgRef} className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        {/* Orbit rings */}
        <circle
          className="orbit-ring"
          cx={centerX}
          cy={centerY}
          r={radius - 10}
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.1"
        />
        <circle
          className="orbit-ring"
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.2"
        />
        <circle
          className="orbit-ring"
          cx={centerX}
          cy={centerY}
          r={radius + 10}
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.1"
        />
        
        {/* Active connection line */}
        <line
          ref={activeLineRef}
          x1={centerX}
          y1={centerY}
          x2={centerX}
          y2={centerY}
          stroke={agents[activeAgent].color}
          strokeWidth="2"
          strokeDasharray="5 5"
          opacity="0"
        />

        {/* Data particles traveling on path */}
        {[0, 1, 2].map((i) => {
          const angle = (activeAgent * 60 - 90) * (Math.PI / 180)
          const endX = centerX + radius * Math.cos(angle)
          const endY = centerY + radius * Math.sin(angle)
          
          return (
            <circle
              key={i}
              className={`data-particle-${activeAgent}-${i}`}
              cx={centerX}
              cy={centerY}
              r="2"
              fill={agents[activeAgent].color}
              opacity="0"
            >
              <animate
                attributeName="cx"
                from={centerX}
                to={endX}
                dur="1s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from={centerY}
                to={endY}
                dur="1s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="1s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          )
        })}
      </svg>

      {/* Center hub */}
      <div
        className="hub absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 flex items-center justify-center border-2 border-emerald-300/30"
        style={{ opacity: 0 }}
      >
        <span className="text-xs font-bold text-white drop-shadow-lg">CTO</span>
      </div>

      {/* Agent nodes in a circle */}
      {agents.map((agent, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180)
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        const isActive = activeAgent === i
        
        return (
          <div
            key={agent.id}
            className={`agent-node agent-node-${i} absolute`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: 0,
            }}
          >
            <div className="relative flex flex-col items-center gap-1">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 bg-zinc-900/90 backdrop-blur-sm transition-all duration-300"
                style={{ 
                  borderColor: agent.color,
                  boxShadow: isActive ? `0 0 20px ${agent.color}60` : 'none',
                }}
              >
                {agent.icon}
              </div>
              <span 
                className="text-[10px] font-medium transition-colors duration-300"
                style={{ color: isActive ? agent.color : '#71717a' }}
              >
                {agent.name}
              </span>
              
              {/* Role badge on active */}
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `translate(-50%, ${isActive ? '0' : '5px'})`,
                }}
              >
                <span 
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${agent.color}25`, color: agent.color }}
                >
                  {agent.role}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AgentVisualizer

