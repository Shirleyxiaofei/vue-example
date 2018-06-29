<template>
	<div class="navAside" :style="{width: navAsideWidth + 'px'}" v-if='!aisdeHide'>
		<el-aside>
			<div class="aside-flex" :style="{width: isOpenSubMenu ? 'auto' : '150px'}">
			  <el-row>
                <el-col :span="!isOpen ? 12 : 7" class='Menu'>
				<!--<el-menu :collapse='isOpen' class='aside-width'  :default-active="routerName">-->
				  <el-menu :collapse='false' class='aside-width' :class="{'el-menu--collapse' : isOpen}" :default-active="routerName">
					 <li class="el-menu-item" @click='toggle("isOpen")' style="padding-left: 20px; text-align: center;">
						<i class="aside-icon" >
						<svg-icon icon-class="menu" v-if="isOpen"></svg-icon>
						<svg-icon icon-class="menu" style="transform: rotate(90deg);" v-if="!isOpen"></svg-icon>
						</i>
						<span slot="title" v-show="isOpen">切换开关</span>
					</li>
					<el-tooltip :disabled="!isOpen" :enterable='false'  v-for = '(item,index) in navList' :key='index+1'  :content="item.name" placement="right">
						<el-menu-item  @click='showListDetail(index)' v-if="!item.hide" :index="item.id">
							<i class="aside-icon" ><svg-icon :icon-class="item.id" ></svg-icon></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
					</el-tooltip> 
				  </el-menu>
				</el-col>
                <el-col :span="!isOpen ? 12 : 17" class='subMenu'>
				  <transition name='aniFadeInout'>
					<ul class="sub-menu" v-if="isOpenSubMenu" >
						<li class="sub-menu-title">{{subTitle}}</li>
						<template v-if="isTwo">
							<el-menu default-active="0" class="el-menu-vertical-demo" background-color="#fff"  text-color="#606266" active-text-color="#ffd04b" v-show="isTwo">
								 <el-submenu v-for="(item,index) in subList" :index="''+index" :key="index">
								 	<template slot="title">
							          	<span>{{item.title}}</span>
							        </template>
							        <el-menu-item v-for="(subItem,index) in item.subList" :index="item.title+'-'+index" :key="index">
							        	<router-link class="sub-menu-list" tag='li' :to='subItem.path'>
											{{ subItem.title }}
										</router-link>
							      	</el-menu-item>
								 </el-submenu>
							</el-menu>
						</template>
						<template v-else>
							<router-link class="sub-menu-list"
                                tag='li'
                                :to='item.path'
                                :key='index'
                                v-if="!item.hide"
                                v-for="(item,index) in subList"
                                :class="{'router-link-active':item.id && item.id == metaDepend }"
                            >
                                {{ item.title }}
                            </router-link>
                            <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo"
                                     background-color="#fff" text-color="#606266"
                                     active-text-color="#ffd04b" v-else-if="item.isSub">
                                <el-submenu :index="''+index" :key="index">
                                    <template slot="title">
                                        <svg-icon icon-class="next" class="el-submenu__icon-arrow"></svg-icon>
                                        <span class="f_s_12">{{item.title}}</span>
                                    </template>
                                    <el-menu-item v-for="(subItem,index2) in item.subList"
                                                  :index="index+'-'+index2" :key="index+'-'+index2">
                                        <router-link class="sub-menu-list p_l_20" tag='li' :to='subItem.path'>
                                            {{ subItem.title}}
                                        </router-link>
                                    </el-menu-item>
                                </el-submenu>
                            </el-menu>
						</template>
						<!-- <div class="toggle-subMenu"  v-if="isOpenSubMenu" @click="toggle('isOpenSubMenu')" :class="{'toggle-subMenuRight' : !isOpenSubMenu}">
							<svg-icon icon-class="submenu"></svg-icon>
						</div> -->
					</ul>
				  </transition>
			    </el-col>
              </el-row>
			</div>
			<!--<transition name="fadeIn">-->
				<div class="toggle-subMenu toggle-subMenu-aside" v-if="subMenuShow"  @click="toggle('isOpenSubMenu')" :class="{ 'toggle-subMenuLeft' :isOpen && !isOpenSubMenu ,'toggle-subMenuRight': !isOpen && !isOpenSubMenu}">
					<svg-icon icon-class="submenu" style="transform: rotate(180deg);" v-if="!isOpenSubMenu" ></svg-icon>
				</div>
			<!--</transition>-->
		</el-aside>
		
	</div>
</template>

