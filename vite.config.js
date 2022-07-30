export default {
  // 配置选项
  base: '/',
  build: {
    rollupOptions: {
      input: './src/index.js',
      output: {
        dir: 'lib',
        entryFileNames: (format) => `index.[format].js`
      }
    }
  }
}