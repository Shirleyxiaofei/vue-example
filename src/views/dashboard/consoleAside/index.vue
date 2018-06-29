<!-- <template>
  <div class="consoleNavAside" :style="{width: navAsideWidth + 'px'}">
    <ul class="menu-list">
      <li class="leftMenuTitle">
        <span class="title-img">
          <img src="../../../assets/consolenav-title.png"/>
        </span>
        <span>弹性云主机</span>
      </li>
      <li v-for="(item,index) in navlist" @click="toRouter(item,index)" :class="index==getroute?'nav-select':'nav'">
        <span class="svg">
          <svg-icon class="icon" :icon-class="item.icon"></svg-icon>
        </span>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
	import list from '@/baseConfig/list'
	import headerList from '@/baseConfig/headerList'
	import userList from '@/baseConfig/userList'
	import { getRegionType } from '@/utils/auth'
  import { navlist } from '@/baseConfig/consoleList'
  import { setRoute,getRoute } from '@/utils/auth'
	export default {
		methods:{
      toRouter(item,index){
        setRoute(index);
        this.getroute=index;
        console.log(this.getroute);
        this.$router.push(item.path);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
		},
		data (){
			return {
        navlist,
        selected:0,
			}
		},
    beforeCreate(){

    },
    computed: {
      navAsideWidth: function(){
        this.$emit('paddingValue', 240);
        return 240
      },
      getroute:function(){
        return getRoute()?getRoute():0;

      }

    },
	    mounted: function(){


	    }
	}
</script>

<style lang="scss" scoped="scoped">
   .consoleNavAside{
     position: fixed;
     top:61px;
     height: 100%;
     background-color: #fafafa;
     border: 1px solid #e5e5e5;
     overflow-y: auto;
     overflow-x: hidden;
     .leftMenuTitle{
       color: #333;
       text-align: center;
       padding: 30px 0 10px;
       border-bottom: 1px solid #e5e5e5;
       text-align: center;
       margin: 0 20px 13px;
       font-size: 18px;
       span{
         display: block;
         line-height: 40px;
       }
       .title-img{
         width: 60px;
         height: 60px;
         margin: 0 auto;
         border: 1px solid #e5e5e5;
         border-radius: 50%;
       }
       img{
         width: 48px;
         margin: 10px auto;
       }
     }
     .nav{
       color: #333;
       text-overflow: ellipsis;
       width: auto;
       line-height: 42px;
       cursor: pointer;
       padding: 0 35px;
       font-size: 14px;
       .svg{
         font-size: 20px;
       }
     }
     .nav-select{
       text-overflow: ellipsis;
       width: auto;
       line-height: 42px;
       cursor: pointer;
       padding: 0 35px;
       font-size: 14px;
       background-color: #ffffff;
       color: #009ee0;
       border-bottom: 1px solid #e5e5e5;
       border-top: 1px solid #e5e5e5;
       .svg{
         font-size: 20px;
       }
     }
     .nav:hover{
       background-color:#fdfdfd;
     }
   }
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
 -->