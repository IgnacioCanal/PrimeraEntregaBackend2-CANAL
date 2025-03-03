# Proyecto Final Backend 1

## Descripción

**Preentrega2-CANAL** es una aplicación para la gestión de productos y carritos de compras, creada con **Node.js**, **Express**, y **Socket.io**. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre productos y carritos. Además, se incorpora una experiencia interactiva con **WebSockets**, actualizando la interfaz de usuario en tiempo real sin necesidad de recargar la página.

La aplicación utiliza **Handlebars (HBS)** para renderizar las vistas de productos de forma dinámica, mejorando el rendimiento y la experiencia del usuario. La integración de **Socket.io** facilita la sincronización en tiempo real de los productos y carritos entre todos los usuarios conectados, permitiendo un entorno de compra más fluido.

## Características

### **Gestión de Productos**
- **Crear productos**: Permite agregar nuevos productos al catálogo.
- **Listar productos**: Muestra todos los productos disponibles en el inventario.
- **Actualizar productos**: Modifica las características de un producto existente.
- **Eliminar productos**: Elimina un producto del inventario.

### **Gestión de Carritos**
- **Crear carritos**: Permite la creación de nuevos carritos de compra.
- **Listar carritos**: Muestra todos los carritos de compra existentes.
- **Ver detalles de un carrito**: Visualiza el contenido de un carrito específico.
- **Agregar productos al carrito**: Permite añadir productos al carrito de compras.
- **Eliminar productos del carrito**: Elimina productos específicos del carrito.

### **Nuevas Funcionalidades**

#### **Visualización Dinámica de Productos con Handlebars (HBS)**
- La aplicación utiliza **Handlebars (HBS)** para renderizar las vistas de productos de manera eficiente. Las vistas se actualizan dinámicamente, lo que mejora el rendimiento y la experiencia interactiva del usuario.

#### **Comunicación en Tiempo Real con WebSockets y Socket.io**
- Se ha implementado **Socket.io** para permitir la sincronización en tiempo real entre los productos y los carritos de compra. Cualquier cambio realizado por un usuario se refleja automáticamente en todos los usuarios conectados, sin necesidad de recargar la página.

#### **Interacción en Tiempo Real con Sincronización de Carritos**
- Los cambios en los carritos (como agregar o eliminar productos) se actualizan en tiempo real para todos los usuarios conectados, proporcionando una experiencia de compra fluida.

#### **Carritos Dinámicos en el Navegador**
- La lista de carritos está disponible en el **navbar** de la aplicación, con la posibilidad de ver la cantidad de productos de cada carrito en un menú desplegable, lo que permite gestionar múltiples carritos de manera intuitiva.

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

## Uso

Para probar los endpoints de la API, puedes usar herramientas como **Postman** o realizar las peticiones desde el frontend.


