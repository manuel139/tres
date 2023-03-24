import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('Tres') && tag !== 'TresCanvas',
      },
    },
  }),
  AutoImport({
    dts: true,
    eslintrc: {
      enabled: true, // <-- this
    },
    imports: ['vue'],
  }),
  Components({ /* options */ }),],
  resolve: {
    alias: {
      '/@': resolve(__dirname, '../src'),
      
    },
    dedupe: ['@tresjs/core', 'three'],
  },
})
