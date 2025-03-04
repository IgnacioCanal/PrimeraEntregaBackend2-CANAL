# Proyecto Final Backend 2

## Descripción

**PrimeraEntrega** es una aplicación robusta para la gestión de un ecommerce, desarrollada con **Node.js**, **Express**, y **Socket.io**. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos y carritos de compras, además de incorporar un sistema completo de gestión de usuarios con autenticación y autorización. La aplicación está diseñada para ofrecer una experiencia interactiva y fluida, utilizando **Handlebars (HBS)** para renderizar vistas dinámicas y **Socket.io** para sincronizar productos y carritos en tiempo real entre todos los usuarios conectados, sin necesidad de recargar la página.

## Características

### **Gestión de Productos**
- **Crear productos**: Permite agregar nuevos productos al catálogo.
- **Listar productos**: Muestra todos los productos disponibles en el inventario.
- **Actualizar productos**: Modifica las características de un producto existente.
- **Eliminar productos**: Elimina un producto del inventario.

### **Gestión de Carritos**
- **Crear carritos**: Permite la creación de nuevos carritos de compra, asociados automáticamente a usuarios al registrarse.
- **Listar carritos**: Muestra todos los carritos de compra existentes.
- **Ver detalles de un carrito**: Visualiza el contenido de un carrito específico.
- **Agregar productos al carrito**: Permite añadir productos al carrito de compras.
- **Eliminar productos del carrito**: Elimina productos específicos del carrito.

### **Gestión de Usuarios**
- **Registro de usuarios**: Los usuarios pueden registrarse con nombre, apellido, email, edad y contraseña. Al registrarse, se crea automáticamente un carrito asociado.
- **Login de usuarios**: Autentica a los usuarios y genera un token JWT para acceso seguro.
- **Perfil de usuario**: Muestra los datos del usuario autenticado, incluyendo su carrito asociado.
- **Roles de usuario**: Soporta roles como 'user' y 'admin', controlando el acceso a funcionalidades específicas.

### **Autenticación y Autorización**
- **Passport**: Implementa estrategias de autenticación local para registro y login, además de JWT para autenticación basada en tokens.
- **JWT**: Los tokens se almacenan en cookies seguras (`httpOnly` y `secure`), garantizando la protección de la sesión del usuario.
- **Estrategia "current"**: Permite obtener los datos del usuario autenticado a partir del token JWT.

### **Nuevas Funcionalidades**

#### **Visualización Dinámica de Productos y Carritos con Handlebars (HBS)**
- La aplicación utiliza **Handlebars (HBS)** para renderizar vistas de productos y carritos de manera eficiente y dinámica, mejorando la experiencia del usuario.

#### **Comunicación en Tiempo Real con WebSockets y Socket.io**
- **Socket.io** sincroniza en tiempo real los productos y carritos, reflejando automáticamente cualquier cambio (como agregar o eliminar productos) para todos los usuarios conectados.

#### **Interacción en Tiempo Real con Sincronización de Carritos**
- Los cambios en los carritos se actualizan instantáneamente para todos los usuarios, proporcionando una experiencia de compra fluida y colaborativa.


## Endpoints

### **Productos**
- **GET** `/api/products`: Lista todos los productos.
- **GET** `/api/products/:productId`: Obtiene los detalles de un producto específico.
- **POST** `/api/products`: Crea un nuevo producto.
- **PUT** `/api/products/:productId`: Actualiza un producto existente.
- **DELETE** `/api/products/:productId`: Elimina un producto.

### **Carritos**
- **GET** `/api/carts`: Lista todos los carritos.
- **GET** `/api/carts/:cartId`: Obtiene los detalles de un carrito específico.
- **POST** `/api/carts`: Crea un nuevo carrito.
- **POST** `/api/carts/:cartId/products/:productId`: Agrega un producto a un carrito.
- **DELETE** `/api/carts/:cartId/products/:productId`: Elimina un producto de un carrito.

### **Usuarios y Sesiones**
- **POST** `/api/sessions/register`: Registra un nuevo usuario y crea un carrito asociado.
- **POST** `/api/sessions/login`: Autentica al usuario y genera un token JWT.
- **GET** `/api/sessions/current`: Devuelve los datos del usuario autenticado basado en el token JWT.
- **POST** `/api/sessions/restore-password`: Permite restaurar la contraseña del usuario.
- **GET** `/api/sessions/logout`: Cierra la sesión del usuario y elimina la cookie del token.

## Uso

Para probar los endpoints de la API, puedes usar herramientas como **Postman** o interactuar desde el frontend. Asegúrate de incluir el token JWT en las cookies para acceder a rutas protegidas, como `/api/sessions/current`. Las vistas dinámicas están disponibles a través de la interfaz renderizada con Handlebars, y las actualizaciones en tiempo real se reflejan gracias a Socket.io.