export interface User {
  id: string;
  email: string;
  name: string;
}

export interface TimesheetEntry {
  id: string;
  weekNumber: number;
  dateRange: string;
  status: 'COMPLETED' | 'INCOMPLETE' | 'MISSING';
  totalHours: number;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  date: string;
  projectName: string;
  typeOfWork: string;
  description: string;
  hours: number;
  timesheetId: string;
}

export interface CreateTaskRequest {
  date: string;
  projectName: string;
  typeOfWork: string;
  description: string;
  hours: number;
  timesheetId: string;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
  id: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type TimesheetStatus = 'COMPLETED' | 'INCOMPLETE' | 'MISSING';

export interface FilterOptions {
  dateRange?: string;
  status?: TimesheetStatus | 'ALL';
}