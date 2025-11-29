import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { AppDispatch, RootState } from '../lib/store';
import { fetchTasks, updateTask } from '../lib/store/slices/tasksSlice';
import { TaskCard } from '../components/TaskCard';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        await dispatch(updateTask({ 
          id, 
          data: { 
            title: task.title,
            description: task.description,
            completed: !completed 
          } 
        })).unwrap();
      }
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const handleRefresh = () => {
    dispatch(fetchTasks());
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  if (loading && tasks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-gray-600">Cargando tareas...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header personalizado */}
      <View className="bg-blue-700 pt-14 pb-8 px-6 rounded-b-3xl">
        <Text className="text-white text-3xl font-bold mb-2">
          Hoy: {new Date().toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long' 
          })}
        </Text>
        <Text className="text-blue-200 text-base">
          {completedCount} de {totalCount} completadas
        </Text>
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard 
            task={item} 
            onToggleComplete={handleToggleComplete}
            onEdit={() => router.push(`/tasks/${item.id}`)}
          />
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-gray-300 text-7xl mb-4">📝</Text>
            <Text className="text-gray-500 text-xl font-semibold mb-2">
              Sin tareas
            </Text>
            <Text className="text-gray-400 text-sm">
              Presiona + para agregar una nueva
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl 
            refreshing={loading} 
            onRefresh={handleRefresh}
            colors={['#2563EB']}
            tintColor="#2563EB"
          />
        }
      />

      {/* Botón flotante para agregar */}
      <Pressable
        onPress={() => router.push('/tasks/new')}
        style={({ pressed }) => ({
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: '#2563EB',
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 8,
          shadowColor: '#2563EB',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: pressed ? 0.5 : 0.3,
          shadowRadius: 8,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Text style={{ color: 'white', fontSize: 36, fontWeight: '300' }}>+</Text>
      </Pressable>

      {/* Mensaje de error */}
      {error && (
        <View className="absolute bottom-24 left-4 right-4 bg-red-100 p-4 rounded-xl border border-red-300">
          <Text className="text-red-700 font-semibold">⚠️ Error</Text>
          <Text className="text-red-600 text-sm mt-1">{error}</Text>
        </View>
      )}
    </View>
  );
}