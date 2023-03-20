---
date: 2021-02-24
title: VuePress 主题目录结构
category: theme
tags:
  - VuePress
---

> 接上一篇,我们已经有了个能运行的简易站点,主题目录下仅包含了一个`Layout.vue`文件,从现在开始我们需要往里面添置东西让主题变得功能完备起来,以下是推荐的目录结构。

<!-- more -->
## 约定目录

```
theme
├── assets (资源文件)
│   ├── images
│   └── fonts
├── global-components
│   └── xxx.vue
├── components
│   └── xxx.vue
├── layouts
│   ├── Layout.vue (必要的)
│   └── 404.vue
├── styles
│   ├── index.styl
│   └── palette.styl
├── templates
│   ├── dev.html
│   └── ssr.html
├── utils (工具函数)
├── plugin (私有插件)
├── index.js (入口文件)
├── enhanceApp.js
└── package.json
```

- `theme/global-components`: 该目录下的组件都会被自动注册为全局组件。想了解更多，请参考 [@vuepress/plugin-register-components](https://github.com/vuejs/vuepress/tree/master/packages/@vuepress/plugin-register-components)。
- `theme/components`: Vue 组件。
- `theme/layouts`: 布局组件，其中  `Layout.vue` 是必需的。
- `theme/styles`: 全局的样式和调色板。
- `theme/templates`: 修改默认的模板文件。
- `theme/index.js`: 主题文件的入口文件。
- `theme/enhanceApp.js`: 主题水平的客户端增强文件。

### 资源文件

存放字体、图片等主题中用到的资源文件

### 全局组件

如果你想在 主题外部 使用组件而不需要额外注册,那么组件就可以放在该目录下
*[主题外部]: 这里指文档目录

### 主题自带组件
这个和 主题外部 的components目录有所区别,需要单独注册后方可使用。

``` js
// 复用主题的Layout组件
import Layout from 'vuepress-theme-maker/layouts/Layout';
```

### 主题入口文件

``` js
// .vuepress/theme/index.js
module.exports = (themeConfig, ctx) => {
   return {
      // ...
   }
}
```

包含了主题本身的一个配置,`themeConfig`是用户对主题的配置,这里作为参数接收,开发自定义主题的时候可以利用该参数做一些配置的预处理。其实这个和`VuePress`的设计理念相关，到后面讲插件的时候会做更详细介绍, 我个人在开发主题的过程中觉得这块还是比较容易被混淆的。

### 布局组件

所有的页面将会默认使用 `Layout.vue` 作为布局组件，对于那些匹配不到的路由将会使用 404.vue
如果你想要在某一个页面中使用 `AnotherLayout.vue` 作为布局组件，那么你只需要在layouts目录下创建对应组件, 并在具体的页面中 `frontmatter` 显示的设置布局组件名称即可。

``` md
---
layout: AnotherLayout
---
```

### 样式

`vuepress` 默认的是 `stylus` 作为css预处理器, 样式一般来说只需写在两个文件下。

`.vuepress/styles/palette.styl` 用来定义一系列变量: 

``` stylus
// 颜色
$color1 = xxx

// 布局
$sidebarWidth = 20rem


// 响应式变化点
$MQNarrow = 975px
$MQMobile = 675px
$MQMobileNarrow = 359px
```

`.vuepress/styles/index.styl` 用来编写主题样式

::: tip 提示
如果你习惯把样式拆分得更细,当然没问题, `vuepress`并没有限制。你可以单独编写其它模块，最终引入到`index.styl`。
:::

### templates

顾名思义, `dev.html`是用于开发环境下的 webpack dev server 的模板文件, `ssr.html`用于最终生成静态页面的模板文件。介绍

### 客户端增强文件

自定义主题也可以通过主题根目录下的 enhanceApp.js 文件来对 VuePress 应用进行拓展配置。这个文件应当 export default 一个钩子函数，并接受一个包含了一些应用级别属性的对象作为参数。你可以使用这个钩子来安装一些附加的 Vue 插件、注册全局组件，或者增加额外的路由钩子等：

``` js
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
}
```

### 最后

至此,我们对主题目录下的内容已经有了整体概念,主题女神面纱下的面庞已慢慢变得清晰。