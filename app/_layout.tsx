import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../lib/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3B82F6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Mis Tareas',
          }} 
        />
        <Stack.Screen 
          name="tasks/new" 
          options={{ 
            title: 'Nueva Tarea',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="tasks/[id]" 
          options={{ 
            title: 'Editar Tarea',
          }} 
        />
      </Stack>
    </Provider>
  );
}