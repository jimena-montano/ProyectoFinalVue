<template>
  <div class="products-container">
    <header class="header">
      <h1>Gestión de Menú (Productos)</h1>
    </header>

    <section class="toolbar">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="🔍 Buscar por nombre..." 
        class="input-search"
      />
      <select v-model="selectedCategory" class="select-filter">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </section>

    <div class="table-wrapper">
      <table class="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ getCategoryName(product.categoryId) }}</td>            
            <td>{{ formatCurrency(product.price) }}</td>
            <td class="actions">
              <router-link :to="`/product/${product.id}`" class="btn-info">Ver</router-link>
              <button @click="openEditModal(product)" class="btn-edit">Editar</button>
              <button @click="deleteProduct(product.id)" class="btn-delete">Eliminar</button>
            </td>
          </tr>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="4" class="empty-state">No se encontraron productos.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
        <form @submit.prevent="saveProduct">
          <div class="form-group">
            <label>Nombre:</label>
            <input v-model="form.name" required type="text" />
          </div>
          <div class="form-group">
            <label>Categoría:</label>
            <select v-model="form.categoryId" required>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Precio (Bs):</label>
            <input v-model.number="form.price" required type="number" step="0.10" placeholder="0.00" />
          </div>
          <div class="form-group">
            <label>Descripcion:</label>
            <input v-model="form.description" required type="text" />
          </div>
          <div class="modal-actions">
            <button type="button" @click="showModal = false" class="btn-cancel">Cancelar</button>
            <button type="submit" class="btn-save">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/services/api';

// Estado
const products = ref([]);
const categories = ref([]);
const searchQuery = ref('');
const selectedCategory = ref('');
const showModal = ref(false);
const isEditing = ref(false);
const currentId = ref(null);

const form = ref({
  name: '',
  categoryId: '',
  price: 0
});

// Carga de datos inicial
const fetchData = async () => {
  try {
    const [resProducts, resCategories] = await Promise.all([
      api.get('/products'),
      api.get('/categories')
    ]);
    products.value = resProducts.data;
    categories.value = resCategories.data;
  } catch (error) {
    alert('Error al cargar datos');
  }
};

onMounted(fetchData);

// Lógica de Filtro y Búsqueda
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value ? p.categoryId == selectedCategory.value : true;
    return matchesSearch && matchesCategory;
  });
});

// Ayudante para mostrar nombre de categoría
const getCategoryName = (id) => {
  const cat = categories.value.find(c => c.id === id);
  return cat ? cat.name : 'Sin categoría';
};

// Acciones CRUD
const openCreateModal = () => {
  isEditing.value = false;
  form.value = { name: '', categoryId: '', price: 0 };
  showModal.value = true;
};

const openEditModal = (product) => {
  isEditing.value = true;
  currentId.value = product.id;
  form.value = { ...product };
  showModal.value = true;
};

const saveProduct = async () => {
  try {
    if (isEditing.value) {
      await api.put(`/products/${currentId.value}`, form.value);
    } else {
      await api.post('/products', form.value);
    }
    showModal.value = false;
    fetchData(); // Refrescar lista
  } catch (error) {
    alert('Error al guardar');
  }
};

const deleteProduct = async (id) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    try {
      await api.delete(`/products/${id}`);
      fetchData();
    } catch (error) {
      alert('Error al eliminar');
    }
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'BOB',
  }).format(value);
};
</script>

<style scoped>
.products-container { padding: 2rem; max-width: 1000px; margin: 0 auto; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }

/* Barra de herramientas */
.toolbar { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.input-search { flex: 1; min-width: 200px; padding: 0.6rem; border-radius: 8px; border: 1px solid #ccc; }
.select-filter { padding: 0.6rem; border-radius: 8px; border: 1px solid #ccc; }

/* Tabla */
.table-wrapper { overflow-x: auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.product-table { width: 100%; border-collapse: collapse; text-align: left; }
.product-table th, .product-table td { padding: 1rem; border-bottom: 1px solid #eee; }
.product-table th { background-color: #f8f9fa; color: #555; }

/* Botones */
button { cursor: pointer; padding: 0.5rem 1rem; border-radius: 6px; border: none; font-weight: 600; }
.btn-primary { background: #382ef8; color: white; }
.btn-edit { background: #fbbf24; color: white; margin-right: 0.5rem; }
.btn-delete { background: #ef4444; color: white; }
.btn-info { color: #4f46e5; text-decoration: none; margin-right: 0.5rem; font-size: 0.9rem; }

/* Modal */
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal-content { background: white; padding: 2rem; border-radius: 12px; width: 100%; max-width: 400px; }
.form-group { margin-bottom: 1rem; display: flex; flex-direction: column; }
.form-group label { margin-bottom: 0.4rem; font-weight: bold; }
.form-group input, .form-group select { padding: 0.6rem; border: 1px solid #ddd; border-radius: 6px; }
.modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem; }
.btn-cancel { background: #9ca3af; color: white; }
.btn-save { background: #10b981; color: white; }

@media (max-width: 640px) {
  .header { flex-direction: column; gap: 1rem; text-align: center; }
  .toolbar { flex-direction: column; }
}
</style>