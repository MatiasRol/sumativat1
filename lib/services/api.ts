import axios from 'axios';
import { CreateTaskDto, Task, UpdateTaskDto } from '../types/task';

// Opción 1: JSON Server (si lo usas localmente)
// const API_BASE_URL = 'http://localhost:3000';

// Opción 2: API simulada con JSONPlaceholder
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging (opcional)
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

// Servicios de tareas
export const taskService = {
  // Obtener todas las tareas
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/todos');
    // Mapear de todos a tasks
    return response.data.slice(0, 10).map((todo: any) => ({
      id: todo.id.toString(),
      title: todo.title,
      description: `Tarea ${todo.id}`,
      completed: todo.completed,
      createdAt: new Date().toISOString(),
    }));
  },

  // Obtener una tarea por ID
  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get<any>(`/todos/${id}`);
    return {
      id: response.data.id.toString(),
      title: response.data.title,
      description: `Tarea ${response.data.id}`,
      completed: response.data.completed,
      createdAt: new Date().toISOString(),
    };
  },

  // Crear nueva tarea
  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const response = await api.post<any>('/todos', {
      title: task.title,
      completed: false,
      userId: 1,
    });
    return {
      id: response.data.id.toString(),
      title: task.title,
      description: task.description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
  },

  // Actualizar tarea
  updateTask: async (id: string, task: UpdateTaskDto): Promise<Task> => {
    const response = await api.put<any>(`/todos/${id}`, {
      title: task.title,
      completed: false,
    });
    return {
      id: response.data.id.toString(),
      title: task.title || response.data.title,
      description: task.description || `Tarea ${id}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
  },

  // Eliminar tarea
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};

export default api;