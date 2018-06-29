<template>
	<div :loading='loading' class="action-content" ref="actionContent">
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
					<p v-if="actionTip[1]" class="action-tip-subtip">
						{{ actionTip[1] }}
					</p>
				</el-col>
				
			</el-row>
		</el-row>
		<el-row class='action-table' v-if="tableData">
			<el-col>
				<console-table :tableData='fliterData.data'
				:operationOrNot=false
				:tableOptions = 'fliterData.option'
				:noEffect=true
				:key='fliterData.date'
				></console-table>
			</el-col>
			
		</el-row>
		<el-row class="action-select">
		
			<el-form :model="formData" :key='formData.date' size='mini' ref="actionForm" :rules='rules'>
				<el-form-item label="升级到" required>
					<el-col :span=9>
						<el-form-item prop="cpu">
							<el-select v-model='formData.cpu' :disabled="disabled">
								<el-option v-for = 'item in formData.cpuValue'
									:label='item.vcpu + " 核"'
									:value='item.vcpu' :key="item.vcpu"></el-option>	
								
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span=10>
						<el-form-item prop="mem">
							<el-select v-model='formData.mem' :disabled="disabled" >
								<el-option v-for = 'item in mem'
									:label='item +" G"' 
									:value='item' :key='item'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					
					
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
	import { SpcExtend } from '@/api/ecm'
	export default {
		props:{
			type:[String],
			actionTip:[Array],
			tableData:[Object],
			action:[String],
			loading:[Boolean],
			selctData:[Array,Object],
			form:[Object,String],
			thatVue:[Object]
		},
		components:{
			ConsoleTable
		},
		data(){
			let validateCpu = (rule, value, callback)=>{
				let server = this._.head(this.tableData.data);
				let cpu;
				if(this.regionType == 'cs'){
					cpu = server.cpunumber;
				}
				if(this.regionType == 'os'){
					cpu = server.flavor.vcpus;
				}
				if(value){
					if(value < cpu){
						callback(new Error('变更规格只支持升级操作'))
					}else{
						callback()
					}
				}else{
					callback(new Error('请选择要升级的核数'))
				}
				
			}
			let validateMem = (rule, value, callback)=>{
				let server = this._.head(this.tableData.data);
				let mem,cpu;
				if(this.regionType == 'cs'){
					mem = server.memory / 1024;
					cpu = server.cpunumber;
				}
				console.log('ccc')
				if(this.regionType=='os'){
					mem = server.flavor.ram / 1024;
					cpu = server.flavor.vcpus;
				}
				
				if(value){
					if(this.formData.cpu > cpu){
						callback()
					}else{
						if(value <= mem){
							callback(new Error('变更规格只支持升级操作'))
						}else{
							callback()
						}
					}
					
				}else{
					callback(new Error('请选择要升级的容量'))
				}
				
			}
			
			
			return {
				disabled:true,
				formData:{
					cpu:'',
					mem:'',
					cpuValue:[
						{
							vcpu:1,
							ram:[1,2,4]
						},{
							vcpu:2,
							ram:[2,4,8,16]
						}
					],
					
					
				},
				rules:{
					cpu:[
						{
							validator:validateCpu,
							trigger:'change'
						}
					],
					mem:[
						{
							validator:validateMem,
							trigger:'change'
						},
					]
				}
			}
		},
		methods:{
			validateForm(){
				/*return new Promise((resolve,reject)=>{
					if(this.formData.cpu && this.formData.mem){
						
						
						
					}else{
						this.$message({
							message:'请选择要变更的规格'
						})
						reject()
					}
				})*/
				return this.$refs['actionForm'].validate()
			},
			
			
		},
		computed:{
			regionType(){
				return this.thatVue.$store.getters.regionType;
			},
			typeCom(){
				let type = this.type || 'warn'
				return type 
			},
			actionCom(){
				if(this.action == 'start' || this.action == 'stop' || this.action == 'reboot' || this.action == 'delete'){
					return 'action'
				}
			},
			fliterData(){
				let date = (new Date()).getTime();
				this.$set(this.tableData,'date',date)
				return this.tableData
			},
			mem(){
				let cpu = this.formData.cpu;
				let mem = [];
				if(cpu){
					mem = this.formData.cpuValue.filter((item)=>{
						return item.vcpu == cpu
					})[0].ram;
				}
				console.log(1111);
				this.formData.mem = mem[0];
//				this.form.mem = this.formData.mem;
				return mem;
			},
			price(){
				if(this.formData.cpu && this.formData.mem){
					this.form.cpu = this.formData.cpu
					this.form.mem = this.formData.mem
					return 0
				}else{
					return 0
				}
			}
			
		},
		created(){
			SpcExtend().then((req)=>{
				let data = req.data.returnObj;
				if(data && data.length){
					data.map((item)=>{
						item.ram = item.ram.sort((a,b)=>{
							return a-b
						})
					})
					this.formData.cpuValue = this._.sortBy(data,(item)=>{
						return item.vcpu;
					});
					this.disabled = false
					return
				}
				this.disabled = true
			})
		}
		
		
	}
</script>

<style lang="scss" scoped="scoped">
.action-content{
	max-width: 600px;
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
		padding-top:20px;
	}
	
</style>