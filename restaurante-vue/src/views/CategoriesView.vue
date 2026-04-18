<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const categories = ref([]);
const newCategoryName = ref('');
const editingId = ref(null);

const fetchCategories = async () => {
  const res = await api.get('/categories');
  categories.value = res.data;
};

const saveCategory = async () => {
  if (editingId.value) {
    await api.put(`/categories/${editingId.value}`, { name: newCategoryName.value });
  } else {
    await api.post('/categories', { name: newCategoryName.value });
  }
  newCategoryName.value = '';
  editingId.value = null;
  fetchCategories();
};

const editCategory = (cat) => {
  newCategoryName.value = cat.name;
  editingId.value = cat.id;
};

const deleteCategory = async (id) => {
  if (confirm('¿Eliminar categoría? Los productos asociados podrían eliminarse.')) {
    await api.delete(`/categories/${id}`);
    fetchCategories();
  }
};

onMounted(fetchCategories);
</script>

<template>
  <div class="container">
    <h1>Gestión de Categorías</h1>
    <div class="form-inline">
      <input v-model="newCategoryName" placeholder="Nombre de categoría" />
      <button @click="saveCategory">{{ editingId ? 'Actualizar' : 'Agregar' }}</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.id">
          <td>{{ cat.name }}</td>
          <td>
            <button @click="editCategory(cat)" class="btn-edit">Editar</button>
            <button @click="deleteCategory(cat.id)" class="btn-delete">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Botones */
button { cursor: pointer; padding: 0.5rem 1rem; border-radius: 6px; border: none; font-weight: 600; }
.btn-edit { background: #fbbf24; color: white; margin-right: 0.5rem; }
.btn-delete { background: #ef4444; color: white; }
</style>