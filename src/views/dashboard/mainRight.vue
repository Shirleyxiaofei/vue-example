<!-- <template>
	<div class="console-main-right">
		<el-row>
			<el-col :span='24' class="message-center" v-if="moduleDisplay.consoleMessage">
				<div class="console-title">
					{{message.title}}
					<span class="console-message-more">更多</span>
				</div>
				<ul class="console-message-detail">
					<router-link tag="li" :to="'/messageCenter/'+item.id" v-for="item in message.data" class="console-message-item" :key='item.id'>
						<el-col class="console-message-item-title">
							{{item.msg}}
						</el-col>
						<el-col>
							<time class="console-time">{{item.date}}</time>
						</el-col>
					</router-link >
					
				</ul>
			</el-col>
			
			<el-col class="console-service">
				<div class="console-title">
					{{service.title}}
				</div>
				<el-row v-for="item in service.data" :key='item.icon' class="service-item">
					<el-col :span="5" class="console-service-img" :class="'console-service-'+item.icon">
						<svg-icon :icon-class="item.icon"></svg-icon>
						
					</el-col>
					<el-col :span="7" class="console-service-name">
						{{item.name}}
					</el-col>
					<el-col :span='24' class="console-num">
						<el-col :span="5" class="console-service-img" style='height: 20px;'>
							
						</el-col>
						<el-col :span="19" class="console-service-name">
							{{item.tel}}
						</el-col>
					</el-col>
				</el-row>
				
			</el-col>
			<el-col class="console-ad">
				<img :src="img.ad.src" />
			</el-col>
			<el-col class="console-Qrcode" v-if="moduleDisplay.consoleMessage">
				<el-row>
					<el-col :span="8" class="console-qrCode-img">
						<img :src="img.qrCode.src"/>
					</el-col>
					<el-col :span="16" class="console-qrCode-intro">
						<div class="console-qrCode-title console-title">
							天翼云APP
						</div>
						<div class="console-qrCode-content">
							<p>云网融合，您的可信云管家</p>
							<p>扫一扫下载</p>
						</div>
					</el-col>
				</el-row>
				
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import moduleDisplay from '@/baseConfig/moduleDisplay'
	
	import adPng from '@/assets/adver.png';
	import qrCodePng from '@/assets/qrcode.png';
	export default {
		data() {
			return {
				moduleDisplay,
				message:{
					title:"消息中心",
					data:[
						{
							msg:"12月4日国内教育网用户访问华南一滴的的的的打的费ad沙发",
							date:'2017-12-05 12:34:01',
							id:'first'
						},
						{
							msg:"12月4日国内教育网用户访问华南一滴的的的的打的费ad沙发",
							date:'2017-12-05 12:34:01',
							id:'ddd'
						},
						{
							msg:"12月4日国内教育网用户访问华南一滴的的的的打的费ad沙发",
							date:'2017-12-05 12:34:01',
							id:'ccc'
						},
						{
							msg:"12月4日国内教育网用户访问华南一滴的的的的打的费ad沙发",
							date:'2017-12-05 12:34:01',
							id:'aaa'
						}
					]
				},
				service:{
					title:'专享服务',
					data:[
						{
							name:'客户经理',
							tel:this.$store.state.user.user.service_manager_phone || '--',
							icon:'tel'
						},
						{
							name:'项目经理',
							tel:this.$store.state.user.user.project_manager_phone || '--',
							icon:'cellphone'
						}
						
					]
				},
				img:{
					ad:{
						src:adPng
					},
					qrCode:{
						src:qrCodePng
					}
				}
			}
		},
		mounted(){
			let userInfo = this.$store.state.user.user;
			//console.log(userInfo)
		}
		
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../styles/mixin.scss';
	@import '../../styles/variables.scss';
	
	.console-num{
		@include ConsoleNum(12px);
		.console-service-name{
			font-size: 12px;
			color: #666;
		}
	}
	.console-title{
		@include ConsoleTitle;
	}
	
	.message-center{
		height:230px;
		padding:20px;
		background:$consoleBgcolor;
		margin-bottom: $consoleMginBottom;
		.console-message-more{
			float: right;
			font-size:12px;
			color:#3dc7fa;
		}
		.console-message-detail{
			padding-top:15px;
			.console-message-item{
				padding:5px 0 10px 15px;
				height: 30px;
				font-size: 12px;
				border-left:3px solid #f5f7fb;
				position:relative;
				cursor:pointer;
				.console-message-item-title{
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					color:#333333;
					padding-bottom: 5px;
				}
				.console-time{
					color:#d0d0d0;
				}
				&:last-child{
					padding-bottom: 0;
				}
				&:before{
					@include BorderContent(6px,#3DC7FA,#c3ebf9,-6px,10px);
					border-width: 2px;
				}
			}
			max-height:170px;
		}
		
	}
	.console-service{
		padding:20px;
		height:195px;
		background:$consoleBgcolor;
		margin-bottom: $consoleMginBottom;
		.console-title{
			padding-bottom: 20px;
		}
		.service-item{
			margin-bottom: 10px;
			.console-service-img{
				font-size:24px;
				padding-left:10px;
			}
			.console-service-tel{
				color: #3DC7FA;
			}
			.console-service-cellphone{
				color:#66e1b1;
			}
			font-size:12px;
			line-height: 30px;
		}
	}
	.console-ad{
		height:auto;
		margin-bottom: $consoleMginBottom;
		img{
			width:100%;
			height: 100%;
		}
		background-size: contain;
	}
	.console-Qrcode{
		min-height:120px;
		padding:20px;
		.console-qrCode-img{
			padding:10px;
		}
		.console-qrCode-intro{
			padding:10px;
			.console-qrCode-content{
				font-size:12px;
				color:#333;
				line-height: 22px;
				padding-top:12px;
			}
			.console-qrCode-title{
				padding-top:3px;
			}
		}
		img{
			width:100%;
		}
		background:$consoleBgcolor;
		
	}
</style> -->