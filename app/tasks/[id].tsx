import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TaskForm } from '../../components/TaskForm';
import { Button } from '../../components/ui/Button';
import { AppDispatch, RootState } from '../../lib/store';
import { deleteTask, updateTask } from '../../lib/store/slices/tasksSlice';
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
      Alert.alert('✅ Éxito', 'Tarea actualizada correctamente');
      router.back();
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo actualizar la tarea');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!id) return;
    
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await dispatch(deleteTask(id)).unwrap();
              Alert.alert('✅ Éxito', 'Tarea eliminada correctamente');
              router.back();
            } catch (error) {
              Alert.alert('❌ Error', 'No se pudo eliminar la tarea');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!task) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-gray-600">Cargando tarea...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <TaskForm
        onSubmit={handleSubmit}
        initialData={{ title: task.title, description: task.description }}
        loading={loading}
      />
      
      {/* Botón eliminar */}
      <View style={{ padding: 20, paddingTop: 0 }}>
        <Button
          title="Eliminar tarea"
          onPress={handleDelete}
          variant="danger"
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
}