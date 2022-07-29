
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { defineClientConfig } from '@vuepress/client'

import Demo from '../examples/demo/vp-demo.vue'


export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus)
    app.component('Demo', Demo)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
  setup() { },
  rootComponents: [],
})