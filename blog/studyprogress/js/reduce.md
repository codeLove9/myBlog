---
title: JS使用reduce
date: 2023-06-08
author: XiaoChen
category: frontend
tags:
- JS
---

> **reduce()** 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

<!-- more -->

**定义**：

> **reduce()** 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

reduce() 与forEach()、map()、filter()这些方法一样，也会对数组中的每一项进行遍历，但是reduce() 可以将遍历的前一个数组项产生的结果与当前遍历项进行运算。

**语法**：

```js
array.reduce(function(prev, cur, index, array){
    ...
}, init);
```

回调函数中的参数：

* **prev** 必需。表示调用回调时的返回值，或者初始值 init。

* **cur** 必需。表示当前元素。

* **index** 可选。表示当前元素的索引。

* **array** 表示原数组。

* **init** 可选。初始值，作为第一次调用回调函数的第一个参数。

其中常用参数：**prev** 和 **cur**

**注意：**回调函数第一次执行时，prev和cur的取值有两种情况：如果调用reduce()时提供了初始值init，prev取init值，cur取数组中的第一个值，此时索引从0开始；如果没有提供初始值init，则prev取数组中的第一个值，cur取数组中的第二个值，此时索引从1开始。

**实例**：

**1.** 没有传递初始值init

```js
const arr = [1, 3, 5, 7]
arr.reduce(function(prev, cur, index, arr){
    console.log(prev, cur, index) return prev + cur
})
```

每次调用的参数和返回值如下表：

| callback | prev | cur | index | array        | return value |
| -------- | ---- | --- | ----- | ------------ | ------------ |
| 第1次    | 1    | 3   | 1     | [1, 3, 5, 7] | 4            |
| 第2次    | 4    | 5   | 2     | [1, 3, 5, 7] | 9            |
| 第3次    | 9    | 7   | 3     | [1, 3, 5, 7] | 16           |

因为没有传入初始值，所以索引是从1开始，callback被调用三次，开始时prev的值为数组第一项1，cur的值为3，相加之后返回值4作为下一轮回调的prev值，然后继续下一轮的回调，直至完成后返回。

**2.** 传递初始值的情况下：

```js
const arr = [1, 3, 5, 7]
arr.reduce(function(prev, cur, index, arr){
    console.log(prev, cur, index)
    return prev + cur
}, 10)
```

每次调用的参数和返回值如下表：

| callback | prev | cur | index | array        | return value |
| -------- | ---- | --- | ----- | ------------ | ------------ |
| 第1次    | 10   | 1   | 0     | [1, 3, 5, 7] | 11           |
| 第2次    | 11   | 3   | 1     | [1, 3, 5, 7] | 14           |
| 第3次    | 14   | 5   | 2     | [1, 3, 5, 7] | 19           |
| 第4次    | 19   | 7   | 3     | [1, 3, 5, 7] | 26           |

**3.** 数组去重

```js
const arr = ['ab', 'v', 'd', 'ab', 'h', 'e', 'dc', 'e', 'e', 'f']
const newArr = arr.reduce(function(prev, cur){
    !prev.includes(cur) && prev.push(cur)
    return prev
}, [])
console.log(newArr) // ["ab", "v", "d", "h", "e", "dc", "f"]
```

执行的步骤如下：

* 初始化一个空数组

* 第一次调用时，prev 为初始值即空数组，cur 为数组中的第一项 arr[1]，然后在 prev 中查找 cur 是否已经存在，如果不存在就将该项添加到 prev 中，并 prev 返回进入下一次回调

* 第二次回调时，prev 为第一次的返回值，cur 为数组中的第二项 arr[2]，然后在 prev 中查找 cur 是否已经存在，如果不存在就将该项添加到 prev 中，并 prev 返回进入下一次回调

* ... ...

* 最后将 prev 这个数组返回

**4.** 利用 reduce 对数组中的 Object 对象进行分组及合并

