// src/components/dashboard/TimesheetListView.tsx
'use client'

import { useState, useEffect } from 'react'
import { TimesheetEntry, Task } from '@/lib/types'

interface TimesheetListViewProps {
  selectedTimesheet: TimesheetEntry | null
  onAddTask: (task: Omit<Task, 'id'>) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (taskId: string) => void
}

export function TimesheetListView({ 
  selectedTimesheet, 
  onAddTask, 
  onEditTask, 
  onDeleteTask 
}: TimesheetListViewProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)

  // Mock tasks data based on the selected timesheet
  const mockTasks: Task[] = selectedTimesheet ? [
    { id: '1', date: '2025-09-21', projectName: 'Homepage Development', typeOfWork: 'Bug fixes', description: 'Fix layout issues', hours: 4, timesheetId: selectedTimesheet.id },
    { id: '2', date: '2025-09-22', projectName: 'Homepage Development', typeOfWork: 'Feature development', description: 'Add new feature', hours: 6, timesheetId: selectedTimesheet.id },
    { id: '3', date: '2025-09-23', projectName: 'Homepage Development', typeOfWork: 'Bug fixes', description: 'Resolve UI bugs', hours: 4, timesheetId: selectedTimesheet.id },
    { id: '4', date: '2025-09-24', projectName: 'Homepage Development', typeOfWork: 'Testing', description: 'Unit testing', hours: 3, timesheetId: selectedTimesheet.id },
    { id: '5', date: '2025-09-25', projectName: 'Homepage Development', typeOfWork: 'Documentation', description: 'Update docs', hours: 2, timesheetId: selectedTimesheet.id },
  ] : []

  useEffect(() => {
    if (selectedTimesheet) {
      setLoading(true)
      // Simulate fetching with mock data
      setTimeout(() => {
        setTasks(mockTasks)
        setLoading(false)
      }, 500) // Simulate loading delay
    } else {
      setTasks([])
    }
  }, [selectedTimesheet])

  const handleAddNewTask = (date: string) => {
    const newTask = {
      date,
      projectName: 'Homepage Development',
      typeOfWork: 'Bug fixes',
      description: 'New task description',
      hours: 4,
      timesheetId: selectedTimesheet?.id || ''
    }
    onAddTask(newTask)
  }

  const handleTaskAction = (taskId: string, action: 'edit' | 'delete') => {
    if (action === 'delete') {
      onDeleteTask(taskId)
      setTasks(tasks.filter(task => task.id !== taskId))
    } else if (action === 'edit') {
      setEditingTask(taskId)
    }
  }

  const getTotalHours = () => {
    return tasks.reduce((sum, task) => sum + task.hours, 0)
  }

  const getProgressPercentage = () => {
    const total = getTotalHours()
    return Math.min((total / 40) * 100, 100)
  }

  const groupTasksByDate = () => {
    const grouped: { [date: string]: Task[] } = {}
    tasks.forEach(task => {
      if (!grouped[task.date]) {
        grouped[task.date] = []
      }
      grouped[task.date].push(task)
    })
    return grouped
  }

  if (!selectedTimesheet) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No timesheet selected</h3>
          <p className="text-gray-500">Please select a timesheet from the table view to see the detailed task breakdown.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const groupedTasks = groupTasksByDate()
  const weekDates = [
    '2025-09-21', '2025-09-22', '2025-09-23', '2025-09-24', '2025-09-25'
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          This weeks timesheet
        </h2>
        <p className="text-sm text-gray-500 mb-4">{selectedTimesheet.dateRange}</p>
        
        {/* Progress Bar */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-3">
              <div
                className="bg-orange-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm font-medium text-gray-900">
            {getTotalHours()}/40 hrs
          </div>
          <div className="text-sm text-gray-500">
            {Math.round(getProgressPercentage())}%
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="px-6 py-4">
        {weekDates.map(date => {
          const dateObj = new Date(date)
          const dayName = dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })
          const dayTasks = groupedTasks[date] || []

          return (
            <div key={date} className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                {dayName}
              </h3>
              
              <div className="space-y-2">
                {dayTasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {task.projectName}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {task.description}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        {task.hours} hrs
                      </div>
                      <div className="text-xs text-blue-600 font-medium">
                        {task.typeOfWork}
                      </div>
                      
                      {/* Action Menu */}
                      <div className="relative">
                        <button
                          onClick={() => setEditingTask(editingTask === task.id ? null : task.id)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        
                        {editingTask === task.id && (
                          <div className="absolute right-0 mt-1 w-24 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                            <button
                              onClick={() => {
                                onEditTask(task)
                                setEditingTask(null)
                              }}
                              className="block w-full text-left px-3 py-1 text-xs text-blue-600 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                handleTaskAction(task.id, 'delete')
                                setEditingTask(null)
                              }}
                              className="block w-full text-left px-3 py-1 text-xs text-red-600 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New Task Button */}
                <button
                  onClick={() => handleAddNewTask(date)}
                  className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  + Add new task
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}