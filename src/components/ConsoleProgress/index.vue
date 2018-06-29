<template>
	<div class="console-progress">
		<el-row class="progress-content">
				<el-col :span="24/stepValue.length" class="console-step" :class="{'console-active':index <= active}" v-for="(item,index) in stepValue" :key='index'>
				
					<div class="step-title">
						{{item.title}}
					</div>
					
					<span class="step-progress">
						{{index + 1}}
					</span>
					<span class="step-line"></span>
					<span class="step-line2"></span>
				</el-col>
			
		</el-row>
		<el-row class="progress-form">
			<slot name="formContent"></slot>
		</el-row>
		<el-row>
			<div  class="console-btn">
				<DetailBtn :btnMsg = 'btnMsg' @deatilBtnClick = 'validate'></DetailBtn>
			</div>
			
		</el-row>
	</div>
	
</template>

<script>
	import DetailBtn from '@/components/DetailBtn'
	export default {
		components:{
			DetailBtn
		},
		props:{
			nextBtn:[Array,Object],
			stepValues:[Array]
		},
		data(){
			return {
				active:0,
				defaultValue:[
					{
						title:'步骤1',
					},
					{
						title:'步骤2',
					},
					{
						title:'步骤3',
					},
				],
				btnsMsg:[
					{
						value:'下一步',
						fun:'dianjixiayibu'
					}
				]
				
					
			}	
			
		},
		methods:{
			next(next){
				if(next) {
					this.active = next
					return this.active
				}
				if(this.active >= 2){
					this.active = 0
				}else{
					this.active ++
				}
				console.log(this.active)
				return this.active;
			},
			validate(){
				this.$emit('validate')
			}
		},
		computed:{
			btnMsg(){
				return this.nextBtn || this.btnsMsg
			},
			stepValue(){
				return this.stepValues || this.defaultValue;
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.progress-content{
		width:100%;
		padding:20px 0;
		.console-step {
			position: relative;
			text-align: center;
			font-size:14px;
			.step-progress{
				position:relative;
				width:35px;
				height:35px;
				line-height:35px;
				background: #e1e2e5;
				color:#FFFFFF;
				border-radius: 50%;
				z-index:9;
				display: inline-block;
			}
			.step-line,.step-line2{
				position:absolute;
				display:inline-block;
				width:100%;
				height:6px;
				right:50%;
				bottom:15px;
				background: #56D6C4;
			}
			.step-line2{
				background: #e1e2e5;
			}
			.step-title{
				line-height: 28px;
				font-weight: 600;
			}
			
		}
		.console-step:first-child{
			.step-line,.step-line2{
				display:none; 
			}
		}
		.console-active{
			
			.step-progress{
				background: #56D6C4;
				transition: all 0.1s 0.4s;
			}
			.step-line2{
				animation: proBgSlide .5s;
				width:0;
			}
			.step-title{
				color:#56D6C4;
				transition: all 0.1s 0.4s;
			}
		}
		
	}
	.progress-form{
		padding-top:50px;
	}
	.console-btn{
		text-align: center;
		width:200px;
		margin:0 auto;
	}

	@keyframes proBgSlide{
		from{
			width:100%;
		}
		to{
			width:0;
		}
	}
	
</style>