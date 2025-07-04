import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react', // Faster JSX compilation
    babel: {
      plugins: ['@emotion/babel-plugin'], // Better MUI styling
    },
  })],
  server: {
    port: 5173,
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx'], // Pre-warm critical files
    },
  },
  build: {
    sourcemap: false, // Disable for production
    minify: 'terser', // Better minification
    chunkSizeWarningLimit: 1500, // For MUI's larger chunks
    rollupOptions: {
      output: {
        manualChunks: {
          mui: ['@mui/material', '@mui/icons-material'],
          react: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      '@mui/material/Unstable_Grid2', // Tree-shakeable MUI imports
      '@mui/icons-material/ShoppingCart',
      '@mui/icons-material/Menu',
    ],
    exclude: ['js-big-decimal'], // If not needed
  },
});