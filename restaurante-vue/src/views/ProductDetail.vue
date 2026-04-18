<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  // Obtenemos el ID desde la URL dinámica
  const id = route.params.id;
  const res = await api.get(`/products/${id}`);
  product.value = res.data;
});
</script>

<template>
  <div v-if="product" class="container">
    <h1>{{ product.name }}</h1>
    <p>Precio: {{ product.price }} Bs</p>
    <p>Descripción: {{ product.description }}</p>
    <router-link to="/products">Volver</router-link>
  </div>
</template>