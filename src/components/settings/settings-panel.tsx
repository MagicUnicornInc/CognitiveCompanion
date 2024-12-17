import React from 'react'
import { useSettings } from '@/store/settings'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'

export const SettingsPanel = () => {
  const { theme, setTheme } = useSettings()

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Theme</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Model Settings */}
        <div>
          <h3 className="text-sm font-medium mb-2">Model Settings</h3>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-muted-foreground">Temperature</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                className="w-full accent-primary bg-muted"
              />
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div>
          <h3 className="text-sm font-medium mb-2">API Configuration</h3>
          <input
            type="password"
            className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Enter API key"
          />
        </div>
      </div>
    </div>
  )
}
