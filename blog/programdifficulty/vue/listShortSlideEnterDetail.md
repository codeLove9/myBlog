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

原因：出现该问题的罪魁祸首是fastclick。

```js
// console.log日志
touchstart
(3次)touchmove
touchend
list点击事件触发
外部被点击
```

上方的打印日志为一次短距离快速滑动后触发的整个流程，由外部touchstart -> touchmove -> touchend ->列表click-外层click。应用项目均依赖了@quasar/fastclick，从而猜刻 fastclick对touchend和click事件做了处理。</br>
fastclick 的思路是，利用touch来模拟 tap触摸,如果判断为一次有效的tap，则在 touchend触发完成后立刻模拟一次click事件分发。

```js
//fastclick.lib.js
this.touchBoundary = options.touchBoundary || 10;

FastClick.prototype.touchHasMoved = function(event) {
  var touch = event.changedTouches[0], boundary = this.touchBoundary; 
  // 如果移动距离大于10px才判定为移动了
  if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
    return true;
  }

  return false;
};

FastClick.prototype.onTouchMove = function(event) {
  if (!this.trackingClick) {
    return true;
  }

  // If the touch has moved, cancel the click tracking
  if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
    this.trackingClick = false;
    this.targetElement = null;
  }

  return true;
};

Fastclick.prototype.onTouchEnd = function(event) {
  if(!this.trackingClick) {  // 判断是否是点击标记，下面会讲
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
故猜测安卓手机分辨率比苹果低，所以同样的10像素，安卓滑动一小段距离就能达到，故而触发了点击时间误判，而苹果则没有这个问题。

## 解决方案

1. 根据源码和官网提示，当不想意外的触发模拟的点击事件，而交给原生页面去做，则在点击事件的元素上，添加`class="needClick"`事件，在范围内取消fastclick，此时滑动和点击事件均正常触发。

2. this.touchBoundary数值不再设置成10px，再设置大一些即可。
