import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
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
    <ScrollView className="flex-1">
      <View style={{ padding: 20 }}>
        <Input
          label="Título de la tarea"
          value={title}
          onChangeText={setTitle}
          error={errors.title}
          placeholder="Ej: Completar proyecto móvil"
        />
        
        <Input
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          error={errors.description}
          placeholder="Agrega más detalles sobre la tarea..."
          multiline
          numberOfLines={4}
        />

        <Text style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 20 }}>
          * Solo caracteres alfanuméricos permitidos
        </Text>

        <Button
          title={initialData ? 'Actualizar tarea' : 'Crear tarea'}
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
};