```js
//从后台获取的对象数组，根据对象的type进行分组合并成tree树形展示数据
const dataArr = [
    { type: '治理层', name: 'hive_82', reserve: '2', id: 1 },
    { type: '原始数据层', name: 'qwe', reserve: '1', id: 2 },
    { type: '贴源层', name: 'mysql_exchangis', reserve: '3', id: 3 },
    { type: '治理层', name: 'links_188', reserve: '1', id: 4 },
    { type: '贴源层', name: 'mysql_ces', reserve: '2', id: 5 }
]
const treeData = dataArr.reduce((cur, next) => {
    const obj = cur.find(curItem => curItem.label === next.type) if (obj) { if (obj.children.indexOf(next.id) === -1) { //去重处理
 obj.children.push({ 
                ...next, 
                label: next.name 
            })
        }
    } else {
        const newObj = {
            label: next.type,
            children: [{
                ...next,
                label: next.name
            }]
        }
        cur.push(newObj)
    } return cur
}, [])
​ // 合并后的结果：
treeData = [
    {
        label: '治理层',
        children: [
            { type: '治理层', name: 'hive_82', reserve: '2', id: 1, label: 'hive_82' },
            { type: '治理层', name: 'links_188', reserve: '1', id: 4, label: 'links_188' }
        ]
    },
    {
        label: '原始数据层',
        children: [
            { type: '原始数据层', name: 'qwe', reserve: '1', id: 2, label: 'qwe' }
        ]
    },
    {
        label: '贴源层',
        children: [
            { type: '贴源层', name: 'mysql_exchangis', reserve: '3', id: 3, label: 'mysql_exchangis' },
            { type: '治理层', name: 'mysql_ces', reserve: '2', id: 5, label: 'mysql_ces' }
        ]
    }
]
```

**5.** 利用 reduce 处理菜单后端返回的菜单结构如下，需要根据 parentId 将这些数据转换成层级结构。

方法一：

```js
const dataArr = [
    {id: '18', name: '重置密码', parentId: '30',parentName: '用户管理'}, 
    {id: '13', name: '审计日志', parentId: '29', parentName: '系统管理'}, 
    {id: '29', name: '系统管理', parentId: '0', parentName: null}, 
    {id: '14', name: '修改', parentId: '33', parentName: '部门管理'}, 
    {id: '2', name: '用户列表', parentId: '30', parentName: '用户管理'}, 
    {id: '30', name: '用户管理', parentId: '29', parentName: '系统管理'}, 
    {id: '33', name: '部门管理', parentId: '0', parentName: null}, 
    {id: '37', name: '添加用户', parentId: '30', parentName: '用户管理'}, 
    {id: '6', name: '添加', parentId: '33', parentName: '部门管理'}, 
    {id: '7',name: '删除', parentId: '33', parentName: '部门管理'}
] //创建菜单id的映射关系
const idMapping = dataArr.reduce((prev, next, i) => {
    prev[next.id] = i return prev
}, {})
​
const treeData = []
dataArr.map(el => { // 一级菜单
    if (el.parentId === '0') {
        treeData.push(el) return } // 通过映射找到父元素
    const parentEl = dataArr[idMapping[el.parentId]] 
​ // 把当前元素添加到父元素的`children`数组中
    parentEl.children = [...(parentEl.children || []), el]
})
console.log(treeData)
```

方法二：

```js
//根据parentId创建映射关系
const result = dataArr.reduce((prev, next) => {
    prev[next.parentId] ? prev[next.parentId].push(next) : prev[next.parentId] = [next]; return prev;
}, {});
       
Object.keys(result).map(key => {
    result[key].map((item, i) => {
        result[item.id] ? item.children = result[item.id] : '' });
}) this.treeData = result[0]
console.log(treeData)
```

还可以通过递归的方法来实现，具体就不赘述了

最后生成的数据结构如下图所示：

![img](https://img2020.cnblogs.com/blog/1066214/202009/1066214-20200909140625106-18433085.png)
