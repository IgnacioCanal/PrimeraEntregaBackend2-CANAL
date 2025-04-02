# Victornillo Ferretería - Proyecto Final: Programación Backend II: Diseño y Arquitectura Backend

## Descripción

**Victornillo Ferretería** es una aplicación de ecommerce completa desarrollada como proyecto final para el curso de Programación Backend II: Diseño y Arquitectura Backend, en Coderhouse. Construida con **Node.js**, **Express**, y **MongoDB**, esta aplicación permite gestionar productos, carritos de compra, usuarios, y tickets de compra, con un enfoque en la interactividad y la experiencia del usuario. Utiliza **Handlebars** para renderizar vistas dinámicas, **Socket.io** para actualizaciones en tiempo real, **Nodemailer** para enviar correos electrónicos, y **Passport** con **JWT** para autenticación y autorización seguras.

La aplicación está diseñada para simular una ferretería online, donde los usuarios pueden registrarse, explorar productos, agregar items a su carrito, realizar compras, y recibir confirmaciones por email. Los administradores tienen acceso a funcionalidades avanzadas, como la gestión de productos y tickets.

---

## Características Principales

### **Backend**
- **Gestión de Productos**:
  - Crear, leer, actualizar y eliminar productos (CRUD).
  - Eliminación de productos por nombre (para administradores).
  - Paginación y filtrado de productos.
- **Gestión de Carritos**:
  - Creación automática de un carrito al registrar un usuario.
  - Agregar y eliminar productos del carrito.
  - Visualización de los productos en el carrito con precios y cantidades.
  - Eliminación completa del carrito.
- **Gestión de Usuarios**:
  - Registro de usuarios con nombre, apellido, edad, email y contraseña.
  - Login con autenticación basada en email y contraseña.
  - Restauración de contraseña.
  - Roles de usuario (`user` y `admin`) para control de acceso.
  - Perfil de usuario con datos personales y carrito asociado.
- **Autenticación y Autorización**:
  - Uso de **Passport** con estrategias `local` (registro, login, restore-password) y `jwt` (para rutas protegidas).
  - Tokens JWT almacenados en cookies seguras (`httpOnly`, `secure`).
- **Sistema de Tickets**:
  - Generación de tickets al finalizar una compra.
  - Visualización de tickets para usuarios y administradores.
  - Manejo de productos no procesados (por falta de stock) durante la compra.
- **Mailing con Nodemailer**:
  - Envío de correos de bienvenida al registrar un usuario.
  - Correos personalizados con el logo de Victornillo Ferretería.
- **WebSockets con Socket.io**:
  - Sincronización en tiempo real de productos para administradores (vista `/realtimeproducts`).
  - Actualización instantánea de la lista de productos al agregar o eliminar.

### **Frontend**
- **Renderizado Dinámico con Handlebars**:
  - Vistas para productos, carritos, perfil de usuario, tickets, y más.
  - Interfaz responsive con **Materialize CSS**.
- **Interactividad en Tiempo Real**:
  - Actualización de productos en tiempo real en la vista de administración.
  - Notificaciones con **Toastify** para acciones como agregar/eliminar productos del carrito o finalizar una compra.
- **Gestión de Carritos**:
  - Vista detallada del carrito con productos, cantidades y precios.
  - Botones para agregar, eliminar productos, o vaciar el carrito.
- **Sistema de Tickets**:
  - Vista de tickets generados tras una compra, con detalles como código, fecha, monto total, y productos comprados.
- **Perfil de Usuario**:
  - Muestra los datos del usuario autenticado y su carrito asociado.

---

## Tecnologías Utilizadas

- **Backend**:
  - Node.js
  - Express
  - MongoDB (con Mongoose)
  - Socket.io (para WebSockets)
  - Nodemailer (para envío de correos)
  - Passport (autenticación)
  - JWT (JSON Web Tokens)
  - Joi (validación de datos)
- **Frontend**:
  - Handlebars (motor de plantillas)
  - Materialize CSS (framework de diseño)
  - Toastify (notificaciones)
  - Socket.io-client (para comunicación en tiempo real)
- **Otros**:
  - dotenv (gestión de variables de entorno)
  - bcrypt (hashing de contraseñas)

---

## Endpoints Principales

### **Productos**
- `GET /api/products`: Lista todos los productos (con paginación).
- `GET /api/products/:productId`: Obtiene un producto por ID.
- `POST /api/products`: Crea un nuevo producto (solo admin).
- `PUT /api/products/:productId`: Actualiza un producto (solo admin).
- `DELETE /api/products/:productId`: Elimina un producto (solo admin).

### **Carritos**
- `GET /api/carts`: Lista todos los carritos (solo admin).
- `GET /api/carts/:cartId`: Obtiene los detalles de un carrito.
- `POST /api/carts`: Crea un nuevo carrito.
- `POST /api/carts/:cartId/products/:productId`: Agrega un producto al carrito.
- `DELETE /api/carts/:cartId/products/:productId`: Elimina un producto del carrito.
- `DELETE /api/carts/:cartId`: Vacía el carrito.
- `POST /api/carts/:cartId/purchase`: Finaliza la compra y genera un ticket.

### **Usuarios y Sesiones**
- `POST /api/sessions/register`: Registra un nuevo usuario y envía un correo de bienvenida.
- `POST /api/sessions/login`: Autentica al usuario y genera un token JWT.
- `GET /api/sessions/current`: Devuelve los datos del usuario autenticado.
- `POST /api/sessions/restore-password`: Restaura la contraseña del usuario.
- `GET /api/sessions/logout`: Cierra la sesión y elimina el token.

### **Tickets**
- `GET /api/tickets`: Lista todos los tickets (solo admin).
- `GET /api/tickets/:ticketId`: Obtiene los detalles de un ticket.

---

## Vistas Principales (Frontend)

- `/`: Lista de productos disponibles para todos los usuarios.
- `/realtimeproducts`: Vista de administración para gestionar productos en tiempo real (solo admin).
- `/cart/:cartId`: Detalles del carrito del usuario.
- `/tickets/:ticketId`: Detalles de un ticket de compra.
- `/profile`: Perfil del usuario autenticado.
- `/login` y `/register`: Formularios de login y registro.
- `/restore-password`: Formulario para restaurar contraseña.

---

## Requisitos

- Node.js (versión 20.17.0 o superior)
- MongoDB (local o en la nube, como MongoDB Atlas)
- Una cuenta de Gmail para enviar correos con Nodemailer (requiere contraseña de aplicación)

---

## Instalación

1. **Clonar el Repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd EntregaFinal