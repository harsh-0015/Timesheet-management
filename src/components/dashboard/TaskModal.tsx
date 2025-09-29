'use client'

import { useState, useEffect } from 'react'
import { Task, CreateTaskRequest } from '@/lib/types'
import { projectOptions, workTypeOptions } from '@/lib/mockData'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: CreateTaskRequest) => void
  task?: Task | null
  timesheetId: string
  defaultDate?: string
}

export function TaskModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  task, 
  timesheetId, 
  defaultDate 
}: TaskModalProps) {
  const [formData, setFormData] = useState<CreateTaskRequest>({
    date: defaultDate || new Date().toISOString().split('T')[0],
    projectName: 'Homepage Development',
    typeOfWork: 'Bug fixes',
    description: '',
    hours: 4,
    timesheetId
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (task) {
      // Edit mode
      setFormData({
        date: task.date,
        projectName: task.projectName,
        typeOfWork: task.typeOfWork,
        description: task.description,
        hours: task.hours,
        timesheetId: task.timesheetId
      })
    } else {
      // Add mode
      setFormData({
        date: defaultDate || new Date().toISOString().split('T')[0],
        projectName: 'Homepage Development',
        typeOfWork: 'Bug fixes',
        description: '',
        hours: 4,
        timesheetId
      })
    }
    setErrors({})
  }, [task, defaultDate, timesheetId, isOpen])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required'
    }

    if (!formData.typeOfWork.trim()) {
      newErrors.typeOfWork = 'Type of work is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required'
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters'
    }

    if (formData.hours <= 0) {
      newErrors.hours = 'Hours must be greater than 0'
    } else if (formData.hours > 12) {
      newErrors.hours = 'Hours cannot exceed 12 per task'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Error submitting task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CreateTaskRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const incrementHours = () => {
    if (formData.hours < 12) {
      handleInputChange('hours', formData.hours + 1)
    }
  }

  const decrementHours = () => {
    if (formData.hours > 1) {
      handleInputChange('hours', formData.hours - 1)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {task ? 'Edit Entry' : 'Add New Entry'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Project Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Select Project *
              <span className="ml-1 text-gray-400">
                <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </span>
            </label>
            <select
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium ${
                errors.projectName ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              {projectOptions.map(project => (
                <option key={project} value={project} className="text-gray-900 font-normal py-2">
                  {project}
                </option>
              ))}
            </select>
            {errors.projectName && (
              <p className="mt-1 text-xs text-red-600">{errors.projectName}</p>
            )}
          </div>

          {/* Type of Work */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Type of Work *
              <span className="ml-1 text-gray-400">
                <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </span>
            </label>
            <select
              value={formData.typeOfWork}
              onChange={(e) => handleInputChange('typeOfWork', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-medium ${
                errors.typeOfWork ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              {workTypeOptions.map(type => (
                <option key={type} value={type} className="text-gray-900 font-normal py-2">
                  {type}
                </option>
              ))}
            </select>
            {errors.typeOfWork && (
              <p className="mt-1 text-xs text-red-600">{errors.typeOfWork}</p>
            )}
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Task description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Write text here ..."
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-900 placeholder-gray-400 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            <p className="mt-1 text-xs text-gray-500">A note for extra info</p>
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Hours *
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={decrementHours}
                disabled={formData.hours <= 1}
                className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-bold text-lg transition-colors"
              >
                −
              </button>
              <input
                type="number"
                value={formData.hours}
                onChange={(e) => handleInputChange('hours', parseInt(e.target.value) || 1)}
                min="1"
                max="12"
                className={`w-20 px-3 py-2 border-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 font-semibold text-lg ${
                  errors.hours ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={incrementHours}
                disabled={formData.hours >= 12}
                className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-bold text-lg transition-colors"
              >
                +
              </button>
            </div>
            {errors.hours && (
              <p className="mt-1 text-xs text-red-600">{errors.hours}</p>
            )}
          </div>

          {/* Date (hidden but included for completeness) */}
          <input
            type="hidden"
            value={formData.date}
          />

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                task ? 'Update entry' : 'Add entry'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}