import request from '@/utils/request';
import { getRegionId } from '@/utils/auth'

//总览
export function getProductList(params){
	return request({
		url:'console/ecm/ecs/dashboard/',
		method:'get',
		params
	})
}
/*异步机制接口*/
export function GetJobDetail(jobid){
	return request({
		url:'console/ecm/jobs/'+jobid+'/',
		params:{
			regionid:getRegionId()
		},
		method:'get',
	})
}