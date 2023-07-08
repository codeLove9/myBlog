---
date: 2023-03-26
title: CSS属性书写顺序
category: frontend
tags:
  - HTML/CSS
---

1 .布局定位属性：display / position / float / clear / visibility / overflow （ 建议 display 第一个写，毕竟关系到模式）  
2 .自身属性：width / height/ margin / padding / border / background  
3 .文本属性:color / font / text-decoration/ text-align/ vertical-align/ white- space / break-word  
4 .其他属性（CSS3 ） : content/cursor / border-radius/ box-shadow / text-shadow/ background:linear-gradient…

如：

```css
.example {
  display: block
  position: relative
  float: left
  width: 100px
  height: 100px
  margin: 0 auto
  padding: 10px
  font-family: Arial, Helvetica, sans-serif
  color: #333
  background: rgba(0, 0, 0, 5)
  border-radius: 10px
}
```
