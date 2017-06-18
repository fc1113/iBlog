
function $(_this){
	return new Base(_this);
}

function Base(_this){
	this.elements=[];
	if(typeof _this=='string'){
		if(_this.indexOf(' ')!=-1){
			//css模拟
			var elements=_this.split(' ');
			var childElements=[];   //
			var node=[];               //存放父节点
			for(var i=0;i<elements.length;i++){
			if(node.length==0)node.push(document);
			switch(elements[i].charAt(0)){
			case '#':
			childElements=[];//清理掉临时节点，以便父节点失效，子节点有效
			childElements.push(this.getId(elements[i].substring(1)));
			node=childElements;//node[]有id元素
			break;
			case '.':
			childElements=[];
			for(var j=0;j<node.length;j++){
				var temps=this.getClass(elements[i].substring(1),node[j]);
				for(var k=0;k<temps.length;k++){
					childElements.push(temps[k]);
				}
			}
			node=childElements;//
			break;
			default:
			childElements=[];
			for(var j=0;j<node.length;j++){
			var temps=this.getTagName(elements[i],node[j]);
			for(var k=0;k<temps.length;k++){
				childElements.push(temps[k]);
			}
		  }
		  node=childElements;//
		       }
			}
			this.elements=childElements;
		}else{
			//find方法模拟
			switch(_this.charAt(0)){
			case '#':
			this.elements.push(this.getId(_this.substring(1)));
			break;
			case '.':
			this.elements=this.getClass(_this.substring(1));
			break;
			default:
			this.elements=this.getTagName(_this);
		   }
		}
	}
	else if(typeof _this=='object'){
		if(_this!=undefined){
		this.elements[0]=_this;
		}
	}else if(typeof _this=='function'){
		this.ready(_this);
	}
	//创建一个数组，来保存获取的节点和节点数组
};
//addDomLoaded
Base.prototype.ready=function(fn){
	addDomLoaded(fn);
};


//设置css选择器子节点
Base.prototype.find=function(str){
	var childElements=[];
	for(var i=0;i<this.elements.length;i++){ 
		switch(str.charAt(0)){
			case '#':
			childElements.push(document.getElementById(str.substring(1)));
			break;
			case '.':
			var temps=this.getClass(str.substring(1),this.elements[i]);
			for(var j=0;j<temps.length;j++){
				childElements.push(temps[j]);
			}
	         
			break;
			default:
			var temps=this.getTagName(str,this.elements[i]);
			for(var j=0;j<temps.length;j++){
				childElements.push(temps[j]);
			}
		}
	}
	this.elements=childElements;
	return this;
}

	
	//获取Id节点
Base.prototype.getId=function(id){
		return document.getElementById(id);
		//return this;
	};
	
	//获取元素节点
Base.prototype.getTagName=function(tag,parentNode){
	var node=null;
	var temps=[];
	if(typeof parentNode!='undefined'){
    node=parentNode;
	}
	else{
		node=document;
	}
		var tags=node.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
		temps.push(tags[i]);
		}
		//return this;
		return temps;
	};

	
//获取一组样式的元素
Base.prototype.getClass=function(className,parentNode){
	var node=null;
	var temps=[];
	if(typeof parentNode!='undefined'){
    node=parentNode;
	}
	else{
		node=document;
	}
	var all=node.getElementsByTagName('*');
	
	for(var i=0;i<all.length;i++){
		//if(all[i].className==className){////////////////////////
		if((new RegExp('(^|\\s)'+className+'($|\\s)')).test(all[i].className)){
			temps.push(all[i]);
		}
	}
	return temps;
	//return this;
}

//添加样式
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
			if(arguments.length==1){
				return getStyle(this.elements[i],attr);
			}
				   this.elements[i].style[attr]=value;
	}
	return this;
}
 
//添加文本内容
Base.prototype.html=function(str){
	if(arguments.length==0){
		return this.elements[0].innerHTML;
	}else{
	for(var i=0;i<this.elements.length;i++){
	this.elements[i].innerHTML=str;
	}
	}
	return this;
}

//添加innerText内容
Base.prototype.text=function(text){
	if(arguments.length==0){
		return getInnerText(this.elements[0]);
	}else{
	for(var i=0;i<this.elements.length;i++){
	setInnerText(this.elements[i],text);
	}
	}
	return this;
}
//返回数组length
Base.prototype.length=function(){
	return this.elements.length;
}

