# Plataforma Educativa Interactiva 📚

Plataforma web educativa que busca reforzar el aprendizaje de **Matemáticas y Español** mediante actividades interactivas y minijuegos para estudiantes de **1.º a 9.º grado**.

El proyecto se desarrolla como parte de un proceso de servicio social estudiantil, con el objetivo de ofrecer una herramienta educativa accesible, intuitiva y adaptable a diferentes dispositivos.

## 🎯 Objetivo y alcance

La plataforma permitirá a los estudiantes seleccionar una asignatura, un grado, un periodo académico y un tema para realizar actividades educativas.

El desarrollo inicial se centrará en **Matemáticas de sexto grado**, organizadas en cuatro periodos académicos. Posteriormente, se ampliarán los contenidos y las actividades de las demás áreas y grados.

Los grados que todavía no tengan contenido funcional se mostrarán como **«Próximamente»**.

## 🛠️ Tecnologías

- **React:** construcción de interfaces mediante componentes.
- **Vite:** entorno de desarrollo y compilación.
- **JavaScript:** lógica e interactividad.
- **CSS:** estilos y diseño adaptable.
- **React Router:** navegación entre páginas.
- **ESLint:** revisión de la calidad del código.
- **Git y GitHub:** control de versiones y trabajo colaborativo.

## 🚀 Instalación y ejecución

### Requisitos

Instala [Node.js](https://nodejs.org/) y [Git](https://git-scm.com/). Se recomienda utilizar Visual Studio Code como editor.

### 1. Clonar el repositorio

```bash
git clone https://github.com/DeiviDiaz/plataforma-educativa.git
cd plataforma-educativa
```

Si ya tienes el proyecto descargado, no necesitas clonarlo nuevamente.

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre en el navegador la dirección que muestra la terminal, normalmente `http://localhost:5173/`.

### 4. Comprobar el proyecto

Para revisar el código:

```bash
npm run lint
```

Para comprobar la compilación:

```bash
npm run build
```

## 📁 Estructura del proyecto

```text
src/
├── app/                  # Configuración de rutas
├── components/           # Componentes reutilizables
├── features/
│   ├── home/             # Inicio y selección de grado
│   ├── mathematics/      # Funcionalidades de Matemáticas
│   │   ├── pages/
│   │   ├── components/
│   │   ├── games/
│   │   └── data/
│   └── spanish/          # Funcionalidades de Español
│       ├── pages/
│       ├── components/
│       ├── games/
│       └── data/
├── styles/               # Estilos compartidos
├── utils/                # Funciones auxiliares
├── App.jsx               # Componente principal
├── index.css             # Estilos globales actuales
└── main.jsx              # Punto de entrada
```

Las carpetas se utilizarán progresivamente. No es necesario que todas contengan archivos desde el inicio.

## 📌 Estado del proyecto

**Etapa actual: desarrollo inicial.**

- [x] Configuración de React y Vite.
- [x] Configuración inicial de la navegación.
- [x] Página de inicio y selección de asignaturas.
- [x] Visualización de los grados 1.º a 9.º.
- [x] Primera versión de la selección de periodos de Matemáticas de sexto.
- [ ] Selección de temas por periodo.
- [ ] Desarrollo de los primeros minijuegos.
- [ ] Revisión sistemática de accesibilidad y funcionamiento en dispositivos móviles.
- [ ] Ampliación progresiva de Matemáticas y Español.

La lista debe actualizarse a medida que se completen y verifiquen las funcionalidades.

## 🤝 Trabajo colaborativo

Utilizamos `main` para la versión estable y `develop` para integrar funcionalidades antes de publicarlas.

Cada integrante debe trabajar en una rama independiente y enviar sus cambios mediante un **Pull Request hacia `develop`**.

### Flujo básico

1. Actualizar la rama `develop`.
2. Crear una rama para la tarea.
3. Realizar los cambios y probarlos.
4. Guardar los cambios mediante commits descriptivos.
5. Subir la rama a GitHub.
6. Abrir un Pull Request y solicitar revisión.

Ejemplo de creación de una rama:

```bash
git switch develop
git pull origin develop
git switch -c feature/nombre-de-la-tarea
```

**Importante:** no realizar cambios directamente en `main` o `develop`. Respetar las reglas de protección configuradas en GitHub y coordinar con el equipo las modificaciones que puedan afectar a otras funcionalidades.

## ♿ Principios de desarrollo

- Crear interfaces claras y fáciles de utilizar.
- Procurar la compatibilidad con computadores, tabletas y teléfonos.
- Considerar la accesibilidad y la navegación mediante teclado.
- Evitar recursos innecesariamente pesados.
- Mantener el contenido educativo separado de la presentación visual cuando sea conveniente.
- Reutilizar componentes cuando simplifiquen el mantenimiento.
- Verificar la exactitud de los contenidos y las respuestas de los minijuegos.
- Documentar las decisiones importantes y mantener actualizado este archivo.

---

**Meta del equipo:** construir una plataforma educativa interactiva, accesible y fácil de mantener, mediante un desarrollo progresivo y colaborativo.