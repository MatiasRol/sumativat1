import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Task } from '../lib/types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200">
      {/* Área clickeable para editar */}
      <Pressable onPress={() => router.push(`/tasks/${task.id}`)}>
        <Text className="text-lg font-bold text-gray-800 mb-2" numberOfLines={1}>
          {task.title}
        </Text>
        
        <Text className="text-gray-600 mb-3 text-sm" numberOfLines={2}>
          {task.description}
        </Text>
      </Pressable>
      
      {/* Footer con fecha y botón eliminar */}
      <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
        <Text className="text-xs text-gray-400">
          📅 {new Date(task.createdAt).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </Text>
        
        {/* Botón eliminar independiente */}
        <Pressable
          onPress={() => {
            console.log('🔴 Botón ELIMINAR presionado - ID:', task.id);
            onDelete(task.id.toString());
          }}
          className="bg-red-500 px-4 py-2 rounded-md"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text className="text-white text-xs font-semibold">🗑️ Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};