<script>
	import list from '@/baseConfig/list'
	import headerList from '@/baseConfig/headerList'
	import userList from '@/baseConfig/userList'
	import { getRegionType } from '@/utils/auth'
	export default {
		methods:{
			toggle(el){
				//console.log(list);
				if(el=='isOpen'){
					this.isOpen = !this.isOpen
				}
				if(el == 'isOpenSubMenu'){
					this.isOpenSubMenu = !this.isOpenSubMenu
				}
			},
			showListDetail(index){
				//console.log(index);
				this.isOpenSubMenu = true;
				this.isTwo = false;
				this.subTitle = this.navList[index].label||this.navList[index].name;
				this.subList = this.navList[index].subList ? this.navList[index].subList : [];
				
				this.$router.push(this.subList[0].path)
			},
			isTab(){
				this.routerName = this.$route.matched[0].name;
				/*console.log(this.$route.matched)
				console.log(this.routerName)*/
				/*判断子视图属于哪个模块*/
				this.metaDepend = this.$route.meta.dependOn;
				/*判断是否隐藏侧边栏*/
				this.aisdeHide = this.$route.meta.aisdeHide;
				//初次加载 清空 echart 状态
				this.$store.commit('CLEAR_ECHARTS', []);
				
		        if(this.$route.name === 'console'){
		        	this.isOpen = true;
		        	this.isOpenSubMenu = false;
		        	this.isTwo = false;
		        	this.subMenuShow = false
		        }else if(this.$route.matched[0].name == 'user'){
		        	console.log(userList)
		        	this.subTitle = userList.label || userList.name;
	        		this.routerName = this.$route.matched[0].name;
	        		this.subList = userList.subList || [];
	        		this.isOpen = true;
	        		this.isTwo = false;
	        		this.isOpenSubMenu = true;
	        		this.subMenuShow = true
		        }else{
		        	var selectedList = this._.find(this.navList,{id:this.$route.matched[0].name});
		        	/*let _this = this;
		        	let selectedList = this.navList.find((item)=>{
		        		let subList = _this._.find(item.subList,{path:_this.$route.path})
		        		if(subList){
		        			return item
		        		}
		        	})*/
		        	//console.log(selectedList,this.$route.matched[0].name,headerList);
		        	//console.log(selectedList)
		        	if(selectedList){
		        		this.subTitle = selectedList.label || selectedList.name;
		        		this.routerName = this.$route.matched[0].name;
		        		this.subList = selectedList.subList || [];
		        		this.isOpen = false;
		        		this.isTwo = false;
		        	}else{
		        		var selectedHeaderList = this._.find(headerList,{id:this.$route.matched[0].name});
		        		console.log(selectedHeaderList);
		        		this.subTitle = selectedHeaderList.label || selectedHeaderList.name;
		        		this.subList = selectedHeaderList.subList || [];
		        		this.isOpen = true;
		        		this.isTwo = true;
		        	}
                    let selectSubList = this._.find(this.subList, {path: this.$route.path});
                    if (!selectSubList) {
                        this.subList.map((item, index, array) => {
                            var timeSub = this._.find(item.subList, {path: this.$route.path});
                            if (timeSub) {
                                selectSubList = timeSub;
                            }
                        });
                    }
                    this.defaultIndex = selectSubList && selectSubList.index;
		        	this.isOpenSubMenu = true;
		        	this.subMenuShow = true
	        	}
	        },
		    filterType(item){
		    	let regionType = this.$store.getters.regionType;
		    	let _ = this._;
		    	//console.log(item2)
	    		return _.map(item,(item2,key2)=>{
					item2.type && (item2.type == regionType ? (item2.hide = false) : (item2.hide = true))
				})
		    	//return item2.type && (item2.type == regionType ? (item2.hide = false) : (item2.hide = true))
		    }
		},
		data (){
			return {
				isOpen:true,
				isOpenSubMenu:false,
				//navList:list,
				subList:[],
				subTitle:'',
				isTwo:false,
				aisdeHide:false,
				routerName:'',
				metaDepend:'',
				subMenuShow:false,
				defaultIndex: '0-0'
			}
		},
		computed: {
			navAsideWidth: function(){
				let widthValue;
                if (this.isOpenSubMenu && !this.isOpen) {
                    widthValue = 231;
                } else if (!this.isOpen && !this.isOpenSubMenu) {
                    widthValue = 121;
                } else if (this.isOpenSubMenu && this.isOpen) {
                    widthValue = 161;
                } else {
                    widthValue = 51;
                }
                this.$emit('paddingValue', widthValue);
                return widthValue
			},
			navList(){
				//console.log(this.$store.getters.regionType);
				let regionType = this.$store.getters.regionType;
				//console.log(list)
				let _ = this._;
				/*let aa = _.map(list,'subList');
				let bb = _.map(aa,(item,key)=>{
					return _.map(item,(item2,key2)=>{
						item2.type && (item2.type == regionType ? (item2.hide = false) : (item2.hide = true))
					})
				})*/
				_.map(_.map(list,'subList'),this.filterType)
				//console.log(aa)
				return list;
			}
		
		},
		watch:{
	      '$route':'isTab'
	    },
	    mounted: function(){
	    	this.isTab();
	    	
	    }
	}
