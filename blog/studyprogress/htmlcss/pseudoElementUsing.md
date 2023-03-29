---
title: CSS伪元素使用笔记
date: 2023-03-26
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

*   CSS中用伪元素创建标签时，伪元素如果没有设置“content”属性，伪元素是无用的
*   伪元素是行内元素，宽高都不生效，若要改变宽高需要转dispaly模式
*   使用伪元素插入的内容在页面的源码里是不可见的，只能在css里可见，谷歌调试工具中可以找到
*   伪元素必须是被应用元素的子元素

```
<head>
  <title></title> 
  <style type="text/css">
  .example {    
      width: 300px;    
      border: solid 1px black;   
      padding: 20px;   
  }   
  .example:before {   
      content: "#";   
      border: solid 1px black;   
      padding: 2px;   
      margin: 0 10px 0 0;   
  }
  </style> 
</head>
<body> 
  <p class="emample">这个#是一个伪元素</p>     
</body>
```

**双伪元素清除浮动**

*   **"content"属性必须是table，强制转列表模式**
*   **一般用伪元素清除浮动时使用双伪元素，因为双伪元素****清浮动****比单伪元素****清浮动的代码****多了after，可以在清除浮动所带来的影响的的同时，还可以解决外边距塌陷的问题，比较万能。**

  
可以 _**给父元素添加双伪元素**_，并设置[伪元素](https://so.csdn.net/so/search?q=%E4%BC%AA%E5%85%83%E7%B4%A0&spm=1001.2101.3001.7020)的相关样式属性：

```
//假设给父元素定义的类为：clearfix 
.clearfix:before, .clearfix:after {
    content: "";
    dispaly: table;
},
    
.clearfix:after {
    clear: both;
}
```