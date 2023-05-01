---
title: Vue 中加载图片 public 和 src/assets 文件夹下的区别
date: 2023-05-01
author: XiaoChen
category: frontend
tags:
  - Webpack
---

 

遇坑：今天在组件中加载放在public文件夹下的图片时，加载不出来

错误示例：

```template
<img src="public/img/meals/1.png" alt=""/>
```

经过我查阅资料尝试后发现：

### 一、public 文件夹

* 路径设置时无需添加 public/，默认加载 public 文件夹下的图片。
* 打包构建后，直接加载
* 系统编译后，可替换图片；

```template
<img src="img/meals/1.png" alt=""/> 
```

### 二、src/assets 文件夹

* 系统编译后，不能替换，因为被内部编译管理  
* 打包构建后，会被编译成js文件系统编译后，不能替换，因为被内部编译管理

```template
<img src="../assets/images/test.jpg" alt=""/>  
```
