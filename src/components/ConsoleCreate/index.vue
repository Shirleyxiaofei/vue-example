<template>
	<div class="create_step">
		<div class="stepBox">
			<div class="step_title">创建{{system_type}}</div>
			<el-row>
		  		<el-col :span="8">
		  			<div class="grid-content bg-purple steptitle_active">{{system_type}}</div>
		  			<i class="step_line step_active"></i>
		  		</el-col>
		  		<el-col :span="8">
		  			<div class="grid-content bg-purple" v-bind:class="{steptitle_active : active >= 1}">确认信息</div>
		  			<!--<i class="step_line" v-bind:class="{step_active : active >= 1}"></i>-->
		  			<i class="step_line" v-bind:class=" isCancel && (active >= 1 ? 'step_active':'step-cancel')"></i>
		  		</el-col>
		 		<el-col :span="8">
		 			<div class="grid-content bg-purple" v-bind:class="{steptitle_active : active >= 2}">提交申请</div>
		 			<i class="step_line" v-bind:class="{step_active : active >= 2}"></i>
		 		</el-col>
			</el-row>
		</div>
    <slot name="create_title"></slot>
    <slot name="confirm_title"></slot>
    <slot name="submit_title"></slot>
    <div v-bind:class="{buttons : active >= 2}">
      <el-button class='pre_step' style="margin-top: 12px;" @click="cancel" v-show='active==0'>取消</el-button>
      <el-button class='pre_step' style="margin-top: 12px;" @click="prev" v-show='active==1'>上一步</el-button>
      <el-button class='next_step' style="margin-top: 12px;color: #fff;" @click="monitor" v-show='active==0'>下一步</el-button>
      <el-button class='orderBtn' type="primary" style="margin-top: 12px;color: #fff;" @click="create" v-show='active==1' :disabled = 'checked'>确认下单</el-button>
      <!--<el-button class="reback" style="margin-top: 12px;" @click="reback" v-show='active==2'>返回</el-button>-->
    </div>

	</div>
</template>
<script>
	export default {
		props:{
		    submitForm:[Function],
		    system_type:[String],
		    checked:[Boolean],
		    switchPage:[Function],
		    returnUrl:[String]
		},
		components:{

		},
	    data() {
	      	return {
		        active: 0,
	          	current:0,
	          	step:'ConsoleConfigure',
	          	isCancel:false,
	      	};
	    },

	    methods: {
	    	monitor(){
	    		this.$emit('orderEvent');
	    	},
	      	next() {
	      		this.isCancel = true
	          	this.active++;
	          	this.current++;
	          	this.switchPage(this.active);
	      	},
	      	prev() {
	      		this.isCancel = true
		        this.active--;
	          	this.current--;
	          	this.switchPage(this.active);
	      	},
	      	cancel(){
          		this.$router.push({path: this.returnUrl });
        	},
	      	create(){
      			let results = this.submitForm(()=>{
	      			this.active++;
	          		this.current++;
	          		this.switchPage(this.active);
	      		});
//        var reback=this.reback;
//	          this.timer=setTimeout(function(){
//	              console.log('timeaaaa')
//	            reback()
//	          },5000)
	      	},
//      reback(){
//	          console.log('return');
//        this.$router.push({path:this.url})
//      },
//        nextPage(index){
//          console.log(index);
//          this.current=index;
//          this.vpc_name='创建虚拟私有云'+this.tableData.system_name+'成功';
//        }
	    },
      	beforeDestroy(){
		    clearTimeout(this.timer);
      	}
	}
</script>

<style lang="scss" scoped="scoped">
	.stepBox{
    margin-bottom: 20px;
		.step_title{
			margin-left: 20px;
			font-size: 14px;
			color: #333333;
			padding-top: 10px;
			padding-bottom: 40px;
		}
	}
  /*.reback{
    margin-left: 45%;
    background-color:#3d7cfa;
    color: #fff;
  }*/
</style>

<style lang="scss">
	.create_step{	
	  .stepBox{
	  	background-color: #ffffff;
			.steptitle_active{
				color: #3ac0f1;
			}
			.grid-content{
				text-align: center;
				font-size: 12px;
			}
			.step_line{
				margin-top: 20px;
				display: block;
			    height: 3px;
			   	/*background: transparent;
				animation: slideBg2 2s;*/
			}
			.step_active{
				background: #3ac0f1;
				animation: slideBg 1s;
			}
			.step-cancel{
				/*display: block;
			    height: 3px;
			    margin-top:10px;*/
			    background: transparent;
				animation: slideBg2 1s;
			}
			.el-col{
				padding: 0;
			}
		}
		.el-button{
			padding: 10px 15px;
		}
		.el-button.pre_step{
			background-color: #909399;
			border-color: #909399;
			color: #fff;
		}
		.el-button.next_step{
			background-color: #3dc7fa;
			border-color: #3dc7fa;
		}
		.el-button.next_step:hover{
			background-color: #6fd7fd;
			border-color: #6fd7fd;
		}
		.el-button.pre_step:hover{
			background-color: #82848a;
			border-color: #82848a;
		}
		.orderBtn.el-button--primary{
			background-color: #3dc7fa;
			border-color: #3dc7fa;
		}
		.orderBtn.el-button--primary.is-disabled{
			background-color: #a0cfff;
			border-color: #a0cfff;
		}
		.orderBtn:hover{
			background-color: #6fd7fd;
			border-color: #6fd7fd;
		}
	}
	@keyframes slideBg{
		from{
			width:0
		}
		to{
			width:100%
		}
	}
	@keyframes slideBg2{
		from{
			width:100%;
			background: #3ac0f1;
		}
		to{
			width:0;
			background: transparent;
		}
	}
</style>
