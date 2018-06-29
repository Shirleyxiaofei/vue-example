<template>
	<div :loading='loading' class="action-content consoleAction">
		<el-row class="action-tip" v-if="!tableData.warn">
			<el-row class="action-tip-title" v-if=" typeCom=='info' ">
				{{actionTip[0]}}
			</el-row>
			<el-row class="action-tip-waring" v-if=" typeCom=='warn' ">
				<el-col :span='2' class="action-img">
					<svg-icon icon-class="warn"></svg-icon>
				</el-col>
				<el-col :span="21" class="action-tip-title">
					<p>
						{{actionTip[0]}}
					</p>
					<p v-if="actionTip[1]" class="action-tip-subtip">
						{{ actionTip[1] }}
					</p>
				</el-col>
				
			</el-row>
		</el-row>
		<el-row class="action-tip" v-if="tableData.warn" id='warnStyle'>
			<el-row class="action-tip-waring">
				<el-col class="action-img">
					<svg-icon icon-class="warn"></svg-icon>
				</el-col>
				<el-col class="action-tip-title">
					<span>
						{{actionTip[0]}}
					</span>
					<i class="action-tip-subtip">
						{{actionTip[1]}}
					</i>
				</el-col>
			</el-row>
		</el-row>
		<el-row class='action-table' v-if="Array.isArray(tableData.data) && !tableData.warn">
			<el-col>
				<console-table :tableData='fliterData'
					:operationOrNot=false
					:height='200'
					:tableOptions = 'tableData.option'
					:noEffect=true
					></console-table>
				
				<p class="unOperationTip" v-if="unOperationData.length > 0">以下云服务器不可{{actionTip[2]}},<span v-if='!unOperationShow' @click="OpenData">点击查看</span><span v-if='unOperationShow' @click="OpenData">点击关闭</span></p>
				<console-table v-if='unOperationShow' :tableData='unOperationData' class='unOperationTable'
				:operationOrNot=false
				:height='110'
				:tableOptions = 'tableData.option'
				:noEffect=true
				></console-table>
			</el-col>
			
		</el-row>
		<el-row class="action-select">
			
			
		</el-row>	
	
	
	
	</div>
</template>


<script>
	import ConsoleTable from '@/components/ConsoleTable'
	import ConsoleSearch from '@/components/ConsoleSearch'
	export default {
		props:{
			type:[String],
			attachOperation:[Boolean],
			actionTip:[Array],
			tableData:[Object],
			action:[String],
			loading:[Boolean],
			form:[Object]
		},
		components:{
			ConsoleTable,
			ConsoleSearch
		},
		data(){
			return {
				unOperationShow:false
			}
		},
		methods:{
			OpenData(){
				this.unOperationShow = !this.unOperationShow;
			},
			validateForm(){
				
				return new Promise((resolve,reject)=>{
					if(this.tableData.warn || !this.tableData.data){
						resolve()
					}else{
						if(this.tableData.data && this.tableData.data[0] && this.tableData.data[0].length){
							resolve()
						}else{
							this.$message({
								message:'表格无数据，请重新选择',
								type:'error'
							})
							reject()
						}
					}
					
					
				})
				
				
			}
		},
		computed:{
			typeCom(){
				let type = this.type || 'warn'
				return type 
			},
			unOperationData(){
				return this.tableData.data ? this.tableData.data[1] : [];
			},
			fliterData(){
//				let date = (new Date()).getTime();
//				this.$set(this.tableData[0],'date',date)
				return this.tableData.data ? this.tableData.data[0] : []
			},
			
		}
		
		
	}
</script>

<style lang="scss" scoped="scoped">
.action-content{
	min-width: 600px;
}
	.action-tip{
		/*margin-top: -20px;*/
		padding-bottom: 10px;
		font-size:12px;
		min-height: 30px;
		color: #666666;
		.action-tip-title{
			line-height: 30px;
		}
		.action-tip-waring{
			.action-img{
				font-size:30px;
				color:#F9CD76;
				text-align: left;
				padding-left:2px;
			}
			.action-tip-title{
				p{
					line-height: 20px;
				}
				.action-tip-subtip{
					color:#999999;
				}
			}
		}	
		
		
	}
	.unOperationTip{
		font-size: 12px;
		padding: 5px;
		span{
			color: #409EFF;
			cursor: pointer;
		}
	}
	#warnStyle{
		.action-tip-waring{
			.action-img{
				font-size:40px;
				text-align: center;
				padding-left:0px;
			}
			.action-tip-title{
				text-align: center;
				span{
					font-size: 18px;
				}
				i{
					font-size: 18px;
				}
				.action-tip-subtip{
					color:#999999;
				}
			}
		}
	}
	
</style>
<style lang="scss">
	.consoleAction{
		.el-table{
			/*max-height: 280px;
			overflow-y: auto;
			overflow-x: hidden;*/
		}
	}
</style>