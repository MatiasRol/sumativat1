import { router } from 'expo-router';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { TaskCard } from '../components/TaskCard';
import { AppDispatch, RootState } from '../lib/store';
import { fetchTasks, updateTask } from '../lib/store/slices/tasksSlice';

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
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header personalizado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Hoy: {new Date().toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long' 
          })}
        </Text>
        <Text style={styles.headerSubtitle}>
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
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>Sin tareas</Text>
            <Text style={styles.emptySubtitle}>
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

      {/* Botón flotante para agregar - CORREGIDO */}
      <View style={styles.floatingButtonContainer}>
  <Pressable
    onPress={() => {
      console.log('Botón presionado');
      router.push('/tasks/new');
    }}
    style={({ pressed }) => [
      styles.floatingButton,
      { opacity: pressed ? 0.9 : 1 }
    ]}
  >
    <Text style={styles.floatingButtonText}>+</Text>
  </Pressable>
</View>

      {/* Mensaje de error */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>⚠️ Error</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB', // gris
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E7EB', // gris
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#1D4ED8',
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#BFDBFE',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 72,
    color: '#D1D5DB',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  floatingButton: {
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
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  floatingButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.95 }],
  },
  floatingButtonText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '300',
    lineHeight: 42,
  },
  errorContainer: {
    position: 'absolute',
    bottom: 96,
    left: 16,
    right: 16,
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  errorTitle: {
    color: '#991B1B',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  errorMessage: {
    color: '#DC2626',
    fontSize: 12,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 999,
  },
});