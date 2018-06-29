<template>
	<div class="addMontior">
		<el-form label-width="120px" class="ruleForm" size="small" :model="dataForm" :rules="rules" ref="monitorForm">
			<el-form-item label='名称：' prop="name" class='monName'>
      			<el-input  v-model.trim="dataForm.name"></el-input>
    		</el-form-item>
    		<el-form-item class="elbProtocol" label="负载均衡器协议/端口 ：" prop="elbPortValue">
    			<el-select v-model="dataForm.elbProValue" placeholder="请选择">
			      	<el-option v-for='item in elbProOption' :key="item.value" :label="item.label" :value="item.value"></el-option>
			    </el-select>
			    <el-input type="age" v-model.trim="dataForm.elbPortValue"></el-input>
			    <p class="scope">取值范围1~65535</p>
    		</el-form-item>
    		<el-form-item class="ecmProtocol" label="云主机协议/端口 ：" prop="ecmPortValue">
    			<el-select v-model="dataForm.ecmProValue" placeholder="请选择">
			      	<el-option v-for='item in ecmProOption' :key="item.value" :label="item.label" :value="item.value"></el-option>
			    </el-select>
			    <el-input type="age" v-model.trim="dataForm.ecmPortValue"></el-input>
			    <p class="scope">取值范围1~65535</p>
    		</el-form-item>
    		<el-form-item class="elbWay" label="负载方式 ：" prop="elbWay">
    			<el-select v-model="dataForm.elbWay" placeholder="请选择">
			      	<el-option v-for='item in elbWayOption' :key="item.value" :label="item.label" :value="item.value"></el-option>
			    </el-select>
    		</el-form-item>
    		<!--<el-form-item class="sessionWay" label="会话保持类型 ：" prop="sessionWay">
    			<el-select v-model="dataForm.sessionWay" placeholder="请选择">
			      	<el-option v-for='item in sessionWayOption' :key="item.value" :label="item.label" :value="item.value"></el-option>
			    </el-select>
    		</el-form-item>-->
    		<el-form-item class="textArea" label="描述 ：" prop="textArea">
    			<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model.trim="dataForm.textArea"></el-input>
    		</el-form-item>
    		<!--<el-form-item class="elbWayValue threshold" label="会话保持 ：" prop="elbWayValue" required>
    			<el-switch active-color="#56d6c4" v-model="dataForm.elbWayValue"></el-switch>
    		</el-form-item>-->
    		<el-form-item class="healthCheck" label="健康检查 ：" prop="healthCheck" required>
    			<el-switch active-color="#56d6c4" v-model="dataForm.healthCheck"></el-switch>
    		</el-form-item>
    		<el-form-item class="intervalTime threshold" label="间隔时间（秒） ：" prop="intervalTime">
			    <el-input type="age" v-model.trim="dataForm.intervalTime"></el-input>
			    <p class="scope">取值范围1~20940</p>
    		</el-form-item>
    		<el-form-item class="intervalTime timeout" label="超时时间（秒） ：" prop="timeout">
			    <el-input type="age" v-model.trim="dataForm.timeout"></el-input>
			    <p class="scope">取值范围2~60</p>
    		</el-form-item>
    		<el-form-item class="intervalTime threshold" label="健康阙值 ：" prop="threshold">
			    <el-input type="age" v-model.trim="dataForm.threshold"></el-input>
			    <p class="scope">取值范围1~10</p>
    		</el-form-item>
    		<el-form-item class="intervalTime unThreshold" label="不健康阙值 ：" prop="unThreshold">
			    <el-input type="age" v-model.trim="dataForm.unThreshold"></el-input>
			    <p class="scope">取值范围1~10</p>
    		</el-form-item>
    		<el-form-item label='检查路径：' prop="path" class='path'>
      			<el-input  v-model.trim="dataForm.path"></el-input>
      			<p class="scope">长度范围1~80</p>
    		</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import i18n from '@/lang'
	import { nameRule  } from '@/utils/validator'
	
	export default{
		props:{
			form:[Object,String]
		},
		data(){
			let checkMonName=(rule, value, callback) => {
	      		if(!value){
		          	callback(new Error('名称不能为空！'));
	       		}else if(value.length > 63 || value.length < 2){
		      		callback(new Error('长度为2-63字符'));
      			}else if(nameRule(value)){
      				callback(new Error('不能使用中文'));
	      		}else{
	            	let val=value;
	          	}
        	};
			let numJudge=(rule, value, callback) => {
				console.log(rule)
				let minNum = 1;
				let maxNum = 65535;
				if(rule.field == 'elbPortValue' || rule.field == 'ecmPortValue'){
					minNum = 1;
					maxNum = 65535;
				}else if(rule.field == 'intervalTime'){
					minNum = 1;
					maxNum = 20940;
				}else if(rule.field == 'timeout'){
					minNum = 2;
					maxNum = 60;
				}else if(rule.field == 'threshold' || rule.field == 'unThreshold'){
					minNum = 1;
					maxNum = 10;
				}
	      		let checkNum = /^[0-9]*$/;
	      		if(!checkNum.test(value)){
	      			callback(new Error('只能输入数字'));
	      		}else if((value - 0) < minNum || (value - 0) > maxNum){
	      			callback(new Error('取值范围 ' + minNum + '~' + maxNum));
	      		}else{
	      			callback()
	      		}
        	};
			return{
				elbProOption:[
					{
						value:'http',
						label:'HTTP',
					},{
						value:'ftp',
						label:'FTP',
					}
				],
				ecmProOption:[
					{
						value:'http',
						label:'HTTP',
					},{
						value:'ftp',
						label:'FTP',
					}
				],
				elbWayOption:[
					{
						value:'http',
						label:'HTTP',
					},{
						value:'ftp',
						label:'FTP',
					}
				],
				sessionWayOption:[
					{
						value:'http',
						label:'HTTP',
					},{
						value:'ftp',
						label:'FTP',
					}
				],
				dataForm:{
					name:'',
					elbProValue:'HTTP',
					ecmProValue:'HTTP',
					ecmPortValue:'',
					elbPortValue:'',
					textArea:'',
					elbWay:'HTTP',
//					elbWayValue:true,
//					sessionWay:'HTTP',
					healthCheck:true,
					intervalTime:'',
					timeout:'',
					threshold:'',
					unThreshold:'',
					path:'',
				},
				rules:{
					name: [
	            		{ required: true, message: '请输入监听器名称', trigger: 'blur' },
	            		{ validator: checkMonName, trigger: 'blur' },
	          		],
//					elbProtocol: [
//	            		{ required: true, message: '请选择负载均衡器协议/端口 ', trigger: 'blur,change' },
//	          		],
//					ecmProtocol: [
//	            		{ required: true, message: '请选择云主机协议/端口 ', trigger: 'blur,change' },
//	          		],
	          		elbWay: [
	            		{ required: true, message: '请选择负载方式', trigger: 'blur' },
	          		],
//	          		sessionWay: [
//	            		{ required: true, message: '请选择会话保持类型', trigger: 'blur' },
//	          		],
	          		intervalTime: [
	            		{ required: true, message: '请输入间隔时间', trigger: 'blur' },
	            		{ validator: numJudge, trigger: 'blur' },
	          		],
	          		elbPortValue: [
	            		{ required: true, message: '请输入端口值', trigger: 'blur' },
	            		{ validator: numJudge, trigger: 'blur' },
	          		],
	          		ecmPortValue: [
	            		{ required: true, message: '请输入端口值', trigger: 'blur' },
	            		{ validator: numJudge, trigger: 'blur' },
	          		],
	          		timeout: [
	            		{ required: true, message: '请输入超时时间', trigger: 'blur' },
	            		{ validator: numJudge, trigger: 'blur' },
	          		],
	          		threshold: [
	            		{ required: true, message: '请输入健康阙值', trigger: 'blur' },
	            		{ validator: numJudge, trigger: 'blur' },
	          		],
	          		unThreshold: [
	            		{ required: true, message: '请输入不健康阙值', trigger: 'blur' },
	            		{ validator: numJudge, trigger: 'blur' },
	          		],
	          		path: [
	            		{ required: true, message: '请输入路径', trigger: 'blur' },
	            		{ min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur' }
	          		],
				},
			}
		},
		methods:{
			changeForm(){
				this.form.name = this.dataForm.name;
				this.form.privateport = this.dataForm.name;
			},
			validateForm(){
				changeForm();
		        return this.$refs['monitorForm'].validate();
	    	},
		}
	}
</script>

<style lang="scss">
	.addMontior{
		width: 700px;
		.el-form-item__label{
			width: 175px!important;
		}
		.el-form-item__content{
			margin-left: 175px!important;
		}
		.monName{
			.el-input{
				width: 300px;
			}
		}
		.el-input__inner{
			border-color: #d5deed;
		}
		.elbProtocol,.ecmProtocol{
			.el-form-item__content{
				.el-select{
					width: 80px;
					.el-input{
						width: 80px;
					}
				}
				.el-input{
					width: 111px;
				}
			}
		}
		.elbWay,.sessionWay{
			display: inline-block;
			.el-form-item__content{
				.el-select{
					width: 120px;
				}
			}
		}
		.elbWayValue,.healthCheck{
			/*display: inline-block;*/
		}
		.textArea{
			.el-textarea__inner{
				height: 60px;
				width: 420px;
				resize: none;
			}
		}
		.intervalTime{
			display: inline-block;
			.el-form-item__content{
				.el-input{
					width: 60px;
				}
			}
		}
		.threshold{
			width: 360px;
		}
		.timeout{
			display: inline-block;
		}
		.path{
			.el-input{
				width: 200px;
			}
		}
		.scope{
			display: inline-block;
			color: #999999;
			font-size: 12px;
		}
	}
</style>