---
title: Element UI在表单Form组件中修改数据，表格Table组件的数据也跟着修改的问题
date: 2023-04-30
author: XiaoChen
category: frontend
tags:
  - Element UI
---

## 场景

最近遇到一个问题，在表单中修改数据，表格的数据也跟着修改，且不管是不是按确定或取消按钮，表格的数据还是被修改了，部分代码如下：

```vue
editUser(row) {
  this.operateType = 'edit'
  this.isShow = true
  this.dialog.operateForm = row
}
```

## 解决方案

刚开始还以为是table的传值传错了，最后发现就是上面的代码的最后一行错了。

`this.dialog.operateForm = row`

因为row是Object对象类型，如果直接赋值的话，就变成了浅拷贝，复制的是地址，导致在表单中改变值的时候table中的数据也跟着改变，所以要进行深拷贝，利用json就可以了，改成下面就行了。

`this.dialog.operateForm = JSON.parse(JSON.stringify(row))`
