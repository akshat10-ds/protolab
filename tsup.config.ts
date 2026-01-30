import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/design-system/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  outDir: 'dist',
  minify: false,
  splitting: false,
  treeshake: true,
});
