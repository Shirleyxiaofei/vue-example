<template>
	<div class="layout">
		<NavHeader></NavHeader>
		<div>
			<NavAside v-if="this.stack=='vip'" @paddingValue = 'paddingValue'></NavAside>
      		<!-- <consoleNavAside v-if="this.stack=='console'" @paddingValue = 'paddingValue'></consoleNavAside> -->
			<!-- <el-main class='rightMain' :style="{minHeight:mainHeight+'px',paddingLeft: mainPadding + 'px'}">
				<router-view :key='key'></router-view>
			</el-main> -->
		</div>
		<footer class="footer">
			&copy;2018中国电信股份有限公司云计算分公司版权所有 京ICP备 12022551号
		</footer>
	</div>
</template>

<script>
	import NavHeader from './dashboard/header'
	import NavAside from './dashboard/aside'
  	import consoleNavAside from './dashboard/consoleAside'
	import { getRegionId, setRegionId, SetZoneId, SetVnc, GetVnc } from '@/utils/auth'
	export default {
		components:{
			NavHeader,
			NavAside,
      		consoleNavAside
		},
		data (){
			return {
				mainHeight:document.body.clientHeight-85,
				mainPadding:51,
			}
		},
		methods:{
			paddingValue(val){
				this.mainPadding = val - 0 + 20;
			}
		},
		computed:{
			key(){
				return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
			},

		},
        beforeCreate(){
          this.stack=this.$store.state.user.stack

        },
		mounted(){
			let that = this;
		    // _.debounce 是一个通过 lodash 限制操作频率的函数。
		    window.onresize = this._.debounce(() => {
		        that.mainHeight = document.body.clientHeight -85;
		        this.$store.state.user.echartsList.map((chart) => {
		        	chart.resize();
		        });
//		        let dropDown = document.getElementsByClassName('el-dropdown-menu');
//		        if(dropDown.length > 0){
//		        	for(var i = 0; i < dropDown.length; i++){
//		        		dropDown[i].style.display='none';
//		        	}
//		        }
		    }, 400)
		    // 对Date的扩展，将 Date 转化为指定格式的String
			// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
			// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
			// 例子：
			// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
			// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
			Date.prototype.Format = function(fmt)
			{ //author: meizz
			  var o = {
			    "M+" : this.getMonth()+1,                 //月份
			    "d+" : this.getDate(),                    //日
			    "h+" : this.getHours(),                   //小时
			    "m+" : this.getMinutes(),                 //分
			    "s+" : this.getSeconds(),                 //秒
			    "q+" : Math.floor((this.getMonth()+3)/3), //季度
			    "S"  : this.getMilliseconds()             //毫秒
			  };
			  if(/(y+)/.test(fmt))
			    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
			  for(var k in o)
			    if(new RegExp("("+ k +")").test(fmt))
			  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			  return fmt;
			};
			let areas = this.$store.state.user.regionList;
			if(!getRegionId()){
				setRegionId(areas[0].uuid);
				SetZoneId(areas[0].details.zoneId);
				SetVnc(areas[0].details.hasVnc);
			}else{
				let regionData = this._.find(areas,{uuid : getRegionId()});
				if(!regionData){
					setRegionId(areas[0].uuid);
					SetZoneId(areas[0].details.zoneId);
					SetVnc(areas[0].details.hasVnc);
				}else{
					SetVnc(regionData.hasVnc);
				}
				regionData = null;
			}
			areas = null;
		}
	}
</script>

<style scoped lang="scss">
	@import 'src/styles/variables.scss';
	.layout{
		background: $mainBackground;
		height:100%;
		padding-top:$headerHeight;
		box-sizing: border-box;
		/*min-width:1336px;
		min-height:768px;*/

	}
	.rightMain{
		transition: all 0.3s;
		transition-timing-function : linear;
	}
	.footer{
		text-align: center;
		line-height: 40px;
		font-size:12px;
		background: #f0f2f7;
	}

	/*.el-aside{
		background: #323c4e;
	}
	.el-main{
		background: #f6f8fb;
	}*/

</style>
<style>
	.el-tooltip__popper{
		opacity: 0.6;
	}
	.el-main{
		display: block;
	}
	.el-table-filter{
		text-align: center;
	}
</style>
