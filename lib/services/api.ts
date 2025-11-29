import axios from 'axios';
import { CreateTaskDto, Task, UpdateTaskDto } from '../types/task';

// URL de tu servidor en Google Cloud Workstations
const API_BASE_URL = 'https://3000-firebase-sumativat1-1764392361675.cluster-hkcruqmgzbd2aqcdnktmz6k7ba.cloudworkstations.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de peticiones
api.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.message);
    return Promise.reject(error);
  }
);

// Servicios de tareas
export const taskService = {
  // GET - Obtener todas las tareas
  getTasks: async (): Promise<Task[]> => {
    try {
      const response = await api.get<Task[]>('/tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // GET - Obtener tarea por ID
  getTaskById: async (id: string): Promise<Task> => {
    try {
      const response = await api.get<Task>(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  // POST - Crear nueva tarea
  createTask: async (task: CreateTaskDto): Promise<Task> => {
    try {
      const newTask = {
        ...task,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      
      const response = await api.post<Task>('/tasks', newTask);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // PATCH - Actualizar tarea (cambio de PUT a PATCH)
  updateTask: async (id: string, task: UpdateTaskDto): Promise<Task> => {
    try {
      const response = await api.patch<Task>(`/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  deleteTask: async (id: string): Promise<void> => {
    try {
      console.log('🔥 API Service: Eliminando tarea con ID:', id);
      const response = await api.delete(`/tasks/${id}`);
      console.log('✅ API Service: Respuesta DELETE:', response.status);
    } catch (error: any) {
      console.error(`❌ API Service: Error al eliminar tarea ${id}:`, error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error;
    }
  },
};

export default api;