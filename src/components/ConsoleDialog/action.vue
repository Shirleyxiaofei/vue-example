<template>
	<div class="dialog-action">
		<!--头部信息提示框-->
		<el-row class="action-tip" v-if="type !== 'delete'">
				<div v-if="type=='warn'" :span="2" class="action-inline action-img-warn">
					<svg-icon icon-class="warn"></svg-icon>
				</div>
				<div class="action-inline" :class="{'action-tip-content':type=='warn'}">
					<div v-for="(item,index) in actionTips":key="index" :class="[item.className,'action-tip-line'+index]">
						<div v-if="!item.html">
							{{item.template}}
						</div>
						<div v-else v-html="item.template"></div>
					</div>
				</div>
		</el-row>
		<!--删除确认框-->
		<el-row v-if="type =='delete'" class="action-delete">
			<el-col class="action-img-delete">
				<svg-icon icon-class="warn"></svg-icon>
			</el-col>
			<el-col class="action-delete-content">
				<span v-for="(item,index) in actionTips" :class="['action-delete-subcontent'+index,item.className]">
					<span v-if="!item.html">
						{{item.template}}
					</span>
					<span v-else v-html="item.template"></span>
				</span>
			</el-col>
		</el-row>
		<!--表格-->
		<el-row v-if="tableData && tableData.operationData">
			<console-table 
				:tableData = 'tableData.operationData.data'
				:operationOrNot=false
				:tableOptions = 'tableData.operationData.option'
				></console-table>
		</el-row>
		<el-row v-if="tableData && tableData.unOperationData">
			<el-row v-if="tableData.unOperationData.tip"></el-row>
			<console-table 
				
				
				></console-table>
		</el-row>
	
	</div>
</template>


<script>
	import ConsoleTable from '@/components/ConsoleTable';
	export default {
		components:{
			ConsoleTable
		},
		props:{
			type:{
				type:String,
				default:'info'
			},
			actionTips:[Array],
			tableData:[Object]
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.dialog-action{
		font-size:12px;
		
		.action-tip{
			font-size:0;
			.action-img-warn{
				font-size:40px;
				color:#F9CD76;
				text-align: left;
				padding:0 20px;
				width:80px;
				box-sizing: border-box;
			}
			.action-tip-content{
				width:calc(100% - 80px);
			}
			.action-inline{
				display: inline-block;
				vertical-align: middle;
			}
			.action-tip-line0{
				color:#666666;
				font-size:12px;
			}
			.action-tip-line1{
				color:#999999;
				font-size:12px;
			}
		}
		.action-delete{
			.action-img-delete{
				font-size:40px;
				text-align: center;
				color:#F9CD76;
				padding:0 0 40px 0;
			}
			.action-delete-content{
				text-align: center;
				font-size: 18px;
				color:#666666;
				.action-delete-subcontent1{
					font-style: italic;
					color:#999999;
				}
			}
			
		}
	}
</style>