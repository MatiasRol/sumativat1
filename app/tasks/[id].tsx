import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TaskForm } from '../../components/TaskForm';
import { AppDispatch, RootState } from '../../lib/store';
import { updateTask } from '../../lib/store/slices/tasksSlice';
import { CreateTaskDto } from '../../lib/types/task';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find(t => t.id === id)
  );

  const handleSubmit = async (data: CreateTaskDto) => {
    if (!id) return;
    
    try {
      setLoading(true);
      await dispatch(updateTask({ id, data })).unwrap();
      
      Alert.alert(
        '✅ Éxito',
        'Tarea actualizada correctamente',
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
        'No se pudo actualizar la tarea. Por favor, inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">Cargando tarea...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <TaskForm
          onSubmit={handleSubmit}
          initialData={{ title: task.title, description: task.description }}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
}