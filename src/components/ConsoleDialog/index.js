// 引入VUE
import Vue from 'vue';
// 引入dialog组件
import dialog from './index.vue'
import dialogAction from './action' 
// 构造子类
const Dialog = Vue.extend(dialog);
 
// 创建实例
let instance = new Dialog({
  el: document.createElement('div')
});
 
// 创建方法
const DialogEl = function(option,callback){
  //配置
  let validateName,props,view,type,actionTips,dataName,tableData
  let title = option.title || '提示';
  let width = option.width || '450px';
  //判断是否有自定义view
  if(option.view){
  	view = option.view;
  	validateName = option.validateName;
  	dataName = option.dataName;
  	props = option.props;
  	

  }else{
  
  	view = dialogAction;
  	tableData = option.tableData;
    let defaultProps ={
	  type:option.type || 'info',
	  actionTips:option.actionTips || [],
	  tableData:tableData || null
	};
  	props = option.props || defaultProps
  }
  
 
  //判断是否进行win打开
  let win = option.win;
  
  //传入dialog中
  let h = this.$createElement;
  let vnode = h(view,{props});
  //放入默认$slotes中
  instance.$slots.content = [vnode];
  // 将参数传给实例
  instance.title = title;
  instance.callback = callback;
  instance.dialogWidth = width;
  instance.validateName = validateName;
  instance.dataName = dataName;
  instance.tableData = tableData;
  instance.win = win;
  console.log(instance)
  // 显示组件
  instance.visible = true;
  // 插入页面
  document.body.appendChild(instance.$el);
}
 
// 抛出方法
export default DialogEl;