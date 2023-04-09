---
title: focus和onfocus区别
date: 2023-04-02
author: XiaoChen
category: frontend
tags:
  - JS
---

focus() 是方法,表示是去触发使其获得焦点。

[onfocus](https://so.csdn.net/so/search?q=onfocus&spm=1001.2101.3001.7020) 是事件属性， 表示获得焦点时去执行什么。

同理，如 click 和 onclick 等区别也一样。

案例：当键盘按下ASCII码83（对应键盘s），鼠标光标会定到输入框内。

```js
<body>
    <input type="text">
    <script>
       var search = document.querySelector('input');
       document.addEventListener('keyup', function(e) {  //用keyup表示弹起的时候再定光标
           console.log(e.keyCode);
            if(e.keyCode === 83) {
               search.focus();     //此处使用focus方法
            }
       })
    </script>
</body>
```

另外，如果监听函数中的监听方法是 'keydown'，那么按下s的时候，鼠标光标在定位到文本框的同时，也会输入s，因为按下了s光标定到输入框 和 输入s是同时进行的。

如果把监听方法是 '[keyup](https://so.csdn.net/so/search?q=keyup&spm=1001.2101.3001.7020)'，表示弹起的时候再定光标，就不会再有这种情况。
