---
date: 2023-07-29
title: Vue .sync 语法糖
category: frontend
author: XiaoChen
tags:
  - Vue
---

## 1、使用之前

在讲解这个语法糖之前，我们有必要先了解 Vue 中组件之间 `单向数据流` 通信规则：

> Vue 提倡单向数据流，即父级 props 的更新会流向子组件，但是反过来则不行。这是为了防止意外的改变父组件状态，使得应用的数据流变得难以理解。如果破坏了单向数据流，当应用复杂时，debug 的成本会非常高。

所以开发中，我们需要遵循：**父组件可以修改子组件的内容，而子组件是不能（不推荐）直接改变父组件的内容，但子组件可以通过事件触发的方式通知父组件来修改自己本身的内容。**

## 2、案例对比

**场景**：控制弹框的显示与关闭。在父组件中打开子组件弹框，然后在点击子组件中的按钮关闭弹框。

* **一般做法**

我们父子传值的做法如下：

```vue
// 父组件
<template>
    <div>
        <button @click="show">打开弹窗</button>
        <i-dialog @visibleState="changeVisible" :visible="display" />
    </div>
</template>
<script>
import iDialog from "./iDialog.vue";
export default {
    name: 'iDialog',
    components: {
        iDialog,
    },
    data() {
        return {
            display: false,
        };
    },
    methods: {
        show() {
            this.display = true;
        },
        changeVisible(val) {
            this.display = val;
        },
    }
}; 
</script>
```

```vue
// 子组件
<template>
    <div v-show="visible">
        点我关闭子组件
        <button @click="doClose">点我隐身</button>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        doClose() {
            this.$emit("visibleState", false);
        },
    },
};
</script>
```

通过以上，我们就简单的模拟了一个点击弹窗和关闭弹窗的功能，这样的写法没问题，但是一个简单的子组件向父组件传值却用了大量的代码，显得比冗杂。

**使用 .sync 语法糖**  
首先它是一个语法糖，使用方式，在调用子组件时，通过 `:prop.sync="val"` 来监听 `prop` 属性值 `val` 的变化：

```vue
<child :prop.sync="val"></child> 
```

然后会被扩展为：

```vue
<child :prop="val" @update:prop="value => val = value"></child>
```

当子组件需要更新 prop 的值时，它需要显式地触发一个更新事件：

```vue
this.$emit('update:prop', newValue)
```

看了以上是不是很熟悉，子组件中，`本质上还是通过触发事件的方式通知父组件来改变自己的属性值`，只是现在 Vue 内部将其转化为一个语法糖，将 `:prop="val" @update:prop="value => val = value"` 替换成了 `:prop.sync="val"`，这样看起来就简洁多了。

那么我们现在就可以使用 `.sync` 这个语法糖来实现我们最开始的案例了：

```vue
// 父组件
<template>
    <div>
        <button @click="show">打开弹窗</button>
        <i-dialog :visible.sync="display" />
    </div>
</template>
<script>
import iDialog from "./iDialog.vue";
export default {
    name: 'iDialog',
    components: {
        iDialog,
    },
    data() {
        return {
            display: false,
        };
    },
    methods: {
        show() {
            this.display = true;
        }
    }
};
</script>
```

```vue
// 子组件
<template>
    <div v-show="visible">
        点我关闭子组件
        <button @click="doClose">点我隐身</button>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        doClose() {
            this.$emit("update:visible",false);
        },
    },
};
</script>
```
