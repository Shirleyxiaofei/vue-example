<template>
	<div>
		<el-table
		    ref="multipleTable"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 100%"
		    :header-row-style = 'changeRowSty'
		    :header-cell-style = 'changethSty'
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column
		    	v-for="(item,index) in tableOptions"
		    	:prop="item.prop"
		    	:label='item.label'
		    	:width='item.width'
		    	:key='index'
		    	>
		    	
		    </el-table-column>
		    <el-table-column label="操作">
		    	<template slot-scope="scope">
		    		<el-button v-for='(Operation,index) in OperationEvents' v-if='index == 0 || index == 1 || (OperationEvents.length <= 3 && index ==2)' :key='index' type="text" @click='click(Operation.fun)'>{{Operation.value}}</el-button>
					<el-dropdown trigger="click" v-if='OperationEvents.length > 3'>
			  			<span class="el-dropdown-link" style="color: #66b1ff; margin-left: 10px; cursor: pointer;">
			    			更多
			  			</span>
					  	<el-dropdown-menu slot="dropdown">
					    	<el-dropdown-item v-for='(Operations,index) in OperationEvents' :key='index' v-if='index !== 0 && index !== 1'><span style="display: block; width: 100%; height: 100%;"  @click='click(Operations.fun)'>{{Operations.value}}</span></el-dropdown-item>
					  	</el-dropdown-menu>
					</el-dropdown>
		    	</template>
		    </el-table-column>
		  </el-table>
	</div>
</template>

<script>
	import i18n from '@/lang'
	export default{
		props:{
			tableData:[Array],
			tableOptions:[Array],
			OperationEvents:[Array],
		},
		data(){
			return{
				
			}
		},
		methods:{
			handleSelectionChange(val) {
        		this.multipleSelection = val;
      		},
      		click(name){
				console.log(name);
				this.$emit('buttonClick',name);
			}
		},
		computed:{
			changeRowSty(row,index){
      			return{'background':'#f0f2f7'}
      		},
      		changethSty(row,index){
      			return{'background':'#f0f2f7','color':'#333333','font-size':'12px','font-weight':'600',}
      		},
		}
	}
</script>

<style>
	
</style>