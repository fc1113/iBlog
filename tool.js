
//浏览器检测
(function(){
	window.sys={};//让外部可以访问，保存浏览器信息对象
	var ua=navigator.userAgent.toLowerCase();//获取浏览器信息字符串
	var s;//浏览器信息数组，浏览器名称+版本
	
	(s=ua.match(/msie ([\d.]+)/))?sys.ie=s[1]:
	(s=ua.match(/firefox\/([\d.]+)/))?sys.firefox=s[1]:
	(s=ua.match(/chrome\/([\d.]+)/))?sys.chrome=s[1]:
	(s=ua.match(/opera\/.*version\/([\d.]+)/))?sys.opera=s[1]:
	(s=ua.match(/version\/([\d.]+).*safari/))?sys.safari=s[1]:0;
	
	if(/webkit/.test(ua))sys.webkit=ua.match(/webkit\/([\d.]+)/)[1];
})();


//DOM加载
function addDomLoaded(fn){
	var isReady=false;
	var timer=null;
	function doReady(){
		if(timer)clearInterval(timer);
		if(isReady)return;
		isReady=true;
		fn();
	}
	
	//非W3C浏览器（chrome，Firefox，IE9）和IE6,7,8浏览器的兼容
	if((sys.opera&&sys.opera<9)||(sys.firefox&&sys.firefox<3)||(sys.webkit&&sys.wekbit<525)){
		timer=setInterval(function(){
			if(document&&document.getElementById&&document.getElementsByTagName&&document.getElementsByClassName){
				doReady();
			}
		},1);
	}else if(document.addEventListener){//w3c
		addEvent(document,'DOMContentLoaded',function(){
			fn();
		removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else if(sys.ie&&sys.ie<9){//ie6,7,8
        timer=setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				doReady();
			}catch(e){};
		},1);
	}
	
}


//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener!='undefined'){
		obj.addEventListener(type,fn,false);//false 不捕获
	}
	/*else if(typeof obj.attachEvent){//用现代事件绑定IE的1.无法删除事件2.无法顺序执行3.IE现代事件绑定存在内存泄漏问题
	 //所以我们对IE舍弃这种现代绑定，用传统绑定来模拟现代事件绑定
		obj.attachEvent('on'+type,function()
		{
			fn.call(obj,window.event);
		});
	}*/
	else{
		//创建一个存放事件的哈希表
	if(!obj.events)obj.events={};
	//第一次执行时执行
	if(!obj.events[type]){
		//创建一个存放事件处理函数的数组
		obj.events[type]=[];
		//把第一次的事件处理函数先存储到第一个位置上
		if(obj['on'+type])obj.events[type][0]=fn;
	}else{
		if(addEvent.equal(obj.events[type],fn))return false;
	}
	//从第二次开始我们用事件计数器来存储
	obj.events[type][addEvent.ID++]=fn;
	//执行事件处理函数
	obj['on'+type]=addEvent.exec;
	}
}

//为每一个事件分配一个计数器
addEvent.ID=1;
//执行事件处理函数
addEvent.exec=function(event){
	var e=event||window.event;
	var es=this.events[e.type];
		for(var i in es){
			es[i].call(this,e);
		}
}

//同一个注册函数进行屏蔽
addEvent.equal=function(es,fn){
	for(var i in es){
		if(es[i]==fn)return true;
	}
	return false;
}

//把IE常用的event对象配对到W3c中去
addEvent.fixEvent=function(event){
	event.preventDefault=addEvent.fixEvent.preventDefault;
	event.stopPropagation=addEvent.fixEvent.stopPropagation;
	event.target=event.srcElement;
	return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault=function(){//w3c阻止默认事件
	this.returnValue=false;//IE阻止默认事件
};
addEvent.fixEvent.stopPropagation=function(){
	this.cancelBubble=true;//IE取消冒泡
}

//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener!='undefined'){
		obj.removeEventListener(type,fn,false);
	}
	else{
		if(obj.events){
		for(var i in obj.events[type]){
			if(obj.events[type][i]==fn){
				delete obj.events[type][i];
			}
		}
		}
	}
}

//跨浏览器获取视口大小

function getInner(){
	if( typeof window.innerWidth!='undefined'){//firefox
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}
	else{//其他
		return{
		width:document.documentElement.clientWidth,
		height:document.documentElement.clientHeight 
		}
	}
}

//跨浏览器获得元素到顶点的位置
function offsetTop(element){
	var top=element.offsetTop;
	var parent=element.offsetParent;
	while(parent.offsetParent!=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
}

//跨浏览器获取浏览器滚动条scrollTop
function getScroll(){
	return {
		top:document.documentElement.scrollTop||document.body.scrollTop,
		left:document.documentElement.scrollLeft||document.body.scrollLeft
	}
}

//跨浏览器获取样式
function getStyle(element,attr){
	var value;
	if(typeof window.getComputedStyle!='undefined'){//w3c
						value=window.getComputedStyle(element,null)[attr];
				}
				else if(element.currentStyle){
					   value=element.currentStyle[attr];
				}
				return value;
}


//判断class是否存在
function hasClass(element,className){
	return element.className.match(new RegExp('(^|\\s)'+className+'($|\\s)'));
}


//跨浏览器添加link
function insertRule(sheet,seletor,cssText,pos){
	if(sheet.insertRule){   //w3c
			sheet.insertRule(seletor+'{'+cssText+'}',pos);		
		}
		else if(sheet.addRule){//IE
			sheet.addRule(seletor,cssText,pos);
		}
}

//跨浏览器删除link
function deleteRule(sheet,index){
		if(sheet.deleteRule){//w3c
        sheet.deleteRule(index);		
	}
	else if(sheet.removeRule){//IE
		sheet.removeRule(index);
	}
	
}

//跨浏览器获取innerText
function getInnerText(element){
	return (typeof element.textContent=='string')?element.textContent:element.innerText;
}
//跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent=='string'){
		element.textContent=text;
	}else{
		element.innerText=text;
	}
}


//跨浏览器的event对象
function getEvent(event){
	return event||window.event;
}


//阻止默认行为
function preDef(event){
	var e=getEvent(event);
	if(typeof e.preventDefault!='undefined'){   //w3c
		e.preventDefault();
	}
	else{                                                        //IE
		e.returnValue=false;
	}
}


//删除开头和结尾的空字符
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

//查找元素是否存在某个数组中
function inArray(array,value){
			for(var i in array){
				if(array[i]==value)return true;
			}
			return false;
		}

//查找某个元素的上一个元素的序列
function prevIndex(current,parent){
	var children=parent.children;
	if(parseInt(current)==0)return children.length-1;
	return parseInt(current)-1;
}		
		
//查找某个元素的下一个元素的序列
function nextIndex(current,parent){
	var children=parent.children;
	if(parseInt(current)==children.length-1)return 0;
	return parseInt(current)+1;
}		
		
//滚动条清零
function scrollTop(){
 	document.body.scrollTop=0;  //chrome
	document.documentElement.scrollTop=0;//非chrome
}

//阻止默认事件
function predef(e){
	e.preventDefault();
}













































