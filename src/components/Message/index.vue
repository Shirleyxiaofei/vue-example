<template>

	<div>
		<button @click="openMsg">dddd</button>
	
	</div>

</template>

<script>
	
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			openMsg(){
				this.$message.error('错误')
			}
		}
		
		
		
	}
</script>

<style>
</style>