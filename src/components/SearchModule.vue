<template>
	<div>
		<div class="searchBox">
			<el-select v-model="value" placeholder="请选择" @change="statusChange(value)">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		  	</el-select>
		  	<el-select v-model="nameValue" placeholder="请选择" @change="nameChange(nameValue)">
			    <el-option
			      v-for="item in nameOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		  	</el-select>
		  	<el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchValue"></el-input>
		</div>
	</div>
</template>

<script>
	import i18n from '@/lang'
	export default{
		props:{
			optionsValue:[String],
			options:[Array]
		},
		data(){
			return{
//				options: options,
        		value: this.optionsValue,
        		nameOptions: [{
		          	value: i18n.common.name,
		          	label: i18n.common.name
		        }, {
		          	value: i18n.common.ID,
		          	label: i18n.common.ID
		        }],
        		nameValue: i18n.common.name,
        		searchValue:''
			}
		},
		methods:{
			statusChange(value){
				console.log(value);
			},
			nameChange(value){
				console.log(value);
			},
			inputBlur(){
				console.log(11);
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.searchBox{
	  }
	  .el-select{
	  	width: 150px;
	  }
	  	.el-input{
	  		width: 180px;
	  	}
</style>