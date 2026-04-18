<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api';

const router = useRouter();
const route = useRoute();
const categories = ref([]);
const product = ref({ name: '', price: 0, categoryId: '', description: '' });
const isEditing = ref(false);

onMounted(async () => {
  // Cargar categorías para el select
  const catRes = await api.get('/categories');
  categories.value = catRes.data;

  // Si hay un ID en la URL, estamos editando
  if (route.params.id) {
    isEditing.value = true;
    const prodRes = await api.get(`/products/${route.params.id}`);
    product.value = prodRes.data;
  }
});

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await api.put(`/products/${route.params.id}`, product.value);
    } else {
      await api.post('/products', product.value);
    }
    router.push('/products');
  } catch (err) {
    alert('Error al guardar el producto');
  }
};
</script>

<template>
  <div class="container">
    <h2>{{ isEditing ? 'Editar Plato' : 'Nuevo Plato' }}</h2>
    <form @submit.prevent="handleSubmit" class="form-card">
      <div class="group">
        <label>Nombre del Plato</label>
        <input v-model="product.name" required />
      </div>

      <div class="group">
        <label>Categoría (Relación)</label>
        <select v-model="product.categoryId" required>
          <option value="" disabled>Seleccione una categoría</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="group">
        <label>Precio (Bs)</label>
        <input type="number" step="0.50" v-model="product.price" required />
      </div>

      <div class="group">
        <label>Descripción</label>
        <textarea v-model="product.description"></textarea>
      </div>

      <div class="actions">
        <button type="button" @click="router.back()">Cancelar</button>
        <button type="submit" class="btn-primary">Guardar Producto</button>
      </div>
    </form>
  </div>
</template>