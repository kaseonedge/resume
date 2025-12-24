import React, { useState, useEffect } from 'react'

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
  const [activeAgent, setActiveAgent] = useState(0)

  const radius = 55
  const centerX = 90
  const centerY = 70

  // Rotate active agent
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-[180px] h-[160px]">
      {/* SVG for orbit rings */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        {/* Orbit rings with pulse animation */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius - 10}
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.1"
          className="animate-pulse"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.2"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 10}
          fill="none"
          stroke="#10b981"
          strokeWidth="1"
          opacity="0.1"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Connection line to active agent */}
        {(() => {
          const angle = (activeAgent * 60 - 90) * (Math.PI / 180)
          const endX = centerX + radius * Math.cos(angle)
          const endY = centerY + radius * Math.sin(angle)
          return (
            <line
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke={agents[activeAgent].color}
              strokeWidth="2"
              strokeDasharray="5 5"
              opacity="0.6"
              className="transition-all duration-500"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="10"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          )
        })()}

        {/* Data particles */}
        {[0, 1, 2].map((i) => {
          const angle = (activeAgent * 60 - 90) * (Math.PI / 180)
          const endX = centerX + radius * Math.cos(angle)
          const endY = centerY + radius * Math.sin(angle)
          
          return (
            <circle
              key={i}
              r="2"
              fill={agents[activeAgent].color}
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

      {/* Center hub with breathing animation */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 flex items-center justify-center border-2 border-emerald-300/30 animate-pulse"
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
            className="absolute transition-all duration-300"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
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
