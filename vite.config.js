import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {  // This should match the path you use in your Axios call
                target: 'http://stations.arabiaweather.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }

})


