
$().extend('drag',function(){
	for(var i=0;i<this.elements.length;i++){
		 addEvent(this.elements[i],'mousedown',function(e){
		 if(trim(this.innerHTML).length==0){
			  preDef(e);      //这个阻止默认事件是为了防止在Firefox上空div无法拖动的问题，但是他也把输入的默认事件禁止了，所以要做个判断，如果是空div再禁无法拖动的默认事件，如果不是，那就不禁
		 }
				 var _this=this;
		 var e=getEvent(e);
		 var disX=e.clientX-_this.offsetLeft+getScroll().left;
		 var disY=e.clientY-_this.offsetTop+getScroll().top;
		 //alert(typeof e.srcElement);
		 if(typeof e.target!='undefined'){
		 if(e.target.tagName=='H2'){
		 addEvent(document,'mousemove',move);
		 addEvent(document,'mouseup',up);
		 }else{
		removeEvent(document,'mousemove',move);
		removeEvent(document,'mouseup',up);
		 }
		 }
		 else if(typeof e.srcElement!='undefined'){
		 if(e.srcElement.tagName=='H2'){
		 addEvent(document,'mousemove',move);
		 addEvent(document,'mouseup',up);
		 }else{
		removeEvent(document,'mousemove',move);
		removeEvent(document,'mouseup',up);
		 }
		 }
		 function move(e){
			 var e=getEvent(e);
			 var left=e.clientX-disX;
			 var top=e.clientY-disY;
			 if(left<0){
				 left=0;
			 }
			 else if(left>getInner().width-_this.offsetWidth){
				 left=getInner().width-_this.offsetWidth;
			 }
			 if(top<0){
				 top=0;
			 }else if(top>getInner().height-_this.offsetHeight){
				 top=getInner().height-_this.offsetHeight;
			 }
			 _this.style.left=left+getScroll().left+'px';
			 _this.style.top=top+getScroll().top+'px';
			 
			 if(typeof _this.setCapture!='undefined'){
			 _this.setCapture();
		 }
		 
		 }
		 
		 function up(){
            removeEvent(document,'mousemove',move);
			//this.onmouseup=null;
			removeEvent(document,'mouseup',up);
			if(typeof _this.releaseCapture!='undefined'){
				 _this.releaseCapture();
			}
		 }
		 
		 });
	}
});

