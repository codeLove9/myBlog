---
title: v-if加key值的作用
date: 2025-06-14
author: XiaoChen
category: frontend
tags:
  - Vue
---

> 我知道v-for要加key，增加渲染效率，却没想到v-if也要加key

<!-- more -->

## 背景

v-if、else控制两个input框的显隐，点击按钮切换input框，当输入框内**输入了字符后，点击按钮切换，输入框内字符不清空**。

```vue
// 以下是源代码
 <div id="app">
    <template v-if="type === 'name'">
      <label>用户名：</label>
      <input type="text" placeholder="请输入用户名...">
    </template>
    <template v-else>
      <label>邮箱：</label>
      <input type="text" placeholder="请输入邮箱...">
    </template>
    <button @click="handleToggleClick">切换输入类型</button>
  </div>
  <script src="vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        type: 'name'
      },
      methods: {
        handleToggleClick() {
          this.type = this.type === 'name' ? 'mail' : 'name';
        }
      }
    });
  <script>
```

## 分析

vue在渲染元素时，处于效率考虑， 会尽量地复用已有的元素而非重新渲染，比如上面的实例，在，点击切换按钮，虽然DOM变了，但是之前在输入框键入的内容并没有改变，只是替换了placeholder的内容，说明input元素被复用了，如果不希望这样做，可以使用vue提供的key属性，它可以让你自己决定是否要复用元素，key的值必须是唯一的！！！，例如下面这样：

```vue
<div id="app">
    <template v-if="type === 'name'">
      <label>用户名：</label>
      <input type="text" placeholder="请输入用户名..." key="neme-input">
    </template>
    <template v-else>
      <label>邮箱：</label>
      <input type="text" placeholder="请输入邮箱..." key="mail-input">
    </template>
    <button @click="handleToggleClick">切换输入类型</button>
  </div>
  <script src="vue.js"></script>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        type: 'name'
      },
      methods: {
        handleToggleClick() {
          this.type = this.type === 'name' ? 'mail' : 'name';
        }
      }
    });
  </script>
```

1. vue中列表循环需要加`:key='唯一标识'`，唯一标识尽量是id，目的是为了高效地更新虚拟DOM。
2. key主要用于dom diff算法，diff算法为同级比较，比较当前标签上的key还有他当前的标签名，如果key和标签名都一样时只移动，不会重新创建元素和删除元素
没有key地时候默认使用就地复用策略。如果数据的顺序被改变，vue不是移动DOM元素来匹配数据项的改变，而是简单复用原来位置的每个元素，在进行比较时发现标签一样值不一样时，就会复用之前的位置，将新值直接放到该位置，以此类推，最后多出一个就会把最后一个删除掉。
3. 尽量不要使用索引值index作key值，一定要用唯一标识的值，如id等。因为若用数组索引index为key，当向数组中指定位置插入一个新元素后，因为这时候会重新更新index索引，对应着后面的虚拟DOM的key值全部更新了，这个时候还是会做不必要的更新，就像没有加key一样，因此index虽然能够解决key不冲突的问题，但是并不能解决复用的情况。如果是静态数据，用索引号index做key值是没有问题的。

diff算法图解：

diff算法的处理方法，对操作前后的dom树同一层的节点进行对比，一层一层对比

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ec4e2ad80aa4fcca47d4476a9206331~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在以下的使用场景：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d05e7dda66045408f9c956b74a66ecc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3b0f893b872456faacadd762355bad3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

即把C更新成F，D更新成C，E更新成D，最后再插入E，是不是很没有效率？

所以我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53ec0b1a2a614fc1a09c6f77ff56b5a3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

所以一句话，key的作用主要是为了高效的更新虚拟DOM。另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

所以给input元素添加key，就不会复用了，切换类型时键入的内容也会被删除。

## 总结

Vue中key属性，主要用于优化虚拟DOM的更新和过渡效果。key通过提供唯一标识帮助Vue在列表循环时更高效地更新DOM，避免元素错误复用，确保状态正确。未使用key时，Vue采用“就地复用”策略可能导致意外行为，使用key可以更准确地追踪和更新元素。
