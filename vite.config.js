import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load .env file based on the current mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    define: {
      // Makes VITE_ variables available via import.meta.env
      'import.meta.env': {
        VITE_BACKEND_URL: JSON.stringify(env.VITE_BACKEND_URL)
      }
    }
  };
});
