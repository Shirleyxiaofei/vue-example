<template>
	<header v-if="this.stack=='vip'" class="vip-header">

		<div class="header-left">
			<div class="logo" @click="logoClick">
					<img width="100%" src="../../../assets/logo.png"/>
			</div>
			<div class="console-center hoverClass">
				<router-link :to='console.path'>{{console.title}}</router-link>
			</div>
		</div>
		<div class="hedaer-right">
			
        <!-- 用户头像 -->
				<el-dropdown @command="userFun"  class="header-user hoverClass">
				  <span class="el-dropdown-link user-name" style="outline-width: 0px; outline-style: none;">

					<img height="20" :src="user.img"/>

				    {{user.name}}
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item v-for="(userItem,index) in userList" :key="index" :command="userItem.fun">{{userItem.title}}</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>

		</div>

	</header>


  <header v-else-if="this.stack=='console'" class="console-header">

    <div class="header-left">
      <div class="logo" @click="logoClick">
        <img width="100%" src="../../../assets/console/logo.png"/>
      </div>
      <div class="console-center hoverClass">
        <router-link :to='console.path'>{{console.title}}</router-link>
      </div>
     <!--  <div v-if="this.stack=='console'" class="dropdown">
        <ul class="nav">
          <li class="subnav">
            <label class="navlabel"><svg-icon class="icon" icon-class="sub"></svg-icon></label>
            <div class="secondNav">
              <div v-for="item in navList">
                  <label v-if="item.label">{{item.label}}</label>
                  <span class="sub-router" v-if="!val.hide" v-for="val in item.sub"  @click="toRouter(val.path)" >
                    <svg-icon class="nav-svg" :icon-class="val.icon"></svg-icon>
                    <span>{{val.name}}</span>
                  </span>
                </div>
            </div>
          </li>
          <li index="2" @click="toRouter('/ecm/ecmList')" >
            <label>
              <svg-icon class="icon" icon-class="vm"></svg-icon>
              <span>弹性云主机</span>
            </label>
          </li>
          <li index="2" @click="toRouter('/vpc/vpcList')" >
            <label>
              <svg-icon class="icon" icon-class="vpc-nav"></svg-icon>
              <span>虚拟私有云</span>
            </label>
          </li>
          <li index="2" @click="toRouter('/monitor/dashboard')" >
            <label>
              <svg-icon class="icon" icon-class="monitor-nav"></svg-icon>
              <span>云监控服务</span>
            </label>
          </li>
        </ul>


      </div> -->
      <div v-if="this.stack=='console'" class="frame-favorite-service-list"></div>
    </div>
  </header>

</template>

