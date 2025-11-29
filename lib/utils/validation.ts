import { z } from 'zod';

// Regex para solo alfanuméricos y espacios
const alphanumericRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/;

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .max(100, 'El título no puede exceder 100 caracteres')
    .regex(alphanumericRegex, 'Solo se permiten caracteres alfanuméricos'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .regex(alphanumericRegex, 'Solo se permiten caracteres alfanuméricos'),
});

export type TaskFormData = z.infer<typeof taskSchema>;