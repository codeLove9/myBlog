---
title: 多个表单同步校验，且表单间数据联动
date: 2025-06-12
author: XiaoChen
category: frontend
tags:
  - Vue
---

> 通常一个页面都是一个表单，如果需要多个表单的时候，该怎么处理呢？

<!-- more -->

## 背景

在项目中一个录入页面中需要实现多个Form表单，分别叫交易信息表单、付款信息表单、其他信息表单，并在页面提交时需要对多个Form表单进行校验，多个表单都校验成功时才能提交。

## 分析

1. 每个表单里的逻辑代码都较多，所有把三个表单都封装成一个单独的Form，每个表单上都设置单独的model和ref，不能同时使用，否则每个表单上的校验提示会失效。

```vue
<!-- 表单一区域，组件TradeForm -->
    <el-form :inline="true" :model="form1Mode" class="demo-form-inline" ref="form" :rules="form1Rules">
      <el-form-item label="表单一" prop="user">
        <el-input v-model="form1Mode.user" placeholder="form1"></el-input>
      </el-form-item>
    </el-form>
<!-- 表单二区域，组件PayForm -->
    <el-form :inline="true" :model="form2Mode" class="demo-form-inline" ref="form" :rules="form2Rules">
      <el-form-item label="表单二" prop="user">
        <el-input v-model="form2Mode.user" placeholder="form2"></el-input>
      </el-form-item>
    </el-form>
<!-- 表单三区域，组件OtherForm -->
    <el-form :inline="true" :model="form3Mode" class="demo-form-inline" ref="form" :rules="form3Rules">
      <el-form-item label="表单三" prop="user">
        <el-input v-model="form3Mode.user" placeholder="form3"></el-input>
      </el-form-item>
    </el-form>
```

2. 存入与读取：三个表单内数据联动，如果联动字段较少，直接把字段存入到vuex中，每个表单都可以使用。如果联动字段很多，则要把整个form存进去，同时引入其他两个表单，在formA中引入formB和formC，在formB中引入formA和formC等。</br>
修改：在vue中定义一个方法：`updateFormData`，payload为一个对象`{form: xxxForm, value: xxx}`，`state[payload[form]] = payload[value]`,每个表单修改时也同步传入表单名和值的对象，三个表单只用调这一个方法就能改变vuex里的各表单值。

3. 提交时先获取各个表单的dom，调用表单的validated校验方法，由于validate方法是一个Promise，同步校验就可以使用Promise.all方法。

```vue
<template>
  <div>
    <formA ref="formA" />
    <formB ref="formB" />
    <formC ref="formC" />
    <!-- 按钮提交区域 -->
    <div>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    //封装验证函数
    submitForm(formUser) {
      return new Promise((resolve, reject) => {
        // 获取当前组件里的子组件formA、B、C，再拿到孙组件form后调用validate校验方法
        this.$refs[formUser].$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject(new Error('错误'))
          }
        })
      })
    },
    //确定按钮
    onSubmit() {
      Promise.all([this.submitForm('formA'), this.submitForm('formB'),this.submitForm('formC')])
        .then(() => {
          //验证成功后在此处发请求
          this.$message.success('验证通过')
        })
        .catch(() => {
          this.$message.error('验证失败')
        })
    }
  }
}
```

## 总结

联动方式就是存入整个表单，引入其他两个表单，更新也是更新整个表单。</br>
同步校验时获取各个表单组件最里层form的validate校验方法后，用Promise.all方法一起提交校验。
