import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TaskCard } from '../components/TaskCard';
import { AppDispatch, RootState } from '../lib/store';
import { deleteTask, fetchTasks } from '../lib/store/slices/tasksSlice';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Eliminar Tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteTask(id));
          },
        },
      ]
    );
  };

  const handleRefresh = () => {
    dispatch(fetchTasks());
  };

  if (loading && tasks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onDelete={handleDelete} />
        )}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 text-6xl mb-4">📝</Text>
            <Text className="text-gray-500 text-lg font-semibold">
              No hay tareas
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              Presiona + para crear una nueva tarea
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={handleRefresh}
            colors={['#3B82F6']}
          />
        }
      />

      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push('../tasks/new')}
        activeOpacity={0.8}
      >
        <Text className="text-white text-4xl font-light">+</Text>
      </TouchableOpacity>

      {error && (
        <View className="bg-red-100 p-4 m-4 rounded-lg border border-red-300">
          <Text className="text-red-700 font-semibold">⚠️ Error</Text>
          <Text className="text-red-600 text-sm mt-1">{error}</Text>
        </View>
      )}
    </View>
  );
}