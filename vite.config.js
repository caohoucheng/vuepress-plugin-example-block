const path = require('path')
export default {
  // 配置选项
  base: '/',
  build: {
    lib: {
      dir: 'lib',
      entry: path.resolve(__dirname, 'src/index.js'),
      name: "example-block",
      formats: ['umd'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      output: {
        dir: 'lib'
      }
    }
  }
}