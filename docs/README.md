---
home: true  #设定该页面是首页还是普通页面
pageClass: custom-page-class #为当前页面添加额外的类名
heroImage: /hero.png  #首页图片的 URL 
heroAlt: img #首页图片的 alt 属性,默认heroText
heroText: my-components  #首页的大标题
tagline: 基于vue3.的自用组件库 #首页的标语,如果不设置，则默认使用站点 description 

#配置首页按钮
actions: 
  - text: 快速上手
    link: /guide/
    type: primary
  - text: 项目简介
    link: /guide/
    type: secondary

#配置首页特性列表
features:
  - title: 简洁至上
    details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  - title: Vue 驱动
    details: 享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
  - title: 高性能
    details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。

#首页的页脚
footer: MIT Licensed | Copyright @ 2022-present uut Cc
---


