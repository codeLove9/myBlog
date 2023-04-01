---
title: JS中循环结构中continue关键字在for结构和while结构的差异
date: 2023-04-01
author: XiaoChen
category: frontend
tags:
  - JS
---

for结构：

```
var sum = 0;
for (i=1; i<=100; i++) { 
    if (i % 7 == 0) {
        continue;
    }
    sum += i;
}
console.log(sum);
```

我通过打断点发现，在for结构中，当 i == 7时，当断点跳到continue位置后直接跳过，向上回到i++，此时i == 8，程序继续执行。

whlie结构：

```
var a = 1, sum = 0;   
while (a <= 100) {
    if (a % 10 == 3) {
        //如果if里没有a++，或者是放到continue后面了，程序无限循环。
        a++;
        continue;
    } 
    sum += a;
    a++;
}
console.log(sum);`
```

当时我以为whlie结构用法和for结构用法一样，没有在if里写a++，我以为执行完continue后会向下继续执行，最后a++会自加，然后却总是程序死循环。

经过打断点我发现，当 a == 3时，断点调到continue后，**直接向上回到 while (a <= 100)这句判断语句上，如果没有提前自增，此时a的值还是3，从而造成了死循环。**

当我提前自增a++后，当 a == 3 时，会先执行a++，此时a的值已经变成了4，然后continue跳过回到while判断语句上，程序继续执行。

总结:

1: **当执行continue语句时，程序会直接跳转到最上面从头执行，而不是还继续向下。**

2: 在while循环中，执行continue前要提前自增，否则程序就是死循环崩溃。