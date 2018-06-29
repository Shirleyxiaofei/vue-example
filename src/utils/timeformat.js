
export function timeService(timer,noSeconds,simplyTime){
	if(timer == '--' || !timer){
		return '--'
	}
//	if(timer.indexOf("T") == -1){
//		timer = timer.split('-').join('/')
//	}
	if(isNaN(new Date(timer))){
		timer = timer.split('-').join('/')
	}
	var time;
	let date = new Date(timer);
	let year = date.getFullYear()
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours()
	let minutes = date.getMinutes();
	let seconds = date.getSeconds()
	
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

	
	if(noSeconds){
		time = year + '-' + month + '-' + day + ' ' + hour + ":" + minutes + ':' + seconds
		return time
	}
	if(simplyTime){
		time = year + '-' + month + '-' + day 
		return time
	}
	time = year + '-' + month + '-' + day + ' ' + hour + ":" + minutes + ':' + seconds
	return time;
}

export function timeExpired(timer,reFundOrder){
	if(timer == '--' || !timer){
		//表示未过期
		return false;
	}else{
		let nowTime = new Date();
		let date = new Date(timer);
		let overDueTime;
		if(reFundOrder){
			overDueTime = nowTime.getTime() - date.getTime() - 7*24*3600*1000;
		}else{
			overDueTime = nowTime.getTime() - date.getTime()
		}
		if(overDueTime > 0){
			//大于0  表示过期 或者已超过7天不能退订
			return true
		}else{
			return false
		}
	}
}
