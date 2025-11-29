import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { TaskForm } from '../../components/TaskForm';
import { AppDispatch } from '../../lib/store';
import { createTask } from '../../lib/store/slices/tasksSlice';
import { CreateTaskDto } from '../../lib/types/task';

export default function NewTaskScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateTaskDto) => {
    try {
      setLoading(true);
      await dispatch(createTask(data)).unwrap();
      
      Alert.alert(
        '✅ Éxito',
        'Tarea creada correctamente',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        '❌ Error',
        'No se pudo crear la tarea. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <TaskForm onSubmit={handleSubmit} loading={loading} />
      </View>
    </ScrollView>
  );
}