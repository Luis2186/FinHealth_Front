// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: process.env.SITE_NAME || 'https://example.com', // Usar la variable SITE_NAME
    integrations: [tailwind(), react()],
    output: 'server',
});