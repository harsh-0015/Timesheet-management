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
  const [tasks, setTasks] = useState<Task[]>([])

  // Load tasks from localStorage after component mounts (client-side only)
  useEffect(() => {
    const savedTasks = localStorage.getItem(`tasks_${selectedTimesheet?.id || 'default'}`)
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    } else {
      setTasks([])
    }
  }, [selectedTimesheet?.id])

  useEffect(() => {
    if (status === 'loading') return
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

  const handleDeleteTask = (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks)
    localStorage.setItem(`tasks_${selectedTimesheet?.id || 'default'}`, JSON.stringify(newTasks))
  }

  const handleSubmitTask = (taskData: CreateTaskRequest) => {
    let newTasks: Task[]
    if (editingTask) {
      // Edit existing task
      newTasks = tasks.map(task =>
        task.id === editingTask.id ? { ...task, ...taskData, id: task.id } : task
      )
    } else {
      // Add new task
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }
      newTasks = [...tasks, newTask]
    }
    setTasks(newTasks)
    localStorage.setItem(`tasks_${selectedTimesheet?.id || 'default'}`, JSON.stringify(newTasks))
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

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
            tasks={tasks}
          />
        )}
      </main>

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