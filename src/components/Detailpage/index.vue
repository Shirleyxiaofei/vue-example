<template>
	<div ref="detaiPage" class="detaiPage">
		<el-row ref="detail-button" class="detail-button">
			<el-row :class="{'isFixed':fixed}" >
				<el-button v-for="(item,index) in tabOption" @click="handleClick(item,index)"  :key="item.name" :class="{'is-active':activeName == item.name}">{{item.label}}</el-button>
			</el-row>
		</el-row>
		<el-row>
			<slot name="detailMain"></slot>
		</el-row>
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
				fixed:false,
				top:''
			}
		},
		methods:{
			handleClick(tab,index){
				this.activeName = tab.name;
				this.$emit('click',tab,index)
			},
			switchActive(tab){
				this.activeName = tab.name;
			},
			scrollTab(){
//				let scrollTop = window.scrollY;
				let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				if(scrollTop > (this.top - 70)){
					this.fixed = true
				}else{
					this.fixed = false
				}
				//console.log(this.top,scrollTop)
			}
		},
		mounted(){
			this.activeName = this.tabOption[0].name;
			this.top = this.$refs['detail-button'].$el.offsetTop;
			let that = this;
			window.addEventListener('scroll', this.scrollTab);
		},
		beforeDestroy(){
			window.removeEventListener('scroll', this.scrollTab);
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import 'src/styles/variables.scss';
	.detaiPage{
		padding-top:20px;
	}
	.detail-button{
		height:38px;
		width:100%;
    	background-color: #f0f2f7;
    	.el-row.isFixed{
    		width: 100%;
    		background-color: #f0f2f7;	
    	}
		.el-button{
			background: #F0F2F7;
			border:none;
			color:#666666;
			border-radius:5px 5px 0 0;
			&:hover{
				color:#FFFFFF;
				background: #3AC0F1;
			}
			transition:none;
		}
	}
	.el-button.is-active{
		color:#FFFFFF;
		background: #3AC0F1;
		border-radius:0;
	}
	.is-active{
		color:#FFFFFF;
		background: #3AC0F1;
	}
	.isFixed{
		position: fixed;
		top:$headerHeight;
		z-index:10;
		background: #fff;

	}
</style>
