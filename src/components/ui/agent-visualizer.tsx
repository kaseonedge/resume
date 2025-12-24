import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const AgentNode: React.FC<{ agent: Agent; isActive: boolean; delay: number }> = ({ 
  agent, 
  isActive,
  delay 
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: isActive ? 1.1 : 1, 
      opacity: 1,
    }}
    transition={{ 
      delay,
      duration: 0.3,
      scale: { duration: 0.2 }
    }}
    className="relative"
  >
    <motion.div
      animate={isActive ? {
        boxShadow: [
          `0 0 0 0 ${agent.color}00`,
          `0 0 20px 10px ${agent.color}40`,
          `0 0 0 0 ${agent.color}00`,
        ]
      } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="flex flex-col items-center gap-1"
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 bg-zinc-900/80 backdrop-blur-sm"
        style={{ borderColor: agent.color }}
      >
        {agent.icon}
      </div>
      <span className="text-[10px] font-medium text-zinc-400">{agent.name}</span>
    </motion.div>
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <span 
          className="text-[9px] px-1.5 py-0.5 rounded-full"
          style={{ backgroundColor: `${agent.color}20`, color: agent.color }}
        >
          {agent.role}
        </span>
      </motion.div>
    )}
  </motion.div>
)

const ConnectionLine: React.FC<{ from: number; to: number; isActive: boolean }> = ({ 
  from, 
  to, 
  isActive 
}) => {
  const centerX = 90
  const centerY = 70
  const radius = 55
  
  const fromAngle = (from * 60 - 90) * (Math.PI / 180)
  const toAngle = (to * 60 - 90) * (Math.PI / 180)
  
  const fromX = centerX + radius * Math.cos(fromAngle)
  const fromY = centerY + radius * Math.sin(fromAngle)
  const toX = centerX + radius * Math.cos(toAngle)
  const toY = centerY + radius * Math.sin(toAngle)

  return (
    <motion.line
      x1={fromX}
      y1={fromY}
      x2={toX}
      y2={toY}
      stroke={isActive ? "#10b981" : "#27272a"}
      strokeWidth={isActive ? 2 : 1}
      strokeDasharray={isActive ? "0" : "4 4"}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    />
  )
}

export const AgentVisualizer: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState(0)
  const [connections, setConnections] = useState<[number, number][]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length)
      setConnections((prev) => {
        const newConn: [number, number] = [
          Math.floor(Math.random() * 6),
          Math.floor(Math.random() * 6),
        ]
        return [...prev.slice(-3), newConn]
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const radius = 55
  const centerX = 90
  const centerY = 70

  return (
    <div className="relative w-[180px] h-[160px]">
      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(([from, to], i) => (
          <ConnectionLine
            key={`${from}-${to}-${i}`}
            from={from}
            to={to}
            isActive={i === connections.length - 1}
          />
        ))}
      </svg>

      {/* Center hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(16, 185, 129, 0)',
            '0 0 30px 15px rgba(16, 185, 129, 0.3)',
            '0 0 0 0 rgba(16, 185, 129, 0)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-bold text-white">CTO</span>
      </motion.div>

      {/* Agent nodes in a circle */}
      {agents.map((agent, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180)
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        
        return (
          <div
            key={agent.id}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <AgentNode 
              agent={agent} 
              isActive={activeAgent === i} 
              delay={i * 0.1}
            />
          </div>
        )
      })}
    </div>
  )
}

export default AgentVisualizer

