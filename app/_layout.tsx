import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false, // Ocultamos el header por defecto
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="tasks/new" 
          options={{ 
            headerShown: true,
            title: 'Nueva tarea',
            presentation: 'modal',
            headerStyle: {
              backgroundColor: '#2563EB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }} 
        />
        <Stack.Screen 
          name="tasks/[id]" 
          options={{ 
            headerShown: true,
            title: 'Editar tarea',
            headerStyle: {
              backgroundColor: '#2563EB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }} 
        />
      </Stack>
    </Provider>
  );
}