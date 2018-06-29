<template>
	<div>
		<el-button v-for='(Operation,index) in OperationEvents' v-if='index == 0 || index == 1 || (OperationEvents.length <= 3 && index ==2)' :key='index' type="text" @click='click(Operation.fun)'>{{Operation.value}}</el-button>
		<el-dropdown trigger="click" v-if='OperationEvents.length > 3'>
  			<span class="el-dropdown-link" style="color: #66b1ff; margin-left: 10px; cursor: pointer;">
    			更多
  			</span>
		  	<el-dropdown-menu slot="dropdown">
		    	<el-dropdown-item v-for='(Operations,index) in OperationEvents' :key='index' v-if='index !== 0 && index !== 1'><span style="display: block; width: 100%; height: 100%;"  @click='click(Operations.fun)'>{{Operations.value}}</span></el-dropdown-item>
		  	</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
	export default{
		props:{
			OperationEvents:[Array],
		},
		data(){
			return{
				
			}
		},
		methods:{
			click(name){
				console.log(name);
				this.$emit('buttonClick',name);
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	
</style>