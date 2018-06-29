<template>
	<div id="cidrContent" class="cidrContent-component">
		<div class="cidrContent-cidr cidrContent-inline">
			<el-input type="text" 
				v-model="ipModel.first"
				@change="changeCidr"
				@keydown.native ="onkeydowns($event,0,'cidrContent')"
				:maxlength='3'
				 ></el-input>
			<span>.</span>
			<el-input type="text" 
				@change="changeCidr"
				@keydown.native ="onkeydowns($event,1,'cidrContent')"
				v-model="ipModel.second"
				:maxlength='3'
				 ></el-input>
			<span>.</span>
			<el-input type="text" 
				@change="changeCidr"
				@keydown.native ="onkeydowns($event,2,'cidrContent')"
				v-model="ipModel.third"
				:maxlength='3'
				></el-input>
			<span>.</span>
			<el-input type="text" 
				@change="changeCidr"
				@keydown.native ="onkeydowns($event,3,'cidrContent')"
				:maxlength='3'
				v-model="ipModel.fourth"
				 ></el-input>
		</div>
		<div class="cidrContent-spilt cidrContent-inline">/</div>
		<div class="cidrContent-port cidrContent-inline">
			<el-input type="text" 
				@change="changeCidr"
				@keypress.native="replaceNum($event)" :maxlength="2"
				v-model="ipModel.last"
				 ></el-input>
		</div>
		<el-tooltip popper-class='editSnapTip' :content="tip.content" :placement="tip.tipPosition" v-if="tip.show">
			<i class="el-icon-question"></i>
		</el-tooltip>
	</div>
</template>

<script>
	import {IpInputKeyDown} from '@/utils/shareFunction'
	export default {
		props:{
			cidr:[Object],
			toolTip:[Object]
		},
		data(){
			return {
				
			}
		},
		computed:{
			ipModel(){
				let ipModel = {
					first:this.cidr && this.cidr.first || '0',
					second:this.cidr && this.cidr.second ||'0',
					third:this.cidr && this.cidr.third ||'0',
					fourth:this.cidr && this.cidr.fourth ||'0',
					last:this.cidr && this.cidr.last ||'0',
				};
				return ipModel
			},
			tip(){
				let defaultTip ={
					content:'',
					show:false,
					tipPosition:'bottom-end'
				}
				return this.toolTip || defaultTip
			}
		},
		methods:{
			onkeydowns(event,num,target){
				IpInputKeyDown(event,num,target)
			},
			replaceNum(event){
				let code = window.event ? event.keyCode : event.which;
				if(!window.event){
					let arr = [8,9,110,37,39,0];
					if(arr.includes(code)) return
				}
				if(code==46){
					let next = event.target.parentElement.nextElementSibling ? event.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild :'';
					next && next.focus()
					next && next.setSelectionRange(0,3);
				}
				code>=48 && code<=57 || event.preventDefault()
			},
			changeCidr(){
				let ipModel = this.ipModel;
				let ip = `${ipModel.first}.${ipModel.second}.${ipModel.third}.${ipModel.fourth}`;
				let mask = ipModel.last
				this.cidr.data = `${ip}/${mask}`;
				/*console.log(this.cidr.data)*/
				this.$emit('validateIp',this.cidr.data);
			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.cidrContent-component{
		width:100%;
		.cidrContent-inline{
			display: inline-block;
			height:28px;
			line-height: 28px;
			vertical-align:middle;
			input{
				height:100%;
				border:none;
				padding:0;
				text-align: center;
				width:38px;
				color:#606266;
			}
		}
		.cidrContent-cidr{
			border:1px solid #dcdfe6;
			border-radius: 4px;
			overflow: hidden;
			background: #FFFFFF;
			width:200px;
			color:#606266;
		}
		.cidrContent-spilt{
			margin:0 5px;
		}
		.cidrContent-port{
			border:1px solid #dcdfe6;
			border-radius: 4px;
			overflow: hidden;
			background: #FFFFFF;
			input{
				width:40px;
			}
		}
	}
	.el-form-item.is-error{
		.cidrContent-cidr,.cidrContent-port{
			border-color:#f56c6c
		}
	}
</style>
<style lang="scss">
	.cidrContent-component{
			.el-input{
				width:38px;
				.el-input__inner{
					border:none;
					text-align: center;
					padding:0;
				}
			}
		}
</style>