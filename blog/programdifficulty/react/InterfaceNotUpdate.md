---
title: React中响应式数据变了界面却未更新
date: 2023-05-02
author: XiaoChen
category: frontend
tags:
  - React
---

## 背景

点击按钮，数组push新的数据，但是界面却未更新

数组是引用类型直接赋值再修改，会导致引用未变

```react
let [testArr, setTestArr] = useState([])
 
let _arr = testArr;
_arr.push('test')
setTestArr(_arr)` 
```

[useState](https://so.csdn.net/so/search?q=useState&spm=1001.2101.3001.7020)修改后，useEffect其实未监听到

## 解决方案

所以要重新创建一个新数组，对原数组序列化或者解构

```react
let [testArr, setTestArr] = useState([])
 
let _arr = JSON.parse(JSON.stringify(testArr));
// 或者
let _arr = [...testArr];
_arr.push('test')
setTestArr(_arr)
```

[useEffect](https://so.csdn.net/so/search?q=useEffect&spm=1001.2101.3001.7020)监听数据变化时，只有在数组元素类型为基本数据类型时可以起到作用。但对于复杂数据类型如：对象，数组和函数来说，`React`会使用`referential equality`来对比前后是否有不同。

`React`会检查当前渲染下的这个对象和上一次渲染下的对象的内存地址是否一致。两个对象必须是同一个对象`useEffect`才会跳过执行`effect`。所以，即使内容完全相同，内存地址不同的话，`useEffect`还是会执行`effect`。
