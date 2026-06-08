import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// CONVENCIONES-APPS §1: base relativa para servir bajo el subdominio.
export default defineConfig({
  base: './',
  // Los `closer-click-*` son Web Components (custom elements), no componentes Vue.
  plugins: [vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith('closer-click-') } } })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: { port: 3120, host: true }
})
