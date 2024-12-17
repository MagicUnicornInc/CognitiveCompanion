import { ChatInterface } from './components/chat/chat-interface'
import { TerminalInterface } from './components/terminal/terminal-interface'
import { SettingsPanel } from './components/settings/settings-panel'
import { ModelSelector } from './components/model-selector'
import { AgentSelector } from './components/agent-selector'
import { useSettings } from './store/settings'
import { Settings, Terminal, X } from 'lucide-react'
import { Button } from './components/ui/button'
import { cn } from './lib/utils'
import { useEffect } from 'react'

function App() {
  const { 
    chatAssistant, 
    interpreter,
    theme,
    isTerminalVisible,
    isSettingsPanelVisible,
    setChatModel, 
    setInterpreterModel,
    setChatAgent,
    setInterpreterAgent,
    toggleTerminal,
    toggleSettings
  } = useSettings()

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Ctrl/Cmd + J to toggle terminal
      if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
        e.preventDefault()
        toggleTerminal()
      }
      // Ctrl/Cmd + , to toggle settings
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault()
        toggleSettings()
      }
    }
    
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [toggleTerminal, toggleSettings])

  return (
    <div className={cn(
      "flex h-screen",
      "bg-background text-foreground"
    )}>
      <main className="flex-1 flex">
        {/* Chat Section - Always Visible */}
        <div className={cn(
          "flex flex-col",
          "transition-all duration-300 ease-in-out",
          isTerminalVisible ? "w-1/2" : "flex-1"
        )}>
          <div className="flex items-center justify-between border-b border-border p-2">
            <div className="flex gap-2">
              <ModelSelector
                type="chat"
                value={chatAssistant.model}
                onChange={setChatModel}
              />
              <AgentSelector
                value={chatAssistant.agent}
                onChange={setChatAgent}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTerminal}
                className={cn(
                  "hover:bg-accent",
                  isTerminalVisible && "bg-accent"
                )}
                title="Toggle Terminal (Ctrl/Cmd + J)"
              >
                <Terminal className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSettings}
                className={cn(
                  "hover:bg-accent",
                  isSettingsPanelVisible && "bg-accent"
                )}
                title="Toggle Settings (Ctrl/Cmd + ,)"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ChatInterface />
        </div>

        {/* Terminal Section - Collapsible */}
        <div className={cn(
          "border-l border-border",
          "transition-all duration-300 ease-in-out",
          isTerminalVisible ? "w-1/2 opacity-100" : "w-0 opacity-0 overflow-hidden"
        )}>
          <div className="flex items-center justify-between border-b border-border p-2">
            <div className="flex gap-2">
              <ModelSelector
                type="interpreter"
                value={interpreter.model}
                onChange={setInterpreterModel}
              />
              <AgentSelector
                value={interpreter.agent}
                onChange={setInterpreterAgent}
              />
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTerminal}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <TerminalInterface />
        </div>
      </main>

      {/* Settings Panel - Collapsible */}
      <aside className={cn(
        "border-l border-border bg-card",
        "transition-all duration-300 ease-in-out",
        isSettingsPanelVisible ? "w-80" : "w-0 opacity-0 overflow-hidden"
      )}>
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Settings</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSettings}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <SettingsPanel />
      </aside>
    </div>
  )
}

export default App
