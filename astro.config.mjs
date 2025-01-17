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
    // vite: {
    //     server: {
    //         https: {
    //             key: fs.readFileSync(path.resolve('C:\\Users\\lilp_\\Desktop\\key_astro.pem')), // Ruta al archivo de certificado
    //             cert: fs.readFileSync(path.resolve('C:\\Users\\lilp_\\Desktop\\cert_astro.crt')), // Ruta a la clave privada
    //         },
    //     },
    // },
});