// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import fs from 'fs';
import path from 'path';

// https://astro.build/config
export default defineConfig({
    site: process.env.SITE_NAME || 'https://example.com', // Usar la variable SITE_NAME
    integrations: [tailwind(), react()],
    output: 'server',  
    vite: {
        server: {
          proxy: {
            '/api': {
              target: 'https://localhost:7292', // El servidor con el certificado autofirmado
              changeOrigin: true,  // Cambia el origen de la solicitud para que parezca que viene del servidor
              secure: false,       // Deshabilita la validación del certificado (esto es clave para certificados autofirmados)
              rewrite: (path) => path.replace(/^\/api/, ''), // Si es necesario, reescribe las rutas para que coincidan
            },
          },
        },
      },
});