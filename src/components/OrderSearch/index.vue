<template>
	<div class="order_search">
		<el-row>
			<el-col :span="18">
				<div class="serach_box">
					<p class="node_name">{{name}}</p>
					<el-input placeholder="工单编号" v-model="orderNum">
				  		<el-button slot="append" icon="el-icon-search" @click = "searchNum"></el-button>
				  	</el-input>
				  	<el-input placeholder="关键字" v-model="orderValue">
				  		<el-button slot="append" icon="el-icon-search" @click = "searchValue"></el-button>
				  	</el-input>
  					<el-date-picker
				      	v-model="startDate"
				      	type="date"
				      	:placeholder="start">
    				</el-date-picker>
  					<span>至</span>
  					<el-date-picker
				      	v-model="finishDate"
				      	type="date"
				      	:placeholder="finish">
    				</el-date-picker>
    				<el-button style='padding: 8px 20px;font-size: 16px;background: #3ac0f1;color: #ffffff;' @click="refresh">搜索</el-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="btnBox">
					<el-button style='padding: 8px 20px;font-size: 16px;background: #3ac0f1;color: #ffffff;' @click="refresh">{{btnText}}</el-button>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default{
		props:{
			name:[String],
			btnText:[String],
		},
		data(){
			return{
				orderNum:'',
				orderValue:'',
				start:'',
				finish:'',
				startDate:'',
				finishDate:'',
			}
		},
		methods:{
			searchNum(){
				console.log(this.orderNum);
			},
			searchValue(){
				console.log(this.orderValue);
			},
			refresh(){
				
			}
		},
		created(){
			let dates = new Date();
			let nowDate = dates.toLocaleDateString();
			this.start = nowDate;
			this.finish = nowDate;
		}
	}
</script>

<style lang="scss">
	.order_search{
		.node_name{
			font-size: 14px;
			color: #333333;
			padding-bottom:20px ;
		}
		.el-input{
	  		width: 180px;
	  		.el-input__inner{
	  			line-height: 3;
	  		}
	  	}
	  	.serach_box{
	  		width: 100%;
	  		padding: 20px 0;
	  		.el-input__inner{
				height: 35px;
			}
	  		.el-input-group--append{
	  			.el-input-group__append{
	  				background: #ffffff;
	  				padding: 0 8.5px;
	  			}
	  		}
	  	}
	  	.btnBox{
	  		text-align: right;
	  		padding-top: 54px;
	  		padding-right: 10px;
	  	}
	}
</style>