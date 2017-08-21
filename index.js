var oLi = $(".feel .poster-item");
var index = 0,
	flag = true,
	timer = null;
function init(){
	oLi.eq(0).css({'top':'50%','margin-top':'-155px','height':'310px','width':'580px','left':'0px','opacity':'0.3','z-index':'1'});
	oLi.eq(1).css({'top':'50%','margin-top':'-165px','height':'330px','width':'600px','left':'40px','opacity':'0.5','z-index':'2'});
	oLi.eq(2).css({'top':'50%','margin-top':'-175px','height':'350px','width':'620px','left':'80px','opacity':'0.8','z-index':'3'});
	oLi.eq(3).css({'top':'50%','margin-top':'-185px','height':'370px','width':'640px','left':'130px','opacity':'1','z-index':'100'});
	oLi.eq(4).css({'top':'50%','margin-top':'-175px','height':'350px','width':'620px','left':'200px','opacity':'0.8','z-index':'3'});
	oLi.eq(5).css({'top':'50%','margin-top':'-165px','height':'330px','width':'600px','left':'260px','opacity':'0.5','z-index':'2'});
	oLi.eq(6).css({'top':'50%','margin-top':'-155px','height':'310px','width':'580px','left':'320px','opacity':'0.3','z-index':'1'});	
}
function leftMove(){
	if(flag){
		flag = false;
		oLi.eq( index  % 7).animate({'top':'50%','margin-top':'-155px','height':'310px','width':'580px','left':'320px','opacity':'0.3','z-index':'1'});
		oLi.eq( (index + 1) % 7).animate({'top':'50%','margin-top':'-155px','height':'310px','width':'580px','left':'0px','opacity':'0.3','z-index':'1'});
		oLi.eq( (index + 2) % 7 ).animate({'top':'50%','margin-top':'-165px','height':'330px','width':'600px','left':'40px','opacity':'0.5','z-index':'2'});
		oLi.eq( (index + 3) % 7).animate({'top':'50%','margin-top':'-175px','height':'350px','width':'620px','left':'80px','opacity':'0.8','z-index':'3'});
		oLi.eq( (index + 4) % 7).animate({'top':'50%','margin-top':'-185px','height':'370px','width':'640px','left':'130px','opacity':'1','z-index':'100'});
		oLi.eq( (index + 5) % 7).animate({'top':'50%','margin-top':'-175px','height':'350px','width':'620px','left':'200px','opacity':'0.8','z-index':'3'});
		oLi.eq( (index + 6) % 7).animate({'top':'50%','margin-top':'-165px','height':'330px','width':'600px','left':'260px','opacity':'0.5','z-index':'2'},function(){
			index++;
			flag = true;
		});
	}
}
function rightMove(){
	if(flag){
		flag = false;
		oLi.eq( (index+6)  % 7).animate({'top':'50%','margin-top':'-155px','height':'310px','width':'580px','left':'0px','opacity':'0.3','z-index':'1'});
		oLi.eq( index  % 7 ).animate({'top':'50%','margin-top':'-165px','height':'330px','width':'600px','left':'40px','opacity':'0.5','z-index':'2'});
		oLi.eq( (index + 1) % 7).animate({'top':'50%','margin-top':'-175px','height':'350px','width':'620px','left':'80px','opacity':'0.8','z-index':'3'});
		oLi.eq( (index + 2) % 7).animate({'top':'50%','margin-top':'-185px','height':'370px','width':'640px','left':'130px','opacity':'1','z-index':'100'});
		oLi.eq( (index + 3) % 7).animate({'top':'50%','margin-top':'-175px','height':'350px','width':'620px','left':'200px','opacity':'0.8','z-index':'3'});
		oLi.eq( (index + 4) % 7).animate({'top':'50%','margin-top':'-165px','height':'330px','width':'600px','left':'260px','opacity':'0.5','z-index':'2'});
		oLi.eq( (index + 5) % 7).animate({'top':'50%','margin-top':'-155px','height':'310px','width':'580px','left':'320px','opacity':'0.3','z-index':'1'},function(){
			index--;
			flag = true;
		});
	}
}
init();
$('.poster-prev-btn').on('click',function(){
	rightMove();
})
$('.poster-next-btn').on('click',function(){
	leftMove();
})

