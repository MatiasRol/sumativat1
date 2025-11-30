📱 Task Manager App - Evaluación Sumativa
Aplicación móvil moderna de gestión de tareas desarrollada con React Native + Expo para la asignatura de Programación Móvil.

<img width="290" height="642" alt="image" src="https://github.com/user-attachments/assets/64e27dc7-aaa6-4f1c-8d96-b27d50cd07f7" />


👨‍🎓 Información del Estudiante

Nomre: Matias Roldan
Asignatura: Programación Móvil
Curso: Tercero
Paralelo:E2
Año Lectivo: 2025-2026
Docente: Milton Velásquez
Institución: Unidad Educativa Técnico Salesiano

🛠️ Tecnologías Utilizadas
TecnologíaVersiónPropósitoReact Native0.76.0Framework móvil multiplataformaExpo SDK~52.0.0Herramientas y servicios de desarrolloTypeScript~5.3.3Tipado estático y seguridad de tiposRedux Toolkit^2.0.1Gestión de estado globalAxios^1.6.5Cliente HTTP para consumo de APIExpo Router~4.0.0Navegación file-based routingNativeWind^2.0.11Estilos con Tailwind CSSZod^3.22.4Validación de esquemas de datosJSON Server^1.0.0API REST simulada para desarrollo

📦 Instalación
Prerrequisitos

Node.js 18 o superior
npm o yarn
Expo Go app en tu dispositivo móvil (iOS/Android)
Git

Pasos de Instalación
bash# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/task-manager-app.git
cd task-manager-app

# 2. Instalar dependencias
npm install

# 3. Crear base de datos local (opcional)
cat > db.json << 'EOF'
{
  "tasks": []
}
EOF

# 4. Iniciar JSON Server (Terminal 1)
npm run server

# 5. Iniciar Expo (Terminal 2)
npx expo start
```

### Opciones de Ejecución

- **📱 Android:** Presiona `a` o escanea el QR con Expo Go
- **🍎 iOS:** Presiona `i` o escanea el QR con Expo Go (Camera app)
- **🌐 Web:** Presiona `w` para abrir en navegador

---

## 🗂️ Estructura del Proyecto
```
task-manager-app/
│
├── app/                          # Pantallas y navegación (Expo Router)
│   ├── _layout.tsx               # Layout principal + Redux Provider
│   ├── index.tsx                 # 🏠 Lista de tareas (pantalla principal)
│   └── tasks/
│       ├── new.tsx               # ➕ Crear nueva tarea
│       └── [id].tsx              # ✏️ Editar/Eliminar tarea (ruta dinámica)
│
├── components/                   # Componentes reutilizables
│   ├── TaskCard.tsx              # Tarjeta de tarea con checkbox
│   ├── TaskForm.tsx              # Formulario con validación
│   └── ui/
│       ├── Input.tsx             # Input personalizado
│       └── Button.tsx            # Botón personalizado
│
├── lib/                          # Lógica de negocio
│   ├── store/                    # Redux Store
│   │   ├── index.ts              # Configuración del store
│   │   └── slices/
│   │       └── tasksSlice.ts     # Slice de tareas + thunks asíncronos
│   │
│   ├── services/
│   │   └── api.ts                # Axios + servicios de API REST
│   │
│   ├── types/
│   │   └── task.ts               # Tipos TypeScript (Task, DTOs)
│   │
│   └── utils/
│       └── validation.ts         # Esquemas de validación Zod
│
├── assets/                       # Recursos (imágenes, iconos)
├── .expo/                        # Caché de Expo (ignorado)
├── node_modules/                 # Dependencias (ignorado)
│
├── .gitignore                    # Archivos ignorados por Git
├── app.json                      # Configuración de Expo
├── babel.config.js               # Configuración de Babel (NativeWind)
├── db.json                       # Base de datos JSON Server
├── metro.config.js               # Configuración de Metro bundler
├── package.json                  # Dependencias y scripts
├── tailwind.config.js            # Configuración de Tailwind CSS
├── tsconfig.json                 # Configuración de TypeScript
├── demo.gif                      # Demo de la aplicación
└── README.md                     # Este archivo

🔌 Configuración de API

JSON Server Local (Desarrollo)
Servidor local con persistencia real de datos.
Configuración:
bash# 1. El proyecto ya incluye json-server en package.json

# 2. Crear/verificar db.json en la raíz
{
  "tasks": []
}

# 3. Iniciar servidor (Terminal 1)
npm run server
Configurar URL en la app:
Para desarrollo local (web):
typescriptconst API_BASE_URL = 'http://localhost:3000';
Para emulador Android:
typescriptconst API_BASE_URL = 'http://10.0.2.2:3000';
Para dispositivo físico (móvil real):
bash# Obtener tu IP local
hostname -I | awk '{print $1}'
# Ejemplo: 192.168.1.100
typescriptconst API_BASE_URL = 'http://192.168.1.100:3000';
Opción 3: Google Cloud Workstations
Si estás usando Cloud Workstations, usa tu URL específica:
typescriptconst API_BASE_URL = 'https://3000-tu-proyecto.cloudworkstations.dev';

