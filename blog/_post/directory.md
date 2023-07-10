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
    "MD025": false, // 标题不允许一致
  }
```

4.设置后果然可以随意的写一级标题了。

## 发现异常

过了段时间，当我打开之后写的几篇用一级标题的文章，点击悬浮菜单打开目录时，发现目录竟然是空白。
