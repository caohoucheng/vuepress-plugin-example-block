const path = require("path")
const fs = require("fs")
const resolve = (_path) => {
  return path.resolve(__dirname, _path)
}
const { defaultTheme } = require("@vuepress/theme-default")
const exampleDemo = require("./../../src")
var md = require("markdown-it")()

// baseUrl项目必须配置,用于生成Sidebar
const Navbar = [
  { text: "首页", link: "/" },
  {
    text: "指南",
    link: "/page/guide/quick",
    baseUrl: "/page/guide/",
    sidebarChildren: [
      {
        text: "指南",
        link: "/page/guide/quick",
        children: ["/page/guide/quick", "/page/guide/install"]
      }
    ]
  },
  {
    text: "组件",
    baseUrl: "/page/components/",
    children: [
      {
        text: "基础组件",
        link: "/page/components/button",
        children: ["/page/components/button"]
      },
      {
        text: "Data 数据展示",
        link: "/page/components/table",
        children: ["/page/components/table"]
      }
    ]
  },
  {
    text: "配置",
    baseUrl: "/page/config/",
    children: [
      {
        text: "vuepress",
        link: "/page/config/vuepress/install",
        children: ["/page/config/vuepress/install", "/page/config/vuepress/plug"]
      },
      {
        text: "eslint",
        link: "/page/config/eslint/install",
        children: ["/page/config/eslint/install"]
      }
    ]
  }
]
const Sidebar = {}
// 根据Navbar的baseUrl生成Sidebar
Navbar.forEach((item) => {
  if (item.baseUrl) {
    Sidebar[item.baseUrl] = item.children || item.sidebarChildren
  }
})
module.exports = {
  port: "9000",
  // debug: true,
  base: "/my-components/",
  // dest: "./docs/.vuepress/build",
  lang: "zh-CN",
  title: "my-components",
  description: "my-components DOCS",
  head: [["link", { rel: "icon", href: "hero.png" }]],
  plugins: [
    exampleDemo({
      path: __dirname
      // dir: "../components"
    })
  ],
  theme: defaultTheme({
    logo: "hero.png",
    navbar: Navbar,
    sidebar: Sidebar,
    sidebarDepth: 1 //0:禁用所有级别页面标题 1:来包含 <h2> 标题 2:来包含 <h2> 和 <h3> 标题 ...
  }),
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("../../"),
        "@assets": resolve("../assets")
      }
    }
  }
}
