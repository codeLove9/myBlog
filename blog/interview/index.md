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

### 项目中遇到的难题

场景：

1. 宿主组件在created中触发了bus.emit(updateInformation)事件，依赖项目在mounted生命周期中用bus.on(updateInformation)接收了该事件并修改了data响应式值。可在依赖项目中console.log时，data值并没有被改变。

2. 通过打印双方的生命周期执行顺序时，发现并没有按照父子组件的执行顺序父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted->父beforeUpdate->子beforeUpdate->子updated->父updated->父beforeDestroy->子beforeDestroy->子destroyed->父destroyed这个顺序执行，而是父组件比在子组件created生命周期触发前，就执行完了mounted。

原因：

1. 依赖项目是一个低代码的项目，是通过父组件用插槽slot的形式异步导入，这就导致当父组件执行完了created和mounted生命周期，子组件才开始执行created生命周期。

2. 而eventbus事件总线的执行顺序是先执行on，才能触发emit事件，而子组件on的执行时机总是在父子间emit之后，这就导致了挂载失败，自然就无法触发事件监听机制了。

解决方案：

1. 在父组件bus.js文件中的created生命周期中就bus.on挂载事件总线，这就能使事件总线机制成功执行，并把接收到参数更新到bus的data响应式数据中，直接存在bus中，相当于不仅仅把bus当成事件监听传值的作用，而是看成一个组件去使用。

2. 在子组件中导入bus，直接去取bus上的data响应式数据，可以成功获取，然后再更新到子组件的data中，问题解决。
