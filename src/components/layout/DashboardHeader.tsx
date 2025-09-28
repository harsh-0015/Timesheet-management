// src/components/layout/DashboardHeader.tsx
'use client'

import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

interface DashboardHeaderProps {
  activeView: 'table' | 'list'
  onViewChange: (view: 'table' | 'list') => void
}

export function DashboardHeader({ activeView, onViewChange }: DashboardHeaderProps) {
  const { data: session } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">ticktock</h1>
          
          {/* Navigation Tabs */}
          <nav className="flex space-x-8">
            <button
              onClick={() => onViewChange('table')}
              className={`px-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeView === 'table'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Timesheets
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`px-1 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeView === 'list'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              List View
            </button>
          </nav>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
              {session?.user?.name?.charAt(0) || 'U'}
            </div>
            <span>{session?.user?.name || 'User'}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                {session?.user?.email}
              </div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}