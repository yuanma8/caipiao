var date = new Date("2013-02-15 21:00:00");
   console.log("date1"+date);
   var time = date.getTime()/1000;//转换成秒；
   console.log(time.toString()); //convert to timestamp
var betTime = new Date().getTime();
console.log(betTime.toString()); //contain millisecond
//我们再将其转换成日期格式的：
//var date = new Date( time * 1000 );//.转换成毫秒
  date=new Date()
  console.log("date"+date);
   var time = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) 
   +" "+(date.getHours() < 10 ? '0' + date.getHours() : date.getHours())+":"+(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())+":"+(date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) ;
console.log(time.toString());
	//	var date2=(new Date()).getTime();
	//	var date3=date2-this.date1;
   // var minutes=Math.floor(date3/(60*1000));
	//	console.log("分钟"+minutes);	
	//	var xi=this.xishu[this.botinfo.danindex].xi;
	//	var	money=(minutes*xi).toFixed(2);
	//	if (money>0){
	//	this.date1=date2;
		//this.cast(money);
	//	}