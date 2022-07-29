
# 介绍

## 目录结构

```markdown
+---.vuepress
|   |   config.js
|   |
|   \---public
|           hero.png
|
+---assets
|       unlogin.png
|
+---guide
|       README.md
|
\   README.md

```

## 引用public静态资源

```markdown

![hero](hero.png))

```

## 引用assets路径配置

`config配置`

```javascript
const path = require('path')
function resolve(_path) {
  return path.resolve(__dirname, _path)
}
module.exports = {
  ...
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': resolve('../assets')
      }
    }
  }
  ...
}
```

`使用`

```markdown
![Image from alias](~@assets/hero.png)
```
