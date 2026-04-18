# 🍴 Restaurante App - Vue 3 + JSON Server Auth

Sistema de gestion para restaurantes que permite administrar un menu de productos y sus categorias con un sistema de autenticacion real.

## 🚀 Caracteristicas
- **Autenticacion Completa:** Registro, Login y Logout utilizando JWT (JSON Server Auth).
- **CRUD de Productos:** Gestion completa de platos (Crear, Leer, Actualizar, Eliminar).
- **CRUD de Categorias:** Entidad relacionada para organizar los productos.
- **Buscador y Filtros:** Filtrado dinamico por nombre y tipo de producto.
- **Rutas Protegidas:** Acceso restringido a la gestion solo para usuarios autenticados.
- **Diseño Responsivo:** Interfaz adaptable a dispositivos moviles y escritorio.

## Tecnologias Utilizadas
- **Frontend:** Vue 3 (Composition API), Vite, Pinia (Estado), Vue Router.
- **Backend:** JSON Server + JSON Server Auth.
- **Estilos:** CSS3 Moderno / Flexbox / Grid.
- **Cliente HTTP:** Axios.

## Requisitos Previos
Tener instalado [Node.js](https://nodejs.org/) (version 16 o superior).

## 🛠️ Instalacion y Configuracion

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jimena-montano/ProyectoFinalVue.git
   
2. Configurar el Backend:
Navega a la carpeta del servidor e instala las dependencias:

    ```bash
    cd restaurante-api
    npm install

3. Configurar el Frontend:
En una nueva terminal, navega a la carpeta del frontend e instala las dependencias:

    ```bash
    cd restaurante-vue
    npm install
    
4. Variables de Entorno:
Crea un archivo .env en la raiz del frontend con la siguiente linea:

    ```bash
    VITE_API_URL=http://localhost:3000
  
- Modo de Uso: 
Para que la aplicacion funcione correctamente, se debe iniciar ambos servidores:

 1. Iniciar el Backend (Puerto 3000)
  Desde la carpeta del backend:

    ```Bash
    node server.js
 2. Iniciar el Frontend (Puerto 5173)
  Desde la carpeta del frontend:

    ```bash
    npm run dev
- Abra http://localhost:5173 en su navegador.
