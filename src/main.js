import { createApp } from 'vue'
import App from './App.vue'
import '@closerclick/closer-click-support'
import { createBackNav } from '@closerclick/closer-click-nav'
import './style.css'

// Navegación "volver" unificada del ecosistema (chevron flotante + botón físico
// de Android / gesto de iOS / atrás del navegador → cierra modal; si no hay
// nada → closer.click).
createBackNav()

// Registro del service worker (PWA) tras el load. CONVENCIONES §3.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {})
  })
}

createApp(App).mount('#app')
