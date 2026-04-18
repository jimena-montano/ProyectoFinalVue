<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">Restaurante App 🍴</router-link>
      
      <div class="nav-links" v-if="authStore.token">
        <router-link to="/products">Platos</router-link>
        <router-link to="/categories">Categorías</router-link>
        <router-link to="/product/new" class="btn-add">+ Nuevo Plato</router-link>
        <span class="user-name">Hi, {{ authStore.user?.name }}</span>
        <button @click="logout" class="btn-logout">Cerrar Sesión</button>
      </div>

      <div class="nav-links" v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Registro</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--dark);
  padding: 1rem 0;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
}

.nav-links a:hover {
  color: var(--primary);
}

.btn-add {
  background: var(--primary);
  padding: 5px 15px;
  border-radius: 20px;
  color: white !important;
}

.btn-logout {
  background: transparent;
  border: 1px solid #ff4d4d;
  color: #ff4d4d;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-logout:hover {
  background: #ff4d4d;
  color: white;
}

.user-name {
  font-style: italic;
  color: #aaa;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 15px;
  }
}
</style>