---
date: 2023-04-02
title: It is always a pleasure to greet a friend from afar ~
cover: /images/demand.png
category: Demand
---

> 项目实战中的需求总结

<!-- more -->

## 面板折叠功能  

1. 由于UI库自带的折叠面板只能实现向下的折叠，而需求要实现的是向上的折叠，故使用vue原生实现。  
2. 在data中定义collapse响应式数据，给折叠箭头绑上click事件，给collapse赋boolean值，面板height绑上动态style，`:style = {'height': (collapse  ? '100px':'200px')}`
3. 文字部分也可以用v-if判断或者模板语法中直接判断`{{ collapse? '折叠' : '展开' }`

## 封装v-thousand自定义指令  

> v-model绑定的input框千分位反显，封装v-thousand自定义指令，利用正则对dom的展示进行修改  

```js

// thsousandFormat.js

export const thousandFormat = Vue => {
  Vue.directive('thousandFormat', function (el, binding, vnode) {
    let event = new Event('input')

    function numFormat(num) {
      let num1 = num.split('.')[0]
      let num2 = num.split('.')[1]
      let c = num1.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (num.toString().indexOf('.') !== -1) {
        return c + '.' + num2
      } else {
        return c
      }
    }

    el.addEventListener('input', function (event) {
      let inputValue = binding.value + ''
      let cursorPos = event.target.selectionStart || 0
      // 以从后数起来说，光标位置是不变的
      let curPosFromBack = inputValue.length - cursorPos
      let inpVal = (inputValue = inputValue.replace(/,/g, ''))
      binding.value = inputValue //这里变化会导致视图变化
      let t = numFormat(inpVal) //转换为千分位格式
      console.log(t, '千分位')
      vnode.context.$nextTick(function () {
        el.querySelector('input').value = t //在上面由于value变化而更新视图后，再赋值给input.value,
        //这样可以防止这次赋值先于上面的更新视图执行
        //这里重新将光标的位置重置到输入数字的位置，否则每次正则变换后光标总是跳到最后
        el.querySelector('input').setSelectionRange(t.length - curPosFromBack, t.length - curPosFromBack)
      })
    })
    el.dispatchEvent(event) //如果数据从服务端获取，要自定义input事件发送，这样才能触发上面绑定的事件处理方法，使数据一进入输入框里面变成千分位格式
  })
}
```

## 判断起购金额，不符合条件下方不同红字提醒

1. 输入金额大于卡号余额，在输入框下方红字提示"购买金额不可大于可用余额”，在输入框下方展示红字提醒  
2. 起购金额小于200并大于1000，若输入金额不满足则输入框下方进行红字提示:"购买金额不满足起购金额金额"  
3. 点击全部转入将卡号金额反显至输入框，金额若不满足购买条件点击全部转入将卡号金额反显至输入框同上  
4. 金额输入后展示按照千分位展示

## 登录逻辑  

收藏页登录逻辑，首先判断是否为签约用户，是直接跳转，否判断登录，若已经登录，跳转开户，若没有登录，唤起登录，登录后发现是签约用户，直接跳，如果是游客，前往开户。

## 走势图优化  

Echarts折线图颜色分段优化，查阅官网API

## 勾选协议后按钮亮起  

当金额满足并勾选了协议的时候，"确认转入"按钮亮显点击唤起登陆登陆后跳转，任意一条件不满足灰显

## 埋点功能  

当点击事件后埋点，现在utils/track中的config.js中定义好埋点name/type/value/uploadData，然后组件里点击事件触发后直接调用封装好的tracking方法（底层使用sdk），并赋值需要上报的埋点数据，最后再用fiddler工具抓包即可。

## 增加收藏图标并增加交互逻辑

1. 图标的展示用v-if来动态地加载图片，判断条件用两个三元表达式内嵌起来，分为已收藏图片（true），未收藏图片（false），跳动的动图（null）
2. 点击收藏时，先加载动图再加载已收藏图片，取消收藏时，直接加载未收藏图片
3. 点击后先给Isfavorite字段设置对应图片的值，再发起请求修改收藏状态，以得到的相应信息判断是给成功的toast提示还是失败的弹窗
4. 发请求前先调用自定义事件`this.$emit('updateCollectionList')`
5. ProductList组件中在data中创建一个`collectionList`的数组用来存储收藏列表
6. ProductList组件接收自定义事件并在methods中定义一个自定义事件的回调函数，函数中调用查询收藏列表的接口，返回值赋值给`collectionList`
7. watch中监听collectionList的变化，一但变化了就拿collectionList的productId和存储所有产品的listData中的productId作比较，如果全等了，修改收藏值为true，反之则为false
8. 在Matrix组件中给ProductList组件打上ref，在created钩子中使用封装的ViewWillAppear方法，在返回页面的时候直接调用`this.refs.productList.updateCollectionList`来刷新响应值
