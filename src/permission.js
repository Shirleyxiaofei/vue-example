import router from './router'
import service from '@/utils/request'
import store from './store'
import { getToken,getRegionType } from '@/utils/auth' // 验权
import { Message } from 'element-ui'
import {Loading} from 'element-ui'
//import cancelRequest from '@/utils/cancelRequest'

const whiteList = ['/login', '/authredirect']// 不重定向白名单

router.beforeEach((to,from,next) => {
	//无网络时
//	next()
//	return
	//有网络注释上面	
	if(getToken()){
		if(store.getters.email){
			console.log(to.path)
			if(to.path === '/login'){
				next({path:'/'})
			}else{
				service.cancle('CancelToken');
				next()
			}
			
		}else{
			store.dispatch('GetUserInfo').then(()=>{
				
				let regionlist = store.state.user.regionList;
				if(!regionlist.length){
					let loadingInstance = Loading.service({
						fullscreen:true,
						target:'main'
					});
					store.dispatch('GetRegionId').then((res)=>{
						store.dispatch('changeRegionType',getRegionType())
						//console.log('全局')
						next()
						loadingInstance.close()
					}).catch(error=>{
						console.log(error)
						next()
						loadingInstance.close()
					})
				}
			}).catch((error)=>{
				store.dispatch('FedLogOut').then(() => {
		           /* Message.error('登录已过期，请重新登录')*/
		            next({ path: '/login' })
		        })
			})
		}
	}else{
		//解决死循环问题
		if(whiteList.indexOf(to.path) !== -1){
			next()
		}else{
			next('/login')
		}
	}
})
