# Sistema de Planificación de Turnos Mineros

Una aplicación web React para la planificación automática de turnos de supervisores de perforación en operaciones mineras. El sistema garantiza que siempre haya exactamente 2 supervisores perforando, nunca 3, y nunca solo 1 una vez que el tercer supervisor esté activo.

## 🚀 Características

- **Planificación Inteligente**: Algoritmo que genera cronogramas cumpliendo reglas estrictas de seguridad
- **Interfaz Responsiva**: Diseño adaptativo para desktop y móvil usando Tailwind CSS
- **Validación en Tiempo Real**: Validaciones de formulario y verificación de reglas del negocio
- **Visualización Clara**: Tabla interactiva con colores para diferentes estados
- **Casos de Prueba**: Ejemplos predefinidos para testing rápido
- **Arquitectura Limpia**: Componentes organizados por atomic design

## 📋 Reglas del Sistema

### Reglas Fundamentales
1. **Siempre 2 supervisores perforando** simultáneamente
2. **Nunca 3 supervisores perforando** al mismo tiempo
3. **Nunca solo 1 supervisor perforando** una vez que S3 esté activo
4. **S1 siempre cumple régimen completo** sin modificaciones
5. **S2 y S3 se ajustan** para cumplir las reglas

### Ciclo de un Supervisor
- **S**: Subida (1 día)
- **I**: Inducción (1-5 días configurable)
- **P**: Perforación (trabajo efectivo)
- **B**: Bajada (1 día)
- **D**: Descanso

### Régimen Variable (NxM)
- **N**: Días de trabajo (subida + inducción + perforación)
- **M**: Días libres totales (bajada + descanso)
- **Días descanso real**: M - 2

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos y diseño responsivo
- **ESLint** - Linting y calidad de código
- **JavaScript** - Lenguaje de programación

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd prueba-cronograma
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en navegador**
   ```
   http://localhost:5173
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── atoms/          # Componentes básicos (Button, Input, etc.)
│   ├── molecules/      # Componentes compuestos (InputGroup, etc.)
│   ├── organisms/      # Componentes complejos (ConfigPanel, etc.)
│   └── templates/      # Layouts (MainLayout, etc.)
├── hooks/              # Custom hooks (useConfig)
├── utils/              # Utilidades y lógica de negocio
│   ├── constants.js    # Constantes del sistema
│   ├── validators.js   # Validaciones
│   ├── scheduleGenerator.js  # Generador de cronogramas
│   └── validationRules.js    # Reglas de validación
├── App.jsx             # Componente principal
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🎯 Casos de Prueba Obligatorios

1. **Régimen 14x7 con 5 días inducción, 90 días perforación**
2. **Régimen 21x7 con 3 días inducción, 90 días perforación**
3. **Régimen 10x5 con 2 días inducción, 90 días perforación**
4. **Régimen 14x6 con 4 días inducción, 90 días perforación**

## 🔧 Configuración

### Parámetros del Régimen
- **Días de trabajo (N)**: 5-30 días
- **Días libres totales (M)**: 4-14 días
- **Días de inducción**: 1-5 días
- **Total días perforación**: 30-180 días

### Estados del Supervisor
- 🔵 **S**: Subida
- 🟡 **I**: Inducción
- 🟢 **P**: Perforación
- 🔴 **B**: Bajada
- ⚪ **D**: Descanso

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Preview del Build
```bash
npm run preview
```

### Despliegue en Netlify/Vercel
1. Subir el contenido de `dist/` generado por `npm run build`
2. Configurar como SPA (Single Page Application)

## 📊 Arquitectura

### Atomic Design
- **Atoms**: Componentes indivisibles (Button, Input, StateCell)
- **Molecules**: Combinaciones de atoms (InputGroup, LegendItem)
- **Organisms**: Componentes complejos (ConfigPanel, ScheduleGrid)
- **Templates**: Estructuras de layout (MainLayout)

### Custom Hooks
- `useConfig`: Manejo de estado de configuración y validaciones

### Utilidades
- Centralización de lógica de negocio
- Validaciones reutilizables
- Constantes del sistema

## 🧪 Testing

Para ejecutar tests (si se implementan):
```bash
npm run test
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto es parte de una prueba técnica y está destinado únicamente para evaluación.

## 👨‍💻 Autor

Desarrollado como parte de una prueba técnica para algoritmo de cronograma de supervisores.

---

**Nota**: Este sistema está diseñado específicamente para el contexto minero de perforación con 3 supervisores, cumpliendo reglas estrictas de seguridad operacional.
