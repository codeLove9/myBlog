---
date: 2023-07-10
title: markdown中的正文不能用一级标题，否则目录出不来
category: theme
tags:
  - VuePress
---

## 背景

1. 最开始的时候我是下载了markdownLint插件，来规范markdown编写的格式。
2. 我发现每当我在正文中用一个#写一级标题的时候，markdownLint总会报错`MD025/single-title/single-h1: Multiple top-level headings in the same document`。
3. 我觉得这个报错非常不合理，凭啥不要我在正文中写一级标题，于是我在vscode里的settings.json文件中增加了对markdown格式的忽略设置，具体代码如下：

```json
// markdownLint忽略设置
  "markdownlint.config": {
    "default": true,
    "MD025": false, // 同一片文档中不允许存在多个一级标题
  }
```

4.设置后果然可以随意的写一级标题了。

## 发现异常

过了段时间，当我打开之后写的几篇用一级标题的文章，点击悬浮菜单打开目录时，发现目录竟然是空白。

## 解决方案

1. 最开始一直找不到解决方案，只看到获取不到$site.headings这个属性。
2. 按道理这个属性是由VuePress底层已经封装好自行抛出的，可是查看了相关组件却始终无法定位到问题点。
3. 于是我打开有目录的和无目录的正文进行比较，发现有目录的正文标题级别都第一点，而无目录的普遍标题级别高，并且这是一个共性。
4. 于是我试着更改无目录文档中正文的标题级别，把一级标题改成二级标题。
5. 再次运行项目，目录成功展示出来，问题解决。
