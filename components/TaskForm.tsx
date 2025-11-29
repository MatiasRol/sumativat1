import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { CreateTaskDto } from '../lib/types/task';
import { taskSchema } from '../lib/utils/validation';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TaskFormProps {
  onSubmit: (data: CreateTaskDto) => void;
  initialData?: CreateTaskDto;
  loading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialData,
  loading = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleSubmit = () => {
    try {
      const validatedData = taskSchema.parse({ title, description });
      setErrors({});
      onSubmit(validatedData);
    } catch (error: any) {
      if (error.errors) {
        const formErrors: { title?: string; description?: string } = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            formErrors[err.path[0] as keyof typeof formErrors] = err.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <View className="bg-white rounded-lg p-4 shadow-sm">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        {initialData ? 'Editar Tarea' : 'Nueva Tarea'}
      </Text>

      <Input
        label="Título *"
        value={title}
        onChangeText={setTitle}
        error={errors.title}
        placeholder="Ej: Completar proyecto móvil"
      />
      
      <Input
        label="Descripción *"
        value={description}
        onChangeText={setDescription}
        error={errors.description}
        placeholder="Describe tu tarea en detalle..."
        multiline
        numberOfLines={5}
      />

      <Text className="text-xs text-gray-500 mb-4">
        * Solo se permiten caracteres alfanuméricos
      </Text>

      <Button
        title={initialData ? 'Actualizar Tarea' : 'Crear Tarea'}
        onPress={handleSubmit}
        loading={loading}
      />
    </View>
  );
};