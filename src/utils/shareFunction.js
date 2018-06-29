export function getName(){
	return parseInt((new Date).getTime() % 61439 + 4096).toString(16);
}
//滚动条在Y轴上的滚动距离
 
export function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
 
//文档的总高度
 
export function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
 
//浏览器视口的高度
 
export function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}
//判断是否到底部
export function HandScroll(){
	if(getScrollTop() + getWindowHeight() + 20 >= getScrollHeight()){
　　　　return true
　　}else{
		return false
	}
}

export function IpInputKeyDown(event,num,target){
	let e = window.event || event; 
	let inputs=document.getElementById(target).getElementsByTagName("input");
	let valueLength = e.target.value.length;
	let InputValue = e.target.value - 0;
　 	let code = e.keyCode||e.which||e.charCode; 
	if((code >= 48 && code<=57) || (code >= 96 && code<=105)){
		if((valueLength >= 3) && (inputs[num].selectionStart != inputs[num].selectionEnd)){
			return true
		}else if((valueLength >= 3) && (inputs[num].selectionStart == inputs[num].selectionEnd)){
			if(num <3){
				inputs[num+1].focus();
				inputs[num+1].setSelectionRange(0,0);
			}
		}
		return true
	}else if((code == 39) || (code == 190)){
		let cursurPosition=-1;
		if(inputs[num].value || inputs[num].value == '0'){
			if(inputs[num].selectionStart || inputs[num].selectionStart == '0'){//非IE浏览器
				cursurPosition= inputs[num].selectionStart;
			}else{//IE
				let range = document.selection.createRange();
				range.moveStart("character",-inputs[num].value.length);
				cursurPosition=range.text.length;
			}
		}else{
			cursurPosition = 0;
		}
		console.log(inputs[num].selectionStart);
		if(cursurPosition == inputs[num].value.length){
			if(num <3){
				let pos = inputs[num+1].value.length;
				if(inputs[num+1].setSelectionRange){
					inputs[num+1].focus()
					inputs[num+1].setSelectionRange(0,0);
				}else if (inputs[num+1].createTextRange) {
					let range = obj.createTextRange();
					range.collapse(!0);
					range.moveEnd("character", pos);
					range.moveStart("character", pos);
					range.select();
				}
			}
		}
		if(code == 190){
			event.preventDefault()
		}
	}else if(code == 37){
		let cursurPosition=-1;
		if(inputs[num].value || inputs[num].value == '0'){
			if(inputs[num].selectionStart || inputs[num].selectionStart == '0'){//非IE浏览器
				cursurPosition= inputs[num].selectionEnd;
			}else{//IE
				let range = document.selection.createRange();
				range.moveStart("character",-inputs[num].value.length);
				cursurPosition=range.text.length;
			}
		}else{
			cursurPosition = 0;
		}
		console.log(cursurPosition,inputs[num].selectionEnd);
		if(cursurPosition == '0'){
			if(num > 0){
				let ele = inputs[num-1];
				let pos = ele.value.length;
				if(ele.setSelectionRange){
					setTimeout(function(){
						ele.focus()
						ele.selectionStart = pos;
						ele.selectionEnd = pos;
						ele.setSelectionRange(pos,pos);
					},10)
				}else if (ele.createTextRange) {
					setTimeout(function(){
						let range = obj.createTextRange();
						range.collapse(!0);
						range.moveEnd("character", pos);
						range.moveStart("character", pos);
						range.select();
					},10)
				}
			}
		}
	}else if(code == 8){
		let cursurPosition=-1;
		let inputVaLen = inputs[num].value.length;
		if(inputs[num].value || inputs[num].value == '0'){
			if(inputs[num].selectionStart || inputs[num].selectionStart == '0'){//非IE浏览器
				cursurPosition= inputs[num].selectionStart;
			}else{//IE
				let range = document.selection.createRange();
				range.moveStart("character",-valueLength);
				cursurPosition=range.text.length;
			}
		}else{
			cursurPosition = 0;
		}
		
		if(cursurPosition == 0){
			if(inputs[num].selectionStart == '0' && inputVaLen == inputs[num].selectionEnd && inputs[num].value ){
				return true
			}else{
				if(num > 0){
					inputs[num-1].selectionStart = inputs[num-1].value.length;
					inputs[num-1].focus()
				}
			}
		}
		return true
	}else if(code == 9){
		return true
	}else{
		event.preventDefault()
	}
}
