---
title: JS原型和原型链
date: 2023-04-14
author: XiaoChen
category: frontend
tags:
  - JS
---

> 作为一个前端开发工程师，熟练掌握JS这门语言是必须要的。无论是日常的工作中，亦或者是出去面试找工作，JS掌握的多深多好，很大程度上决定了你能走的多远。今天本人就来介绍一下JS的原型以及原型链，基于本人的一些认识。

<!-- more -->

## JS原型

众所周知，JS的复杂类型都是对象类型（**Object**），而JS不是一门完全面向对象编程的语言，所以如何涉及继承机制，就是一个问题。

### 构造函数

因为JS中没有类（**Class**）这个概念，所以JS的设计者使用了`构造函数`来实现继承机制。

> ES6中的`Class`可以看作只是一个语法糖，它的绝大部分的功能，ES5都可以做到，新的`Class`写法只是让原型的写法更加的清晰、更像面向对象编程的语法而已。下文也会进一步的说明。（摘自阮一峰的ES6入门）

```js
// 构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 生成实例
const p = new Person('zhangsan', 18);
```

如上述代码所示，JS通过`构造函数`来生成`实例`。但是又出现了一个新的问题，在`构造函数`中通过`this`赋值的属性或者方法，是每个实例的`实例属性`以及`实例方法`，无法共享公共属性。所以又设计出了一个`原型对象`，来存储这个`构造函数`的公共属性以及方法。

### 补充知识：构造函数创建一个实例的过程

1. 创建一个新对象
2. 将构造函数的作用域赋值给新对象（这样this就指向了新对象）
3. 执行构造函数中的代码（为新对象添加实例属性和实例方法）
4. 返回新对象

### 原型对象

说了这么久，终于说到了JS的`原型对象`了。JS的每个函数在创建的时候，都会生成一个属性`prototype`，这个属性指向一个对象，这个对象就是此函数的`原型对象`。该`原型对象`中有个属性为`constructor`，指向该函数。这样`原型对象`和`它的函数`之间就产生了联系。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5aaae37b7094aaaad14daa910c61775~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## JS原型链

讲清楚了JS的`原型对象`，来就是介绍JS的`原型链`了。既然有了`构造函数`，那么就可以通过该`构造函数`，来创建一个实例对象了。此时，完善一下我们的`Preson`构造函数

```js
 // 构造函数
    function Preson(name, age) {
      this.name = name;
      this.age = age;
    }
    // 所有实例共享的公共方法
    Preson.prototype.say = function (word) {
      console.log(`${this.name}说：${word}`);
    }

    const p1 = new Preson('张三', 18); // 创建一个Person实例对象
    p1.hasOwnProperty('say') // false 说明不是定义在其本身上的
    p1.say('hello world'); // 调用公共方法 打印：张三说：hello world

```

这里就要思考了，为什么我们构造的`p1`这个`实例对象`，它可以调用到`Person`这个`构造函数`的`原型对象`上的方法呢？明明只有在`构造函数`内部通过`this`来赋值的属性或者方法才会被实例所继承，为什么在`构造函数`的`原型对象`上定义的`say`方法也能通过实例来调用到呢？这里就引出了`原型链`这个概念。

### \__proto_\_

每个通过`构造函数`创建出来的`实例对象`，其本身有个属性`__proto__`，这个属性会指向该`实例对象`的`构造函数`的`原型对象`，这么说好像有点绕，我们看下图

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1141452b532f4e9cab03ba48f58beade~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> `__proto__` 并不是语言本身的特性，这是各大厂商具体实现时添加的`私有属性`，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。（摘自阮一峰的ES6入门）

现在我们知道了，当访问一个`对象`的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会通过它的`__proto__`隐式属性，找到它的`构造函数`的`原型对象`，如果还没有找到就会再在其`构造函数`的`prototype`的`__proto__`中查找，这样一层一层向上查找就会形成一个链式结构，我们称为`原型链`。

**注意点**：如果通过`p1实例对象`的`__proto__`属性赋值，则会改变其`构造函数`的`原型对象`，从而被所有实例所共享。

```js
 // 构造函数
function Preson(name, age) {
  this.name = name;
  this.age = age;
}
// 所有实例共享的公共方法
Preson.prototype.say = function (word) {
  console.log(`${this.name}说：${word}`);
}

const p1 = new Preson('张三', 18); // 创建一个Person实例对象
const p2 = new Preson('李四', 20); // 新创建一个Proson实例对象
p1.say('hello world'); // 调用公共方法
p1.hasOwnProperty('say') // false 说明不是定义在其本身上的
p1.__proto__.do = function () {
  console.log('往原型对象中添加方法');
}
p2.do(); // 打印出了-往原型对象中添加方法

```

> 所以，我们在开发的时候，要注意不要通过`实例对象`去改变其`构造函数`的`原型对象`，这样会对其他通过该`构造函数`生成的`实例对象`造成影响。

说到这里，有的读者可能又会产生疑问了，再在其`构造函数`的`prototype`的`__proto__`中查找是什么意思？我们继续往下看。

### 补充知识：原型链的尽头

既然我们之前构造的`p1实例对象`有`__proto__`属性指向其`构造函数`的`原型对象`，那么该`构造函数`的`原型对象`有这个`__proto__`属性吗？如果有，那么其又指向谁呢？我们不妨打印一下。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2750863007534407b542d38ea5259cdf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我们随便创建了一个`A`的`构造函数`，通过打印它的`prototype`属性，我们可以看到，在浏览器中，它有个`__proto__`属性指向了一个`Object`对象。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2cda9bce64b41339f411a9c974000d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

而进一步展开后，我们会发现，该对象的`构造函数`为`function Object`，我们由此可以得知，**所有的`原型对象`的`__proto__`属性都是指向`function Object`的`原型对象`。** 而`function Object`的`原型对象`在上图中我们可以得知是不存在`__proto__`这个属性的，它指向了`null`。我们就得知了`原型链`的尽头是`null`。

### 补充知识：所有对象的原型链

既然JS的复杂类型都是`对象`，那么，函数作为一个`对象`，是否也存在`原型链`呢？ 我们在浏览器中创建一个`构造函数`，打印它的`__proto__`属性，一探究竟：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/818ed8034ed54aa9aa6591d8be8a70ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我们可以看到，它的`__proto__`属性指向了一个`function Function`的`原型对象`，该`原型对象`为JS中所有函数的`原型对象`，而其`__proto__`属性也还是指向了`function Object`的`原型对象`，所以验证了`原型链`的尽头为`null`，这一说法。

最后，奉上神图一张，祝大家理解JS的`原型链`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0815c8f7fa544cf4a33fd7defdc6c1f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 结语

通过上面的文章，大概梳理了一下本人对于`原型`和`原型链`这一概念的理解，并且尽可能详细的阐述了各个概念的前世今生。因为本人也是个前端菜鸡，写这篇文章的目的除了让大家了解`原型`和`原型链`这一概念外，还有就是自己梳理一遍所掌握的知识。如果上文有说的不对或者不好的地方，欢迎大家提出宝贵的意见。
