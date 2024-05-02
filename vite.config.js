import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {  // This should match the path you use in your Axios call
                target: 'http://localhost:3001',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                // ... additional inputs
            },
            // Ensure config file is included in the output
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'appConfig.json') return assetInfo.name;
                    return `assets/${assetInfo.name}`;
                },
            },
        },
    }
});


