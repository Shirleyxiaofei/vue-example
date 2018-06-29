<template>
	<div class="detail-card">
		<el-row >
			<div class="detail-card-close" @click="remove(cardData.id)">
				<!--<svg-icon icon-class="close"></svg-icon>-->
			</div>
		</el-row>
		<el-row class="detail-card-body">
			<el-col :span="4" class="detai-card-img">
				<svg-icon :icon-class="className"></svg-icon>
			</el-col>
			<el-col :span="20" class="detail-card-ipDetail" v-if="className == 'nic'">
				<el-row>
					{{cardData.ipaddress ||'--'}}
				</el-row>
				<el-row>
					<el-col :span="8">
						状态：激活
					</el-col>
					<el-col :span="16" v-if="regionType =='cs'">
						ACLList : {{cardData.acllistname || '--'}}
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="20" class="detail-card-ipDetail" v-if="className == 'sec'">
				<el-row>
					{{cardData.name ||'--'}}
				</el-row>
				<el-row>
					<el-col :span="8">
						入方向规则：{{cardData.ingress && cardData.ingress.length || 0}}
					</el-col>
					<el-col :span="16">
						出方向规则：{{cardData.egress && cardData.egress.length || 0}}
					</el-col>
				</el-row>
			</el-col>
			
		</el-row>
		<el-row class="detail-card-footer">
			<el-row>
				<el-col :span='24/opearationBtn.length' v-for="(item,index) in opearationBtn" :key="index" class="detail-card-btn">
					<el-button type="text"  @click="handleOperation(item.fun,cardData)" > 
						{{item.id == 'showDetail' && cardData.showDetail ? '点击收起' :item.value}}
					</el-button>
				</el-col>
			</el-row>
			<el-row  v-if="cardData.showDetail">
				<slot name="detailMore"></slot>
			</el-row>
		</el-row>
		
	</div>
</template>

<script>
	export default {
		props:{
			cardData:[Array,Object],
			className:[String],
			opearationBtn:[Array]
		},
		methods:{
			handleOperation(fun,data){
				this.$emit('clickFun',fun,data)
			},
			remove(id){
				this.$emit('remove',id)
			}
		},
		data (){
			return {
				showDetail:true
			}
		},
		computed:{
			regionType(){
				return this.$store.getters.regionType;
			}
		}
		
		
	}
</script>

<style lang="scss" scoped="scoped">
	.detail-card{
		border:1px solid #f0f2f7;
		box-shadow:0 0 5px #F6F8FB;
		.detail-card-close{
			float:right;
			cursor:pointer;
			padding:20px 20px 0 0;
			
		}
		.detail-card-body{
			padding:0px 20px 20px;
			.detail-card-ipDetail{
				color:#333333;
				font-size:12px;
				padding-left:10px;
				.el-row{
					line-height: 30px;
				}
			}
			.detai-card-img{
				text-align: center;
				font-size:50px;
			}
		}
		.detail-card-footer{
			padding:0px 20px;
			border-top:1px solid #f0f2f7;
			.detail-card-btn{
				line-height: 35px;
				text-align: center;
			}
			.detail-card-more{
				padding:10px 20px;
			}
		}
	}
</style>
