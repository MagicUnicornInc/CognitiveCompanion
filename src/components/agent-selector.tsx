import React, { useRef, useEffect } from 'react'
import { Brain, Code, Database, FileCode, Terminal, Wand2, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface Agent {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

const agents: Agent[] = [
  {
    id: 'code-expert',
    name: 'Code Expert',
    icon: <Code className="h-4 w-4" />,
    description: 'Specialized in code review and optimization'
  },
  {
    id: 'system-admin',
    name: 'System Admin',
    icon: <Terminal className="h-4 w-4" />,
    description: 'Expert in system administration and automation'
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    icon: <Database className="h-4 w-4" />,
    description: 'Specialized in data processing and analysis'
  },
  {
    id: 'full-stack',
    name: 'Full Stack Dev',
    icon: <FileCode className="h-4 w-4" />,
    description: 'Full stack development expert'
  },
  {
    id: 'ai-expert',
    name: 'AI Expert',
    icon: <Brain className="h-4 w-4" />,
    description: 'Specialized in AI and ML tasks'
  },
  {
    id: 'general',
    name: 'General Assistant',
    icon: <Wand2 className="h-4 w-4" />,
    description: 'Versatile general-purpose assistant'
  }
]

interface AgentSelectorProps {
  value: string
  onChange: (value: string) => void
}

export const AgentSelector: React.FC<AgentSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selectedAgent = agents.find(agent => agent.id === value)

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 justify-between"
      >
        <div className="flex items-center gap-2">
          {selectedAgent?.icon}
          <span>{selectedAgent?.name}</span>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "transform rotate-180"
        )} />
      </Button>
      <div className={cn(
        "absolute top-full left-0 mt-1 w-64 rounded-md border border-border bg-popover shadow-lg z-10",
        "transition-all duration-200 ease-in-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      )}>
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => {
              onChange(agent.id)
              setIsOpen(false)
            }}
            className={cn(
              "w-full px-3 py-2 text-sm text-left",
              "hover:bg-accent hover:text-accent-foreground",
              "transition-colors duration-200",
              "flex items-center gap-2",
              agent.id === value && "bg-accent"
            )}
          >
            {agent.icon}
            <div>
              <div>{agent.name}</div>
              <div className="text-xs text-muted-foreground">{agent.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
