---
date: 2023-04-14
title: 面试总结
cover: /images/interview.jpg
category: Interview
---

## 面试遇到有价值的问题总结，并带着自己的一些思考记录下来

### JS原型和原型链

```js
// 创建构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function (word) {
  console.log(`${this.name}说：${word}`);
}

// 生成实例
const p = new Person('zhangsan', 18);

console(p.name, p.age) //log----->  'zhangsan', 18
p.hasOwnProperty('say') // false 说明不是定义在其本身上的
p.say('hello world'); // 调用公共方法 打印：张三说：hello world
```

可以看到new一个构造函数得到一个实例p，p调用say方法，p本身没有，于是顺着原型链__proto__向上找到构造函数的原型prototype，得以调用这个say方法

所有构造函数的原型链则是又指向了function Object，再往上查找原型链就是null了

具体看链接[JS原型和原型链详解](https://codelove9.github.io/myBlog/studyprogress/js/2023/04/14/prototype.html)

我个人理解是像const arr = [1, 2, 3]或者是const obj = { name: 'chen', age: 24 }也是同理，它们只是new了构造函数Array、Object的一个语法糖

所以mdn上的那些方法本质上都是构造函数原型上的方法，如下面代码

```js
// 底层做了arr = new Array(1, 2, 3)的操作
const arr = [1, 2, 3]
// arr这个实例本身没有forEach方法，于是向上原型链查找构造函数Array上的方法，找到了forEach这个方法，代码得以成功执行
arr.forEach(item => console.log(item))
```

有一点不明白的是为什么String.prototype得到的数据类型是字符串，Array.prototype得到的数据类型是数组，Object.prototype得到的数据类型是对象，待弄明白后补充
