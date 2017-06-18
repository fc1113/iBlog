
	 $(function(){
		 //个人中心
		 
         $('#header .member').hover(function(){
	     $('#header .member_ul').show().animate({
			 t:30,
			 step:10,
			 mul:{
				 o:100,
				 h:110
			 }
		 });
               },function(){
	     $('#header .member_ul').animate({
			 t:30,
			 step:10,
			 mul:{
				o:0,
                 h:0				
			 },
			 fn:function(){
				 $('#header .member_ul').hidden()
			 }
		 });
          });
		  
	  var screen=$('#screen');
		  
		  //登录框
		  var login=$('#login');
			login.center(350,250).resize(function(){
					//login.center(350,250);
					if(login.css('display')=='block'){
			          screen.lock();
					}
			});	
			$('#login .close').click(function(){
				login.css('display','none');
				screen.animate({
	        	   attr:'o',
				   start:30,
				   target:0,
				   fn:function(){
					   screen.unlock();
				   }
				})
			});
			$('#header .login').click(function(){
				login.center(350,250).css('display','block');
				//遮罩锁屏
			   screen.lock().animate({
				   attr:'o',
				   start:0,
				   target:30
			   });

			});
			
			//注册框	
		  var reg=$('#reg');
			reg.center(600,550).resize(function(){
					if(reg.css('display')=='block'){
			          screen.lock();
					}
			});	
			$('#reg .close').click(function(){
				reg.css('display','none');
				screen.animate({
	        	   attr:'o',
				   start:30,
				   target:0,
				   fn:function(){
					   screen.unlock();
				   }
				})
			});
			$('#header .reg').click(function(){
				reg.center(600,550).css('display','block');
				//遮罩锁屏
			   screen.lock().animate({
				   attr:'o',
				   start:0,
				   target:30
			   });

			});
			
                 login.drag();
                 reg.drag();
				 
		  //设置百度搜索的初始化位置
		  $('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
		  
		  /*addEvent(window,'scroll',function(){
			  $('#share').animate({
				  attr:'y',
				  target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
			  });
		  });
		  */
		  $(window).bind('scroll',function(){
			  setTimeout(function(){
				  $('#share').animate({
				  attr:'y',
				  target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
			  });
			  },100);
		  });
		  //设置百度搜索的收缩效果
		  $('#share').hover(function(){
			  $(this).animate({
				  attr:'x',
				  target:0
			  });
		  },function(){
			  $(this).animate({
				  attr:'x',
				  target:-211
				  //mul:{  }                   
			  });
		  });
		  
		  //滑动导航
		  $('#nav .about li').hover(function(){
			  var target=$(this).first().offsetLeft;//左右滑动
			  var target1=$(this).first().offsetLeft/85;
			  $('#nav .nav_bg').animate({
				  attr:'x',
				 target:target+62,
				  fn:function(){
				  $('#nav .white').animate({
					  //attr:'x',
					  //target:-target
					  attr:'y',
					  target:-target1*52
				  });
				 // $('#nav .white').css('top',-target1*52+'px');
				  }
			  })
		  },function(){
			 $('#nav .nav_bg').animate({
				  attr:'x',
				  target:62,
				  fn:function(){
				  $('#nav .white').animate({
					 // attr:'x',
					  //target:0
					  attr:'y',
					  target:0
				  });
				  }
			  });
		  });
		  /*
		  $('#button').toggle(function(){
			  $('#test').css('background','green');
		  },function(){
			  $('#test').css('background','red');
		  },function(){
			  $('#test').css('background','blue');
		  }); */
		
		$('#sidebar h2').toggle(function(){
			$(this).next().animate({
				mul:{
					h:0,
					o:0
				}
			});
		},function(){
			$(this).next().animate({
				mul:{
					h:150,
					o:100
				}
			});
		});
		
		//表单验证
		//alert($('form').form('user').value('qw'));
		$('form').form('user').bind('focus',function(){
			$('#reg .info_user').css('display','block');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','none');
		}else if(check_user()){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','block');
			$('#reg .succ_user').css('display','none');
		}else{
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','block');
		}	
		});
		
		//密码验证
		$('form').form('pass').bind('focus',function(){
			$('#reg .info_pass').css('display','block');
			$('#reg .error_pass').css('display','none');
			$('#reg .succ_pass').css('display','none');
		}).bind('blur',function(){
			if(trim($(this).value())==''){
				$('#reg .info_pass').css('display','none');
			$('#reg .error_pass').css('display','none');
			$('#reg .succ_pass').css('display','none');
			}else{
				if(check_pass()){
			$('#reg .info_pass').css('display','none');
			$('#reg .error_pass').css('display','none');
			$('#reg .succ_pass').css('display','block');
				}else{
					$('#reg .info_pass').css('display','none');
			$('#reg .error_pass').css('display','block');
			$('#reg .succ_pass').css('display','none');
				}
			}
		});
		
		//密码强度验证
		$('form').form('pass').bind('keyup',function(){
			check_pass();
			
		});
		
		
		function check_user(){
			if(!/[\w]{2,20}/.test(trim($('form').form('user').value())))return true;
		}
		
		
		function check_pass(){
			
			var value=trim($('form').form('pass').value());
			var value_length=value.length;
			var code_length=0;
			//第一个必须条件的验证6-20位
			if(value_length>=6&&value.length<=20){
				$('#reg info_pass .q1').html('●').css('color','green');
				
			}else{
				$('#reg info_pass .q1').html('○').css('color','#666');
			}
			//第二个必须条件的验证，字母数字或非空字符任何一个
			if(value_length>0&&!/\s/.test(value)){
				$('#reg info_pass .q2').html('●').css('color','green');
			}else{
				$('#reg info_pass .q2').html('○').css('color','#666');
			}
			
			//第三个必须条件的验证，大写字母，小写字母，非空字符任意两种
			if(/[\d]/.test(value)){
				code_length++;
			}
			if(/[a-z]/.test(value)){
				code_length++;
			}
			if(/[A-Z]/.test(value)){
				code_length++;
			}
			if(/[^\w]/.test(value)){
				code_length++;
			}
			if(code_length>=2){
				$('#reg info_pass .q3').html('●').css('color','green');
			}else{
				$('#reg info_pass .q3').html('○').css('color','#666');
			}
			
			//密码的安全级别
			if(value_length>=10&&code_length>=3){
				$('#reg .info_pass .s1').css('color','green');
				$('#reg .info_pass .s2').css('color','green');
				$('#reg .info_pass .s3').css('color','green');
				$('#reg .info_pass .s4').html('高').css('color','green');
			}else if(value_length>=8&&code_length>=2){
				$('#reg .info_pass .s1').css('color','#f60');
				$('#reg .info_pass .s2').css('color','#f60');
				$('#reg .info_pass .s3').css('color','#ccc');
				$('#reg .info_pass .s4').html('中').css('color','#f60');
			}else if(code_length>=1){
				$('#reg .info_pass .s1').css('color','maroon');
				$('#reg .info_pass .s2').css('color','#ccc');
				$('#reg .info_pass .s3').css('color','#ccc');
				$('#reg .info_pass .s4').html('低').css('color','maroon');
			}else{
				$('#reg .info_pass .s1').css('color','#ccc');
				$('#reg .info_pass .s2').css('color','#ccc');
				$('#reg .info_pass .s3').css('color','#ccc');
				$('#reg .info_pass .s4').html('')
			}
			if(value_length>=6&&value.length<=20&&!/\s/.test(value)&&code_length>=2)return true;
		}
		
		//密码确认
		$('form').form('notpass').bind('focus',function(){
			$('#reg .info_notpass').css('display','block');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','none');
			$('#reg .sub_notpass').css('display','none');
		}).bind('blur',function(){
			if(trim($(this).value())==''){
				$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','none');
			$('#reg .sub_notpass').css('display','none');
			}else if(check_notpass()){
				$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','block');
			$('#reg .sub_notpass').css('display','none');
			}else{
				$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','block');
			$('#reg .succ_notpass').css('display','none');
			$('#reg .sub_notpass').css('display','none');
			}
		});
		
		function check_notpass(){
			if(trim($('form').form('notpass').value())==trim($('form').form('pass').value()))return true;
		}
		
		//select选择框改变
		$('form').form('ques').bind('change',function(){
			$('#reg .error_ques').css('display','none');
		});
		
		function check_ques(){
			if(trim($('form').form('ques').value())!=0)return true;
		}
		
		//输入回答
		$('form').form('ans').bind('focus',function(){
			$('#reg .info_ans').css('display','block');
			$('#reg .error_ans').css('display','none');
			$('#reg .succ_ans').css('display','none');
		}).bind('blur',function(){
			if(trim($(this).value())==''){
				$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','none');
			$('#reg .succ_ans').css('display','none');
			}else if(check_ans()){
				$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','none');
			$('#reg .succ_ans').css('display','block');
			}else{
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','block');
			$('#reg .succ_ans').css('display','none');
			}
		});
		
		function check_ans(){
			if(trim($('form').form('ans').value()).length>1&&trim($('form').form('ans').value()).length<20)return true;
		}
		//邮件验证
		
		$('form').form('email').bind('focus',function(){
			$('#reg .info_email').css('display','block');
			$('#reg .error_email').css('display','none');
			$('#reg .succ_email').css('display','none');
			if(this.value.indexOf('@')==-1)$('#reg .all_email').css('display','block');
		}).bind('blur',function(){
			$('#reg .all_email').css('display','none');
			if(trim($(this).value())==''){
				$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','none');
			$('#reg .succ_email').css('display','none');
			}else if(check_email()){
				$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','none');
			$('#reg .succ_email').css('display','block');
			}else{
				$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','block');
			$('#reg .succ_email').css('display','none');
			}
		});
		//电子邮件补全功能，鼠标移除效果
		$('#reg .all_email li').hover(function(){
			$(this).css('background','#e5edf2');
			$(this).css('color','#369');
		},function(){
			$(this).css('background','none');
			$(this).css('color','#666');
		});
		//电子邮件补全功能，点击效果
		$('#reg .all_email li').bind('mousedown',function(){
			$('form').form('email').value($(this).text());
		});
		
		//电子邮件补全功能,用光标键选定
		
		
		//电子邮件补全功能
		$('form').form('email').bind('keyup',function(event){
			var e=getEvent(event);
			$('#reg .all_email li').css('background','none');				
			$('#reg .all_email li').css('color','#666');
			if(this.index==undefined)this.index=0;
			if(e.keyCode==38){
				this.index--;
				if(this.index<=0)this.index=$('#reg .all_email li').length();
				$('#reg .all_email li').eq(this.index-1).css('background','#e5edf2');				
				$('#reg .all_email li').eq(this.index-1).css('color','#369');				
			}else if(e.keyCode==40){
				this.index++;
				if(this.index>$('#reg .all_email li').length())this.index=1;
				$('#reg .all_email li').eq(this.index-1).css('background','#e5edf2');				
				$('#reg .all_email li').eq(this.index-1).css('color','#369');	
			}else if(e.keyCode==13){
				this.value=$('#reg .all_email li').eq(this.index-1).text();
				this.index=undefined;
			}
			if(this.value.indexOf('@')==-1){
				$('#reg .all_email').css('display','block');
			$('#reg .all_email li span').html(this.value);
			}else{
				$('#reg .all_email').css('display','none');
			}
		});
		
		function check_email(){
			if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value())))return true;
		}
		
		
	//生日选择
	var year=$('form').form('year');
	var month=$('form').form('month');
	var day=$('form').form('day');
	var day31=[1,3,5,7,8,10,12];
	var day30=[4,6,9,11];
	for(var i=1950;i<=2017;i++){
		year.first().add(new Option(i,i),undefined);//参数为null，IE不兼容，所以为undefined
	}
	for(var i=1;i<=12;i++){
		month.first().add(new Option(i,i),undefined);
	}
	//year改变时
	$('form').form('year').bind('change',selected_day);
		//month改变时
		$('form').form('month').bind('change',selected_day);
		
		$('form').form('day').bind('change',function(){
			$('#reg .error_birthday').css('display','none');
		});
		 
		 function check_birthday(){
			 if($('form').form('day').value()!=0)return true;
		 }
		 
		 function selected_day(){
			 
			 var cur_day=0;
		day.first().options.length=1;
		if(year.first().value!=0&&month.first().value!=0){
			if(inArray(day31,parseInt(month.first().value))){
				cur_day=31;
			}else if(inArray(day30,parseInt(month.first().value))){
				cur_day=30
			}else{
				if((parseInt(year.first().value)%100!=0&&parseInt(year.first().value)%4==0)||parseInt(year.first().value)%400==0){
					cur_day=29;
				}else{
					cur_day=28;
				}
			}
			for(var i=1;i<=cur_day;i++){
					day.first().add(new Option(i,i),undefined);
				}
		     }	 
		 }
		
		//因为缓存问题，刷新页面之后，数据没清零，所以用form的reset()
		$('form').first().reset();
		//备注框模块
		//paste粘贴事件，会在函数触发之前执行，所以，要延迟执行paste
		$('form').form('ps').bind('keyup',check_ps).bind('paste',function(){
			//setTimeout(alert($('form').form('ps').value()),50);
			setTimeout(check_ps,50);
		});
		
		//清尾
		$('#reg .ps .clear').click(function(){
			$('form').form('ps').value($('form').form('ps').value().substring(0,200));
			check_ps();
		});
		function check_ps(){
			var num=200-$('form').form('ps').value().length;
			if(num>=0){
				$('#reg .ps').eq(0).css('display','block');
				$('#reg .ps .num').eq(0).html(num);
				$('#reg .ps').eq(1).css('display','none');
				return false;
			}else{
				$('#reg .ps').eq(0).css('display','none');
				$('#reg .ps .num').eq(1).html(Math.abs(num));
				$('#reg .ps').eq(1).css('display','block');
				return true;
			}
		}
		
		//备注框提交
		$('form').form('sub').click(function(){
			var flag=true;
			if(check_user()){
				flag=false;
				$('#reg .error_user').css('display','block');
			}
			if(!check_pass()){
				flag=false;
				$('#reg .error_pass').css('display','block');
			}
			if(!check_notpass()){
				flag=false;
				$('#reg .sub_notpass').css('display','block');
			}
			if(!check_ques()){
				flag=false;	
				$('#reg .error_ques').css('display','block');
			}
			if(!check_ans()){
				flag=false;	
				$('#reg .error_ans').css('display','block');
			}
			if(!check_email()){
				flag=false;	
				$('#reg .error_email').css('display','block');
			}
			if(!check_birthday()){
				flag=false;	
				$('#reg .error_birthday').css('display','block');
			}
			if(check_ps()){
				flag=false;	
			}
			if(flag){
			$('form').first().submit();
			}
		});
		
		//轮播器初始化
		$('#banner img').opacity(0).eq(0).opacity(100);
		$('#banner ul li').css('color','#999').eq(0).css('color','#333');
		
		//轮播器计数器
		var banner_index=1;
		
		//轮播器类型,1代表透明度轮播，2代表上下切换轮播
		var banner_type=1;
		
		//轮播器自动切换
		var banner_timer=setInterval(banner_fn,3000);
		
		//轮播器的手动切换
		$('#banner ul li').hover(function(){
			clearInterval(banner_timer);
			if($(this).css('color')!='#333'&&$(this).css('color')!='rgb(51, 51, 51)'){
			 banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1);
			}
		},function(){
			 banner_index=$(this).index()+1;
			banner_timer=setInterval(banner_fn,3000);
		});
		function banner(obj,pre){
			//手动和自动的轮播都在banner中
			$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
			$('#banner ul li').css('color','#999').eq($(obj).index()).css('color','#333');
			  if(banner_type==1){
					$('#banner img').eq(pre).animate({
						attr:'o',
						target:0,
						t:30,
						step:10
					}).css('zIndex',1);
					$('#banner img').eq($(obj).index()).animate({
						attr:'o',
						target:100,
						t:100,
						step:5
					}).css('zIndex',2);
			   }else if(banner_type==2){
				   $('#banner img').eq(pre).opacity(100).animate({
						attr:'y',
						target:150,
						t:30,
						step:10
					}).css('zIndex',1);
					$('#banner img').eq($(obj).index()).opacity(100).css('top','-150px').animate({
						attr:'y',
						target:0,
						t:100,
						step:5
					}).css('zIndex',2);
			   }
		}
		 
		function banner_fn(){
			if(banner_index>=$('#banner ul li').length()) banner_index=0;
			banner($('#banner ul li').eq(banner_index).first(),banner_index==0?$('#banner ul li').length()-1:banner_index-1);
			banner_index++;
		}
		
		//alert($('.wait_load').attr('xsrc'));
		//$('.wait_load').attr('src',$('.wait_load').attr('xsrc'));
		//获得元素到浏览器顶点的距离
		//alert(offsetTop($('.wait_load').first()));
		//
		//alert(getInner()['height']+getScroll()['top']);
		//当滚动条触发事件时，滚动一次会触发多次，效果会出现抖动，解决方案是用setTimeout延时100毫秒触发，会平滑一点
		//处理预加载
		var wait_load=$('.wait_load');
		wait_load.opacity(0);
		$(window).bind('scroll', _wait_load);
		$(window).bind('resize', _wait_load);
		
		function _wait_load(){
			setTimeout(function(){
				for(var i=0;i<wait_load.length();i++){
					var _this=wait_load.getElement(i);
					   if(getInner()['height']+getScroll()['top']>offsetTop(_this)){
						$(_this).attr('src',$(_this).attr('xsrc')).animate({
						attr:'o',
						target:100
					    });
					}
				    
			    }
			},100);	
		}

		
		
    //图片预览弹窗
		 
		var photo_big=$('#photo_big');
			photo_big.center(620,511).resize(function(){
					if(photo_big.css('display')=='block'){
			          screen.lock();
					}
			});	
			
			$('#photo_big .close').click(function(){
				photo_big.css('display','none');
				screen.animate({
	        	   attr:'o',
				   start:30,
				   target:0,
				   fn:function(){
					   screen.unlock();
				   }
				});
				$('photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','191px');
			});
			$('#photo dl dt img').click(function(){
				photo_big.center(620,511).css('display','block');
				//遮罩锁屏
			   screen.lock().animate({
				   attr:'o',
				   start:0,
				   target:30
			   });
		   
		var temp_img=new Image();
		$(temp_img).bind('load',function(){
			$('#photo_big .big img').attr('src',temp_img.src).css('top',0).animate({
			attr:'o',
			target:100,
			t:30,
			step:10
		}).css('width','620px').css('height','470px').opacity(0);
		});
		temp_img.src=$(this).attr('bigsrc');
		
		var child=this.parentNode.parentNode;
		
		pre_next_img(child);
		
		/*var prev=prevIndex($(child).index(),child.parentNode);
		var next=nextIndex($(child).index(),child.parentNode);
		var prev_img=new Image();
		var next_img=new Image();
		prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');//他们两个虽然没有在文档页面中显示，
		//但是在当前js文件中已经被加载并且被保存在两个新的图像对象中，即prev_img和next_img中，
		//下次调用直接替换调用，无需等待加载,即为预加载，(提前加载，显示之前加载)
		$('#photo_big .big .left').attr('src',prev_img.src);
		$('#photo_big .big .right').attr('src',next_img.src);
		//当前点击小图的index存入img的index中
		$('#photo_big .big img').attr('index',$(child).index());
		*/
});
			
                 photo_big.drag();
				 
		//加载大图
		
		/*$('#photo_big .big img').attr('src',$('#photo_big .big img').attr('xsrc')).css('top',0).animate({
			attr:'o',
			target:100,
			t:200,
			step:10
		}).css('width','620px').css('height','480px').opacity(0);*/
		
		//相册大图切换按钮
		$('#photo_big .big .left').hover(function(){
			$('#photo_big .big .sl').animate({
				attr:'o',
				target:50
			});
		},function(){
			$('#photo_big .big .sl').animate({
				attr:'o',
				target:0
			});
		});
		
		$('#photo_big .big .right').hover(function(){
			$('#photo_big .big .sr').animate({
				attr:'o',
				target:50
			});
		},function(){
			$('#photo_big .big .sr').animate({
				attr:'o',
				target:0
			});
		});
		
