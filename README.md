# 📱 Task Manager App - Evaluación Sumativa

Aplicación móvil de gestión de tareas desarrollada con React Native + Expo para la asignatura de Programación Móvil.

## 👨‍🎓 Información del Estudiante

- **Nombre:** Matias Roldan
- **Nivel:** Bachillerato
- **Asignatura:** Programación Móvil
- **Curso:** Tercero
- **Paralelo:** E2
- **Año Lectivo:** 2025-2026
- **Docente:** Milton Velásquez

## 🎯 Objetivos del Proyecto

✅ **Funcionalidad Completa:**
- Permitir al usuario añadir, ver, editar y eliminar tareas mediante formularios
- Sincronizar las tareas con una API REST (GET, POST, PUT, DELETE)
- Validación de formularios con caracteres alfanuméricos únicamente
  
✅ **Navegación:**
- Utilizar Expo Router para manejar múltiples pantallas
- Implementar rutas dinámicas con parámetros
- Estructura basada en archivos (file-based routing)

✅ **TypeScript:**
- Implementar tipado en componentes y datos
- Garantizar type-safety en toda la aplicación

✅ **Arquitectura:**
- Estructura modular y escalable
- Carpetas organizadas: app/, lib/, components/

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **React Native** | Framework móvil multiplataforma |
| **Expo SDK 52** | Herramientas y servicios |
| **TypeScript** | Tipado estático |
| **Redux Toolkit** | Gestión de estado global |
| **Axios** | Cliente HTTP para API |
| **Expo Router** | Navegación file-based |
| **NativeWind** | Estilos con Tailwind CSS |
| **Zod** | Validación de esquemas |

## 📦 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Expo Go (en tu dispositivo móvil)

### Pasos de Instalación
```bash
# 1. Clonar el repositorio
git clone 
cd task-manager-app

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npx expo start
```

### Opciones de Ejecución

- **📱 Android:** Presiona `a` o escanea el QR con Expo Go
- **🍎 iOS:** Presiona `i` o escanea el QR con Expo Go
- **🌐 Web:** Presiona `w` para abrir en navegador

## 🗂️ Estructura del Proyecto
```
task-manager-app/
│
├── app/                          # Pantallas (Expo Router)
│   ├── _layout.tsx               # Layout principal + Redux Provider
│   ├── index.tsx                 # 🏠 Lista de tareas
│   └── tasks/
│       ├── new.tsx               # ➕ Crear nueva tarea
│       └── [id].tsx              # ✏️ Editar tarea (ruta dinámica)
│
├── components/                   # Componentes reutilizables
│   ├── TaskCard.tsx              # Tarjeta de tarea
│   ├── TaskForm.tsx              # Formulario con validación
│   └── ui/
│       ├── Input.tsx             # Input personalizado
│       └── Button.tsx            # Botón personalizado
│
├── lib/                          # Lógica de negocio
│   ├── store/                    # Redux Store
│   │   ├── index.ts              # Configuración del store
│   │   └── slices/
│   │       └── tasksSlice.ts     # Slice de tareas + thunks
│   │
│   ├── services/
│   │   └── api.ts                # Axios + servicios API
│   │
│   ├── types/
│   │   └── task.ts               # Tipos TypeScript
│   │
│   └── utils/
│       └── validation.ts         # Esquemas Zod
│
├── assets/                       # Recursos (imágenes, iconos)
├── .gitignore
├── app.json                      # Configuración Expo
├── babel.config.js               # Configuración Babel
├── package.json
├── db.json                       # Configuracion server
├── tailwind.config.js            # Configuración Tailwind
├── tsconfig.json                 # Configuración TypeScript
└── README.md
```

## 🔌 Configuración de API
### JSON Server Local

Para usar tu propia base de datos local:
```bash
# 1. Instalar json-server
npm install -g json-server

# 2. Crear archivo db.json
echo '{
  "tasks": [
    {
      "id": "1",
      "title": "Tarea de ejemplo",
      "description": "Esta es una tarea de prueba",
      "completed": false,
      "createdAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}' > db.json

# 3. Iniciar servidor (desde la raíz del proyecto)
json-server --watch db.json --port 3000 --host 0.0.0.0

# 4. Obtener tu IP local
# Windows: ipconfig
# Mac/Linux: ifconfig
```
```typescript
// Actualizar lib/services/api.ts
const API_BASE_URL = 'http://TU_IP_LOCAL:3000';
// Ejemplo: 'http://192.168.1.100:3000'
```

