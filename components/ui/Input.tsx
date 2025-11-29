import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  error,
  multiline = false,
  numberOfLines = 1,
  placeholder,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>
      <TextInput
        className={`border rounded-lg px-4 py-3 text-base ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        } ${multiline ? 'min-h-[100px]' : ''}`}
        style={{
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
      />
      {error && (
        <View className="flex-row items-center mt-1">
          <Text className="text-red-500 text-sm">⚠️ {error}</Text>
        </View>
      )}
    </View>
  );
};