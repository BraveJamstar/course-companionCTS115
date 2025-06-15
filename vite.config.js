// vite.config.js
export default {
  server: {
    proxy: {
      '/ask': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ask/, '/ask'),
      },
    },
  },
};
