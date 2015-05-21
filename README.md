doLessPage 使用简介
=====================

概述
------------
  doLessPage 是基于jquery-1.8.3初始开发的分页对象级插件, 采用回调函数的方式编写，能及时反应出页码的变动，在自行编写的逻辑函数中有三个参数，最后一个参数接受一个总记录数作为参数进行页码回调。
  
使用方式
------------
> 文件引入
>> 样式文件引入
```javascript
  <link href="项目路径/doLessPage-0.1.css" rel="stylesheet" type="text/css"/>
```
>> js脚本文件引入
```javascript
  <script type="text/javascript" src="(jquery CDN)/jquery-1.8.3.min.js"></script>
  <script type="text/javascript" src="项目路径/doLessPage-0.1.js"></script>
```
> 使用示例
>>> $(selector).doLessPage(logicFunction, config);
>>> __示例说明__
>>> loginFunction 为用户自行编写的前台业务逻辑函数，config为一个js对象，里面包含各项配置参数，参数详见配置参数

配置参数
------------
> __logicFunction__ 
>> 该参数由用户自行编写，其具有三个参数ajaxParam, pageParam, callback；
>> ajaxParam 表示发送ajax请求的程序参数，用户需要传递给后台的参数可自行在此参数中定义
>> pageParam 表示分页插件页码参数具有curPage,totalPage,totalNum,perPageNum四个属性；分别表示当前请求页码，总页码，总记录数，每页记录数
> callback 由插件自动调用的函数，需要传递总记录数作为参数

> __config__
> 参数配置的对象,可选配置参数如下
>> 