//返回指定对象的属性值
Base.prototype.attr=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			return this.elements[i].getAttribute(attr);
		}else if(arguments.length==2){
			this.elements[i].setAttribute(attr,value);
		}
	}
	return this;
}

//返回指定对象的index序列
Base.prototype.index=function(){
	var  node=this.elements[0].parentNode.children;//获取所有元素子节点(三个img)，children
	for(var i=0;i<node.length;i++){
		if(this.elements[0]==node[i])return i;
	}
}

//设置元素的透明度
Base.prototype.opacity=function(num){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.opacity=num/100;
		this.elements[i].style.filter='alpha(opacity='+num+')';
	}
	return this;
}

//获取单个样式的元素,并返回这个元素对象
Base.prototype.getElement=function(num){
	return this.elements[num];
}

//获取首个节点，并返回这个节点对象
Base.prototype.first=function(){
	return this.elements[0];
}

//获取末个节点，并返回这个节点对象
Base.prototype.last=function(){
	return this.elements[this,elements.length-1];
}

//获取单个样式的元素，并返回Base对象
Base.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}


//添加class样式
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!hasClass(this.elements[i],className))
		{
		this.elements[i].className+=' '+className;
		}
	}
	return this;
}


//删除class样式
Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(hasClass(this.elements[i],className))
		{
		this.elements[i].className=this.elements[i].className.replace(className,'');
		}
	}
	return this;
}

//添加link或style的css规则
Base.prototype.addRule=function(num,seletor,cssText,pos){
	var sheet=document.styleSheets[num];
     insertRule(sheet,seletor,cssText,pos);
	return this;
}

//删除link或style的css规则

Base.prototype.removeRule=function(num,index){
	var sheet=document.styleSheets[num];
	deleteRule(sheet,0);
	return this;
}

//设置表单字段元素
Base.prototype.form=function(name){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i][name];
	}
	return this;
}

//获取字段元素的value值
Base.prototype.value=function(str){
	if(arguments.length==0){
		return this.elements[0].value;
	}else{
		for(var i=0;i<this.elements.length;i++){
		this.elements[i].value=str;
		   }
	}
	return this;
}

//触发点击事件
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
}

//设置事件发生器
Base.prototype.bind=function(event,fn){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
	}
	return this;
}

//添加hover方法

Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
   addEvent(this.elements[i],'mouseover',over);   
   addEvent(this.elements[i],'mouseout',out);   
   
	}
	return this;
}

//设置切换toggle
Base.prototype.toggle=function(){
	for(var i=0;i<this.elements.length;i++){
		(function(element,args){
			var count=0;
		addEvent(element,'click',function(){
			args[count++%args.length].call(this);
		});
		})(this.elements[i],arguments)
	}
	return this;
}

//获取当前节点的上一个元素节点
Base.prototype.pre=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i]==null)throw new Error('找不到上一个节点元素!');
		if(this.elements[i].nodeType==3)this.pre();
	}
	return this;
}

//获取当前节点的下一个元素节点
Base.prototype.next=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i]==null)throw new Error('找不到下一个节点元素!');
		if(this.elements[i].nodeType==3)this.next();
	}
	return this;
}


//设置显示
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
	this.elements[i].style.display='block';
	}
	return this;
}
//设置隐藏
Base.prototype.hidden=function(){
	for(var i=0;i<this.elements.length;i++){
	this.elements[i].style.display='none';
	}
	return this;
}


//设置居中

Base.prototype.center=function(width,height){
	var left=(getInner().width-width)/2+getScroll().left;
    var top=(getInner().height-height)/2+getScroll().top;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.left=left+'px';
		this.elements[i].style.top=top+'px';
	}
	return this;
}

//设置浏览器窗口事件
Base.prototype.resize=function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
	 addEvent(window,'resize',function(){
		 	      fn();
		if(element.offsetLeft>getInner().width+getScroll().left-element.offsetWidth){
			element.style.left=getInner().width+getScroll().left-element.offsetWidth+'px';
		}else if(element.offsetLeft<=0+getScroll().left){
			element.style.left=0+getScroll().left;
		}
		if(element.offsetTop>getInner().height+getScroll().top-element.offsetHeight){
			element.style.top=getInner().height+getScroll().top-element.offsetHeight+'px';
		}else if(element.offsetTop<=0+getScroll().top){
			element.style.top=0+getScroll().top;
		}
	 });
	}
	return this;
}

