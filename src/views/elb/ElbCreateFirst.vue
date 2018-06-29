<template>
	<div class="create_elb">
		<el-container>
		  	<el-main class="padding-left">
		  		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="名称：" prop="name">
    					<el-input style="width: 180px;" v-model="ruleForm.name"></el-input>
  					</el-form-item>
  					<el-form-item label="地域：" prop="resourceType" required>
  						<el-radio-group v-model="ruleForm.resourceType" size="medium" fill='#f9cc76'>
					      	<el-radio-button class="radio-group-btn" :label="item.uuid" v-for='(item,index) in regionList' :key='index' @change.native='regionChange(item)'>{{item.name}}</el-radio-button>
    					</el-radio-group>
  					</el-form-item>
  					<el-form-item
				        class="vpc"
				        label="所属VPC :"
				        prop="vpcid" required
				    >
				        <el-select v-model='ruleForm.vpcid' :disabled = "seleceCheck" @change="getSubid">
				          <el-option v-for = '(item,index) in vpclist'
				                     :label='item.name'
				                     :value='item.id' :key="index"></el-option>
				        </el-select>
				        <div class="skip"><span @click="checkVpc">查看虚拟私有云</span></div>
      				</el-form-item>
  					<el-form-item label="弹性公网IP：" prop="chargeType" required class='eipStyle'>
  						<el-radio-group v-model="ruleForm.chargeType" @change="chargeChange" size="medium" fill='#f9cc76'>
  							<el-radio-button class="radio-group-btn" label="使用已有"></el-radio-button>
					      	<!--<el-radio-button class="radio-group-btn" label="新创建" ></el-radio-button>-->
    					</el-radio-group>
    					<div>
	    					<el-select v-model='ruleForm.eipid' :disabled = "eipCheck" v-if="eipShow">
					          <el-option v-for = '(item,index) in eiplist'
					                     :label='item.ipaddress'
					                     :value='item.id' :key="index">
					          </el-option>
					        </el-select>
					        <div class="skip" v-if="eipShow"><span @click="checkEip">查看弹性公网IP</span></div>
				        </div>
  					</el-form-item>
  					<el-form-item v-if="!eipShow" label="公网宽带：" required>
						<el-slider v-model="ruleForm.bandwidth" @change="bandwidthChange" :max="ruleForm.broadbandMax" :show-input="ruleForm.showInput" :step="broadbandStep"></el-slider>
						<div class="slider-mark">
							<div class="scale">
								<span v-for="number in temp2" :style="'width:' + 100/temp2 + '%'" :key="number">|</span>
								<span>|</span>
							</div>
							<div class="scaleInfo">
								<span style="margin-left: -6px;">0M</span>
								<span style="margin-left: 28%;">100M</span>
								<span style="margin-left: 27%;">200M</span>
								<span style="margin-top: 0;margin-right: -16px;">300M</span>
							</div>
						</div>
					</el-form-item>
					<el-form-item label="描述：" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
					</el-form-item>
				</el-form>
		  	</el-main>
		  	<el-aside width="200px">
		  		<div class="currentInfo">
			  		<h4>当前配置</h4>
			  		<div class="message">
			  			<dl>
				  			<dt>名称：</dt>
				  			<dd>{{ruleForm.name ? ruleForm.name : '--'}}</dd>
				  		</dl>
			  			<dl>
				  			<dt>地域：</dt>
				  			<dd>{{ruleForm.regionName ? ruleForm.regionName : '--'}}</dd>
				  		</dl>
			  			<dl>
				  			<dt>所属VPC：</dt>
				  			<dd>{{vpcChange}}</dd>
				  		</dl>
			  			<dl v-if="eipShow">
				  			<dt>弹性公网IP：</dt>
				  			<dd>{{eipChange}}</dd>
				  		</dl>
			  			<dl v-if="!eipShow">
				  			<dt>公网带宽：</dt>
				  			<dd>{{ruleForm.bandwidths ? ruleForm.bandwidths : '--'}}</dd>
				  		</dl>
			  			<dl>
				  			<dt>描述：</dt>
				  			<dd>{{ruleForm.desc ? ruleForm.desc : '--'}}</dd>
				  		</dl>
			  		</div>
			  		<el-button type="warning" icon='el-icon-check'>预付费</el-button>
			  		<div class="show_money">
			  			<span class=" money_icon">￥</span><span class="money_icon price">0.00</span>元
			  		</div>
			  		<p class="link" @click="openHelp">了解计费详情</p>
		  		</div>
		  	</el-aside>
		</el-container>
	</div>
</template>

