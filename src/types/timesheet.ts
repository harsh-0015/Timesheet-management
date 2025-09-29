// src/types/timesheet.ts
export type TimesheetStatus = 'COMPLETED' | 'INCOMPLETE' | 'MISSING';

export interface Task {
  id: string;
  date: string;
  projectName: string;
  taskDescription: string;
  hours: number;
  typeOfWork: string;
}

export interface TimesheetEntry {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  status: TimesheetStatus;
  tasks: Task[];
  totalHours: number;
}

// src/lib/mockData.ts
// import { TimesheetEntry } from '@/types/timesheet'; // Removed due to local declaration conflict

export const mockTimesheets: TimesheetEntry[] = [
  {
    id: '1',
    weekNumber: 1,
    startDate: '2024-01-01',
    endDate: '2024-01-05',
    status: 'COMPLETED',
    totalHours: 40,
    tasks: [
      {
        id: 't1',
        date: '2024-01-01',
        projectName: 'Homepage Development',
        taskDescription: 'Building responsive homepage',
        hours: 8,
        typeOfWork: 'Development'
      },
      {
        id: 't2',
        date: '2024-01-02',
        projectName: 'Homepage Development',
        taskDescription: 'API integration',
        hours: 8,
        typeOfWork: 'Development'
      }
    ]
  },
  {
    id: '2',
    weekNumber: 2,
    startDate: '2024-01-08',
    endDate: '2024-01-12',
    status: 'COMPLETED',
    totalHours: 40,
    tasks: [
      {
        id: 't3',
        date: '2024-01-08',
        projectName: 'Dashboard Design',
        taskDescription: 'Creating dashboard mockups',
        hours: 6,
        typeOfWork: 'Design'
      }
    ]
  },
  {
    id: '3',
    weekNumber: 3,
    startDate: '2024-01-15',
    endDate: '2024-01-19',
    status: 'INCOMPLETE',
    totalHours: 24,
    tasks: [
      {
        id: 't4',
        date: '2024-01-15',
        projectName: 'API Development',
        taskDescription: 'Building REST endpoints',
        hours: 8,
        typeOfWork: 'Backend'
      }
    ]
  },
  {
    id: '4',
    weekNumber: 4,
    startDate: '2024-01-22',
    endDate: '2024-01-26',
    status: 'COMPLETED',
    totalHours: 40,
    tasks: []
  },
  {
    id: '5',
    weekNumber: 5,
    startDate: '2024-01-28',
    endDate: '2024-02-01',
    status: 'MISSING',
    totalHours: 0,
    tasks: []
  }
];

// Helper function to format date range
export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  
  return `${start.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })} - ${end.toLocaleDateString('en-US', options)}`;
};

// Helper to get status badge styles
export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'INCOMPLETE':
      return 'bg-yellow-100 text-yellow-800';
    case 'MISSING':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};