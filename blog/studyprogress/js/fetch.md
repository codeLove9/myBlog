---
title: fetch发送ajax请求
date: 2023-05-14
author: XiaoChen
category: frontend
tags:
  - Ajax
---

```js
//发送网络请求---使用fetch发送（未优化）
1.普通链式调用
fetch(`/api1/search/users2?q=${keyWord}`).then(
  response => {
    console.log('联系服务器成功了');
    return response.json()
  },
  error => {
    console.log('联系服务器失败了',error);
    return new Promise(()=>{})    // 返回一个初始的Promise中断操作
  }
)
.then(
  response => {console.log('获取数据成功了',response);},
  error => {console.log('获取数据失败了',error);}
)

2.最后统一使用catch捕获错误
fetch(`/api1/search/users2?q=${keyWord}`).then(
  response => {
    console.log('联系服务器成功了');
    return response.json()
  }
)
.then(
  response => {console.log('获取数据成功了',response);},
)
.catch((err)=>{
  console.log(err)
})


// 发送网络请求---使用fetch发送（优化）
// 使用try/catch+async/await， catch中捕获错误
try {
  const response= await fetch(`/api1/search/users2?q=${keyWord}`)
  const data = await response.json()
  console.log(data);
  PubSub.publish('atguigu',{isLoading:false,users:data.items})
} catch (error) {
  console.log('请求出错',error);
  PubSub.publish('atguigu',{isLoading:false,err:error.message})
}
```
