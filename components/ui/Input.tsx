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
    <View style={{ marginBottom: 20 }}>
      <Text style={{
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
      }}>
        {label}
      </Text>
      <TextInput
        style={{
          borderWidth: 1.5,
          borderColor: error ? '#EF4444' : '#E5E7EB',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 16,
          backgroundColor: error ? '#FEF2F2' : '#F9FAFB',
          color: '#1F2937',
          minHeight: multiline ? 120 : 50,
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Text style={{ color: '#EF4444', fontSize: 13 }}>⚠️ {error}</Text>
        </View>
      )}
    </View>
  );
};