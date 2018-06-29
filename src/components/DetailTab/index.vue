<template>
	<div>
		<el-tabs type="card" @tab-click="handleClick" v-model="activeName" class="tab-detail-console">
			<el-tab-pane :label="item.label" :name="item.name" v-for="item in tabOption" :key="item.name">
				<slot :name="item.name"></slot>
			</el-tab-pane>
		</el-tabs>
		
	</div>
</template>

<script>
	
	export default {
		props:{
			tabOption:[Array,Object]
		},
		data(){
			return {
				activeName:'',
			}
		},
		methods:{
			handleClick(tab,event){
				this.$emit('click',tab)
			}
		},
		mounted(){
			this.activeName = this.tabOption[0].name;
		}
	}
</script>

<style lang="scss">
.tab-detail-console{
	padding-top:20px;
	
	>.el-tabs__header{
		margin-bottom: 0;
		
		.el-tabs__nav{
			border:none;
			.el-tabs__item{
				margin-right:10px;
				border:none;
				background: #F0F2F7;
				border:none;
				color:#666666;
				line-height: 35px;
				height: 35px;
				border-radius:5px 5px 0 0; 
				&:link,&:visited,&:hover,&:active{
					color:#FFFFFF;
					background: #3AC0F1;
				}
				transition:none;
			}
			.is-active{
				color:#FFFFFF;
				background: #3AC0F1;
			}
		}
		
	}
}

</style>