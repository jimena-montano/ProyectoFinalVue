<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);

const handleRegister = async () => {
  try {
    error.value = null;
    // JSON Server Auth requiere email y password obligatoriamente
    await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value
    });
    
    // Una vez registrado, enviamos al login o se puede loguear automáticamente
    alert('Usuario creado con éxito. Ahora puedes iniciar sesión.');
    router.push('/login');
  } catch (err) {
    error.value = err.response?.data || 'Error al registrar el usuario';
  }
};
</script>

<template>
  <div class="auth-container">
    <form @submit.prevent="handleRegister" class="auth-card">
      <h2>Crear Cuenta</h2>
      <p>Únete para gestionar tu restaurante</p>

      <div class="form-group">
        <label>Nombre Completo</label>
        <input v-model="name" type="text" placeholder="Tu nombre" required />
      </div>

      <div class="form-group">
        <label>Correo Electrónico</label>
        <input v-model="email" type="email" placeholder="email@ejemplo.com" required />
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input v-model="password" type="password" placeholder="Mínimo 4 caracteres" required />
      </div>

      <div v-if="error" class="error-box">
        {{ error }}
      </div>

      <button type="submit" class="btn-auth">Registrarse</button>

      <p class="footer-link">
        ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
}

.auth-card {
  background: #fff;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 420px;
}

h2 {
  color: var(--dark);
  text-align: center;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

input:focus {
  border-color: var(--primary);
  outline: none;
}

.btn-auth {
  width: 100%;
  padding: 14px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.error-box {
  background: #fff5f5;
  color: #d9534f;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  border-left: 4px solid #d9534f;
}

.footer-link {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}
</style>