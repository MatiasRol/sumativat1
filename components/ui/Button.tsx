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
        return { backgroundColor: '#2563EB' };
      case 'secondary':
        return { backgroundColor: '#6B7280' };
      case 'danger':
        return { backgroundColor: '#EF4444' };
      default:
        return { backgroundColor: '#2563EB' };
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...getVariantStyles(),
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        opacity: (disabled || loading) ? 0.6 : 1,
      }}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
        }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};