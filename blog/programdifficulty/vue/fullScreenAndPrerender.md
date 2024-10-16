---
title: 沉浸式改造下预渲染前后闪屏问题
date: 2024-10-10
author: XiaoChen
category: frontend
tags:
  - Vue
---

> 预渲染是服务端数据返回前页面的默认渲染，数据返回后完成真实渲染。

## 背景

在App大于13.0.0时，各个页面头部做沉浸式改造，优化用户体验。

在做安卓沉浸式改造时，通过`window.user.navigator`获取状态栏的高度，再给body下追加一个--top属性，值即为状态栏的高度。Vue组件中通过dom原生方法拿到标签下--top属性的值，即状态栏的高度值，再追加给Header组件的margin值即可纵向布局不变。

因为ios自带沉浸式而安卓有黑色状态栏，为了保证视觉高度一致，安卓系统时头部高度值相应减少了一些。由于安卓做沉浸式后，没有了黑色状态栏的高度，盒子贴到了屏幕顶端，视觉效果高度比ios矮了，所以需要增加一些高度值。

所以用获取系统版本的钩子判断了一下是否是沉浸式版本，如果是给头部增加高度，否则默认不变。开发完成后，功能实现，但是后来用户发现页面竟然偶尔会出现短暂的屏幕抖动。

## 原因

录屏进入页面并慢放发现，进入页面初始化的一瞬间会走入预渲染，都是兜底数据，但是预渲染完成后屏幕抖动一下（偶尔复现，加载快的时候），然后头部高度增加了，于是推测该问题肯定跟预渲染有关。

经排查发现：用getVersion钩子判断是否是沉浸式版本，从而给头部组件不同的高度值。但是仔细慢放发现，在沉浸式版本预渲染时，头部高度一直都是非预渲染的高度，也就是交易返回false时拿到的高度值。</br>
于是猜测预渲染时是一瞬间直接读取打包后的html和css，此时发不通任何服务端接口交易或者交易还没有返回，相当于判断App版本的钩子根本未执行，直接默认走的兜底值false即非沉浸式的高度。等预渲染完成后，交易突然发通了钩子返回true走了沉浸式的高度，高度值突然增加，导致前后高度不一致，从而出现屏幕抖动。

以下是大致代码（简洁化）：

```js
headerTop() {
  return `${OS_TYPE} === 'ios'
    ? 'ios'
    : this.getVersion > 13.0.0 ?
      'android-full'
      : 'android'
  }-header-adv`
}
```

```css
.ios-header-adv{   // ios高度
  height: 400px
}
.android-full-header-adv{  // 安卓沉浸式高度
  height: 400px
}
.android-adv{  // 安卓非沉浸式高度
  height: 400px
}
```

## 解决方案

最初方案：继续发交易，给预渲染时的钩子返回false的高度值给成沉浸式的高度值，这样就能保证沉浸式版本预渲染前后高度一致，页面不会抖动了。</br>
弊端是非沉浸式版本可能会存在问题，高度值由高变低了。但是这个方案被业务否了，他给我看了一张用户版本统计图表，显示版本小于13.0.0的非沉浸式用户也有不少，这样做相当于牺牲了一部分用户的使用体验去保障另外一部分的体验，于是我就思考换一种方案保证两个版本都不会抖动。

最终方案：我想着既然屏幕抖动是因为预渲染前交易发不通导致的，那么我就不再判断是否是沉浸式版本了，直接给预渲染后的高度，从而不存在预渲染前后高度值变化的过程了，保证预渲染前后一样的高度，问题解决。</br>
此方案也有一定的弊端，就是版本低的非沉浸式页面，头部高度会增加30px（不影响功能和布局），但是相较于屏幕抖动的bug，已经是最好的方案了，因为以后版本只会越来越高，用户总会升级上去，沉浸式版本才是主流，甚至可以做一个版本控制强制更新来保证，最终该方案成功上线并受到肯定。

## 总结

预渲染工具的基本原理是：构建打包之后，插件会在本地启动express静态服务，serve打包好的静态资源。然后再启动一个无头浏览器（例如Puppeteer），浏览器从服务器请求网页，网页运行时候会请求首屏接口，用拿到的数据渲染出包含内容的首屏后，无头浏览器截屏并替换掉原来的html。

**此时服务端的任何接口交易是发不通的（或者还没有数据返回），开发时一定要注意这个点。**
