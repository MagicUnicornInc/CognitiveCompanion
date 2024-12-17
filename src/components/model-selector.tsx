import React, { useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface ModelSelectorProps {
  type: 'chat' | 'interpreter'
  value: string
  onChange: (value: string) => void
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ type, value, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const models = type === 'chat' 
    ? ['gpt-4', 'gpt-3.5-turbo', 'claude-2']
    : ['codellama', 'gpt-4', 'starcoder']

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
        <span>{value}</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "transform rotate-180"
        )} />
      </Button>
      <div className={cn(
        "absolute top-full left-0 mt-1 w-48 rounded-md border border-border bg-popover shadow-lg z-10",
        "transition-all duration-200 ease-in-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      )}>
        {models.map(model => (
          <button
            key={model}
            onClick={() => {
              onChange(model)
              setIsOpen(false)
            }}
            className={cn(
              "w-full px-3 py-2 text-sm text-left",
              "hover:bg-accent hover:text-accent-foreground",
              "transition-colors duration-200",
              model === value && "bg-accent"
            )}
          >
            {model}
          </button>
        ))}
      </div>
    </div>
  )
}
