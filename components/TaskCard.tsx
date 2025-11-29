import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Task } from '../lib/types/task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onEdit: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit }) => {
  return (
    <Pressable onPress={onEdit}>
      <View 
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 16,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        {/* Checkbox */}
        <Pressable
          onPress={() => onToggleComplete(task.id.toString(), task.completed)}
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: task.completed ? '#2563EB' : '#D1D5DB',
            backgroundColor: task.completed ? '#2563EB' : 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12,
          }}
        >
          {task.completed && (
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
          )}
        </Pressable>

        {/* Contenido de la tarea */}
        <View style={{ flex: 1 }}>
          <Text 
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: task.completed ? '#9CA3AF' : '#1F2937',
              textDecorationLine: task.completed ? 'line-through' : 'none',
              marginBottom: 4,
            }}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          
          {task.description && (
            <Text 
              style={{
                fontSize: 14,
                color: task.completed ? '#D1D5DB' : '#6B7280',
                marginBottom: 6,
              }}
              numberOfLines={1}
            >
              {task.description}
            </Text>
          )}

          <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
            {new Date(task.createdAt).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>

        {/* Indicador visual de tap para editar */}
        <View style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#E5E7EB',
          marginLeft: 8,
        }} />
      </View>
    </Pressable>
  );
};