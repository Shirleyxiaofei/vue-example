<template>
	<div :loading='loading' class="action-content">
		<el-row class="action-tip">
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
					<!--<p v-if="actionTip[1]" class="action-tip-subtip">
						{{ actionTip[1] }}
					</p>-->
				</el-col>
			</el-row>
			<p v-if="warnTitle" class="action-tip-subtip" style="color: red;">
				{{ actionTips[0] }}
			</p>
		</el-row>
		<el-row class='action-table' v-if="tableData">
			<el-col>
				<console-table :tableData='filterData'
				:operationOrNot=false
				:height='200'
				:tableOptions = 'tableData.option'
				:noEffect=true
				></console-table>
				<p class="unRenewTip" v-if="unRenewData && unRenewData.length > 0">以下{{actionTip[1]}}不可续订,<span v-if='!unRenewShow' @click="OpenData">点击查看</span><span v-if='unRenewShow' @click="OpenData">点击关闭</span></p>
				<console-table v-if='unRenewShow' :tableData='unRenewData' class='unRenewTable'
				:operationOrNot=false
				:height='110'
				:tableOptions = 'tableData.option'
				:noEffect=true
				></console-table>
			</el-col>
			
		</el-row>
		<el-row class="action-select">
		
			<el-form :model="formData" :key='formData.date' size='mini'>
				<el-form-item label="续订时长：" required>
					<el-select v-model='formData.cycleType'>
						<el-option v-for = 'item in formData.list'
							:label='item.label'
							:value='item.cycleType' :key="item.cycleType"></el-option>	
						
					</el-select>
					<el-select v-model='formData.cycleCnt'>
						<el-option v-for = 'item in cycleCnt'
							:label='item' 
							:value='item' :key='item'></el-option>
					</el-select>
					
				</el-form-item>
				<el-form-item v-show='false' label='续订金额为:' required>
					{{price || 0}} 元
				</el-form-item>
				
			</el-form>
			
		</el-row>	
	
	
	
	</div>
</template>


<script>
	import ConsoleTable from '@/components/ConsoleTable'
	//import { GetFlavor } from '@/api/ecm'
	export default {
		props:{
			type:[String],
			actionTip:[Array],
			actionTips:[Array,String],
			tableData:[Object],
			action:[String],
			loading:[Boolean],
			selctData:[Array,Object],
			form:[Object,String]
		},
		components:{
			ConsoleTable
		},
		data(){
			return {
				warnTitle:false,
				unRenewShow:false,
				formData:{
					cycleType:'M',
					cycleCnt:'1',
					list:[
						{
							label:'月',
							cycleType:'M',
							cycleCnt:[1,2,3,4,5,6,7,8,9,10,11]
						},{
							label:'年',
							cycleType:'Y',
							cycleCnt:[1,2,3]
						}
					]
					
				}
			}
		},
		methods:{
			validateForm(){
				let servers = [];
				this.filterData.map(item=>{
					servers.push(item.id)
				})
				this.form.data = servers
				return new Promise((resolve,reject)=>{
					if(this.form.data.length){
						resolve()
					}else{
						this.$message({
							type:'error',
							message:'当前续订方式无' + this.actionTip[1]
						})
						reject()
					}
				})
			},
			OpenData(){
				this.unRenewShow = !this.unRenewShow;
			}
		},
		computed:{
			typeCom(){
				let type = this.type || 'warn'
				return type 
			},
			actionCom(){
				if(this.action == 'start' || this.action == 'stop' || this.action == 'reboot' || this.action == 'delete'){
					return 'action'
				}
			},
			unRenewData(){
				return this.tableData.data[1]
			},
			filterData(){
				/*let tableData = this.tableData.data.filter(item=>{
					return item.cycle_type == this.formData.cycleType
				})*/
				return this.tableData.data[0]

//			fliterData(){
//				/*let date = (new Date()).getTime();
//				this.$set(this.tableData,'date',date)*/
//				let tableData = {
//					data:[]
//				}
//				
//				console.log(this.formData.cycleType)
//				
//				tableData.data = this.tableData.data.filter(item=>{
//					return item.cycle_type == this.formData.cycleType
//				});
//				
//				
//				return tableData;
			},
			cycleCnt(){
				let cycleType = this.formData.cycleType;
				let cycleCnt = [];
				if(cycleType){
					cycleCnt = this.formData.list.filter((item)=>{
						return item.cycleType == cycleType
					})[0].cycleCnt;
				}
				this.formData.cycleCnt = cycleCnt[0]
				return cycleCnt;
			},
			price(){
				if(this.formData.cycleType && this.formData.cycleCnt){
					this.form.cycleType = this.formData.cycleType
					this.form.cycleCnt = this.formData.cycleCnt
					let servers = [];
					this.filterData.map(item=>{
						servers.push(item.id)
					})
					this.form.data = servers
					return 0
				}else{
					return 0
				}
			},
			
			
		},
		created(){
			console.log('ddd')
			console.log(this.form)
			console.log(this.actionTips);
			if(this.actionTips){
				this.warnTitle = true;
			}
			/*GetFlavor().then((req)=>{
				let data =req.data;
				let flavorList = data.results;
				let selectList = []
				flavorList.map((item,index)=>{
					let selectItem = {}
					
					selectItem.label = item.cpunumber + '核';
					selectItem.cpu = item.cpunumber;
					selectItem.mem = item.memory /1024
						
					selectList.push(selectItem)
				})
				selectList.forEach((item,index)=>{
					
				})
				this.select = selectList
				
			})*/
		},
		
	}
</script>

<style lang="scss" scoped="scoped">
.action-content{
	max-width: 600px;
	max-height: 510px;
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
	.action-select{
		padding-top:6px;
	}
	.unRenewTip{
		font-size: 12px;
		padding: 5px;
		span{
			color: #409EFF;
			cursor: pointer;
		}
	}
	
</style>
<style lang="scss">
	.action-content{
		.el-table .el-table__body-wrapper{
			/*max-height: 200px;
			overflow-y: auto;
			overflow-x: hidden;*/
		}
	}
</style>