import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/loginEmpoderarte/', // muy importante
  plugins: [react()]
});
