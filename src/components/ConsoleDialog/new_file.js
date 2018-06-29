/*调用dialog方法
 
 * this.$dialog(option,callback)
 * callback类型为function,参数为 thisView 表示传入的视图view 可通过thisView 调用传入视图的各种数据
  
  option ={
  	type:'info',
  	actionTips:[{
	  	className:'info',
	  	template:'提示字体',
	  	html:false
  	}],
  	tableData:{
  		option:{},
  		data:[],
  		type:'radio',
  	},
  	//使用自定义视图，传入view参数，此时需传入props,
  	view,
  	props:{}                   
  }
  */


/*如果使用dialog自带弹窗，请传入以下参数。如果使用自定义视图弹窗，需传入view 字段*/

/*type 类型有 warn 显示左侧警告图像 否则默认为info类型，delete提示框，一般显示删除提示信息，，不显示左侧图标*/
let type = option.type;
/*
 * actionTips 是数组类型，数组中数据格式包括要添加的className,以及text
 *actiontips =[{
 *	className:'info',
 *	template:'提示字体',
 *	html:false //提示当前提示是否使用v-html渲染模板
 * }]
 * */
let actionTips = option.actionTips;
/*tableData是对象类型，包含标题、以及数据，调用ConsoleTable组件，如果不传入tableData选项，则默认不显示table
 * tableData = {
 * 	option:{}，
 *  data:[]，
 *  type:'radio' //包含 单选,无，如不传入type字段，默认不显示[radio,default]
 *  toolTip:'请选择一台云服务器'
 * }
 * */
/*如果type为radio 将会进行调用必选方法。响应。需传入提示信息*/
let tableData = option.tableData;



/*要传入的个性化视图，传入view参数，如果存在view 将使用自定义视图 optionx需传入的字段为 view props 和 validate*/
let view = option.view;
/*props 自定义视图需要传入的props参数*/
let props = option.props;
/*如果需要进行表单验证，传入validate参数，属性值为要验证表单方法名，传入的方法为promise方法*/
let validate = option.validate;
