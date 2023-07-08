---
title: JS之巧妙利用对象的浅拷贝优化递归(包含reduce的学习)
date: 2023-06-07
author: XiaoChen
category: frontend
tags:
- JS
---

## 关于reduce

arr.reduce(callback,init)
reduce为遍历数组，为每一个元素执行回调函数，回调函数中接收四个参数
  prev：上一次回调返回的值，或者是提供的初始值init（如果Init存在，不存在回调函数会从下标为1的元素开始执行）;
  cur：当前被处理的元素;
  index：当前元素在数组中的索引;
  arr：调用reduce方法的原数组

## 实例数据

```js
let Arr = [
        {
          id: '1',
          menu_name: '设置',
          menu_url: 'setting',
          parent_id: 0
        },
        {
          id: '1-1',
          menu_name: '权限设置',
          menu_url: 'setting.permission',
          parent_id: '1'
        },
        {
          id: '1-1-1',
          menu_name: '用户管理列表',
          menu_url: 'setting.permission.user_list',
          parent_id: '1-1'
        },
        {
          id: '1-1-2',
          menu_name: '用户管理新增',
          menu_url: 'setting.permission.user_add',
          parent_id: '1-1'
        },
        {
          id: '1-1-3',
          menu_name: '角色管理列表',
          menu_url: 'setting.permission.role_list',
          parent_id: '1-1'
        },
        {
          id: '1-2',
          menu_name: '菜单设置',
          menu_url: 'setting.menu',
          parent_id: '1'
        },
        {
          id: '1-2-1',
          menu_name: '菜单列表',
          menu_url: 'setting.menu.menu_list',
          parent_id: '1-2'
        },
        {
          id: '1-2-2',
          menu_name: '菜单添加',
          menu_url: 'setting.menu.menu_add',
          parent_id: '1-2'
        },
        {
          id: '2',
          menu_name: '订单',
          menu_url: 'order',
          parent_id: 0
        },
        {
          id: '2-1',
          menu_name: '报单审核',
          menu_url: 'order.orderreview',
          parent_id: '2'
        },
        {
          id: '2-2',
          menu_name: '退款管理',
          menu_url: 'order.refundmanagement',
          parent_id: '2'
        }
      ]
```

## 逻辑代码

```js
    let treeList = Arr.reduce((prev,cur)=>{
      prev[cur['id']] = cur;
      return prev
    },{})
    // console.log(treeList)
    let result = Arr.reduce((prev, cur)=>{
      let pid = cur.parent_id;
      // pid为0的就找不到父对象，找到当前, cur的父对象
      // 对象的浅拷贝，引用关系存在，在后面处理parent的时候也会导致, cur的改变，达到递归的效果
      let parent = treeList[pid]
      // console.log(parent,1)
      // 如果父对象存在，就将, cur压到父对象的children属性中
      if(parent){
        // parent和, cur存在引用关系
        parent.children? parent.children.push(cur) : parent.children = [cur]
      } else if(pid === 0){
        // 没有父对象，则此, cur为树的根元素
        prev.push({...cur})
      }
      return prev
    },[])
```
