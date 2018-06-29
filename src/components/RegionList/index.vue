<template>
	<div>
		<div class="top">
			<el-row>
			  	<el-col :span="17">
			  		<div class="left">
			  			<p class="node_name">{{name}}</p>
			  			<span v-if="getStack=='vip'" class="areaButton"
			  				:class="{'areaButton-bg':currentId==area.uuid}"
							@click="changeArea(area,index)"
							v-for="(area,index) in areas" >
			  				{{area.name + '（' + (regionNum[area.uuid] || 0) + '）' }}
			  				<!--{{area.name + '（' + (area.num || 0) + '）'}}-->
			  			</span>
			  		</div>
			  	</el-col>
			  	<el-col class="btn" :span="7">
			  		<div class="right" v-if="Array.isArray(buttonText)">
			  			<el-button class="createButton" @click='createEvent(item.fun)' v-for="item in buttonText" :key="item.id">{{item.label}}</el-button>
			  		</div>
			  		<div class="right" v-else>
			  			<el-button class="createButton" @click='createEvent'>{{buttonText}}</el-button>
						<el-button v-if='buttonTexts' class="createButton" @click='createStrategy'>{{buttonTexts}}</el-button>
			  		</div>
			  	</el-col>
			</el-row>
		</div>
		<div class="line"></div>
	</div>
</template>

<script>
import {Loading} from 'element-ui'
import store from '@/store'
import { getRegionId, setRegionId, SetZoneId, SetVnc,SetRegionType,getRegionType } from '@/utils/auth'
import {getRegionList} from '@/api/login'
	export default{
		props:{
			name:[String],
      stack:'',
			buttonText:[String,Array],
			buttonTexts:[String],
			type:[String],
			regionData:[Array,Object]
		},
		data(){
			return {
				currentId:'',
				areas:[

				]
			}
		},
    beforeCreate(){
//      this.stack=this.$store.state.user.stack

    },
		methods:{
			addEbs(){
				console.log('chuangjian');
			},
			changeArea(area,index){
				let uuid = area.uuid;
				let zoneid = area.zoneid;
				let vnc = area.vnc;
				let regionType = area.regionType;
				setRegionId(uuid)
				SetZoneId(zoneid)
				SetVnc(vnc)
				SetRegionType(regionType)
				this.$store.dispatch('changeRegionType',getRegionType())
				this.currentId = uuid
				this.current = index
				this.$emit('changeRegion',uuid)
			},
			createEvent(fun){
				this.$emit('create',fun);
			},
			createStrategy(){
				this.$emit('strategy');
			},
			getRegionList(){
				/*let loadingInstance = Loading.service({
					fullscreen:true,
					target:'main'
				});*/
				this.areas = this.$store.state.user.regionList;

				this.areas.map(item=>{
					item.zoneid = item.details && item.details.zoneId;
					item.hasVnc = item.details && item.details.hasVnc;
					item.regionType = 1 == item.type ? 'cs' : 2 == item.type && 'os';
				})
				this.type && (this.areas = this.areas.filter(item=>{
					return item.regionType == this.type
				}))
				if(getRegionId()){
					this.currentId = getRegionId()
					this.$store.dispatch('changeRegionType',getRegionType())
				}else{
					let uuid = this.areas[0].uuid
					let zoneid = this.areas[0].zoneid;
					let hasVnc = this.areas[0].hasVnc;
					let regionType = this.areas[0].regionType;
					this.currentId = uuid
					setRegionId(uuid)
					SetZoneId(zoneid)
					SetVnc(hasVnc)
					SetRegionType(regionType)
					this.$store.dispatch('changeRegionType',getRegionType())
				}
				/*getRegionList().then((res)=>{
					let data = res.data;
					this.areas = data.platforms;
					if(getRegionId()){
						this.currentId = getRegionId()
					}else{
						let uuid = this.areas[0].uuid
						this.currentId = uuid
						setRegionId(uuid)
					}
					loadingInstance.close()
				})
				.catch((req) => {
					loadingInstance.close()
					console.log(req)
				})*/

			}
		},
		computed:{
        getStack(){
            return this.$store.state.user.stack
        },
			regionNum(){
				return this.regionData
			}
		},
		mounted(){
			//console.log(this.$store.state.user.regionList)
			this.getRegionList()
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.top{
	  	background: #ffffff;
	  	border-bottom: 1px solid #f8f9fb;
	  	position: relative;
	  	&:after{
	  		content: '';
	  		height: 0;
	  		width: 0;
	  		border: 8px solid #f6f8fb;
	  		border-color: transparent transparent transparent #f6f8fb;
	  		position: absolute;
	  		bottom: -9px;
	  		left: 0px;
	  	}
	  	&:before{
	  		content: '';
	  		height: 0;
	  		width: 0;
	  		border: 8px solid #f6f8fb;
	  		border-color: transparent #f6f8fb transparent transparent;
	  		position: absolute;
	  		bottom: -9px;
	  		right: 0px;
	  	}
	  	.left{
		  	/*width: 65%;*/
		  	/*float: left;*/
		  	padding-left: 2%;
		  	text-align: left;
		  	.node_name{
				font-size: 14px;
				color: #333;
				padding: 20px 0px;
			}
			.areaButton{
				display: block;
				min-width: 90px;
				padding:0 10px;
				height: 30px;
				margin-bottom: 15px;
				background: #f0f2f7;
				float: left;
				text-align: center;
				line-height: 30px;
				border-radius: 5px;
				margin-right: 10px;
				font-size: 11px;
				cursor: pointer;
				-webkit-user-select:none;
   				-moz-user-select:none;
  	 			-ms-user-select:none;
   				user-select:none;
			}
			.areaButton-bg{
				background: #f9cd76;
				color: #ffffff;
			}
			.areaButton:hover{
				background: #f9cd76;
				color: #ffffff;
			}
		}
		.right{
		  	/*width: 27%;*/
		  	/*float: left;*/
		  	padding-left: 5%;
		  	padding-top: 38px;
        padding-bottom: 10px;
		  	text-align: right;
		  	.createButton{
				width: 120px;
				height: 36px;
				background: #3ac0f1;
				border-color: #3ac0f1;
				color: #ffffff;
				font-size: 12px;
				margin-right: 15px;
				&:hover{
					background: #5ed4ff;
				}
			}
		}
	  }
	  .clear{
	  	content:".";
        clear:both;
        display:block;
        height:0;
        overflow:hidden;
        visibility:hidden;
	  }
	  .line{
	  	height: 10px;
	  	width: 100%;
	  	background: #f0f2f7;
	  	background-size: 50% 100%;
	  	background-repeat: no-repeat;
	  }
  .btn{
    float: right;
  }
</style>
