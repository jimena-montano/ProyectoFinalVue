<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref(null);

const handleSubmit = async () => {
  try {
    error.value = null;
    await authStore.login({
      email: email.value,
      password: password.value
    });
    // Si el login es exitoso, redirigimos a la lista de productos
    router.push('/products');
  } catch (err) {
    error.value = 'Credenciales incorrectas';
    console.error(err);
  }
};
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit" class="login-card">
      <h2>Restaurante App</h2>
      <p>Inicia sesión para gestionar el menú</p>

      <div class="form-group">
        <label>Correo Electrónico</label>
        <input 
          v-model="email" 
          type="email" 
          placeholder="ejemplo@correo.com" 
          required 
        />
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input 
          v-model="password" 
          type="password" 
          placeholder="••••••••" 
          required 
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" class="btn-login">Ingresar</button>
      
      <p class="footer-text">
        ¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  color: var(--primary);
  margin-bottom: 0.5rem;
  text-align: center;
}

p {
  text-align: center;
  color: #666;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: var(--primary);
}

.btn-login {
  width: 100%;
  padding: 12px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-login:hover {
  background-color: #d35400; /* Un naranja más oscuro */
}

.error-message {
  background-color: #fce4e4;
  color: #cc0000;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  text-align: center;
}

.footer-text {
  margin-top: 1rem;
  font-size: 0.85rem;
}
</style>