<script>
	import i18n from '@/lang'
	import { getName } from '@/utils/shareFunction'
	import { getVpcList } from '@/api/elb'
	import {getRegionList } from '@/api/login'
	import { getEipList } from '@/api/vpc'
	export default{
		components:{
			
		},
		data(){
			var nameCheck = (rule, value, callback) => {
				let params = {
					status:'',
					page:1,
					name:value,
					attached:'',
				}
//		        getElbList(params).then((res)=>{
//    				let servers = res.data.results;
//    				if(servers.length > 0){
//    					callback(new Error('负载均衡名称重复，请重新输入！'));
//    				}else{
//    					callback();
//    				}
//    			}).catch((error)=>{
//    				console.log(error);
//    			})
		    };
			return {
				temp: 14,
				temp2:30,
				scaleWidth:60,
				seleceCheck:true,
				eipCheck:true,
				eipShow:true,
				regionList:[],
				broadbandStep:10,
				vpclist:[],
				eiplist:[],
				ruleForm:{
		      		name: '',
		      		resourceType:'',
		      		regionName:'',
		      		uuid:'',
		      		vpcid:'',
		      		netid:'',
		      		vpcname:'',
		      		eipid:'',
		      		eipip:'',
		      		chargeType:'使用已有',
		      		broadbandMax: 300,
		      		showInput: true,
					bandwidth: 100,
					bandwidths: '100Mbit/s',
					broadband:6,
					price:'0.00',
					desc:'',
		      	},
				rules:{
		      		name: [
	            		{ required: true, message: '请输入名称', trigger: 'blur' },
	            		{ min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
//	            		{ validator: nameCheck, trigger: 'blur' }
	            		
	          		],
				},
			}
		},
		methods:{
			regionChange(val){
				console.log(val);
				this.ruleForm.regionName = val.name;
				this.ruleForm.uuid = val.uuid;
				this.getVpcList(val.uuid);
				this.getEipList(val.uuid);
			},
			chargeChange(val){
				if(val == '新创建'){
					this.eipShow = false;
					this.ruleForm.eipip = '';
				}else{
					this.eipShow = true;
					this.getEipList(this.ruleForm.uuid);
				}
			},
			bandwidthChange(val){
				console.log(val);
				this.ruleForm.bandwidths = val + 'Mbit/s';
			},
			checkVpc(){
				if(this.ruleForm.vpcid){
					window.open('#/vpc/vpcDetail/' + this.ruleForm.vpcid)
				}else{
					return
				}
			},
			checkEip(){
				if(this.ruleForm.eipid){
					window.open('#/vpc/eip/eipDetail/' + this.ruleForm.eipid)
				}else{
					return
				}
			},
			getRegionList(){
				getRegionList().then((res)=>{
					let data = res.data.platforms;
					this.regionList = data;
					this.ruleForm.uuid = data[0].uuid;
					this.ruleForm.resourceType = data[0].uuid;
					this.ruleForm.regionName = data[0].name;
					console.log(this.regionList);
					this.getVpcList(this.ruleForm.uuid);
					this.getEipList(this.ruleForm.uuid);
				})
				.catch((req) => {
					console.log(req);
					this.vpclist = [];
				})
			},
			getSubid(){
				let vpcData = this._.find(this.vpclist,{id:this.ruleForm.vpcid});
		        vpcData['network'].filter(item=>{
					if(item.networkofferingname == 'DefaultIsolatedNetworkOfferingForVpcNetworks'){
						this.ruleForm.netid = item.id;
			        }
				});
			},
			getVpcList(id){
		      	let params={
					regionid: id,
		      	}
		      	this.seleceCheck = true;
				getVpcList(params).then((res)=>{
			        console.log(res);
			        let vpclist = res.data.results;
			        if(vpclist.length > 0){
				        this.vpclist=vpclist;
				        this.seleceCheck = false;
				        console.log(vpclist);
				        this.ruleForm.vpcid = vpclist[0].id;
				        this.getSubid();
			        }else{
			        	this.vpclist=[];
			        	this.seleceCheck = false;
			        	this.ruleForm.vpcid = '';
				        this.$message({
				          	message: '该节点下没有负载均衡类型的子网',
				          	type: 'warning'
				        });
			        }
			    }).catch((error)=>{
			        this.seleceCheck = false;
			        this.vpclist = [];
			        this.ruleForm.vpcid = '';
			        console.log(error)
			    })
			},
			getEipList(id){
      			let params={
					regionid: id,
					create:'create',
		      	}
		      	this.eipCheck = true;
      			getEipList(params).then((res)=>{
      				console.log(res)
      				let eiplist = res.data.results;
			        if(eiplist.length > 0){
				        this.eiplist=eiplist;
				        this.eipCheck = false;
				        console.log(eiplist);
				        this.ruleForm.eipid = eiplist[0].id;
			        }else{
			        	this.eiplist=[];
			        	this.eipCheck = false;
			        	this.ruleForm.eipid = '';
				        this.$message({
				          	message: '该节点下没有弹性公网IP',
				          	type: 'warning'
				        });
			        }
      			}).catch((error)=>{
			        this.eipCheck = false;
			        this.eiplist = [];
			        this.ruleForm.eipid = '';
			        console.log(error)
      			})
      		},
	      	order(){
	      		var basicInfo_valid = false;
	      		this.$refs['ruleForm'].validate((valid) => {
		          if (valid) {
		          	basicInfo_valid = true;
		          	this.$emit('orderResult',true,this.ruleForm);
		          }else{
		          	this.$emit('orderResult',false,'');
		          }
		        });
	      	},
	      	openHelp(){
	      		open("http://www.ctyun.cn/help");
	      	}
		},
		computed:{
			vpcChange: function(){
				if(this.vpclist.length>0){
					if(this.ruleForm.vpcid){
						this.ruleForm.vpcname = this._.find(this.vpclist,{id:this.ruleForm.vpcid}).name;
						return this.ruleForm.vpcname
					}
				}else{
					return '--'
				}
			},
			eipChange: function(){
				if(this.eipShow){
					if(this.eiplist.length>0){
						this.ruleForm.eipip = this._.find(this.eiplist,{id:this.ruleForm.eipid}).ipaddress;
						return this.ruleForm.eipip
					}else{
						return '--'
					}
				}else{
					return '--'
				}
			}
		},
		mounted(){
			this.getRegionList();
			this.ruleForm.name = 'elb-' + getName();
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.create_elb{
		padding: 0 0px 20px 0px;
		min-height: 260px;
		.padding-left{
			padding-left: 0px;
		}
		.el-main{
			padding-left: 20px;
			background-color: #fff;
			padding-right: 0px;
			margin-right: 20px;
		}
		.el-aside{
			background-color: #fff;
		}
		.currentInfo{
			background-color: #fff;
		    height: 360px;
		    padding: 10px;
		    padding-top: 18px;
		    border-radius: 3px;
		}
		.el-radio-group{
			.el-radio-button{
				margin-right: 10px;
				
			}
		}
		/*width: 300px;*/
		.message{
			margin-top: 20px;
			dl{
				font-size: 12px;
				color: #333333;
				padding-bottom: 15px; 
				&:after{
					display: table;
					content: '';
				}
				dt{
					float: left;
					font-size: 12px;
					color: #333333;
				}
				dd{
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 13px;
				}
			}
		}	
		.show_money{
			margin-top: 30px;
			.money_icon{
				color: #f9cd76;
				font-size: 17px;
				font-weight: 600;
			}
		}
		.link{
			color: #3dc7fa;
			font-size: 12px;
			margin-top: 15px;
		}
	}
</style>
<style lang="scss">
	.create_elb{
		.el-form-item--small{
			label{
				text-align: left;
			}
		}
		.radio-group-btn > span {
		    border: 1px solid #dcdfe6;
		    border-radius: 4px !important;
		    background: #d5deed;
		}
		.el-form-item__content{
			.el-radio-group{
				.el-radio-button__inner{
					padding: 7px 15px;
				}
			}
		}
		.el-main{
			.skip{
				display: inline-block;
				color: #3dc7fa;
				font-size: 14px;
				margin-left: 5px;
				span{
					cursor: pointer;
				}
			}
		}
		.eipStyle{
			.el-form-item__content{
				.el-select{
					margin-top: 10px;
					/*display: block;*/
					width: 215px;
				}
			}
		}
		.el-textarea{
			width: 350px;
			.el-textarea__inner{
				min-height: 140px!important;
			}
		}
		.slider-mark {
			margin-right: 160px;
		    margin-top: -15px;
		    color: #afbfda;
		}
		.slider-mark > .scale {
			height: 20px;
		}
		.slider-mark > .scale > span {
			display: inline-block;
			height:100%;
		}
		.slider-mark > .scale > span:last-child {
			width: auto !important;
			display: inline;
		    float: right;
		    margin-top: -32px;
		}
		.slider-mark > .scaleInfo {
			font-size: 12px;
		}
		.slider-mark > .scaleInfo > span{
			display: inline-block;
			text-align: center;
		}
		.slider-mark > .scaleInfo > span:last-child {
		    float: right;
		    margin-top: 0px;
		    margin-right: -25px;
		}
	}
</style>