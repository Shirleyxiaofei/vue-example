<template>
	<el-row class="eventButton">
		<el-col v-for="(msg,index) in btnMsg" :span="24/btnMsg.length" :key="index">
			<button :class="{'active':index == Numvalue,'not-allow': msg.disabled}" :disabled="msg.disabled" @click='btnClick(msg.fun,index)' plain>{{msg.value}}</button>
		</el-col>
	</el-row>
</template>

<script>
	export default{
		props:{
			btnMsg:[Array],
		},
		data(){
			return{
				Numvalue:0
			}
		},
		methods:{
			btnClick(value,index){
				this.Numvalue = index;
				this.$emit('deatilBtnClick',value);
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.eventButton{
		.not-allow{
	    	cursor: not-allowed!important;
	    }
		div{
			display:inline-block;
			padding:0 10px;
			button{
				min-width: 80px;
				height:30px;
				line-height: 30px;;
				font-size: 12px;
				padding: 0 12px;
				
				border: 1px solid #F9CD76;
				cursor: pointer;
				text-align: center;
				box-sizing: border-box;
			    outline: 0;
			    margin: 0;
			    font-weight: 500;
			    border-radius: 5px;
			    background: #F9CD76;
			    color:#FFFFFF
			}
		}
	}
</style>