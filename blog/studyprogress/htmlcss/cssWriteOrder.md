---
date: 2023-03-26
title: CSS属性书写顺序
category: frontend
tags:
  - htmlcss
---

1 .布局定位属性：display / position / float / clear / visibility / overflow （ 建议 display 第一个写，毕竟关系到模式）  
2 .自身属性：width / height/ margin / padding / border / background  
3 .文本属性:color / font / text-decoration/ text-align/ vertical-align/ white- space / break-word  
4 .其他属性（CSS3 ） : content/cursor / border-radius/ box-shadow / text-shadow/ background:linear-gradient…

如：

```
`

1.  .example {
    
2.     display: block;
    
3.     position: relative;
    
4.     float: left;
    
5.     width: 100px;
    
6.     height: 100px;
    
7.     margin: 0 auto;
    
8.     padding: 10px;
    
9.     font-family: Arial, Helvetica, sans-serif;
    
10.     color: #333;
    
11.     background: rgba(0, 0, 0, 5);
    
12.     border-radius: 10px;
    
13.    }
    

`


```