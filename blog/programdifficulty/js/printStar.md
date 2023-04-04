---
title: JS中打印星星或是99乘法表定义str为数值或者字符串的原因
date: 2023-03-31
author: XiaoChen
category: frontend
tags:
  - JS
---

因为在内循环i <= n中打印时，每一个打印的元素都需要在一次内循环中拼接起来，所以要设置str。**我们可以吧str看做成sum，星星看做成1，str = str + 星星，等价于 sum = sum +1，所以必须设置一个变量str去逐一保存打印的星星。**

因为打印的星星属于字符串，想要打印出来全部都是字符串星星，需要考虑给变量定义什么。我们可以想到，**如果给变量定义一个数字0，那么打印出来就是0☆☆☆☆☆，所以我们也需要给变量定义一个字符串，即 str = ‘’；，这样再打印出来就是一个空的字符串加上五个星星，即☆☆☆☆☆，**具体验证看以下代码串：

假如给str定义为0：

```js
var str = 0;
    for (i = 1; i <= 5; i++) {
        for (j = 1; j <= 5; j++) {
            str = str + '☆';
        }
        str = str + '\n';
            
    }
console.log(str);
```

打印结果是： ![](https://img-blog.csdnimg.cn/5710e56473eb4acf81768bcb8817adbf.png)

  可以看到，控制台打印结果有个0。

  假如给str定义为字符串‘’：

```js
var str = '';
    for (i = 1; i <= 5; i++) {
        for (j = 1; j <= 5; j++) {
            str = str + '☆';
        }
        str = str + '\n';  
    }
console.log(str);
```

打印结果是：![](https://img-blog.csdnimg.cn/7de9f0bff31441aa8c947f917631113d.png)

        此时打印结果正确 。

同理，打印99[乘法表](https://so.csdn.net/so/search?q=%E4%B9%98%E6%B3%95%E8%A1%A8&spm=1001.2101.3001.7020)也一样，定义str为0或是字符串都可以。因为 str + i，不论是0或是字符串，都不影响最终结果。

```js
// 这里str即可以赋值0，也可以赋值‘’，结果不变。
var i, j , n, str = 0;
for (i = 1; i <= 9; i++) {
    for (j = 1; j <= i; j++) {
        n = i * j ;
        str = str + i + '×' + j + '=' + n + '\t';
    }
    str = str  +'\n';
}
console.log(str);
```

总结：定义str为字符串还是数字，取决于内循环打印出来的效果，可以打断点看。