✨ Funcionalidades Implementadas
1️⃣ CRUD Completo
OperaciónMétodo HTTPEndpointDescripciónCreatePOST/tasksCrear nueva tareaReadGET/tasksListar todas las tareasRead OneGET/tasks/:idObtener tarea específicaUpdatePATCH/tasks/:idActualizar tareaDeleteDELETE/tasks/:idEliminar tarea
2️⃣ Validaciones (Zod)

✅ Campos obligatorios (título y descripción)
✅ Solo caracteres alfanuméricos (incluye acentos y ñ)
✅ Longitud mínima: 1 carácter
✅ Longitud máxima: título 100 chars, descripción 500 chars
✅ Mensajes de error en español
✅ Validación en tiempo real

Esquema de validación:
typescriptconst alphanumericRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/;

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .max(100, 'El título no puede exceder 100 caracteres')
    .regex(alphanumericRegex, 'Solo se permiten caracteres alfanuméricos'),
  description: z
    .string()
    .min(1, 'La descripción es requerida')
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .regex(alphanumericRegex, 'Solo se permiten caracteres alfanuméricos'),
});
3️⃣ Estado Global (Redux)
Estructura del estado:
typescriptinterface TasksState {
  tasks: Task[];      // Array de tareas
  loading: boolean;   // Estado de carga
  error: string | null; // Mensajes de error
}

**Thunks Asíncronos:**
- `fetchTasks()` - Obtener todas las tareas
- `createTask(data)` - Crear nueva tarea
- `updateTask(id, data)` - Actualizar tarea
- `deleteTask(id)` - Eliminar tarea

**Flujo de datos:**
```
Componente → Dispatch Action → Thunk → API Call → Redux State → Componente
```

### 4️⃣ Navegación con Expo Router

**Rutas implementadas:**
```
/                    → Lista de tareas (index.tsx)
/tasks/new           → Crear tarea (modal)
/tasks/[id]          → Editar tarea (parámetro dinámico)
Paso de parámetros:
typescript// Navegar con parámetros
router.push(`/tasks/${task.id}`);

// Recibir parámetros
const { id } = useLocalSearchParams<{ id: string }>();
```

### 5️⃣ Características UI/UX

#### Pantalla Principal:
- ✅ **Header personalizado** con fecha actual y contador de progreso
- ✅ **Checkbox interactivo** para marcar tareas como completadas
- ✅ **Estado visual** de completado (texto tachado + color gris)
- ✅ **Pull to refresh** - deslizar hacia abajo para recargar
- ✅ **Tap en tarjeta** para editar tarea
- ✅ **Botón flotante** para agregar nueva tarea
- ✅ **SafeAreaView** para ajuste a diferentes pantallas

#### Formularios:
- ✅ **Validación en tiempo real** con mensajes de error
- ✅ **Inputs con diseño moderno** (bordes redondeados, sombras)
- ✅ **TextArea** para descripción larga
- ✅ **Loading states** en botones

#### Edición de Tareas:
- ✅ **Pre-carga de datos** existentes
- ✅ **Botón eliminar** con confirmación
- ✅ **Navegación fluida** de regreso

🐛 Solución de Problemas
Error: "Unable to resolve module"
bashnpm install
npx expo start -c
Error: "Network request failed"
bash# Verificar que JSON Server esté corriendo
npm run server

# Verificar la URL en lib/services/api.ts
# Si usas dispositivo físico, verifica la IP
Error: NativeWind no aplica estilos
bash# Verificar babel.config.js
# Reiniciar con caché limpia
npx expo start -c
Error de TypeScript
bash# Reiniciar TypeScript server en VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
El botón no responde
bash# Limpiar caché completamente
rm -rf .expo
rm -rf node_modules/.cache
npx expo start -c
JSON Server no inicia
bash# Verificar que db.json exista
cat db.json

# Verificar puerto 3000 disponible
lsof -i :3000

# Si está ocupado, matar proceso
kill -9 $(lsof -t -i:3000)

## 📚 Recursos y Referencias

### Documentación Oficial:
- [Expo Documentation](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Expo Router](https://expo.github.io/router/docs/)
- [NativeWind](https://www.nativewind.dev/)
- [Zod](https://zod.dev/)
- [JSON Server](https://github.com/typicode/json-server)

### Tutoriales Útiles:
- [Expo Router Tutorial](https://docs.expo.dev/router/introduction/)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)
- [TypeScript with React Native](https://reactnative.dev/docs/typescript)

## 📞 Contacto y Soporte

**Estudiante:** Matias Roldan  
**Docente:** Milton Velásquez  
**Institución:** Unidad Educativa Técnico Salesiano  
**Correo:** roldanmatias441@gmail.com 
**GitHub:** MatiasRol/ https://github.com/MatiasRol