## ✨ Funcionalidades Implementadas

### 1️⃣ CRUD Completo

| Operación | Método HTTP | Endpoint | Descripción |
|-----------|-------------|----------|-------------|
| **Create** | POST | `/tasks` o `/todos` | Crear nueva tarea |
| **Read** | GET | `/tasks` o `/todos` | Listar todas las tareas |
| **Read One** | GET | `/tasks/:id` | Obtener tarea específica |
| **Update** | PUT | `/tasks/:id` | Actualizar tarea |
| **Delete** | DELETE | `/tasks/:id` | Eliminar tarea |

### 2️⃣ Validaciones (Zod)

- ✅ Campos obligatorios (título y descripción)
- ✅ Solo caracteres alfanuméricos (sin símbolos especiales)
- ✅ Longitud máxima: título 100 chars, descripción 500 chars
- ✅ Mensajes de error en español
- ✅ Validación en tiempo real

### 3️⃣ Estado Global (Redux)
```typescript
// Estado de la aplicación
{
  tasks: Task[],      // Array de tareas
  loading: boolean,   // Estado de carga
  error: string | null // Mensajes de error
}
```

**Thunks Asíncronos:**
- `fetchTasks()` - Obtener todas las tareas
- `createTask(data)` - Crear nueva tarea
- `updateTask(id, data)` - Actualizar tarea
- `deleteTask(id)` - Eliminar tarea

### 4️⃣ Navegación con Expo Router

**Rutas:**
- `/` - Lista de tareas
- `/tasks/new` - Crear tarea (modal)
- `/tasks/[id]` - Editar tarea (ruta dinámica)

**Paso de Parámetros:**
```typescript
// Navegar con parámetros
router.push(`/tasks/${task.id}`);

// Recibir parámetros
const { id } = useLocalSearchParams();
```

### 5️⃣ Características Adicionales

- 🔄 **Pull to Refresh:** Desliza hacia abajo para recargar
- 🎨 **UI/UX Moderna:** Diseño limpio con NativeWind
- ⚡ **Feedback Instantáneo:** Loading states y alertas
- 🗑️ **Confirmación de Eliminación:** Alerta antes de borrar
- 📅 **Fecha de Creación:** Muestra cuándo se creó cada tarea

## 🧪 Testing Manual

### Flujo de Prueba Completo:

1. **Crear Tarea:**
```
   ✓ Presionar botón flotante "+"
   ✓ Llenar título: "Estudiar React Native"
   ✓ Llenar descripción: "Repasar componentes y hooks"
   ✓ Presionar "Crear Tarea"
   ✓ Verificar que aparece en la lista
```

2. **Validaciones:**
```
   ✗ Intentar enviar formulario vacío → Ver errores
   ✗ Escribir caracteres especiales (@#$%) → Ver error
   ✓ Escribir solo alfanuméricos → Aceptar
```

3. **Editar Tarea:**
```
   ✓ Tap en una tarjeta de tarea
   ✓ Modificar título o descripción
   ✓ Presionar "Actualizar Tarea"
   ✓ Verificar cambios en la lista
```

4. **Eliminar Tarea:**
```
   ✓ Presionar botón "Eliminar" en tarjeta
   ✓ Confirmar en alerta
   ✓ Verificar que desapareció de la lista
```

5. **Pull to Refresh:**
```
   ✓ Deslizar hacia abajo en la lista
   ✓ Ver indicador de carga
   ✓ Verificar que se recargan las tareas
```
## 🐛 Solución de Problemas

### Error: "Unable to resolve module"
```bash
# Limpiar caché
npx expo start -c
```

### Error: "Network request failed"
```bash
# Verificar que json-server esté corriendo
# Verificar la IP en lib/services/api.ts
# Asegurarse de estar en la misma red WiFi
```

### Error: NativeWind no funciona
```bash
# Verificar babel.config.js
# Reiniciar servidor con caché limpia
npx expo start -c
```

### Error de TypeScript
```bash
# Verificar que tsconfig.json esté correcto
# Reiniciar TypeScript server en VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## 📞 Contacto y Soporte

**Docente:** Milton Velásquez  
**Institución:** Unidad Educativa Técnico Salesiano

## 📄 Licencia

Este proyecto es de uso educativo para la asignatura de Programación Móvil.

---

**✨ Desarrollado con dedicación para la Evaluación Sumativa del Primer Trimestre ✨**
