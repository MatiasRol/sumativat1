export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'completed'>;
export type UpdateTaskDto = Partial<Omit<Task, 'id' | 'createdAt'>>;