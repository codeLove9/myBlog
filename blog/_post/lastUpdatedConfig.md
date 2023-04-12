---
date: 2023-04-12
title: VuePress内置计算属性this.$page.lastUpdated的注意点
category: theme
tags:
  - VuePress
---

> 写了新博客却出不来页面，调试工具丢出报错找不到this.$page.lastUpdated，这是为什么呢

<!-- more -->

## 问题

昨天写了一个新的md文件，却发现获取不到this.$page.lastUpdated，且出不来页面

## 解决方案

我在npm中搜索相关的包@vuepress/plugin-last-updated，并查看了源码，以下是代码段

```js
// index.js

const path = require('path')
const spawn = require('cross-spawn')

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = (options = {}, context) => ({
  extendPageData ($page) {
    const { transformer, dateOptions } = options
    const timestamp = getGitLastUpdatedTimeStamp($page._filePath)
    const $lang = $page._computed.$lang
    if (timestamp) {
      const lastUpdated = typeof transformer === 'function'
        ? transformer(timestamp, $lang)
        : defaultTransformer(timestamp, $lang, dateOptions)
      $page.lastUpdated = lastUpdated
      $page.lastUpdatedTimestamp = timestamp
    }
  }
})

function defaultTransformer (timestamp, lang, dateOptions) {
  return new Date(timestamp).toLocaleString(lang, dateOptions)
}

function getGitLastUpdatedTimeStamp (filePath) {
  let lastUpdated
  try {
    lastUpdated = parseInt(spawn.sync(
      'git',
      ['log', '-1', '--format=%at', path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    ).stdout.toString('utf-8')) * 1000
  } catch (e) { /* do not handle for now */ }
  return lastUpdated
}
```

这是对这段代码的解释：

这是一个使用JavaScript编写的VuePress插件脚本，用于获取页面源文件的最后一次Git提交时间戳，并将其添加到页面元数据中。以下是代码的概述：

1. 它从Node.js导入了两个模块：path和cross-spawn包中的spawn。

2. 它导出一个函数，该函数接受两个参数：options和context，并返回包含名为extendPageData的方法的对象。

3. extendPageData方法检索当前页面源文件的Git时间戳，并将其作为lastUpdated和lastUpdatedTimestamp属性添加到$page对象中。

4. 如果提供了options.transformer函数，则使用它来将时间戳格式化为字符串表示形式；否则使用脚本中定义的defaultTransformer函数。

5. getGitLastUpdatedTimeStamp函数获取页面的文件路径，并使用spawn模块运行Git命令以检索修改文件的最后一次提交时间戳。然后解析并返回自Unix纪元以来的时间戳值（毫秒）。

并找到了相关issue,

issue详情：'@vuepress/last-updated' relies on git history, but the document doesn't mention this at all.
At first, I did not initialize git and commit, so the lastUpdated was not displayed. Finally, I had to look at the source code to solve the problem.
It wasted a lot of my time to debug, consumed a lot of my enthusiasm and goodwill,
Your documentation should clearly indicate that you are relying on git and that you must commit to detect new changes

[document issue '@vuepress/last-updated' 链接](https://github.com/vuejs/vuepress/issues/1291)

## 总结

this.$page.lastUpdated计算属性依赖于git提交时间（本地commit），否则丢出报错
