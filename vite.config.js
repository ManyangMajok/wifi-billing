import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        // Expose Vite to your local network
        host: '0.0.0.0', 
        port: 5173,
        strictPort: true,
        hmr: {
            // CRITICAL: Tell your phone to connect HMR to the ngrok tunnel
            host: 'hookier-gus-refractive.ngrok-free.dev', 
            protocol: 'wss', // Use Secure WebSockets for the tunnel
            clientPort: 443, // The public HTTPS port for ngrok
        },
        // Allows Vite to accept requests from ngrok domains
        allowedHosts: ['.ngrok-free.dev'], 
        cors: true,
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});