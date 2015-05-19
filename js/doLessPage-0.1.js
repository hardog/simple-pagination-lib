;(function($){	
	$.fn.extend({
        doLessPage: function (handle, cfg) {
         var config = $.extend({
			        	  selector:this.selector,
			        	  isInit:true,
			        	  rowStyle:'row',//word、row、cn
			        	  theme:'dlp-default',
			        	  keyBoardEnable:true,
			        	  ajaxReqParam:{},
			        	  pageParam:{
			        		  curPage:1,
				        	  totalPage:1,
				        	  perPageNum:10,
				        	  totalNum:1
			        	  }
			          }, cfg),
			          curPageBarObj = this; 
         
           //计算总的页码数
           var calTotalPage = function(){
        	   config.pageParam.totalPage = Math.ceil(config.pageParam.totalNum/config.pageParam.perPageNum);
           };
           
           //填充上下页的样式
           var fillNextPrevStyle = function(){
        	   var arr = [];
        	   
        	   if(config.rowStyle === "word"){
        		   arr['prev'] = 'prev';
        		   arr['next'] = 'next';
        		   arr['first'] = 'first';
        		   arr['last'] = 'last';
        	   }else if(config.rowStyle === "row"){
        		   arr['prev'] = '&lt;';
        		   arr['next'] = '&gt;';
        		   arr['first'] = '&lt;&lt;';
        		   arr['last'] = '&gt;&gt;';
        	   }else if(config.rowStyle === "cn"){
        		   arr['prev'] = '上一页';
        		   arr['next'] = '下一页';
        		   arr['first'] = '首页';
        		   arr['last'] = '末页';
        	   }
        	   
        	   return arr;
           }
           
           //初始填充分页内容
           var initPageContent = function(){
        	   var 	prevNextStyle = fillNextPrevStyle(),
        	   		appendHtml = '<span class="first disabled">'+ prevNextStyle['first'] +'</span><span class="prev disabled">'+ prevNextStyle['prev'] +'</span>',
        	   		btnHtml = "<input type='text' size='1' class='pageNum' /><input type='button' value='GO' class='turnPage'/>",
        	   		i = 0;
        	   
        	   //计算总页码
        	   calTotalPage();
        	   
        	   //给当前元素容器添加主题类
        	   curPageBarObj.addClass(config.theme);
      	   
        	   //区分小于6页，等于6页以及大于6页码的情况
        	   if(config.pageParam.totalPage <= 6){
        		   for(i = 1; i < config.pageParam.totalPage + 1; i ++){
        			   appendHtml += '<a index="'+ (i-1) +'" tabindex="'+ i +'" class="'+ (1 == i ? "current" : "") +'">'+ i +'</a>';
        		   }
        	   }else{
        		   for(i = 1; i < 5; i ++){
        			   appendHtml += '<a index="'+ (i-1) +'" tabindex="'+ i +'"  class="'+ (1 == i ? "current" : "") +'">'+ i +'</a>';      			   
        		   }
        		   
        		   appendHtml += '<strong>...</strong><a index="4" tabindex="5">'+ (config.pageParam.totalPage - 1) +'</a><a index="5" tabindex="6">'+ config.pageParam.totalPage +'</a>';
        	   }
        	   
        	   appendHtml += '<span class="next '+ (config.pageParam.totalPage == 1 ? "disabled" : "") +'">'+ prevNextStyle['next'] +'</span><span class="last '+ (config.pageParam.totalPage == 1 ? "disabled" : "") +'">'+ prevNextStyle['last'] +'</span>';
        	   appendHtml += btnHtml;
        	   
        	   curPageBarObj.html(appendHtml);
        	   
        	 //绑定事件
             initBindEvent();
             
             //键盘绑定事件
             if(config.keyBoardEnable){
            	keyBoardEvent();
             }
           };
           
           //分页条的点击响应事件
           var pageBarChange = function(curClickNum, index){
        	   var aObj = curPageBarObj.find("a"),
		   	   	   i = 0;
        	   
        	   curPageBarObj.find(".current").removeClass("current");

        	   if(config.pageParam.totalPage <= 6){
        		   curPageBarObj.find("a").eq(index).addClass("current");
        	   }else{
        		   if(config.pageParam.totalPage <= (curClickNum + 5)){
        			   curPageBarObj.find("strong").remove();
        			   
        			   for(i = 0; i < 6; i ++){
    					   $(aObj[i]).text(config.pageParam.totalPage - 5 + i);
    					   if(curClickNum == (config.pageParam.totalPage - 5 + i)){
    						   $(aObj[i]).addClass("current");
    					   }
    				   }
        		   }else{
        			   if(curPageBarObj.find("strong").length == 0){
        				   curPageBarObj.find("a").eq(3).after("<strong>...</strong>");
        			   }
        			   
        			   for(i = 0; i < 4; i ++){
    					   $(aObj[i]).text((curClickNum == 1 ? 2 :curClickNum) - 1 + i);
    				   }
        			   
        			   if(curClickNum == 1){index = 0;}else{index = 1;}
        			   curPageBarObj.find("a").eq(index).addClass("current");
        		   }				   
        	   }
        	   
        	   config.pageParam.curPage = curClickNum;
        	   //处理事件响应
               handle(config.ajaxParam, config.pageParam, start);
           };
           
           //键盘响应事件
           var keyBoardEvent = function(){
        	   curPageBarObj.find(".current").focus();
        	   curPageBarObj.keyup(function(e){
        		   switch(e.keyCode){
        		   case 37:
        			   //上一页
        			   curPageBarObj.find(".prev").trigger("click");
        			   break;
        		   case 38:
        			   //第一页
        			   curPageBarObj.find("a:eq(0)").trigger("click",{clickNum:1,index:0});
        			   break;
        		   case 39:
        			   //下一页
        			   curPageBarObj.find(".next").trigger("click");
        			   break;
        		   case 40:
        			   //最后一页
        			   curPageBarObj.find("a:last").trigger("click",{clickNum:config.pageParam.totalPage, index:parseInt(curPageBarObj.find("a:last").attr("index"))});
        			   break;
        		   }
        	   });
           };
           
           //标签点击事件
           var initBindEvent = function(){
        	 //上一页点击事件
        	   curPageBarObj.find(".prev").click(function(){
        		   	var curClickNum = parseInt(curPageBarObj.find(".current").text()),
        		   		index = parseInt(curPageBarObj.find(".current").attr("index")) - 1;
        		  
        		   	if(curClickNum != 1){
        		   		if(curClickNum - 1 == 1){
            			  	curPageBarObj.find(".prev").addClass("disabled");
            			  	curPageBarObj.find(".next").removeClass("disabled");
            			  	curPageBarObj.find(".first").addClass("disabled");
            			  	curPageBarObj.find(".last").removeClass("disabled");
            		  	}
            		  
            		  	if(curClickNum - 1 != config.pageParam.totalPage){
            			  	curPageBarObj.find(".next").removeClass("disabled");
            			  	curPageBarObj.find(".last").removeClass("disabled");
            		  	}
            		  
            		  	pageBarChange(curClickNum - 1, index);
        		   	}        		  	
        	   });
        	   
        	   //下一页点击事件
        	   curPageBarObj.find(".next").click(function(){
         		  	var curClickNum = parseInt(curPageBarObj.find(".current").text()),
         		  		index = parseInt(curPageBarObj.find(".current").attr("index")) + 1;
         		  	
         		  	if(curClickNum < config.pageParam.totalPage){
         		  		if(curClickNum + 1 == config.pageParam.totalPage){
             		  		curPageBarObj.find(".next").addClass("disabled");
             		  		curPageBarObj.find(".prev").removeClass("disabled");
             		  		curPageBarObj.find(".first").removeClass("disabled");
             		  		curPageBarObj.find(".last").addClass("disabled");
             		  	}
             		 
             		  	if(curClickNum == 1 && config.pageParam.totalPage != 1){
             		  		curPageBarObj.find(".prev").removeClass("disabled");
             		  		curPageBarObj.find(".first").removeClass("disabled");
             		  	}
    	       		  
             		  	pageBarChange(curClickNum + 1, index);
         		  	}
         	   });
        	   
        	   //页码点击事件
        	   curPageBarObj.find("a").click(function(e, p){
        		   var curClickNum = 0, index = 0;
        		   
        		   //可指定页码传递
        		   if(!p){
        			   index = $(this).attr("index");
        			   curClickNum = parseInt($(this).text());
        		   }else{
        			   index = p.index;
        			   curClickNum = p.clickNum;
        		   }
        		   
        		   if(curClickNum != 1){
	      			  	curPageBarObj.find(".prev").removeClass("disabled");
	      			  	curPageBarObj.find(".first").removeClass("disabled");
	      		 	}else{
	      		 		curPageBarObj.find(".prev").addClass("disabled");
	      		 		curPageBarObj.find(".first").addClass("disabled");
	      		 	}
         		 
         			if(curClickNum != config.pageParam.totalPage){
         				curPageBarObj.find(".next").removeClass("disabled");
         				curPageBarObj.find(".last").removeClass("disabled");
         			}else{
         				curPageBarObj.find(".next").addClass("disabled");
         				curPageBarObj.find(".last").addClass("disabled");
         			}
         		 
         			pageBarChange(curClickNum, index);
         	   });
        	   
        	   //首页点击事件
        	   curPageBarObj.find(".first").click(function(){
        		   curPageBarObj.find("a:eq(0)").trigger("click",{clickNum:1,index:0});
        	   });
        	   
        	   //末页点击事件
        	   curPageBarObj.find(".last").click(function(){
        		   curPageBarObj.find("a:last").trigger("click",{clickNum:config.pageParam.totalPage, index:parseInt(curPageBarObj.find("a:last").attr("index"))});
        	   });
        	   
        	   //跳转点击事件
        	   curPageBarObj.find(".turnPage").click(function(){
        		   var turnNum = parseInt(curPageBarObj.find(".pageNum").val()),
        		   	   reg = /^[1-9]\d*$/;
        		   
        		   if(!reg.test(turnNum)){
        			   alert("请输入正确的页码!");
        		   }else if(turnNum > config.pageParam.totalPage){
        			   alert("请求超过最大页码!");
        		   }else{
        			   if(config.pageParam.totalPage <= 6){
        				   curPageBarObj.find("a").eq(turnNum - 1).trigger("click",{clickNum:turnNum, index:turnNum - 1});
        			   }else{
        				   curPageBarObj.find("a:eq(0)").trigger("click",{clickNum:turnNum, index:0});
        			   }        			   
        		   }
        		   
        		   curPageBarObj.find(".pageNum").focus();
        	   });
           };
           
           //回调函数
           var start = function(totalNum){
        	   var prevPageSize = config.pageParam.totalPage;
        	   
        	   config.pageParam.totalNum = totalNum;
        	   calTotalPage();
        	   
        	   if(config.isInit || config.pageParam.totalPage != prevPageSize){
        		   //初始填充内容
        		   initPageContent();
        		   config.isInit = false;
        	   }        	   
           };

           //处理事件响应
           handle(config.ajaxParam, config.pageParam, start);
        }
    });
}(jQuery));