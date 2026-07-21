import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';

const getLastUpdated = () => {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cd', '--date=format:%B %Y'], { encoding: 'utf8' }).trim().toLowerCase();
  } catch {
    return 'may 2026';
  }
};

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  define: {
    __LAST_UPDATED__: JSON.stringify(getLastUpdated()),
  },
  plugins: [
    {
      name: 'treat-src-js-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (!/src\/.*\.js$/.test(id.replaceAll('\\', '/'))) {
          return null;
        }

        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
  ],
});