</script>

<style lang="scss" scoped="scoped">
    @import 'src/styles/variables.scss';

    $subMenuListTitle: 45px;
    $subMenuListHeight: 36px;
    .el-menu-vertical-demo {
        border-right: solid 0;
        height:auto !important;
    }

    .navAside {
        position: relative;
        .el-aside {
            width: auto !important;
            height: 100%;
            position: fixed;
            z-index: 3;
            overflow: hidden;
        }
        .aside-flex {
            /*display: flex;*/
            height: 100%;
            .f_s_12{
            	font-size: 12px;
                padding-left: 3px;
            }
            .sub-menu {
                background-color: $subMenuBackground;
                width: 110px;
                text-align: left;
                font-size: 12px;
                .sub-menu-title {
                    height: $subMenuListTitle;
                    line-height: $subMenuListTitle;
                    background-color: $subMenuTitleBg;
                    color: #333;
                    font-weight: bold;
                }
                .sub-menu-list {
                    height: $subMenuListHeight;
                    line-height: $subMenuListHeight;
                    background-color: #fff;
                    &:hover{
                        cursor: pointer;
                        background-color: $mainBackground;
                    }
                }
                .router-link-active {
                    background-color: $mainBackground;
                }

            }

        }
        .aside-width {
            background-color: $navBackground;
            /*min-height: 730px;*/
        }
        .aside-width:not(.el-menu--collapse) {
            width: 120px;
        }

        .el-menu-item {
            height: $elItemHeight;
            line-height: $elItemHeight;
            font-size: 12px;
            color: $navDefaultColor;
            background-color: $navBackground;
            i {
                color: $navDefaultColor;
            }
            &visited, &focus, &:hover, &:active {
                background-color: $headerBackground;
                color: $navActive;
                border: none;
                outline: none;
                i {
                    background-color: $headerBackground;
                    color: $navActive;
                    border: none;
                }
            }
            .aside-icon {
                padding-right: 10px;
                font-size: 16px;
                margin-left: -3px;
            }
        }
        .is-active {
            background-color: $headerBackground;
            color: $navActive;
            border: none;
            i {
                background-color: $headerBackground;
                color: $navActive;
            }
        }
        .el-menu--collapse {
            width: 50px;
        }
        .toggle-subMenu {
            font-size: 60px;
            position: absolute;
            right: 0;
            text-align: right;
            width: 39px;
            top: 50%;
            overflow: hidden;
            cursor: pointer;
            z-index: 99999;
        }
        .toggle-subMenu-aside {
            top: calc(50% + 45px);
            /*transition: all .45s cubic-bezier(.42,0,.25,1);*/
        }
        .toggle-subMenuLeft {
            left: 30px;
            position: fixed;
        }
        .toggle-subMenuRight {
            left: 100px;
            position: fixed;
        }
        .p_l_20 {
            padding-left: 20px;
        }
    }
</style>
<style>
    .navAside .el-menu > .el-submenu > .el-submenu__title > .el-submenu__icon-arrow {
        right: auto;
        margin-top: -4px;
        left: 10px;
    }
	.sub-menu > li{
		padding-left: 23px;
	}
    .navAside .el-menu > .el-submenu > .el-submenu__title {
        height: 36px;
        line-height: 36px;
    }
    .navAside .el-menu > .el-submenu > .el-submenu__title {
        height: 36px;
        line-height: 36px;
    }

    .navAside .el-menu > .el-submenu > .el-menu > .el-menu-item {
        height: 36px;
        line-height: 36px;
        padding: 0px !important;
        min-width: 110px;
        color: #666 !important;
    }
    .navAside i.el-icon-arrow-down {
        display: none;
    }

    .aside-flex .el-row, .aside-flex .el-col, .aside-flex .el-col ul {
        height: 100%;
    }

    .aside-flex .subMenu, .aside-flex .subMenu ul {
        z-index: 9999;
    }

    .aside-flex .Menu, .aside-flex .Menu ul {
        z-index: 10000;
    }
    /*.navAside .el-icon-arrow-down:before{content: "\25BC";}
	.navAside .el-icon-arrow-down{font-size: 6px;color: #d6deec;}*/
</style>
<style scoped="scoped">
    .aniFadeInout-enter-active {
        animation: slideOut 0.3s;
    }

    .aniFadeInout-leave-active {
        animation: slideOut 0.2s reverse;
    }

    .fadeIn-enter {
        animation: fadeIn 2s;
    }

    .fadeIn-leave {
        animation: fadeIn 2s reverse;
    }

    @keyframes slideOut {
        from {
            width: 0;
            opacity: 0;
        }
        to {
            width: 110px;
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from {
            left: 30px;
        }
        to {
            left: 100px;
        }
    }

</style>