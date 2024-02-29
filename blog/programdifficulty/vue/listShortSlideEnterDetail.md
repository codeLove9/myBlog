---
title: Android环境下列表短距离滑动进入详情页bug
date: 2024-01-04
author: XiaoChen
category: frontend
tags:
  - 兼容性适配
---

## 问题

在列表短距离滑动结束后会触发点击事件跳转至详情页，经复现，ios无此问题，安卓存在该问题。

原因：出现该问题的罪魁祸首是fastclick。fastclick的思路是，利用touch模拟tap触摸，如果判断为一次有效的tap，则在touched触发完成后立即模拟一次click事件分发。

```js
//fastclick.lib.js
Fastclick.prototype.onTouchEnd = function(event) {
  if(!this.trackingClick) {  // 判断是否点点击标记，下面会讲
    return true
  }
}
// ...

if(!this.needsClick(targetElement)) {
  event.preventDefault()
  this.sendClick(targetElement, event) // 此处触发点击
}
```

通过打印日志发现，只要触发了列表元素的click事件，一定会触发sendClick。然而在onTouchMove中有这样一段注释：
`// If the touch has moved,cancel the click tracking 即只要触发了滑动，点击标记就会置为false`

所以问题出现在这个判断错误了，安卓的短滑动滑动误判为没有滑动点击标记，并没有置反。源码中，判断此处的代码，有一部分是比较touch.pageY的移动值，并设定了一个界限10（10像素）。发现在安卓上，短距离的滑动，有概率出现小于10的情况，而ios几乎都是大于10，可能是ios像素分辨率特别高?所以安卓出现了误判，从而进入sendClick中触发点击事件。
通过用不同的机型，打开开发者模式中的纵向像素值发现，分辨率越低，同样的10像素，手指滑动距离越大。
