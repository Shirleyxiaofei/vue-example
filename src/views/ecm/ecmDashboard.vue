<template>
	<div class="ecm-dashboard">
		<!--<el-main>-->
			<el-row :gutter="20">
				<el-col :span="18">
					<el-row :gutter="20" >
						<el-col >
							<div class="ecm-title region-list">
								综述
							</div>

						</el-col>
						<el-col :span="list.span" v-for="list in ecmDashboardList" :key="list.id">
							<div class="ecm-ecm consoleBg">
								<el-col class="ecm-title">
									{{list.title}}
								</el-col>
								<el-col :span="24/list.list.length" v-for="item in list.list" :key="item.id" class="ecm-ecm-item ">
									<div class="ecm-num"  :class="'ecm-num-'+item.id">
										{{ item.num || 0 }}
										<span>({{item.unit}})</span>
									</div>
									<div class="ecm-ecm-intro">
										{{item.intro}}
									</div>
								</el-col>
							</div>
						</el-col>

					</el-row>

					<el-row>
						<el-col class="ecm-network consoleBg">
							<div class="ecm-title">
								{{networkList.title}}
							</div>
							<el-col :span="8" v-for="item in networkList.list" class="ecm-network-intro" :key="item.id" v-if="!item.hide">
								{{item.intro}}
								<span class="ecm-num">{{item.num}}</span>
							</el-col>
						</el-col>
					</el-row>

					<el-row :gutter="20">
						<el-col >
							<div class="ecm-title region-list">
								我的资源
							</div>

						</el-col>
						<el-col :span="12"  v-for="item in regionList" :key="item.region">
							<div class="region-ecm consoleBg consolePoint" @click="routerEcm(item)">
								<div class="ecm-title">
									{{item.regionName}}
								</div>
								<el-col :span="11" class="region-ecm-left">
									<div class="ecm-num">
										{{item.ecmTotal.count}}
									</div>
									<div class="region-ecm-title">
										{{item.ecmTotal.intro}}
									</div>
									<ul class="region-ecm-state">
										<li class="region-ecm-state-active"><span class="region-ecm-state-intro">{{ item.ecmTotal.activeIntro }}</span><span>{{item.ecmTotal.active || 0}}</span><span class="ecm-unit">(台)</span></li>
										<li class="region-ecm-state-expired"><span class="region-ecm-state-intro">{{ item.ecmTotal.shutedIntro }}</span><span>{{item.ecmTotal.shuted || 0}}</span><span class="ecm-unit">(台)</span></li>
									</ul>

								</el-col>
								<el-col :span="13">
									<ul class="region-ecm-others">
										<li class="region-ecm-other-item" v-for="(regionOther,key) in item.regionOthers">
											<span class="region-ecm-other-item-intro">{{regionOther.intro}}</span>
											<span v-if="key=='ebs'">{{regionOther.size  || 0}} GB</span>
											<span v-if="key!=='ebs'"> {{ regionOther.count || 0 }}</span>
										</li>

									</ul>
								</el-col>
							</div>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="6">
					<MainRight></MainRight>
				</el-col>
			</el-row>


		<!--</el-main>-->

	</div>
</template>

