<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />

  <main class="main-content">
    <div class="app-container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>

  <footer class="app-footer">
    <p>&copy; 2026 Restaurante App</p>
  </footer>
</template>

<style>
/* ESTILOS GLOBALES 
  Se aplican a toda la aplicación para mantener coherencia estética 
*/
:root {
  --primary: #e67e22;    /* Naranja principal */
  --secondary: #d35400;  /* Naranja oscuro */
  --dark: #2c3e50;       /* Azul oscuro/gris */
  --light: #f8f9fa;      /* Fondo claro */
  --text: #333;          /* Texto principal */
  --error: #e74c3c;      /* Rojo para errores */
  --success: #27ae60;    /* Verde para éxitos */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--light);
  color: var(--text);
  line-height: 1.6;
}

/* Contenedor con ancho máximo para pantallas grandes */
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.main-content {
  padding: 40px 20px;
  min-height: calc(100vh - 140px); /* Ajuste para Navbar y Footer */
}

.app-footer {
  text-align: center;
  padding: 20px;
  background-color: white;
  color: #777;
  font-size: 0.9rem;
  border-top: 1px solid #ddd;
}

/* Utilidades generales para botones y formularios que usarás en todas las vistas */
.container {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

h2 {
  margin-bottom: 20px;
  color: var(--dark);
  border-bottom: 2px solid var(--primary);
  display: inline-block;
}

button {
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Animación simple de transición entre páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Diseño responsivo básico */
@media (max-width: 768px) {
  .main-content {
    padding: 20px 10px;
  }
}
</style>