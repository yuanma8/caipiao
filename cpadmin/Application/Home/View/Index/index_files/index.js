/**
 * @author luwenbin@live.com
 */
cp2y.closeBanner=function(){
  $("#banner").hide();
  sessionStorage.setItem('isShowBanner', 1);
};
cp2y.loadBanner=function(){
  $.ajax({
    url:WebAppUrl.HOME_APP_URL+"/activity/getActivityList?first=1",
    success:function(data){
      if(data.flag==1){
        var i=0,len=data.list.length,html=[];
        html.push('<i onclick="cp2y.closeBanner();" id="closeBanner"></i>');
        html.push('<ul id="bannerWarp" ontouchstart="touch.touchStart(event)" ontouchmove="touch.touchMove(event);" ontouchend="touch.touchEnd();" >');
        for(i;i<len;i++){
          html.push('<li><a href="'+data.list[i].link +'" target="_blank"><img src="'+data.list[i].pictureindexUrl+'" /></a></li>');
        }
        html.push('</ul>');
        cp2y.banner.len=len;
        $('#banner').html(html.join(''));
        var bannerWarp=$("#bannerWarp");
        html=[];i=0;
        bannerWarp.css({width:len*100+"%"});
        bannerWarp.children().css({width:100/len+"%"});
        for(i;i<len;i++){
          html.push('<a></a>');
        }
        $('#banner').append('<nav id="bannerNav">'+html.join('')+'</nav>');
        cp2y.banner.init();
      }
    }
  });
};
var touch = {
  tX : [],
  touchStart : function(a) {
    this.tX.push(a.touches[0].pageX);
  },
  touchMove : function(c) {
    this.tX.push(c.touches[0].pageX);
    //c.preventDefault();
  },
  touchEnd : function() {
    if (this.tX[0] - this.tX[this.tX.length - 1] > 100) {
      cp2y.banner.left();
    }else if ( this.tX[this.tX.length - 1] - this.tX[0] > 100){
      cp2y.banner.right();
    }
    this.tX = [];
  }
}
cp2y.banner={
	len:1,
	setNav:function(i){
		var k=$('#bannerNav a.cur').index();
		k=k+i;
		//console.log(i,k);
		if(k<0){
			k=this.len-1;
		}else if(k>this.len-1){
			k=0;
		}
		$('#bannerNav a').removeClass('cur');
		$('#bannerNav a').eq(k).addClass('cur');
	},
	left:function(){
		var that=$("#bannerWarp").children("li").eq(0).clone();
		$("#bannerWarp").children("li").eq(0).animate({"margin-left":"-100%"},{duration:500,complete:function(){
				$("#bannerWarp").children("li").eq(0).remove();
				$("#bannerWarp").append(that);
				cp2y.banner.setNav(-1);
        setTimeout('cp2y.banner.left()',5000);
			}
		});
	},
	right:function(){
		// var that=$("#bannerWarp").children("li").eq(-1).clone();
		// $("#bannerWarp").children("li").eq(-1).remove();
		// $("#bannerWarp").prepend(that);
		// this.setNav(1);
	},
	init:function(){
		$('#bannerNav a').eq(0).addClass('cur');
		setTimeout('cp2y.banner.left()',5000);
	}
};
cp2y.mainPage=function(){
  $.ajax({
    url:WebAppUrl.HOME_APP_URL+"/lottery/lottery_list",
    beforeSend:function(){cp2y.dialog.loading();},
    success:function(data){
      cp2y.dialog.clearLoading();
      if(!WebAppUrl.isYZYH){
        $.get(WebAppUrl.HOME_APP_URL+"/user/checkLogin",function(isLogin){
          if(isLogin.flag==1){
            $("#indexNav").append('<p id="imLogin"><a href="/limit/user/index">'+isLogin.username+'</a></p>');
            localStorage.setItem('username', isLogin.username);
            $.get(WebAppUrl.HOME_APP_URL+"/activity/userActivityCount",function(data){
              if(data.myActivityCount>0){
                if($("#unRead").size()==0){
                  $("#hasActive").append('<i class="unRead" id="unRead"></i>');
                }
              }
            });//有无私有活动
          }else{
            $("#imLogin").remove();
            localStorage.removeItem("username");
          }
        });//用户状态
      }
      if(localStorage.getItem('has')!=1){
        $("#hasActive").append('<i class="unRead" id="unRead"></i>');
        $("#hasActive").click(function(){
          localStorage.setItem('has',1);
        });
      }
      var i=0,len=data.list.length,html=[],hot="a0",tmp='';
      if(sessionStorage.getItem('isShowBanner')!=1){
        html.push('<div class="banner" id="banner"></div>');
      }
      for(i;i<len;i++){
        tmp='';
        switch(data.list[i].lotteryId){
          case 10032:
          case 10026:
              tmp='<p><span>'+cp2y.util.setIssue2(data.list[i].lastIssue)+'期奖号:</span>'+cp2y.util.splitNumber2(data.list[i].drawNumber)+'</p>';
              break;
          case 10038:
          case 10024:
          case 10046:
          case 10025:
          case 10066:
          case 10061:
          case 10060:
          case 10064:
          case 10065:
            tmp='<p><span>'+cp2y.util.setIssue1(data.list[i].lastIssue)+'期奖号:</span>'+cp2y.util.splitNumber1(data.list[i].drawNumber)+'</p>';
            break;
          case 10057:
            tmp='<p>浮动奖金，2元可中500万</p>';
            break;
          case 10058:
            tmp='<p>竞彩篮球</p>';
            break;
          case 10059:
            tmp='<p>2串1，易中奖</p>';
            break;
          case 10082:
            tmp='<p><span>'+cp2y.util.setIssue1(data.list[i].lastIssue)+'期奖号:</span>'+cp2y.util.setboll(data.list[i].drawNumber,10082)+'</p>';
            break;
        }
        switch(data.list[i].lotteryId){
          case 10024:
          case 10025:
          case 10026:
          case 10032:
            hot='a0';
            break;
          case 10046:
            hot='a14';
            break;
          case 10066:
            hot='a14';
            break;
          case 10061:
          case 10038:
            hot='a11';//
            break;
          case 10060:
            hot='a14';
            break;
          case 10064:
            hot='a12';
            break;
          case 10065:
            hot='a3';
            break;
          case 10058:
          case 10059:
          case 10057:
            hot='a0';
            break;
          case 10082:
            hot='a0';
            break;
        }
          html.push('<a href="/lottery/'+data.list[i].lotteryId+'?type='+hot+'"><div class="playType">');
        //if(data.list[i].isStop==0){
        //}else{
          //html.push('<a ><div class="playType">');
        //}
        html.push('<div class="img2"><img src="'+WebAppUrl.Icon+data.list[i].lotteryId+'.png" /><span>'+data.list[i].lotteryName+'</span></div><div class="playTypeArea">');
        if(data.list[i].isStop==0){
          html.push('<p class="p11">'+data.list[i].message);
          if(data.list[i].event){
            html.push('<i class="hot">'+data.list[i].event+'</i>');
          }
        }else{
          html.push('<p class="p11">推荐');
        }
        html.push('</p>');
        html.push(tmp);
        html.push('</div></div></a>');
      }
      $("#mainPage").html(html.join(''));
      window.scrollTo(0,0);
      if(sessionStorage.getItem('isShowBanner')!=1){
        cp2y.loadBanner();
      }
    }
  });
};
cp2y.mainPage();