<script>
	import MainRight from '@/views/dashboard/mainRight'
	import { GetDashboard, getEcmPlatforms } from '@/api/ecm'
	import { getRegionId, setRegionId, SetZoneId, SetVnc,getZoneId } from '@/utils/auth'
	export default {
		data (){
			return {
				msg :'云服务器',
				ecmDashboardList:[
					{
						title:'云服务器',
						id:"VM",
						span:12,
						list:[
							{
								id:'total',
								intro:'总数',
								span:8,
								num:0,
								unit:'台'
							},
							{
								id:'active',
								intro:'开机',
								num:0,
								unit:'台'
							},
							{
								id:'shutoff',
								intro:'关机',
								num:0,
								unit:'台'
							}
						]
					},
					{
						id:"Volume",
						title:"云硬盘",
						span:12,
						list:[
							{
								id:'sysDisk',
								intro:'系统盘',
								num:0,
								unit:'GB'
							},
							{
								id:'dataDisk',
								intro:'数据盘',
								num:0,
								unit:'GB'
							}
						]
					}

				],
				networkList:{
					title:"网络",
					list:[
						{
							id:'Public_IP',
							intro:'弹性公网IP',
							num:0,
						},
						{
							id:'VPC',
							intro:'虚拟私有云',
							num:0,
						},
						{
							id:'Images',
							intro:'镜像',
							num:0,
							hide:true
						}
					]
				},
				regionList:[]


			}
		},
		components:{
			MainRight
		},
		created(){
			this.getDashboard()
			this.getEcmPlatforms()
		},
		methods:{
			routerEcm(item){
				console.log(item);
				setRegionId(item.region);
				SetZoneId(item.zoneId);
				SetVnc(item.hasVnc);
				this.$router.push('/ecm/ecmList');
			},
			getDashboard(){
				let params ={
					all_dc:1,
					regionid:'all'
				}
				GetDashboard(params).then( res => {
					let data = res.data.results[0];
					console.log(data)
					this.filterVm(data)
					this.filterNet(data)
				})
			},
			filterVm(data){
				let ecmDashboard = this.ecmDashboardList;
				ecmDashboard.map((item)=>{
					item.list.map((item2)=>{
						let vm = data[item.id]
						item2.num = vm[this.switchList(item2.id)]
					})
				})
			},
			filterNet(data){
				let networkList = this.networkList.list;
				networkList.map(item => {
					item.num = data[item.id] ? data[item.id].total_count : 0
				})
			},
			switchList(id){
				switch(id){
					case 'total':
					return 'total_count';
					break;
					case 'active':
					return 'vm_running_count';
					break;
					case 'shutoff':
					return 'vm_shutd_count';
					break;
					case 'sysDisk':
					return 'vo_root_size';
					break;
					case 'dataDisk':
					return 'vo_disk_size'
				}
			},
			getEcmPlatforms(){
				let params = {
					regionid:'all'
				}
				getEcmPlatforms(params).then(res => {
					let region = res.data.platforms;
					console.log(region)
					let regionList = this.regionList;
					region.map(item =>{
						let regionItem = {
							zoneId:item.details.zoneId,
							hasVnc:item.details.hasVnc,
							region:item.uuid,
							regionName:item.name,
							ecmTotal:{
								intro:'云安全',
								count:0,
								activeIntro:"开机",
								active:0,
								shutedIntro:'关机',
								shuted:0
							}
							// regionOthers:{
							// 	ebs:{
							// 		size:0,
							// 		intro:'云硬盘'
							// 	},
							// 	eip:{
							// 		count:0,
							// 		intro:'弹性公网IP',
							// 	},
							// 	vpc:{
							// 		count:0,
							// 		intro:'虚拟私有云'
							// 	}
							// }

						}
						let params = {
							regionid:item.uuid
						}
						GetDashboard(params).then(resDash=>{
							let data = resDash.data.results[0];
							/*云服务器*/
							regionItem.ecmTotal.count = data.VM.total_count || 0;
							regionItem.ecmTotal.active = data.VM.vm_running_count || 0;
							regionItem.ecmTotal.expired = data.VM.vm_expired_count || 0;
							regionItem.ecmTotal.shuted = data.VM.vm_shutd_count || 0;
							/*云硬盘之类的*/
							regionItem.regionOthers.ebs.size = data.Volume.total_size || 0;
							regionItem.regionOthers.eip.count = data.Public_IP.total_count || 0;
							regionItem.regionOthers.vpc.count = data.VPC.total_count || 0;
						}).catch((error)=>{
							console.log(error)
						})

						regionList.push(regionItem)

					})
				}).catch(error=>{
					console.log(error)
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../styles/variables.scss';
	@import '../../styles/mixin.scss';
	.ecm-num{
		@include ConsoleNum(30px);
		@include font;
	}
	.ecm-title{
		height:40px;
		line-height: 40px;
		@include ConsoleTitle;
		padding-left:20px !important;
		border-bottom: 1px solid #F6F8FB;
	}
	.consoleBg{
		background: $consoleBgcolor;
	}
	.consolePoint{
		cursor: pointer;
	}
	.ecm-ecm{
		height: 160px;
		margin-bottom: 20px;
		font-size:12px;
		.ecm-ecm-item{
			text-align: center;
		}
		.ecm-num{
			padding:25px 0;
			span{
				font-size:12px;
				color:#c0c9cd;
			}
		}
		.ecm-num-active{
			color:#3ac0f1;
		}
		.ecm-num-shutoff{
			color:#f7757f;
		}

	}
	.ecm-network{
		height:120px;
		margin-bottom: 20px;
		font-size:14px;
		color:#333333;
		.ecm-num{
			@include ConsoleNum(24px);
			padding-left:20px;
		}
		.ecm-network-intro{
			height:80px;
			line-height: 80px;
			padding-left:40px;
		}
	}
	.region-list{
		padding-left:10px !important;
		margin-bottom: 10px;
	}
	.region-ecm{
		height:220px;
		margin-bottom: 20px;
		.region-ecm-left{
			text-align: center;
			.ecm-num{
				padding:25px 0 20px;
			}
			.region-ecm-title{
				font-size:14px;
				padding-bottom: 20px;
			}
			.region-ecm-state{
				text-align: left;
				>li{
					padding-left:30px;
					position: relative;
					font-size:12px;
					line-height: 25px;
					span{
						font-size:11px;
					}
					&:before{
						@include BorderContent(6px,#5adecb,#adefe5,10px,9px)
					}
				}
				.region-ecm-state-intro{
					width:60%;
					display: inline-block;
				}
				.ecm-unit{
					font-size:10px;
					color:#A9B9C5;
					padding:0 10px;
				}
				.region-ecm-state-active{
					&:before{
						@include BorderContent(6px,#5adecb,#adefe5,10px,9px)
					}
				}
				.region-ecm-state-expired{
					&:before{
						@include BorderContent(6px,#f5b840,#f9d691,10px,9px)
					}
				}
			}
		}

		.region-ecm-others{
			.region-ecm-other-item{
				line-height: 30px;
				background: #f5f7fb;
				font-size:11px;
				margin:20px;
				padding-left:20px;
				color:#666;
				.region-ecm-other-item-intro{
					color:#A9B9C5;
					/*width:38%;*/
					width:80px;
					display: inline-block;
				}
			}
		}
	}

</style>