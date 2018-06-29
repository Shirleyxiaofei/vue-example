import Vue from 'vue'
import ConsoleAction from '@/components/ConsoleAction'
let AlertDialog = function(option){
	let data = option.data;
	let view = option.view || ConsoleAction;
	let form = option.form ? option.form : {};
	let actionTips = option.actionTips ? option.actionTips : '';
	let ref = option.ref;
	let win;
	let h = this.$createElement
	let that = this;
	let type = data.type ? data.type : 'info'; //是否显示左侧的警告图像
	let showCancelButton = option.showCancelButton === false ? false :true;
	
	return new Promise((resolve,reject)=>{
		this.$msgbox({
			title:data.title,
			showCancelButton,
			message:(h(view,{
				props:{
					type,
					tableData:data, //表格对象 里面的data 表示表格数据
					actionTip:data.actionTip,
					form:form || {}, //要传递的表单
					actionTips:actionTips, 
					thatVue:that //vue 实例
				}
			})),
			beforeClose:(action,instance,done)=>{
				if(action=='confirm'){
					let formContent = instance.$children.find((item)=>{
						return item.form
					})
					console.log(formContent)
					formContent && formContent.validateForm ? formContent.validateForm().then((req)=>{
						done()
					}).catch((error)=>{
						
						console.log(error)
					}) : done()
					
					if(ref){
						win = window.open("","_blank");
					}
				}else{
					done()
				}
			},
			callback:(action,instance,ddd)=>{
				if(action == 'confirm'){
					if(ref){
						form.win = win;
					}
					resolve(form)
					instance.message = "";
				}else{
					console.log(form)
					instance.message = "";
				}
			}
		})
	});
}



Vue.prototype.$alertDialog = AlertDialog;
		
	
