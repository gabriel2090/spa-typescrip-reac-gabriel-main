# SPA Typescript React Gabriel

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Uso](#uso)
- [Rutas Principales](#rutas-principales)
- [Autenticación](#autenticación)
- [Testing](#testing)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Contacto](#contacto)

---

## Descripción

Aplicación web SPA desarrollada con React y TypeScript en el frontend, y Node.js/Express en el backend. Incluye autenticación JWT, gestión de usuarios, vistas protegidas y componentes reutilizables.

## Tecnologías

- **Frontend:** React, TypeScript, TailwindCSS
- **Backend:** Node.js, Express, JWT, bcrypt
- **Base de datos:** (especificar si usas alguna, ej: MongoDB, SQLite, JSON)
- **Testing:** Jest, React Testing Library

## Estructura del Proyecto

```
spa-typescrip-reac-gabriel-main/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── stores/
│   │   ├── utils/
│   │   └── ...
│   └── package.json
│
├── src/
│   ├── component/
│   ├── views/
│   ├── services/
│   ├── styles/
│   └── ...
│
├── public/
├── package.json
└── README.md
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/spa-typescrip-reac-gabriel-main.git
cd spa-typescrip-reac-gabriel-main
```

### 2. Instalar dependencias

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd backend
npm install
```

## Configuración

### Variables de entorno (Backend)

Crea un archivo `.env` en `backend/` con:

```
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=8h
```

### Otros ajustes

Configura la base de datos y otros servicios según tus necesidades.

## Scripts Disponibles

### Frontend

- `npm start` - Inicia la app en modo desarrollo
- `npm run build` - Compila la app para producción
- `npm test` - Ejecuta los tests

### Backend

- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm start` - Inicia el servidor en modo producción

## Uso

1. Inicia el backend:  
   ```bash
   cd backend
   npm run dev
   ```
2. Inicia el frontend:  
   ```bash
   npm start
   ```
3. Accede a `http://localhost:3000` en tu navegador.

## Rutas Principales

- `/` - Home
- `/dashboard` - Panel de usuario (protegido)
- `/products` - Vista de productos (admin)
- `/login-register/:formType` - Login y registro

## Autenticación

- Registro y login con JWT.
- Rutas protegidas mediante middleware.
- Almacenamiento seguro de contraseñas con bcrypt.

## Testing

- Pruebas unitarias y de integración con Jest y React Testing Library.
- Ejecuta `npm test` para correr los tests.

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama con tu feature: `git checkout -b feature/nueva-feature`
3. Haz commit de tus cambios: `git commit -m 'Agrega nueva feature'`
4. Haz push a la rama: `git push origin feature/nueva-feature`
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT.

## Contacto

- Autor: Gabriel
- Email: gabriel@ejemplo.com
- GitHub: [tuusuario](https://github.com/tuusuario)

---

¡Gracias por visitar este proyecto!