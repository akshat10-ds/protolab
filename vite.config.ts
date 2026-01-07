import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { editorApiPlugin } from './src/server/editorApi';

export default defineConfig({
  plugins: [react(), editorApiPlugin()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-hook-form@7.55.0': 'react-hook-form',
      'next-themes@0.4.6': 'next-themes',
      'lucide-react@0.487.0': 'lucide-react',
      'figma:asset/e709e4cd7ce1256d2051ca5f8be620211ba7aaf0.png': path.resolve(__dirname, './src/assets/e709e4cd7ce1256d2051ca5f8be620211ba7aaf0.png'),
      'figma:asset/c15fce950ce25a720907b0111d6fb756fc298c2d.png': path.resolve(__dirname, './src/assets/c15fce950ce25a720907b0111d6fb756fc298c2d.png'),
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext',
    outDir: 'build'
  },
  server: {
    port: 3000,
    open: true
  }
});