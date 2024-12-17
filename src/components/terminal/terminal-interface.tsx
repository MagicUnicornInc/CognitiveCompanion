import React from 'react'
import { Button } from '../ui/button'
import { Folder, Send } from 'lucide-react'

export const TerminalInterface = () => {
  const [command, setCommand] = React.useState('')
  const [history, setHistory] = React.useState<string[]>([])
  const terminalRef = React.useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    setHistory(prev => [...prev, `$ ${command}`, 'Command output will appear here...'])
    setCommand('')
    
    // Scroll to bottom
    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }

  const handleFileSelect = async () => {
    // In a real implementation, this would use a file picker
    // For now, we'll just simulate it
    const path = '/path/to/selected/folder'
    setCommand(prev => prev + ' ' + path)
  }

  return (
    <div className="flex flex-col h-[calc(100%-2.5rem)] bg-black text-green-400">
      <div 
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm overflow-auto"
      >
        {history.map((line, i) => (
          <div key={i} className="opacity-90 whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
      <div className="border-t border-gray-800 p-2">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <span className="flex items-center text-green-400">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-green-400"
            placeholder="Enter command..."
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            className="hover:bg-gray-800"
            onClick={handleFileSelect}
          >
            <Folder className="h-4 w-4 text-green-400" />
          </Button>
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon"
            className="hover:bg-gray-800"
            disabled={!command.trim()}
          >
            <Send className="h-4 w-4 text-green-400" />
          </Button>
        </form>
      </div>
    </div>
  )
}
