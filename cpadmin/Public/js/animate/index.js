

 
var timer='';

function start(){
    time = 30000

    var TT = 3
    var rs = TT*1000;
    countDownCIT( rs,function( mint,seco,hm){
        $('.light .countdownnum').html(mint+':'+seco);
        $('.light .countdownnum2').html(hm);
    });
    color();

}   

// 执行动画 
function animate_a(){
    $('.topbg').animate({left:'-1200px'},26000);
    $('.animate-box').animate({left:'-1200px'},26000);
    timeTo();
};
// 定时器动画
function timeTo(){
    var secomd = (time-4000)/1000
    $(".car-wheel,.car-wheel2").show();
    timer = setInterval(function(){
        var list=[];
        var arr=[];
        if(secomd>2){
            var ss =Math.random()    //随机数
            var ss2 =Math.random()    //随机数
            var ss3 =Math.random()
            var ss4 =Math.random()
            var ss5 =Math.random()
            var ss6 =Math.random()
            var ss7 =Math.random()
            var ss8 =Math.random()
            var ss9 =Math.random()
            var ss10 =Math.random()
            if (ss > 0.3) {
                $(".car1 .car-front,.car1 .car-after").show();
                if (ss > 1) {
                    ss = ss - 1
                }
            } else {
                $(".car1 .car-front,.car1 .car-after").show();
            }
            if (ss2 > 0.3) {
                $(".car2 .car-front,.car2 .car-after").show();
                if (ss2 > 1) {
                    ss2 = ss2 - 1
                }
            } else {
                $(".car2 .car-front,.car2 .car-after").show();
            }
            if (ss3 > 0.3) {
                $(".car3 .car-front,.car3 .car-after").show();
                if (ss3 > 1) {
                    ss3 = ss3 - 1
                }
            } else {
                $(".car3 .car-front,.car3 .car-after").hide();
            }
            if (ss4 > 0.3) {
                $(".car4 .car-front,.car4 .car-after").show();
                if (ss4 > 1) {
                    ss4 = ss4 - 1
                }
            } else {
                $(".car4 .car-front,.car4 .car-after").hide();
            }
            if (ss5 > 0.3) {
                $(".car5 .car-front,.car5 .car-after").show();
                if (ss5 > 1) {
                    ss5 = ss5 - 1
                }
            } else {
                $(".car5 .car-front,.car5 .car-after").hide();
            }
            if (ss6 > 0.3) {
                $(".car6 .car-front,.car6 .car-after").show();
                if (ss6 > 1) {
                    ss6 = ss6 - 1
                }
            } else {
                $(".car6 .car-front,.car6 .car-after").hide();
            }
            if (ss7 > 0.3) {
                $(".car7 .car-front,.car7 .car-after").show();
                if (ss7 > 1) {
                    ss7 = ss7 - 1
                }
            } else {
                $(".car7 .car-front,.car7 .car-after").hide();
            }
            if (ss8 > 0.3) {
                $(".car8 .car-front,.car8 .car-after").show();
                if (ss8 > 1) {
                    ss8 = ss8 - 1
                }
            } else {
                $(".car8 .car-front,.car8 .car-after").hide();
            }
            if (ss9 > 0.3) {
                $(".car9 .car-front,.car9 .car-after").show();
                if (ss9 > 1) {
                    ss9 = ss9 - 1
                }
            } else {
                $(".car9 .car-front,.car9 .car-after").hide();
            }
            if (ss10 > 0.3) {
                $(".car10 .car-front,.car10 .car-after").show();
                if (ss10 > 1) {
                    ss10 = ss10 - 1
                }
            } else {
                $(".car10 .car-front,.car10 .car-after").hide();
            }
            $(".car1").animate({left:ss*170},2000);
            $(".car2").animate({left:ss2*170},2000);
            $(".car3").animate({left:ss3*170-3},2000);
            $(".car4").animate({left:ss4*170-7},2000);
            $(".car5").animate({left:ss5*170-10},2000);
            $(".car6").animate({left:ss6*170-13},2000);
            $(".car7").animate({left:ss7*170-17},2000);
            $(".car8").animate({left:ss8*170-20},2000);
            $(".car9").animate({left:ss9*170-23},2000);
            $(".car10").animate({left:ss10*170-27},2000);  
            secomd --;
            for( i = 1;i<=10;i++){

                var left={}
                left.num= parseInt($('.car'+i).css('left'));
                left.id=i
                list.push(left)
                arr.push(parseInt($('.car'+i).css('left')))
            }

            function arrayKeys(arr) {
                var i    = 1, 
                len  = arr.length+1,
                keys = [];
                while (i < len) {
                    keys.push(i++);
                }
                return keys;
            }　　 
            // 判断变量是否为数组
            function isArray(arr) {
                return ({}).toString.call(arr).match(/^\[[^\s]+\s*([^\s]+)\]$/)[1] == 'Array';
            }
            // 堆排序
            function heapSort(arr, keys, order) {
                if (!isArray(arr) || !isArray(keys)) return ;
                var order = (order + '').toLowerCase() == 'desc' ? order : 'asc';
                // 交换位置
                function changePos(arr, cur, left) {
                    var tmp;
                    tmp       = arr[cur];
                    arr[cur]  = arr[left];
                    arr[left] = tmp;
                }
                // 构造二叉堆
                function heap(arr, start, end, isMax) {
                    var isMax = isMax == undefined ? true : isMax,  // 是否最大堆，否为最小堆
                    cur   = start,        // 当前节点的位置
                    left  = 2 * cur + 1;  // 左孩子的位置
                    for (; left <= end; cur = left, left = 2 * left + 1) {
                        // left是左孩子，left + 1是右孩子
                        if (left < end && ((isMax && arr[left] < arr[left + 1]) || (!isMax && arr[left] > arr[left + 1]))) {
                            left++;  // 左右子节点中取较大/小者
                        }
                        if ((isMax && arr[cur] >= arr[left]) || (!isMax && arr[cur] <= arr[left])) {
                            break;
                        } else {
                            // 原index跟随排序同步进行
                            changePos(keys, cur, left);
                            changePos(arr, cur, left);
                        }
                    }
                }
                return (function () {
                    // 从(n/2-1) --> 0逐次遍历。遍历之后，得到的数组实际上是一个二叉堆
                    for (var len = arr.length, i = Math.floor(len / 2) - 1; i >= 0; i--) {
                        heap(arr, i, len - 1, order == 'asc');
                    }
                    // 从最后一个元素开始对序列进行调整，不断的缩小调整的范围直到第一个元素
                    for (i = len - 1; i > 0; i--) {
                        changePos(keys, 0, i);
                        changePos(arr, 0, i);
                        // 调整arr[0...i - 1]，使得arr[0...i - 1]仍然是一个最大/小堆
                        // 即，保证arr[i - 1]是arr[0...i - 1]中的最大/小值
                        heap(arr, 0, i - 1, order == 'asc');
                    }
                })();
            }
            // 测试
            var aa = arr;
            var kk = arrayKeys(aa);  // 原索引数组
            heapSort(aa, kk, 'asc');
            // console.log(aa);  // 排序后
            // console.log(kk);  // 原索引
            var html=''
            for( j =0;j<kk.length;j++){
                html+='<li>'+kk[j]+'</li>'
            }
            $('.num-center ul').html(html)
            color();
            var animateLeft =parseInt($('.animate-box').css("left"));
            if(animateLeft > -2000){ 
                sortcar(); 
            }
        }
        }, 2000);
}
// 设置序号颜色
function color(){
    var list = $('.num ul li')
    for( i = 0;i<list.length;i++){
        if($('.num ul li').eq(i).text() == 1){
            $('.num ul li').eq(i).css({
                background:'#FFFF00'
            })
        }else if($('.num ul li').eq(i).text() == 2){
            $('.num ul li').eq(i).css({
                background:'#0089FF'
            })
        }else if($('.num ul li').eq(i).text() == 3){
            $('.num ul li').eq(i).css({
                background:'#4D4D4D'
            })
        }else if($('.num ul li').eq(i).text() == 4){
            $('.num ul li').eq(i).css({
                background:'#FF7300'
            })
        }else if($('.num ul li').eq(i).text() == 5){
            $('.num ul li').eq(i).css({
                background:'#81FFFF'
            })
        }else if($('.num ul li').eq(i).text() == 6){
            $('.num ul li').eq(i).css({
                background:'#5200FF'
            })
        }else if($('.num ul li').eq(i).text() == 7){
            $('.num ul li').eq(i).css({
                background:'#BAB9B9'
            })
        }else if($('.num ul li').eq(i).text() == 8){
            $('.num ul li').eq(i).css({
                background:'#FF0000'
            })
        }else if($('.num ul li').eq(i).text() == 9){
            $('.num ul li').eq(i).css({
                background:'#760000'
            })
        }else if($('.num ul li').eq(i).text() == 10){
            $('.num ul li').eq(i).css({
                background:'#28C300'
            })
        }
    };
}
// 名次排序
function sortcar(){
    for( i = 0;i<CarDiv.length;i++){
        var is =CarDiv[i];
        $('.car'+is).css({
            left:60*(i+1)
        })
    }
    var html=''
    for( j =0;j<CarDiv.length;j++){
        html+='<li>'+CarDiv[j]+'</li>'
    }
    $('.num-center ul').html(html)
    color();
    $('.car').stop(true,false);
    $('.topbg').stop(true,false);
    clearInterval(timer);
    $(".car-front,.car-after,.car-wheel,.car-wheel2").hide(); 
    setTimeAnimate();
}
// 倒计时 执行动画
function countDownCIT(rs,fnc){
    var timers = setInterval(function()
        {
            if(rs>0){
                var  mint = parseInt(rs/(60*1000))
                var  seco = parseInt((rs - (mint*60*1000))/1000);
                var  hm = parseInt((rs - (mint*60*1000))%1000);
                hm = parseInt(hm.toFixed(2))
                if(mint<10){
                    mint='0'+mint
                };
                if(seco<10){
                    seco='0'+seco
                };
                fnc( mint,seco,hm);
                rs = rs - 10;
                if(rs<=3000){
                    $('.lightred').show();
                }
                if(rs<=2000){
                    $('.lightred').show();
                    $('.lightyellow').show();
                }
                if(rs<=1000){
                    $('.lightred').show();
                    $('.lightyellow').show();
                    $('.lightgreen').show();
                }
            }else{
                clearInterval(timers);
                animate_a()
                $('.light').hide();
                $('.light .countdownnum').html('00:00');
                $('.light .countdownnum2').html('000');

            }
        }, 10);
}
// 获取比赛结果前三名
function getPlace(){
    $('.rz-bg').show();
    $('.animate').hide();
    for( i = 0;i<3;i++){
        var nums = CarDiv[i];
        $('.plcae').eq(i).addClass('PN_'+nums)
    }
}
// 名次显示动画效果
function placeAnimate1(){
    $('.place1').animate({left:'140px',top:'65px'},500,function(){placeAnimate12()})
}
function placeAnimate12(){
    $('.place2').show()
    $('.place2').animate({left:'15px',top:'50px'},500,function(){placeAnimate13()})
}
function placeAnimate13(){
    $('.place3').show()
    $('.place3').animate({left:'233px',top:'50px'},170)
}
function setTimeAnimate(){
    var sT = 2
    Time_S = setInterval(function(){
        if(sT > 0){
            sT--;

        }else{
            clearInterval(Time_S); 
            getPlace();
            placeAnimate1()
        }
        },1000)

}

