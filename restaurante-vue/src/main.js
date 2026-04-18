import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Importamos los estilos globales que definimos en el paso anterior
import './assets/main.css'

const app = createApp(App)

// Instalamos Pinia (para la gestión de estados/auth)
app.use(createPinia())

// Instalamos el Router (para la navegación y protección de rutas)
app.use(router)

// Montamos la aplicación en el div con id "app" del index.html
app.mount('#app')