<script>
	import i18n from '@/lang'
	import userImg from '@/assets/user.png'
	import headerList from '@/baseConfig/headerList'
  import SvgIcon from "../../../components/SvgIcon/index";
  // import navList from '@/baseConfig/navList'
  import ConsoleRegionList from '@/components/ConsoleRegionList';
  import { getRegionId, setRegionId, SetZoneId, SetVnc,SetRegionType,getRegionType } from '@/utils/auth'
  export default {
    components: {SvgIcon,ConsoleRegionList},
    data (){
			let i18nCommon = i18n.common;
			return {
				console :{
					title : i18nCommon.console,
					path:'/console'
				},
				userList:[
					{
						title: i18nCommon.userCenter,
						path: '',
						fun:()=>{
							this.$router.push('/user/userInfo')
						}
					},
					{
						title: i18nCommon.exitLogon,
						path: '',
						fun:()=>{
							return this.fadeOut()
						}
					}

				],
				headerList: headerList,
				user:{
					name:'admin',
					img:userImg
				}
			}
		},
		mounted: function(){
			this.user.name = this.$store.state.user.user.customer_name || this.user.name;
		},
		methods:{
      toRouter(path){
        this.$router.push(path);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
			userFun(fun){
				fun()
			},
			fadeOut(){

				this.$store.dispatch('FedLogOut').then((res) => {
					console.log(res)
					//location.reload()
					location.href ='/logout'
				})
			},
			logoClick(){
				this.$router.push('/console')
			},
      filterType(item){
//        let regionType;
//        if(getRegionType()!=='undefined'){
//          regionType=getRegionType();
//        }else{
//          let region=this.$store.state.user.regionList[0];
//          regionType = '1' == region.type ? 'cs' : '2' == region.type && 'os';
//        }
        let regionType = this.$store.state.user.regionType;
        regionType=regionType=='1'?'cs':'os';
        let _ = this._;
        return _.map(item,(item2,key2)=>{
          item2.type && (item2.type == regionType ? (item2.hide = false) : (item2.hide = true))
        })
      }
		},
    computed:{
      navList(){
        let _ = this._;
        _.map(_.map(navList,'sub'),this.filterType)
        return navList;
      }
    },
    beforeCreate(){
      this.stack=this.$store.state.user.stack;

    }
	}
</script>

<style scoped lang="scss">
 	@import 'src/styles/variables.scss';
  $stack:$stack !default;
 	.hoverClass{
 		&:hover{
			background:$headerHover;
		}
 	}
	.vip-header{
		position: fixed;
    	width: 100%;
      height: 45px;
    	top: 0;
    	z-index: 1000000;
		background: $headerBackground;
		/*display:flex;*/
		/*justify-content:space-between;*/
		font-size:$headerFontSize;
		color:$headerColor;
		.header-left{
			float: left;
			>div{
				display:table-cell;
				vertical-align: middle;
			}
			.logo{
        width:50px;
        height:$headerHeight;
        padding:0 10px 0 10px;
				box-sizing: border-box;
				border-right:$header-border-right;
				cursor: pointer;
			}
			.console-center{
				width:121px;
				text-align: center;
				line-height:$headerHeight ;
				height: $headerHeight;
				border-left: $header-border-left;
				border-right:$header-border-left;
				a{
					display: block;
					width:100%;
					height:100%;
					box-sizing: border-box;
					border-right:$header-border-right;
				}

			}
		}
		.hedaer-right{
			float: right;
			border-left:$header-border-right;
			>div{
				height:$headerHeight;
				display: inline-block;
				vertical-align: middle;
				text-align: center;
				cursor:pointer;
				line-height:$headerHeight;
			}
			.header-order{
				width:70px;
				border-left:$header-border-left;
				color:#fff;
			}
			.header-cost,.header-message{
				width:90px;
				border-left:$header-border-left;
				border-right:$header-border-right;
				color:#fff;
			}
			/*.user-img{

				width:20px;
				display: inline-block;
				img{
					width:100%;
					border-radius: 50%;
					vertical-align: middle;
				}
			}*/

			.header-user{
				border-left:$header-border-left;
				padding-left:20px;
				min-width:130px;
				padding-right:10px;

				box-sizing: border-box;
				.user-name{
					display: inline-block;
					text-align: left;
					box-sizing: border-box;
					color: #fff;
					width:100%;
					line-height: $headerHeight;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space:nowrap;
					img{
						width:20px;
						border-radius: 50%;
						margin-right:10px;
						vertical-align: middle;
					}
				}

			}
		}
	}

  .console-header{
    position: fixed;
    width: 100%;
    height: 61px;
    top: 0;
    z-index: 1000000;
    background: $headerBackground;
    /*display:flex;*/
    /*justify-content:space-between;*/
    font-size:$headerFontSize;
    color:$headerColor;
    .navlabel{
      display: block;
      width: 60px;
      height: 61px;
      text-align: center;
    }
    .icon{
      font-size: 24px;
      width: 18px;
      height: 18px;
    }
    .header-left{
      float: left;
      margin-left: 20px;
      >div{
        display:table-cell;
        vertical-align: middle;
      }
      .logo{
        width:150px;
        height:61px;
        box-sizing: border-box;
        border-right:$header-border-right;
        cursor: pointer;
      }
      .console-center{
        font-size: 20px;
        line-height: 61px;
        width:121px;
        text-align: center;
        line-height:$headerHeight ;
        height: $headerHeight;
        border-left: $header-border-left;
        border-right:$header-border-left;
        a{
          display: block;
          width:100%;
          height:100%;
          line-height: 61px;
          box-sizing: border-box;
          border-right:$header-border-right;
        }

      }
      .nav{
        height: 61px;
        li{
          float: left;
          font-size: 14px;
          line-height: 61px;
          margin-right: 20px;
          height: 61px;
          color: #aaa;
          .secondNav{
            display: none;
            width: 80%;
            /*height: 200px;*/
            position: absolute;
            top:61px;
            left:10%;
            background-color: #6c6c6c;
            color: #fff;
            padding: 20px;
            div{
              float: left;
              margin-right: 30px;
              width: 15%;
              color: #fff;
              /*height: 200px;*/
              label{
                display: block;
                border-bottom: 1px solid #c8c9cc;
                height: 30px;
                line-height: 30px;
              }
              .sub-router{
                display: block;
                height: 30px;
                line-height: 30px;
                .nav-svg{
                  font-size: 18px;
                  color: #ffffff;
                }
              }
              .sub-router:hover{
                cursor: pointer;
                color: #f5b840;
                .nav-svg{
                  font-size: 18px;
                  color: #f5b840;
                }
              }

            }
            .dashboard{
              margin-left: 10px;
              width: 5%;
              line-height: 150px;
            }
          }
          .secondNav >div:first-child{
            width: 8%;
            height:100%;
            position: relative;
            span{
              margin-top: 30px;
            }
          }
        }
        li:hover{
          background-color:#6C6C6C ;
          color: #fff;
          .secondNav{
            display: block;
          }
        }
      }
    }
    .hedaer-right{
      float: right;
      height: 61px;
      line-height: 61px;
      border-left:$header-border-right;
      >div{
        height:$headerHeight;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        cursor:pointer;
        line-height:$headerHeight;
      }
      .header-order{
        width:70px;
        border-left:$header-border-left;
        color:#fff;
      }
      .header-cost,.header-message{
        width:90px;
        border-left:$header-border-left;
        border-right:$header-border-right;
        color:#fff;
      }
      /*.user-img{

                width:20px;
                display: inline-block;
                img{
                    width:100%;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }*/

      .header-user{
        border-left:$header-border-left;
        padding-left:20px;
        min-width:130px;
        padding-right:10px;

        box-sizing: border-box;
        .user-name{
          display: inline-block;
          text-align: left;
          box-sizing: border-box;
          color: #fff;
          width:100%;
          line-height: $headerHeight;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space:nowrap;
          img{
            width:20px;
            border-radius: 50%;
            margin-right:10px;
            vertical-align: middle;
          }
        }

      }
    }
    .el-input__inner{
      background-color: #1b202b !important;
      color: #fff !important;
    }

  }

</style>