//相册大图上一张
       $('#photo_big .big .left').click(function(){
		   $('photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','191px');
		
     		var current_img=new Image();
		   
		   $(current_img).bind('load',function(){
			    $('#photo_big .big img').attr('src',$(this).attr('src')).opacity(0).css('top',0).css('width','620px').css('height','470px').animate({
			   attr:'o',
			   target:100,
			   step:5,
			   t:50
		      });
		   });
		   
		   current_img.src=$(this).attr('src');
		  
	    var child=$('#photo dl dt img').getElement(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode; 
		pre_next_img(child);
		  
		  
	   });
//相册大图下一张
		$('#photo_big .big .right').click(function(){
		   
		     $('photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','191px');
		
     		var current_img=new Image();
		   
		   $(current_img).bind('load',function(){
			    $('#photo_big .big img').attr('src',$(this).attr('src')).opacity(0).css('top',0).css('width','620px').css('height','470px').animate({
			   attr:'o',
			   target:100,
			   step:5,
			   t:50
		      });
		   });
		   
		   current_img.src=$(this).attr('src');
		   
		  var child=$('#photo dl dt img').getElement(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		  pre_next_img(child);
	   });
		
		function pre_next_img(child){
			var prev=prevIndex($(child).index(),child.parentNode);
			var next=nextIndex($(child).index(),child.parentNode);
			var prev_img=new Image();
			var next_img=new Image();
			prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
			next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
			$('#photo_big .big .left').attr('src',prev_img.src);
			$('#photo_big .big .right').attr('src',next_img.src);
			$('#photo_big .big img').attr('index',$(child).index());
			//图片计数
			$('photo_big .big .index').html($(child).index()+1+'/'+$('#photo dl').length());
			//图片描述
			$('photo_big .big .des').html(child.children[1].innerHTML);
		}
		
		//返回键和登录和注册在滚动时居中
		$(window).bind('scroll',function(){
			setTimeout(function(){
				$('#photo_big').center(620,511);
				$('#login').center(350,250);
				$('#reg').center(600,550);
			if(getScroll().top>0){
				$('#return').css('display','block');
				$('#return').animate({
				mul:{
					y:getScroll().top+getInner().height-$('#return').first().offsetHeight,
					o:100
				}
			});
		}else{
				$('#return').css('top','150px').opacity(0).css('display','none');
			}
		},250);		
});
		
});
	 












































