# 描述

一款用于vuepress2.x `演示和预览代码` 的插件,方便在编写文档的时候增加  `Vue组件示例`

支持Vue3

## 注意事项(必读)

1.⚡使用之前请先安装并了解Vuepress[( 点我查看 )](https://v2.vuepress.vuejs.org/zh/)

2.⚡建议安装Vuepress `^2.0.0-beta.49` 以上版本

## 安装

```bash
  npm i vuepress-plugin-example-block
```

## 使用方法

### 1.配置插件

```javascript
// docs/.vuepress/config.js
const exampleDemo = require("vuepress-plugin-example-block");
module.exports = {
    ...
    plugins: [
        exampleDemo({
            path: __dirname,  //必填,写死__dirname即可
            dir:'../examples' //选填,指定组件文件路径,默认'../examples'
        })
    ]
    ...
}
```

### 2.创建`examples`组件文件夹(`dir`参数值),并创建button/base.vue组件

![路径](https://raw.githubusercontent.com/caohoucheng/vuepress-plugin-example-block/dev/Img/readme/examplePath.jpg)

`base.vue代码`

此处使用的是element-plus组件
如何在vuepress引入element-plus,请查看vuepress客户端配置[( 点我查看 )](https://v2.vuepress.vuejs.org/zh/advanced/cookbook/usage-of-client-config.html#enhance)

```html
<template>
  <el-button>Default</el-button>
  <el-button :type="type">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <el-button>example</el-button>
</template>

<script setup>
import { ref } from "vue";

const type = ref('primary')
</script>
```

### 3.使用组件组件示例

在你的vuepress任意 md 页面 文件中都可使用

**语法**

```
::: demo `介绍`
button/base
:::
```

**示例**

```md
# Button

## 基本用法

::: demo `介绍`
button/base
:::

```

## API 参考

| 参数 | 类型     | 是否必填       | 描述                |
| :-------- | :------- | :------- | :------------------------- |
| `path` | `string` | **true** |根路径,设置为:path:__dirname|
| `dir` | `string` | **false** |组件目录,默认`examples`,须创建对应文件夹,否则读取不到文件|

## 效果预览

![效果](https://raw.githubusercontent.com/caohoucheng/vuepress-plugin-example-block/dev/Img/readme/demo.jpg)
