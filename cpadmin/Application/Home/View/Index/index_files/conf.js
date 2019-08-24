/**
 * @author luwenbin@live.com
 */
window.scrollTo(0,0);
try{document.domain='cp2y.com';}catch(e){};
var WebAppUrl={
	RESOURCE_URL : "http://res.cp2y.com/h5/res/images/",
	HOME_APP_URL : "http://m.cp2y.com",
	JS_URL:"http://res2.cp2y.com/h5/res/js/play/",
	Icon:"http://res.cp2y.com/h5/res/images/icon/",
  FX:"http://m.cp2y.com/fx/yl/h"
	},BT={
	kk:[10037,10038,10046,10060,10061,10062,10064,10065,10066,10067,10082,10083],
	lotto:[10026,10032],
	sz:[10024,10025],
	jc:[10057,10058,10059,10039,10040,10041,10042],
	selling:[10024,10025,10038,10046,10064,10065,10026,10032,10057,10058,10059,10060,10061,10066,10082,10083]
},Loading=$("#loading"),cp2y={};
Loading.hide();
cp2y.util={
	setboll:function(x,lotteryId){
		var bolls=[],b,b1,b2,j=0,len2,len3;
		if(x){
			b=x.split("#");
			b1=b[0].split(',');
			b2=b[1];
			len2=b1.length;
		}
		if(lotteryId ==10059 || lotteryId ==10058){
          for(j;j<len2;j++){
            bolls.push('<em>'+b1[j]+'</em>');
          }
		}else if(lotteryId==10082){
          var pk,pk1,pk2;
          for(j;j<len2;j++){
            pk=[b1[j].substring(0,1),b1[j].substring(1,3)];
            switch(pk[0]){
              case '1':
                pk1='黑桃';
                break;
              case '2':
                pk1='红桃';
                break;
              case '3':
                pk1='梅花';
                break;
              case '4':
                pk1='方块';
                break;
            }
            switch(pk[1]){
              case '01':
                pk2='A';
                break;
              case '11':
                pk2='J';
                break;
              case '12':
                pk2='Q';
                break;
              case '13':
                pk2='K';
                break;
              default:
                pk2=pk[1];
                break;
            }
            bolls.push('<var class="pkIcon">'+pk1+':'+pk2+'</var>');
          }
        }else{
			for(j;j<len2;j++){
				bolls.push('<b class="draw1">'+b1[j]+'</b>');
			}
		}
		if(b2){
			b2=b2.split(",");
			j=0;len3=b2.length;
			for(j;j<len3;j++){
				bolls.push('<b class="draw2">'+b2[j]+'</b>');
			}
		}
		return bolls;
	},
	setIssue1:function(s){
		var sL=s.length;
		return s.substr(sL-2,sL-1);
	},
	setIssue2:function(s){
		var sL=s.length;
		return s.substr(sL-3,sL-1);
	},
	splitNumber1:function(s){try{return "<em>"+s.split(",").join("</em><em>")+"</em>";}catch(e){}
	},
	splitNumber2:function(s){try{var s1=s.split("#"),s2=s1[0].split(",");
		return "<em>"+s2.join("</em><em>")+"</em><b>"+s1[1].split(",").join("</b><b>")+"</b>";}catch(e){}
	},
	splitBalls:function(b){
		var bolls=[],b0=b.split("#"),b1=b0[0],b2=b0[1];
		if(b2){
			bolls.push('<b class="b1">'+b1+'</b>');
			bolls.push('<b class="b2">'+b2+'</b>');			
		}else{
			bolls.push('<b class="b2">'+b1+'</b>');
		}
		return bolls.join('');
	},
	toggle:function(o,obj,t){
		if($(o).attr("data")=="0"){
			obj.show();
			$(o).html("&gt;&gt;收起").attr({"data":1});
		}else{
			obj.hide();
			$(o).html("&gt;&gt;"+t).attr({"data":0});
		}
	},
	getArgs:function(argName){
		if(!argName){return false;}
		var args = {},query = location.hash.substring(1),pairs = query.split("&");
		for(var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var argname = pairs[i].substring(0,pos),value = pairs[i].substring(pos+1);
			value = decodeURIComponent(value);
			if(argName==argname){
				return value;
			}
		}
	},
    getArgs2:function(argName){
		if(!argName){return false;}
		var args = {},query = location.search.substring(1),pairs = query.split("&");
		for(var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('=');
			if (pos == -1) continue;
			var argname = pairs[i].substring(0,pos),value = pairs[i].substring(pos+1);
			value = decodeURIComponent(value);
			if(argName==argname){
				return value;
			}
		}
	},
	comp : function(n, m) {
    var n1 = 1, n2 = 1;
    for (var i = n,j = 1; j <= m; n1 *= i--,n2 *= j++);
    return n1 / n2;
  }
};
cp2y.dialog={
	alert:function(x,fn){
		if($("#DBox2").length==0){
      		$("body").append('<div id="DBox2"><div id="DBoxC2">'+x+'</div><div id="IKonw" class="DBoxB DBoxB2">知道了</div></div>');
    	}else{
    		$("#DBoxC2").html(x);
    	}
    	if(fn){
    		$("#IKonw").off().on('click',fn);
    	}else{
    		$("#IKonw").off().on('click',cp2y.dialog.closeAlert);
    	}
    	this.locked=true;
    	cp2y.dialog.lock();
    	$("#DBox2").show();
    	this.setPosition($("#DBox2"));
    	$(window).resize(function(){
    		if(cp2y.dialog.locked){
    			cp2y.dialog.setPosition($("#DBox2"));
    		}
    	});
	},
	closeAlert:function(){
		this.locked=false;
		$("#IKonw").off();
		$("#LockedBg").hide();
    	$("#DBox2").hide();
	},
	tip:function(x){
		$("#userTip3").html(x).addClass('onError');
	},
	tip1:function(x){
		$("#userTip31").html(x).addClass('onError');
	},
	clearTip:function(){
		$("#userTip3,#userTip31").html("").removeClass('onError');
	},
	loading:function(){
		Loading.show();
	},
	clearLoading:function(){
		$("#loading").hide();
	},
	setPosition:function(_obj){
		var t = document.documentElement.scrollTop || document.body.scrollTop,
			viewHeight = $(window).height(), viewWidth = $(window).width(), _objHeight = _obj.height(), _objWidth = _obj.width(),
			dialogTop = (viewHeight / 2) - (_objHeight / 2) + t,
			dialogLeft = (viewWidth / 2) - (_objWidth / 2);
		_obj.css({top : dialogTop,left : dialogLeft});
	},
	confirm:function(o,fn,fn2){
		if($("#DBox").length==0){
      		$("body").append('<div id="DBox"><div id="DBoxC">'+o+'</div><div id="DBoxFn" class="DBoxB">是</div><div id="DBoxFn2" class="DBoxB" onclick="cp2y.dialog.closeConfirm();">否</div></div>');
    	}else{
    		$("#DBoxC").html(o);
    	}
    	$("#DBox").show();
    	$("#DBoxFn").off().on('click',fn);
    	if(fn2){
			$("#DBoxFn2").off().on('click',fn2);
    	}
    	this.locked=true;
    	cp2y.dialog.lock();
    	this.setPosition($("#DBox"));
    	$(window).resize(function(){
    		if(cp2y.dialog.locked){
    			cp2y.dialog.setPosition($("#DBox"));
    		}
    	});
	},
	locked:false,
	lock:function(){
		if($("#LockedBg").length==0){
		  	$("body").append('<div id="LockedBg"></div>');
		}
		$("#LockedBg").show();
	},
	closeConfirm:function(){
		this.locked=false;
		$("#DBoxFn").off();
		$("#LockedBg").hide();
    	$("#DBox").hide();
	}
};
cp2y.input={
	box:$("#InputBox"),
	Warp:$("#Warp"),
	closeBox:function(){
		this.box.hide();
		this.Warp.show();
	},
	openBox:function(o){
		this.box.show();
		this.content(o);
		this.Warp.hide();
	},
	content:function(o){
		$('#InputBoxTitle').html(o.t);
		$('#InputBoxContent').html(o.c);
		$('#InputBoxContent input').eq(0).focus();
	}
};
cp2y.day={
	Y:"",M:"",D:"",
	init:function(is){
		var _y=[],_m=[],i=2012,d=new Date(),yl=d.getFullYear();
		if(is){
			this.Y=d.getFullYear();
			this.M=d.getMonth()+1;
			this.D=d.getDate();
		}else{
			if(!localStorage.getItem('y')){
				this.Y=d.getFullYear();
			}else{
				this.Y=localStorage.getItem('y');
			}
			if(!localStorage.getItem('m')){
				this.M=d.getMonth()+1;
			}else{
				this.M=localStorage.getItem('m');
			}
			if(!localStorage.getItem('d')){
				this.D=d.getDate();
			}else{
				this.D=localStorage.getItem('d');
			}
		}
		for(i;i<=yl;i++){
			_y.push("<option value='"+i+"'>"+i+"</option>");
		}
		i=1;
		for(i;i<13;i++){
			_m.push("<option value='"+i+"'>"+i+"</option>");
		}
		$("#dataY").html(cp2y.day.Y);
		$("#dataM").html(cp2y.day.M);
		$("#selectY").html(_y.join("")).val(this.Y).change(function(){
			cp2y.day.Y=$(this).val();
			$("#dataY").html(cp2y.day.Y);
			cp2y.day.day();
		});
		$("#selectM").html(_m.join("")).val(this.M).change(function(){
			cp2y.day.M=$(this).val();
			$("#dataM").html(cp2y.day.M);
			cp2y.day.day();
		});
        this.day();
	},
	day:function(){
		var m=this.M,y=this.Y,ds,i=1,_d=[],d,xq=new Date(y,(m-1),01),xqq=xq.getDay()-1,xqqi=0;
		for(xqqi;xqqi<xqq;xqqi++){
			_d.push('<a></a>');
		}
		if(m=="1"||m=="3"||m=="5"||m=="7"||m=="8"||m=="10"||m=="12"){
			ds=31;
		}else if(m=="4"||m=="6"||m=="9"||m=="11"){
			ds=30;
		}else{
			(y%4==0&&y%100!=0||y%400==0)?ds=29:ds=28;
		}
		var TD=new Date(),TDM=TD.getMonth()+1,TDD=TD.getDate();//今天的时间
		for(i;i<=ds;i++){
			if(this.D==i){
				_d.push('<a class="cur click">'+i+'</a>');
			}else{
				_d.push('<a class="click">'+i+'</a>');
			}
		}
		$('#selectData').html(_d.join(""));
		$("#selectData a.click").click(function(){
			$(this).siblings().removeClass("cur");$(this).addClass("cur");
			cp2y.day.D=$(this).html();
			cp2y.day.day();
		});
		$('#showSelectData').html(cp2y.day.Y+'-'+Number(cp2y.day.M).addZero()+'-'+Number(cp2y.day.D).addZero());
	}
};
//原生对象扩展
$.extend(Array.prototype,{
	indexOf   : function(val){var pos=-1;$(this).each(function(i,v){if(v==val){pos=i;return;}});return pos;},
	del       : function(value){var pos = this.indexOf(value);if(pos==-1)return;this.splice(pos,1);return this;},
	max       : function(){var max;$(this).each(function(i,v){v = Number(v);max = i==0?v:(v>max?v:max);});	return max;},
	min       : function(){var min;$(this).each(function(i,v){v = Number(v);min = i==0?v:(v<min?v:min);});	return min;},
	hasRepeat : function(){var b = {};var a = this;for(var i=0,l=a.length; i<l&&!b[a[i]];b[a[i++]]=1);return i<l;	},
	clone     : function(){var a=[];for(var i=0;i<this.length;i++)a[i] = this[i];return a;},
	del       : function(value,isPos){var pos=!isPos?this.indexOf(value):value;if(pos==-1)return;this.splice(pos,1);return this;},
	random : function(o){
		o = $.extend({
		   	len    : 1,//号码长度
			repeat : false,//是否可以重复
			sort   : false,//是否需要排序
			zero   : false//是否需要补0
	    },o);
		var s=this,a=[],no;
		var r = function(){return s[Math.round(Math.random()*(s.length-1))];};
		while(a.length!=o.len){
			no = r();
			if(!o.repeat && a.indexOf(no)!=-1)continue;
			a.push(no);
		}
		return a;
	},
	inArray2:function(arr1){//判断二维数组包含关系
	    var i=0,len=this.length;
	    for(i=0;i<len;i++){
	        var j=0,jlen=this[i].length,x=0;
	        for(j;j<jlen;j++){
	            if(arr1[j]==this[i][j]){
	                x++;
	            }
	        }
	        if(x==jlen){
	            return true;
	        }
	    }
	    return false;
	},
  inArray1:function(arr1){
    var i=0,len=arr1.length,x=0;
    for(i;i<len;i++){
      if(this.indexOf(arr1[i])!=-1){
        x++;
      }
    }
    if(x==len){
      return true;
    }else{
      return false;
    }
  }
});
$.extend(Number.prototype,{
	addZero   : function(){if(this<10){return "0"+this;}else{return this;}}
});
(function() {
    var _getScript = function(url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');
        js.setAttribute('type', 'text/javascript'); 
        js.setAttribute('src', url); 
        head.appendChild(js);
        //执行回调
        var callbackFn = function(){
                if(typeof callback === 'function'){
                    callback();
                }
            };
        if (document.all) { //IE
            js.onreadystatechange = function() {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        } else {
            js.onload = function() {
                callbackFn();
            }
        }
    }
    if(Zepto){
        $.getScript = _getScript;
    }
})();
