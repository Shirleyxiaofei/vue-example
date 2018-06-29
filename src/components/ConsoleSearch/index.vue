<template>
	<div class="searchBox">
		<el-row>
			<el-col :span="13" v-if='!btnClose'>
			  	<div class="btnBox" v-if="!btnText">
					<button  v-for="(msg,index) in PublicOperation" :class="{'active':msg.disable,'disable':!msg.disable}" :disabled="!msg.disable" :title = 'msg.title' @click='btnClick(msg.fun,index,msg.value)' plain>{{msg.value}}</button>
				</div>
				<div class="btnBox btntext" v-if="btnText" v-html="btnText">
				</div>
		  	</el-col>
		  	<el-col :span="!btnClose ? 11 : 24 ">
		  		<div class="searchBoxs">
					<!--<el-select v-if='statusOnOff' v-model="statusValue" placeholder="请选择" @change="statusChange(statusValue)">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>-->
				  	<el-input placeholder="请输入内容" v-model.trim="searchValue" class="input-with-select" clearable @change="clears">
					    <el-select v-model="nameValue" slot="prepend" placeholder="请选择">
					      	<el-option v-for='item in nameOption' :key="item.value" :label="item.label" :value="item.value"></el-option>
					    </el-select>
					    <el-button slot="append" icon="el-icon-search" @click = "search"></el-button>
				  	</el-input>
				  	<!--<el-select v-model="nameValue" placeholder="请选择" @change="nameChange(nameValue)">
					    <el-option
					      v-for="item in nameOption"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
				  	</el-select>-->
				  	<!--<el-input placeholder="请输入内容" v-model.trim="searchValue" clearable @change="clears">
				  		<el-button slot="append" icon="el-icon-search" @click = "search"></el-button>
				  	</el-input>-->
				  	<el-button icon="el-icon-refresh"  @click="refresh" class="refreshBtn"></el-button>
				  	<!--<div style="display: inline-block;">
				  		<el-button style='padding: 8px 10px;font-size: 16px;' icon="el-icon-refresh" @click="refresh"></el-button>
				  	</div>-->
				</div>
		  	</el-col>
		</el-row>
	</div>
</template>

<script>
import i18n from '@/lang'
	export default{
		props:{
			optionsValue:[String],
//			options:[Array],
			PublicOperation:[Array],
			statusOnOff:[Boolean],
			btnClose:[Boolean],
			disableData:[Array,Object],
			NameOptions:[Array,Object],
			SearchNameValue:[String],
			SearchNameOptions:[Array],
			btnText:[String]
		},
		data(){
			return{
//				options: options,
        		statusValue: this.optionsValue,
        		nameOptions: [{
		          	value: 'name',
		          	label: i18n.common.name,
		        }, {
		          	value: 'id',
		          	label: i18n.common.ID,
		        }],
        		nameValue: 'name',
        		searchValue:'',
        		Numvalue:0,
			}
		},
		methods:{
//			statusChange(value){
//				console.log(value);
//				this.nameValue='name';
//				this.searchValue = '';

//				this.$emit('selectChange',value)
//			},
			clears(val){
				if(!val){
					console.log('清空');
					this.searchValue = '';
					this.$emit('clear');
				}
			},
			nameChange(value){
				console.log(value);
			},
			search(){
				let filters={};
				/*if(this.statusOnOff){
					filters.status = this.statusValue
					if(this.nameValue == 'name'){
						filters.name = this.searchValue;
					}else{
						filters.id = this.searchValue;
					}
				}else{
					if(this.nameValue == 'name'){
						filters.name = this.searchValue;
					}else{
						filters.id = this.searchValue;
					}
				}*/
				this.statusValue = ''
				filters.name= this.nameValue;
				filters.value = this.searchValue;
				this.$emit('searchEvent',filters);
			},
			refresh(){
				this.statusValue = '';
				this.nameValue='name';
				this.searchValue = '';
				this.$emit('refreshEvent');
			},
			btnClick(value,index,label){
				console.log(21212)
				this.Numvalue = index;
				this.$emit('PublicOperEvent',value,label);
			}
		},
		computed:{
//			PublicOperations(){
//				console.log(this.PublicOperation);
//				return this.PublicOperation
//			},
			nameOption(){
				if(this.NameOptions){
					return this.NameOptions;
				}else{
					return this.nameOptions;
				}
			}
		},
		mounted(){
			if(this.SearchNameOptions){
				this.nameOptions = this.SearchNameOptions;
				this.nameValue = this.SearchNameValue;
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.searchBox{
		height: 35px;
		.refreshBtn{
			/*padding:9px 10px;*/
			vertical-align: top;
			padding:0 10px;
			height:34px;
		}
	}
	.btntext{
		font-size:12px;
		line-height:3
	}
	.btnBox{
		text-align: left;
		button{
			font-size: 12px;
			padding: 8px 20px;
			color: #666666;
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
		    margin-right: 10px;
		    /*&:hover{
		    	border: 1px solid #56d6c4;
	    		background: #56d6c4;
	    		color: #ffffff;
		    }*/
		}
		.active{
	    	border: 1px solid #56d6c4;
	    	background: #56d6c4;
	    	color: #ffffff;
	    }
	   .disable{
	   		cursor:not-allowed;
	   		/*&:hover{
		    	border: 1px solid #f0f2f7;
	    		background: #f0f2f7;
	    		color: #666666;
		    }*/
	   }
	}
</style>
<style lang="scss">
	.searchBox{
		.el-input__inner{
			height: 34px;
		}
		.el-input-group__append{
			padding: 0 9px;
			/*overflow: hidden;*/
		}
		.searchBoxs{
			padding-right: 20px;
			text-align: right;
			position: relative;
			.el-input-group>.el-input__inner{
				vertical-align:baseline;
			}
			.input-with-select{
				.el-select{
					width: 110px;
					.el-input{
						width: 116px;
					}
				}
				.el-input-group__append{
					.el-button{
						vertical-align: middle;
					}
				}
			}
			.input-with-select > .el-input__inner{
				width: 210px;
			}
			.el-select .el-input.is-focus .el-input__inner{
				border-color:transparent;
			}
		}
		.el-select{
	  		width: 150px;
	  		.el-input{
	  			width: 150px;
	  		}
	  	}
	  	.el-input{
	  		width: 180px;
	  		.el-input__inner{
	  			/*line-height: 3;*/
	  		}
	  	}
	}
</style>