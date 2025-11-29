import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 active:bg-blue-700';
      case 'secondary':
        return 'bg-gray-600 active:bg-gray-700';
      case 'danger':
        return 'bg-red-600 active:bg-red-700';
      default:
        return 'bg-blue-600 active:bg-blue-700';
    }
  };

  return (
    <TouchableOpacity
      className={`${getVariantStyles()} rounded-lg py-4 px-6 shadow-sm ${
        (disabled || loading) ? 'opacity-50' : ''
      }`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-bold text-center text-base">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};