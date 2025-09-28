// src/components/dashboard/TimesheetTableView.tsx
'use client'

import { useState, useEffect } from 'react'
import { TimesheetEntry, FilterOptions } from '@/lib/types'

interface TimesheetTableViewProps {
  onSelectTimesheet: (timesheet: TimesheetEntry) => void
}

export function TimesheetTableView({ onSelectTimesheet }: TimesheetTableViewProps) {
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'ALL'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchTimesheets()
  }, [filters])

  const fetchTimesheets = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.status && filters.status !== 'ALL') {
        params.append('status', filters.status)
      }

      const response = await fetch(`/api/timesheets?${params}`)
      const data = await response.json()

      if (data.success) {
        setTimesheets(data.data)
      }
    } catch (error) {
      console.error('Error fetching timesheets:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium'
    switch (status) {
      case 'COMPLETED':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'INCOMPLETE':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'MISSING':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const totalPages = Math.ceil(timesheets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTimesheets = timesheets.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Timesheets</h2>
        
        {/* Filters */}
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.dateRange || ''}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            >
              <option value="">All dates</option>
              <option value="this-week">This week</option>
              <option value="last-week">Last week</option>
              <option value="this-month">This month</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status || 'ALL'}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as never })}
            >
              <option value="ALL">All statuses</option>
              <option value="COMPLETED">Completed</option>
              <option value="INCOMPLETE">Incomplete</option>
              <option value="MISSING">Missing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTimesheets.map((timesheet) => (
              <tr key={timesheet.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {timesheet.weekNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {timesheet.dateRange}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(timesheet.status)}>
                    {timesheet.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {timesheet.status === 'INCOMPLETE' ? (
                    <button
                      onClick={() => onSelectTimesheet(timesheet)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Update
                    </button>
                  ) : timesheet.status === 'MISSING' ? (
                    <button
                      onClick={() => onSelectTimesheet(timesheet)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Create
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectTimesheet(timesheet)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center">
          <select
            className="px-2 py-1 border border-gray-300 rounded text-sm"
            value={itemsPerPage}
            onChange={(e) => {/* Handle items per page change */}}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {page}
              </button>
            )
          })}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 text-center text-xs text-gray-500 border-t">
        © 2024 tentwenty. All rights reserved.
      </div>
    </div>
  )
}