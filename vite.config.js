import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     find: '@',
  //     replacement: path.resolve(__dirname, 'src')
  //   }
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://yq01-kg-m42-tmp09.yq01.baidu.com:8087',
        changeOrigin: true
      }
    }
  }
})
