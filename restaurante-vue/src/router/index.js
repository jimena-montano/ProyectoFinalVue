import { createRouter, createWebHistory } from 'vue-router'

// Definición de las rutas
const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/login',
    name: 'login',
    // Carga perezosa (Lazy Loading) para mejor rendimiento
    component: () => import('../views/LoginView.vue'),
    meta: { public: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { public: true }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue'),
    meta: { public: false }
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetail.vue'),
    props: true, // Permite pasar el ID como prop al componente
    meta: { public: false }
  },
  {
    path: '/product/new',
    name: 'product-create',
    component: () => import('../views/ProductFormView.vue'),
    meta: { public: false }
  },
  {
    path: '/product/edit/:id',
    name: 'product-edit',
    component: () => import('../views/ProductFormView.vue'),
    props: true,
    meta: { public: false }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoriesView.vue'),
    meta: { public: false }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/**
 * NAVIGATION GUARD (Protección de rutas)
 * Se ejecuta antes de navegar a cualquier ruta.
 */
router.beforeEach((to) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const isPublic = to.matched.some(record => record.meta.public);

  // 1. Si la ruta es privada y no está autenticado -> Redirigir a Login
  if (!isPublic && !isAuthenticated) {
    return { name: 'login' };
  }

  // 2. Si ya está logueado e intenta ir a login/registro -> Redirigir a Products
  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    return { name: 'products' };
  }

  // 3. En cualquier otro caso, simplemente no retornar nada (o return true) 
  // para permitir la navegación automáticamente.
});

export default router