function createpage(json){
	if(!json.id) return false;
		var $Div = $('#'+json.id);
		if(json.nowNum > 1){
			var $A =$('<a href ='+'#'+(json.nowNum-1)+'></a>');
			$A.html('上一页');
			$Div.append($A);
		}
			
		for(var  i = 1 ; i <= json.allNum;i++){
			var $A = $('<a href ='+'#'+i+'></a>');
			$A.html(''+i);
			if(i==json.nowNum){$A.css({'background':'#494e7b','color':'white'});}
			$Div.append($A);
		}
		if((json.allNum - json.nowNum) > 0){
			var $A =$('<a href ='+'#'+(json.nowNum+1)+'></a>');
			$A.html('下一页');
			$Div.append($A);
		}
		var $allA = $("a");			
		$allA.on("click" ,function (){

		var nowNum = parseInt($(this).attr('href').substring(1));
		console.log(nowNum);
		$Div.html('');
		createpage({id:"page",nowNum:nowNum,allNum:5});
	});
	json.callback(json.nowNum,json.allNum);
}
function Ajax (method,address,flag,callBacks,data) {
	var xhr = null;
	if(window.XMLHttpRequest) {
	    xhr = new XMLHttpRequest();
	} else {
	    xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	if (method == 'get') {
	    xhr.open('get',address + '?' + data,flag);
	    xhr.send();		
	}else if (method == 'post') {
	    xhr.open('post',address,flag);
	    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
	    xhr.send(data);			
	}

	xhr.onreadystatechange = function() {
	    if ( xhr.readyState == 4 ) {
	        if ( xhr.status == 200 ) {
	            callBacks(xhr.responseText);
	        } else {
			    alert('出错了,Err：' + xhr.status);
			}
		}
			    
	}	
}
		// 翻页
Ajax('get', 'job.txt', true, doData);
function doData(json){
	console.log(json)
	var arr = [];
	var iNow = 9;
    var json = JSON.parse(json);
    console.log(json)
    var data = {id:"page",nowNum:1,allNum:5,callback:function(now,all){
		console.log(json);
		var num = now * 10 <= json.length ? 10:json.length%10;
		var oul = $('#ul1');
		var lic = $('#ul li');
		if(oul.html() === ''){
			for (var i = 0; i < num; i++) {
				var oli = $('<li></li>');
				var data=json[i];
				oli.html($('<a href="#" class="spl">' + data.job + '</a><span class ="spl1">' + data.place + '</span><span class ="splm">' + data.salary + '</span><span class ="splw">' + data.experience + '</span><span class ="spls">' + data.academic + '</span><span class ="date">' + data.time + '</span>'));
				oul.append(oli);
			}
			for (var i = 0; i < lic.length; i++) {
				arr.push([0,50+(i*40)]);
					// console.log(arr);
			}
			for (var i = 0; i < lic.length; i++) {
				$lic.eq(i).css({'position':'absolute','left':arr[i][0]+'px','top':arr[i][1]+'px','margin-top':0 })
			}
		}else{
			 var timer = setInterval(function  () {
			 	lic.eq(iNow).animate({'left':100,'top':500,'opacity':0});
			 	if(iNow === 0){
					clearInterval(timer);
			 		iNow = num - 1;
			 		for(var  i = 0; i < num ;i++){
			 			var data=json[i];
			 			lic.eq(i).html($('<a href="#" class="spl">' + data.job + '</a><span class ="spl1">' + data.place + '</span><span class ="splm">' + data.salary + '</span><span class ="splw">' + data.experience + '</span><span class ="spls">' + data.academic + '</span><span class ="date">' + data.time + '</span>'));
			 		}
			 		var timer2 = setInterval(function () {
				 			// console.log(lic);
			 			console.log(arr);
                              
                        if (iNow === 0) {
                            clearInterval(timer2);
                            iNow = num - 1;
                        }else {
                            iNow--; 
                        }
                        lic.eq(iNow).animate({'left': arr[iNow][0]+'px','top': ''+arr[iNow][1]+'px', 'opacity': 100});
                     }, 100);
				}else{
				 	iNow --;
				}
			},100);
		}
	}};
createpage(data);
}