//设置遮罩锁屏
Base.prototype.lock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.width= getInner().width+'px';
		this.elements[i].style.height=getInner().height+getScroll().top+'px';
		this.elements[i].style.display='block';
		//parseFloat(sys.firefox)<4?document.body.style.overflow='hidden':document.documentElement.style.overflow='hidden';
      /* // addEvent(window,'scroll',scrollTop);
	 //  addEvent(document,'mousedown',predef);
		//addEvent(document,'mouseup',predef);
		//addEvent(document,'selectstart',predef);*/
	}
	return this;
}


//取消遮罩锁屏
Base.prototype.unlock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
		//parseFloat(sys.firefox)<4?document.body.style.overflow='auto':document.documentElement.style.overflow='auto';
		//removeEvent(window,'scroll',scrollTop);
		removeEvent(document,'mousedown',predef);
		removeEvent(document,'mouseup',predef);
		removeEvent(document,'selectstart',predef);
	}
	return this;
}

//设置动画
Base.prototype.animate=function(obj){
	for(var i=0;i<this.elements.length;i++){
	var element=this.elements[i];
	var attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':
	              obj['attr']=='w'?'width':obj['attr']=='h'?'height':
				  obj['attr']=='o'?'opacity':'left';		  
	var start=obj['start']!=undefined?obj['start']:
	                 attr=='opacity'?parseFloat(getStyle(element,attr))*100:
					 parseInt(getStyle(element,attr));
	var t=obj['t']!=undefined?obj['t']:10;
	var step=obj['step']!=undefined?obj['step']:20;
	var target=obj['target'];
	var alter=obj['alter'];
	var speed=obj['speed']!=undefined?obj['speed']:6;
	var type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';//可选，0表示匀速，1表示缓冲，默认为缓冲。
	var mul=obj['mul'];
	
	     if(target==undefined&&alter!=undefined){
			 target=start+alter;
		 }else if(target==undefined&&alter==undefined&&mul==undefined){
			 throw new Error('alter增量或target目标量必须有一个!');
		 }
		 
		if(start>target)step=-step;
		
		if(attr=='opacity'){
			element.style['opacity']=parseInt(start)/100;
			element.style['filter']='alpha(opacity='+parseInt(start)+')';
		}else{
			//element.style[attr]=start+'px';                //此处对IE9以下不兼容，bug而已,无逻辑可循
		}
		if(mul==undefined){
			mul={};
			mul[attr]=target;
		}
		clearInterval(element.timer);
	    element.timer=setInterval(function(){
			var flag=true;                          
			for(var i in mul){
			attr=i=='x'?'left':i=='y'?'top':i=='w'?'width':i=='h'?'height':i=='o'?'opacity':i!=undefined?i:'left';
			target=mul[i];
			if(type=='buffer'){
				step=attr=='opacity'?(target-parseFloat(getStyle(element,attr))*100)/speed:
				                                   (target-parseInt(getStyle(element,attr)))/speed;											  
				step=step>0?Math.ceil(step):Math.floor(step);		
			}
			if(attr=='opacity'){
				if(step==0){
					 setOpacity();
					}else if(step>0&&Math.abs(parseFloat(getStyle(element,attr))*100-target)<step){
                     setOpacity()
						}else if(step<0&&parseFloat(getStyle(element,attr))*100-target<Math.abs(step)){
							 setOpacity()
						}else{	
									var temp=parseFloat(getStyle(element,attr))*100;
									element.style.opacity=parseInt(temp+step)/100;
									element.style.filter='alpha(opacity='+parseInt(temp+step)+')';
						      }
						if(parseInt(target)!=parseInt(parseFloat(getStyle(element,attr))*100))flag=false;
			}else{
				
						if(step==0){
						setTarget();
					     }else if(step>0&&Math.abs(parseInt(getStyle(element,attr))-target)<step){
                           setTarget();
						}else if(step<0&&parseInt(getStyle(element,attr))-target<Math.abs(step)){
							setTarget();
						}else{	
								element.style[attr]=parseInt(getStyle(element,attr))+step+'px';
						}
						if(parseInt(target)!=parseInt(getStyle(element,attr)))flag=false;
			   }
			}//for-in
			if(flag){
				clearInterval(element.timer);
				if(obj.fn)obj.fn();
			}
		},t);
		
		function setTarget(){
			   element.style[attr]=target+'px';
		}
		
		function setOpacity(){
			element.style.opacity=parseInt(target)/100;
			element.style.filter='alpha(opacity='+parseInt(target)+')';
		}
		
	}//for
	return this;
}


//设置拖拽
//设置插件入口
Base.prototype.extend=function(name,fn){
	Base.prototype[name]=fn;
}























