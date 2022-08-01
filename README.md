[toc]

# 描述

一款用于vuepress2.x生成 `演示效果和代码` 的插件,方便你在编写文档的时候增加 Vue `组件`示例,支持Vue3

# 提示

使用之前请先安装并了解Vuepress,[传送门](https://v2.vuepress.vuejs.org/zh/)

建议安装Vuepress `^2.0.0-beta.49` 以上版本

## 安装

```bash
  npm i vuepress-plugin-example-block
```

## 使用方法/示例

#### 1.配置插件

```javascript
// docs/.vuepress/config.js
const exampleDemo = require("vuepress-plugin-example-block");
module.exports = {
    ...
    plugins: [
        exampleDemo({
            path: __dirname,  //必填
            dir:'../examples' //可选,指定组件文件路径,默认'../examples'
        })
    ]
    ...
}
```

#### 2.创建`examples`文件夹,并创建button/base.vue组件

`提示` : `examples` 文件夹为`dir`参数指定,可根据自己需求更改

![路径](./docs/assets/readme/examplePath.jpg)

`base.vue代码`

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

#### 3.在md中使用组件

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

## 效果预览

![路径](./docs/assets/readme/demo.jpg)

## API 参考

| 参数 | 类型     | 是否必填       | 描述                |
| :-------- | :------- | :------- | :------------------------- |
| `path` | `string` | **true** |设置为:__dirname,参照上方使用方法|
| `dir` | `string` | **false** |vue组件示例目录,默认`examples` |

## 注意事项(必读)

1.必须传入`path`参数,值为`__dirname`即可

2.必须为`dir`参数 创建其对应值的文件夹,否则读取不到文件,会发出警告
