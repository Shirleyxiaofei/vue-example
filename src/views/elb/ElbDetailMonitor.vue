<template>
	<div class="elb_monitor">
		<div class="topTilte">
			<el-row>
			  	<el-col :span="14"><div class="quota">您还可以创建10个监听器</div></el-col>
			  	<el-col :span="10"><span class="btns_basic" @click="addMonitor">添加监听器</span></el-col>
			</el-row>
		</div>
		<div class="content">
			<el-table
			    :data="monitorList" :border=true tooltip-effect="dark" v-loading="loading"
			    :header-row-style = 'changeRowSty' :header-cell-style = 'changethSty'
			    style="width: 100%">
			    <el-table-column type="expand">
			      	<template slot-scope="props">
			        	<ElbBackHost></ElbBackHost>
			      	</template>
			    </el-table-column>
			    <el-table-column
			      	v-for="(item,index) in tableOptions"
			    	:prop="item.prop"
			    	:label='item.label'
			    	:width='item.width'
			    	:key='index'
			    	:show-overflow-tooltip=true>
			    		
			    </el-table-column>
			    <el-table-column label="操作" :width="100">
			    	<template slot-scope="scope">
			    		<el-button v-for='(Operation,index) in monitorOperation'  :key='index' type="text" @click='click(Operation.fun,scope.row)'>{{Operation.value}}</el-button>
			    	</template>
		    	</el-table-column>
  			</el-table>
			<!--<ConsoleTable 
				:checkBox=false 
				:expand=true 
				:operationOrNot = true 
				:selectOrNot=true 
				:tableData = 'monitorList' 
				:tableOptions = 'tableOptions' 
				:detilOptions = 'detilOptions'
				:noEffect = true
				:OperationEvents='monitorOperation' 
				@buttonClick = 'buttonClick'
				:loading = 'loading'></ConsoleTable>-->
		</div>
	</div>
</template>

<script>
	import i18n from '@/lang'
	import ConsoleSearch from '@/components/ConsoleSearch'
	import MonitorAction from '@/views/elb/MonitorAction'
	import ElbBackHost from '@/views/elb/ElbBackHost'
	
	export default{
		components:{
//			ConsoleTable:ConsoleTable,
			ConsoleSearch:ConsoleSearch,
			MonitorAction:MonitorAction,
			ElbBackHost:ElbBackHost,
		},
		data (){
			return{
				loading:false,
				monitorList:[{
		          elbProtocol: '2016-05-03',
		          name: '王小虎',
		          ecmProtocol: '上海',
		          healthCheck: '普陀区',
		          status: 'error',
		          state: 'error',
		          Dstrategy: '上海市普陀区金沙江路 1518 弄',
		          Number: 200333
		        }, {
		          elbProtocol: '2016-05-02',
		          name: '王小虎',
		          ecmProtocol: '上海',
		          healthCheck: '普陀区',
		          status: 'error',
		          state: 'error',
		          Dstrategy: '上海市普陀区金沙江路 1518 弄',
		          Number: 200333
		        }],
				tableOptions:[{
        			prop:'name',
        			label:i18n.common.name,
        			temp:true,
        			detail:true,
        		},{
        			prop:'elbProtocol',
        			label:i18n.elb.elbProtocol,
        		},{
        			prop:'ecmProtocol',
        			label:i18n.elb.ecmProtocol,
        		},{
        			prop:'healthCheck',
        			label:i18n.elb.healthCheck,
        		},{
        			prop:'Dstrategy',
        			label:i18n.elb.Dstrategy,
        		},{
        			prop:'status',
        			label:i18n.common.status,
        			temp:true,
        			status:true
        		},{
        			prop:'Number',
        			label:i18n.elb.Number,
        		},{
        			prop:'ecmNumber',
        			label:i18n.elb.ecmNumber,
        		}],
        		detilOptions:[{
        			prop:'name',
        			label:i18n.common.name,
        		},{
        			prop:'volumename',
        			label:i18n.bks.diskName,
        		},{
        			prop:'id',
        			label:i18n.common.ID,
        		}],
        		monitorOperation:[{
        			value:i18n.elb.modification,
        			fun:(data)=>{
        				return this.modification(data);
        			}
        		},{
        			value:i18n.bks.deleter,
        			fun:(data)=>{
        				return this.deleter(data);
        			}
        		}]
			}
		},
		methods:{
			buttonClick(funName,data){
      			funName(data);
      		},
			addMonitor(){
				let option = {
      				'data':{
      					'option':'',
      					'title':'添加监听器',
      					'actionTip':'',
      					'data':'',
      					'optionsValue':'',
      				},
      				'view':MonitorAction,
      				'form':{}
      			};
      			this.$alertDialog(option).then((res)=>{
  					console.log(res);
  					
  				})
			},
			modification(){
				
			},
			deleter(){
				
			},
		},
		computed:{
			changeRowSty(row,index){
      			return{'background':'#f0f2f7'}
      		},
      		changethSty(row,index){
      			return{'background':'#f0f2f7','color':'#333333','font-size':'12px','font-weight':'600',}
      		},
		},
	}
</script>

<style lang="scss">
	.elb_monitor{
		background: #FFFFFF;
		.topTilte{
			.el-col{
				height: 60px;
				line-height: 60px;
			}
			.el-col-10{
				text-align: right;
			}
			.el-col-14{
				padding-left: 20px;
				font-size: 12px;
			}
		}
		.btns_basic{
			display: inline-block;
			width: 80px;
			height: 30px;
			background: #f9cd76;
			color: #ffffff;
			cursor: pointer;
			vertical-align: middle;
			text-align: center;
			line-height: 30px;
			outline: none;
			box-sizing: border-box;
			border-radius: 5px;
			font-size: 12px;
			margin-right: 10px;
		}
		.content{
			min-height: 200px;
			margin-top: 10px;
		}
		.el-table td, .el-table th.is-leaf{
			border:none;
			border-bottom: 1px solid #D5DEED;
		}
		.el-table .el-table__expanded-cell{
			background-color: #f5f7fa;
		}
	}
</style>