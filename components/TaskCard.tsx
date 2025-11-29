import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../lib/types/task';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const handlePress = () => {
    router.push(`../tasks/${task.id}`);
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200">
        <Text className="text-lg font-bold text-gray-800 mb-2" numberOfLines={1}>
          {task.title}
        </Text>
        
        <Text className="text-gray-600 mb-3 text-sm" numberOfLines={2}>
          {task.description}
        </Text>
        
        <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
          <Text className="text-xs text-gray-400">
            📅 {new Date(task.createdAt).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </Text>
          
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="bg-red-500 px-4 py-2 rounded-md active:bg-red-600"
          >
            <Text className="text-white text-xs font-semibold">🗑️ Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};