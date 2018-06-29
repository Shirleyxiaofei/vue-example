<template>
	<div>
		<div class="detail_content">
			<el-row  v-if='!show'>
				<el-col   class="label"  v-if='!detailShow'>
					{{detail_label + ' 详情'}}
				</el-col>
				<el-col   class="label"  v-if='detailShow'>
					{{detail_label}}
				</el-col>
			</el-row>
			<el-row :gutter="20">
	  			<el-col :span="6" v-if='!show'>
	  				<div class="msg_bg">
						<img v-bind:src=detail_image />
					</div>
	  			</el-col>
				<el-col :span="!show ? 16 : 24 ">
					<el-row>
						<el-col :span="index%2 ? 13 : 11" v-for="(detail,index) in detailList" :key="detail.name">
							<div class="detail-col" v-if='!detail.hide && !detail.change && !detail.changeDesc'>
								<span>{{detail.label}}：</span>
								<!--<span v-if="!detail.title">{{detail.intro || '--'}}</span>-->
								<span :title="detail.intro">{{detail.intro || '--'}}</span>
							</div>
							<div class="detail-col detailName" v-if='detail.change'>
								<span>{{detail.label}}：</span>
								<span v-if="!shouInput">
									<span class="detail_name" :title="detail.intro">{{detail.intro || '--'}}</span>
									<span class="btn" v-if='!detail.noChange'>
							            <span @click='ModifyName(detail)'><i class="el-icon-edit"></i></span>
							        </span>
								</span>
								<span v-if="shouInput" class="change_name">
									<el-input placeholder="请输入内容" v-model="detail.intro"></el-input>
									<span style="color: #e66464;font-size: 17px;" @click='cancelChange(detail)'><i class="el-icon-close"></i></span>
									<span style="color: #7ad4c5;font-size: 21px;" @click='submitName(detail)'><i class="el-icon-check"></i></span>
								</span>
							</div>
							<div class="detail-col detailName" v-if='detail.changeDesc'>
								<span>{{detail.label}}：</span>
								<span v-if="!shouText">
									<span class="detail_name" :title="detail.intro">{{detail.intro || '--'}}</span>
									<span class="btn" v-if='!detail.noChange'>
							            <span @click='ModifyDesc(detail)'><i class="el-icon-edit"></i></span>
							        </span>
								</span>
								<span v-if="shouText" class="change_name">
									<el-input placeholder="请输入内容" v-model="detail.intro"></el-input>
									<span style="color: #e66464;font-size: 17px;" @click='cancelDesc(detail)'><i class="el-icon-close"></i></span>
									<span style="color: #7ad4c5;font-size: 21px;" @click='submitDesc(detail)'><i class="el-icon-check"></i></span>
								</span>
							</div>
						</el-col>
					</el-row>
					
				</el-col>
				
				<el-col :span="2"  v-if='!show'>
					<div style="clear: both;">
						<div class="eventButton">
							<div v-for="(msg,index) in btnMsg">
								<button :class="{'active':msg.disabled, 'not-allow': !msg.disabled}"
									@click='btnClick(msg.btnCli,index,msg.value)'
									 :disabled="!msg.disabled"
									 :title = 'msg.title'
									plain>
									{{msg.value}}
								</button>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import i18n from '@/lang'
	export default{
		props:{
			detail_label : [String],
			detail_image:[String],
			show:[Boolean],
			detailShow:[Boolean],
			changeName:[Function],
			detailList:[Array,Object],
			detailList2:[Array],
			btnMsg:[Array],
		},
		data(){
			return {
				Numvalue:0,
				oldName:'',
				oldDesc:'',
				shouInput:false,
				shouText:false
			}
		},
		methods:{
			btnClick(value,index,label){
				this.Numvalue = index;
				this.$emit('deatilBtnClick',value,label);
			},
			ModifyName(detail){
				this.oldName = detail.intro || '--';
				this.shouInput = !this.shouInput;
			},
			cancelChange(detail){
				detail.intro = this.oldName;
				this.shouInput = !this.shouInput;
			},
			submitName(detail){
				console.log(detail);
				if(detail.intro == this.oldName){
					this.shouInput = false;
				}else{
					let result = this.changeName(detail,'name',()=>{
						this.shouInput = false;
	      			});
				}
			},
			ModifyDesc(detail){
				this.oldDesc = detail.intro || '--';
				this.shouText = !this.shouText;
			},
			cancelDesc(detail){
				detail.intro = this.oldDesc;
				this.shouText = !this.shouText;
			},
			submitDesc(detail){
				console.log(detail);
				if(detail.intro == this.oldDesc){
					this.shouText = false;
				}else{
					let result = this.changeName(detail,'desc',()=>{
						this.shouText = false;
	      			});
				}
			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.detail_content{
		background: #ffffff;
		padding:20px;
		.label{
			height: 50px;
			line-height: 30px;
			font-size: 14px;
			color: #333333;
		}
		.msg_bg{
			/*width: 340px;
			height: 194px;*/
			min-height: 100px;
			margin-left: 40px;
			margin-right: 40px;
			margin-top: 5px;
			img{
				width: 100%;
				height: 100%;
				min-height: 100px;
			}
		}
		.detail-col{
			color: #333333;
			line-height: 32px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size:12px;
		}
		.detailName{
			position: relative;
			height: 32px;
	    	padding-right: 40px;
		}
		.change_name{
			display: inline-block;
			vertical-align:top;
			height: 30px;
			span{
				display: inline-block;
				vertical-align:top;
				cursor: pointer;
			}
		}
	    .detail_name{
	    	display: inline-block;
	    }
	    .btn{
	        display: inline-block;
	        margin-left: 5px;
	        height: 16px;
	        width: 17px;
	        cursor: pointer;
	        position: absolute;
	        top: 0;
	        right: 21px;
	        span{
	        	font-size: 14px;
	        	padding: 0;
	        }
	    }

	}
	.eventButton{
		float: left;
		/*width: 80px;*/
		div{
			margin-top: 10px;
			height: 35px;
			button{
				font-size: 12px;
				padding: 6px 0;
				color: #666666;
				width:80px;
				box-sizing: border-box;
				background: #f0f2f7;
				border: 1px solid #f0f2f7;
				white-space: nowrap;
				cursor: pointer;
				text-align: center;
				box-sizing: border-box;
			    outline: 0;
			    margin: 0;
			    font-weight: 500;
			    border-radius: 4px;
			}
			.active{
		    	border: 1px solid #56d6c4;
		    	background: #56d6c4;
		    	color: #ffffff;
		    }
		    .not-allow{
		    	cursor: not-allowed!important;
		    }
		}
	}
</style>
<style lang="scss">
	.detail_content{
		.detailName{
			position: relative;
	    	padding-right: 40px;
	    	.el-input{
	    		width: 180px;
	    		.el-input__inner{
		    		width: 180px;
		    		height: 28px;
		    	}
	    	}
		}
	}
</style>
