doLessPage 使用简介
=====================

概述
------------
  doLessPage 是基于jquery-1.8.3初始开发的分页对象级插件, 采用回调函数的方式编写，能及时反应出页码的变动，在自行编写的逻辑函数中有三个参数，最后一个参数接受一个总记录数作为参数进行页码回调。
  
使用方式
------------
```javascript
> ### 文件引入
>> ##### 样式文件引入
>>> <link href="项目路径/doLessPage-0.1.css" rel="stylesheet" type="text/css"/>
>> ##### js脚本文件引入
>>> <script type="text/javascript" src="(jquery CDN)/jquery-1.8.3.min.js"></script>
>>> <script type="text/javascript" src="项目路径/doLessPage-0.1.js"></script>
>> ### 使用示例
>>> $(selector).doLessPage(logicFunction, config);
>> ##### 示例说明
>>> ##### loginFunction 为用户自行编写的前台业务逻辑函数，config为一个js对象，里面包含各项配置参数，参数详见**配置参数**
```
配置参数
------------
  
