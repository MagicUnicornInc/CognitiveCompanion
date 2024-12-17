import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ModelSettings {
  model: string
  temperature: number
  preset: string
  agent: string
}

interface SettingsState {
  chatAssistant: ModelSettings
  interpreter: ModelSettings
  theme: 'light' | 'dark'
  isTerminalVisible: boolean
  isSettingsPanelVisible: boolean
  setChatModel: (model: string) => void
  setInterpreterModel: (model: string) => void
  setChatAgent: (agent: string) => void
  setInterpreterAgent: (agent: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTerminal: () => void
  toggleSettings: () => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      chatAssistant: {
        model: 'gpt-4',
        temperature: 0.7,
        preset: 'code-expert',
        agent: 'general'
      },
      interpreter: {
        model: 'codellama',
        temperature: 0.3,
        preset: 'safe-mode',
        agent: 'code-expert'
      },
      theme: 'dark',
      isTerminalVisible: false,
      isSettingsPanelVisible: false,
      setChatModel: (model) => 
        set((state) => ({ 
          chatAssistant: { ...state.chatAssistant, model } 
        })),
      setInterpreterModel: (model) => 
        set((state) => ({ 
          interpreter: { ...state.interpreter, model } 
        })),
      setChatAgent: (agent) =>
        set((state) => ({
          chatAssistant: { ...state.chatAssistant, agent }
        })),
      setInterpreterAgent: (agent) =>
        set((state) => ({
          interpreter: { ...state.interpreter, agent }
        })),
      setTheme: (theme) => set({ theme }),
      toggleTerminal: () => 
        set((state) => ({ 
          isTerminalVisible: !state.isTerminalVisible 
        })),
      toggleSettings: () => 
        set((state) => ({ 
          isSettingsPanelVisible: !state.isSettingsPanelVisible 
        }))
    }),
    {
      name: 'settings-storage'
    }
  )
)
