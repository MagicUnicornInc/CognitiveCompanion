import React from 'react'

interface SplitViewProps {
  left: React.ReactNode
  right: React.ReactNode
}

export const SplitView: React.FC<SplitViewProps> = ({ left, right }) => {
  return (
    <div className="flex-1 flex">
      <div className="flex-1 border-r border-gray-200">{left}</div>
      <div className="flex-1">{right}</div>
    </div>
  )
}
