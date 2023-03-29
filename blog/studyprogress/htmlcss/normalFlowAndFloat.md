---
title: CSS实现行内元素设置宽高，块级元素取消宽高；深入了解标准流以及脱标元素的特点
date: 2023-03-29
author: XiaoChen
category: frontend
tags:
  - HTML/CSS
---

**1、行内元素添加绝对定位或者固定定位就可以直接接设置高度和宽度。  
2、块级元素添加绝对定位或者固定定位，如果不给宽度和高度，默认大小就可以变为内容你那个的大小啦。  
另外：  
脱标的盒子不会触发外边距塌陷，因为绝对定位或者固定定位的元素不会触发外边距合并的问题。**

## 深入了解标准流以及脱标元素的特点

### 1.标准流（Normal Flow）

> 默认情况下，元素都是按照normal flow（标准流、常规流、正常流、文档流）进行排布的。

*   排布顺序：在浏览器中**从左到右，从上到下**顺序摆放；
*   默认情况下，元素互相之间**不存在层叠现象**；

![](https://img-blog.csdnimg.cn/img_convert/73fd3d503dbb3b4c1e428dee4a9c9ebe.png)

### 2.什么情况下元素会脱标？

> 脱离标准流（简称“脱标”），那么什么情况下元素会脱离标准流呢？常见有以下两种：

*   元素设置position，并且position的值为fixed或absolute；
*   元素添加浮动float，并且float的值不为none；

### 3.脱标元素的特点

*   可以随意设置宽高，宽高默认由内容决定。
    
    *   [块级元素](https://so.csdn.net/so/search?q=%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0&spm=1001.2101.3001.7020)：
        
        *   标准流下的展示（默认占满父元素的宽度）；
            
            ![](https://img-blog.csdnimg.cn/img_convert/6633702b61fecb0166c4ce2d61e903df.png)
            
        *   脱标下的展示（宽高由内容撑开）；
            
            ![](https://img-blog.csdnimg.cn/img_convert/3a752b4bd53985d03a83ebe3c5569916.png)
            
    *   [行内元素](https://so.csdn.net/so/search?q=%E8%A1%8C%E5%86%85%E5%85%83%E7%B4%A0&spm=1001.2101.3001.7020)脱离标准流：
        
        *   标准流下的展示（默认由内容撑开，且不能设置宽高）；
            
            ![](https://img-blog.csdnimg.cn/img_convert/5837df106b5d3a57b2e4d4c5c28ca0ef.png)
            
        *   脱标下的展示（宽高还是由内容撑开，但是可以设置宽高）；
            
            ![](https://img-blog.csdnimg.cn/img_convert/c5a7dc57920de1216b41d76202ded70c.png)
            
*   不再受标准流的约束。
    
*   不再给父元素汇报宽高数据，也就是不能将父元素撑开。
    

**总结**：

*   大部分元素在脱标后都会转换成block类型。
*   这里可以抛出一个疑问，block类型不是占据父元素的宽度么，为什么脱标元素最终是由内容撑开的？
*   解答：元素脱标后，已经不受标准流约束，其位置也是不局限在父元素之内，很难说父元素是谁，且块级（block）元素默认宽高都为auto，难以参考父元素宽度，所以最好的展示形式就是默认由内容撑开。