---
title: CSS解决固定定位无法覆盖的层叠问题
date: 2023-03-30
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

## 元素重叠（层级问题）

使用了定位,元素会提升一个层级(如果与别的元素发生重叠,会在别的元素上面)如果多个元素同时开启了定位.层级都一样的情况下.如果发生重叠.则后面的元素会盖住前面的元素。如果想调整层级 可以**使用z-index:来调整层级,需要注意的是，没有开启定位的元素不可以使用[z-index属性](https://so.csdn.net/so/search?q=z-index%E5%B1%9E%E6%80%A7&spm=1001.2101.3001.7020)**

所以需要给固定定位的盒子添加z-index和深色背景颜色。

```css
header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: (84 / @vw);
    background-color: #fff;
    z-index: 1;
}
```
