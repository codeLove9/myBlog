---
title: JavaScript事件委托原理
date: 2023-04-02
author: XiaoChen
category: frontend
tags:
  - JS
---

目录

*   [一、什么是事件委托](https://www.jb51.net/article/231238.htm#_label0 "一、什么是事件委托")
*   [二、事件委托的原理](https://www.jb51.net/article/231238.htm#_label1 "二、事件委托的原理")
*   [三、事件委托的作用](https://www.jb51.net/article/231238.htm#_label2 "三、事件委托的作用")

## 一、什么是[事件委托](https://so.csdn.net/so/search?q=%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%89%98&spm=1001.2101.3001.7020)

事件委托也称为[事件代理](https://so.csdn.net/so/search?q=%E4%BA%8B%E4%BB%B6%E4%BB%A3%E7%90%86&spm=1001.2101.3001.7020)。就是利用事件冒泡，把子元素的事件都绑定到父元素上。如果子元素阻止了事件冒泡，那么委托就无法实现。

**举个简单的例子：**

例如快递员有100个快递要分别送给100个学生， 如果一个个的送花费时间较长。同时每个学生领取的时候，也需要排队领取，也花费时间较长，应该怎样操作呢？这时快递员可以把100个快递委托给班主任，班主任把这些快递放到办公室，同学们下课自行领取即可。这样的话，快递员省事，同学们领取也更方便。这个过程就是一个委托事件。

## 二、事件委托的原理

不是每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点。

我们再来看看在具体的程序中是如何实现的吧！  
比如，我们现在有一个无序列表，在无序列表里面有五个li,我们想要给每个li添加一个点击事件，这个时候，我们常规操作是通过循环给每个li添加点击事件。

**代码如下所示：**

```js
<body>
    <ul>
        <li>111111</li>
        <li>222222</li>
        <li>333333</li>
        <li>444444</li>
        <li>555555</li>
    </ul>
    <script>
        var li = document.querySelectorAll('li');
        for(var i=0;i<li.length;i++){
            li[i].onclick = function(){
                this.style.color = 'green';
            }
        }
    </script>
</body>
```

**运行结果为：**

![](https://img-blog.csdnimg.cn/img_convert/e18810ec3e43e02a5586f256f6d54d8e.gif)

这种方法的确可以实现我们的点击操作，但是这个过程中，由于每次都要给li添加点击事件，造成访问DOM的次数过多，会延长整个页面的交互就绪时间。

所以，这里，我们就可以用到事件委托，即给ul注册点击事件，然后利用事件对象的 target 来找到当前点击的 li，因为点击li，事件会冒泡到ul上，ul有注册事件，就会触发事件监听器。

**实现代码为：**

```js
var li = document.querySelectorAll('li');
    for(var i=0;i<li.length;i++){
        li[i].onclick = function(){
            this.style.color = 'green';
        }
    }
```

**运行结果为：**

![](https://img-blog.csdnimg.cn/img_convert/e204e6b8aba6de23977111f463fecf27.gif)

成功显示。

## 三、事件委托的作用

通过上面的操作，我们可以得到：在事件委托中，我们只操作一次 DOM ，大大的提高了程序的性能。