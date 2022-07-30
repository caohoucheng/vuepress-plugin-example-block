const path = require('path')
const fs = require('fs')
const resolve = (_path) => {
  return path.resolve(__dirname, _path)
}
const { defaultTheme } = require('@vuepress/theme-default')
const exampleDemo = require("./../../src");
var md = require('markdown-it')();

module.exports = {
  port: "9000",
  base: "/my-components/",
  // dest: "./docs/.vuepress/build",
  lang: "zh-CN",
  title: "my-components",
  description: "my-components DOCS",
  plugins: [
    exampleDemo({
      path: __dirname,
      // dir: "../components"
    })
  ],
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '组件',
        children: [
          { text: 'table', link: '/guide/table' },
          { text: 'select', link: '/guide/select' }
        ]
      },
      {
        text: '配置',
        children: [
          {
            text: 'vuepress',
            children: [
              '/config/vuepress/install',
              '/config/vuepress/plug'
            ]
          },
          {
            text: 'eslint',
            children: [
              '/config/eslint/install'
            ]
          }
        ]
      },
    ],
    sidebar: {
      '/guide/': [
        '/guide/',
        '/guide/table',
        '/guide/select'
      ],
      '/config/': [
        {
          text: 'VuePress 配置',
          collapsible: true,
          children: [
            '/config/vuepress/install',
            '/config/vuepress/plug'
          ]
        },
        {
          text: 'eslint 配置',
          collapsible: true,
          children: [
            '/config/eslint/install'
          ]
        },

      ]
    },
  }),
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('../../'),
        '@assets': resolve('../assets')
      }
    }
  }
}