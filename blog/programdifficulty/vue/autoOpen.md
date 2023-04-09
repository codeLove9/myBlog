---
title: Vue-cli 运行vue项目，设置vue-cli-service serve --open自动打开浏览器，跳转到http://0.0.0.0:8081 解决办法
date: 2023-04-09
author: XiaoChen
category: frontend
tags:
  - Vue
---

## 错误示例

尝试在 package.json 里面设置自动打开浏览器

```package.json
module.exports = defineConfig({
  devServer: {        
    host: 'localhost',
    port: 8080,
    https: false,
    hot: false,
    proxy: null
  }
})
```

运行之后 跳转到 <http://0.0.0.0:8081，界面不能显示>

![image](https://img-blog.csdnimg.cn/img_convert/e3caa2f97f1cb598edfb65406f1731d7.jpeg)

## 解决办法

在 项目文件夹下的 vue.config.js 里面添加这段代码

```vue.config.js
module.exports = defineConfig({
  devServer: {        
    host: 'localhost',
    port: 8080,
    https: false,
    hot: false,
    proxy: null
  }
})
```

就可以跑起来自动打开了！
