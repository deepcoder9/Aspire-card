import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import CardPage from './pages/CardPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CardPage }
  ]
})

const app = createApp(App);
app.use(createPinia());
app.use(router)
app.mount('#app')
