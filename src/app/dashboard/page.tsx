// src/app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { TimesheetTableView } from '@/components/dashboard/TimesheetTableView'
import { TimesheetListView } from '@/components/dashboard/TimesheetListView'
import { TaskModal } from '@/components/dashboard/TaskModal'
import { TimesheetEntry, Task, CreateTaskRequest } from '@/lib/types'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeView, setActiveView] = useState<'table' | 'list'>('table')
  const [selectedTimesheet, setSelectedTimesheet] = useState<TimesheetEntry | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [modalDefaultDate, setModalDefaultDate] = useState<string>('')

  useEffect(() => {
    if (status === 'loading') return // Still loading
    if (!session) {
      router.push('/login')
      return
    }
  }, [session, status, router])

  const handleSelectTimesheet = (timesheet: TimesheetEntry) => {
    setSelectedTimesheet(timesheet)
    setActiveView('list')
  }

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    setEditingTask(null)
    setModalDefaultDate(taskData.date)
    setIsModalOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        // Task deleted successfully
        // The list view component will handle removing it from the UI
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Failed to delete task. Please try again.')
    }
  }

  const handleSubmitTask = async (taskData: CreateTaskRequest) => {
    try {
      const method = editingTask ? 'PUT' : 'POST'
      const body = editingTask 
        ? { ...taskData, id: editingTask.id }
        : taskData

      const response = await fetch('/api/tasks', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      
      if (data.success) {
        // Task saved successfully
        setIsModalOpen(false)
        setEditingTask(null)
        // You might want to refresh the data or update the UI
      } else {
        throw new Error(data.error || 'Failed to save task')
      }
    } catch (error) {
      console.error('Error saving task:', error)
      alert('Failed to save task. Please try again.')
    }
  }

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If no session, don't render the dashboard (redirect will happen)
  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeView === 'table' ? (
          <TimesheetTableView onSelectTimesheet={handleSelectTimesheet} />
        ) : (
          <TimesheetListView
            selectedTimesheet={selectedTimesheet}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTask(null)
        }}
        onSubmit={handleSubmitTask}
        task={editingTask}
        timesheetId={selectedTimesheet?.id || ''}
        defaultDate={modalDefaultDate}
      />
    </div>
  )
}