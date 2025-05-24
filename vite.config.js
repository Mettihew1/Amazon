import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          ['@emotion/babel-plugin', { sourceMap: true }],
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  optimizeDeps: {
    include: [
      '@mui/icons-material',
      '@emotion/react',
      'react-slick', 
      'slick-carousel',
      '@emotion/styled',
      'react',
        'react-dom'
    ]
  }
});