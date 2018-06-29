<template>
	<el-row class="detail-more">
		<el-col v-for ="(item,index) in  detailLabel" :key="index" v-if="!item.hide">
			{{item.label + '：' + (Data[item.value] || '--') }}
		</el-col>
	</el-row>
</template>

<script>
	export default {
		props:{
			detailLabel:[Array],
			Data:[Object]
		},
		data(){
			return {
				
			}
		}
		
		
		
		
	}
</script>

<style scoped="scoped" lang="scss">
	.detail-more{
		padding-bottom:20px;
		
		div{
			font-size:12px;
			line-height: 30px;
		}
	}
</style>