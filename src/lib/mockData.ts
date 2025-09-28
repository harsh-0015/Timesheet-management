import { TimesheetEntry, Task } from './types'

export const mockTasks: Task[] = [
  {
    id: '1',
    date: '2024-01-21',
    projectName: 'Homepage Development',
    typeOfWork: 'Bug fixes',
    description: 'Fixed navigation issues',
    hours: 4,
    timesheetId: '1'
  },
  {
    id: '2',
    date: '2024-01-21',
    projectName: 'Homepage Development',
    typeOfWork: 'Feature Development',
    description: 'Added new components',
    hours: 4,
    timesheetId: '1'
  },
  {
    id: '3',
    date: '2024-01-22',
    projectName: 'Homepage Development',
    typeOfWork: 'Testing',
    description: 'Unit testing',
    hours: 8,
    timesheetId: '1'
  }
]

export const mockTimesheets: TimesheetEntry[] = [
  {
    id: '1',
    weekNumber: 1,
    dateRange: '1 - 5 January, 2024',
    status: 'COMPLETED',
    totalHours: 40,
    tasks: mockTasks.filter(task => task.timesheetId === '1'),
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '2',
    weekNumber: 2,
    dateRange: '8 - 12 January, 2024',
    status: 'COMPLETED',
    totalHours: 40,
    tasks: [],
    createdAt: '2024-01-08T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z'
  },
  {
    id: '3',
    weekNumber: 3,
    dateRange: '15 - 19 January, 2024',
    status: 'INCOMPLETE',
    totalHours: 25,
    tasks: [],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-19T00:00:00Z'
  },
  {
    id: '4',
    weekNumber: 4,
    dateRange: '22 - 26 January, 2024',
    status: 'COMPLETED',
    totalHours: 40,
    tasks: [],
    createdAt: '2024-01-22T00:00:00Z',
    updatedAt: '2024-01-26T00:00:00Z'
  },
  {
    id: '5',
    weekNumber: 5,
    dateRange: '29 January - 1 February, 2024',
    status: 'MISSING',
    totalHours: 0,
    tasks: [],
    createdAt: '2024-01-29T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  }
]

export const projectOptions = [
  'Homepage Development',
  'Mobile App',
  'API Development',
  'Database Migration',
  'UI/UX Design'
]

export const workTypeOptions = [
  'Bug fixes',
  'Feature Development',
  'Testing',
  'Documentation',
  'Code Review',
  'Meeting'
]