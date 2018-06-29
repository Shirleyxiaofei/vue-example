import request from '@/utils/request'
import { getRegionId,getZoneId } from '@/utils/auth'


export function getBksList(params){
	let data;
	if(params.name){
		data = {
			limit: params.limit || 10,
			regionid:getRegionId(),
			zoneid:getZoneId(),
			page:params.page || 1,
			status:params.status,
			name:params.name,
		}
	}else if(params.id){
		data = {
			limit: params.limit || 10,
			regionid:getRegionId(),
			zoneid:getZoneId(),
			page:params.page || 1,
			status:params.status,
			id:params.id,
		}
	}else{
		data = {
			limit: params.limit || 10,
			regionid:getRegionId(),
			zoneid:getZoneId(),
			page:params.page || 1,
			status:params.status,
			keyword:params.keyword,
		}
	}
		
	console.log(data)
	return request({
		url:'console/ecm/bks/volumebackupdata/',
		method:'get',
		params:data
	})

}

export function GetBksDetail(params){
	let data = {
		regionid:getRegionId(),
		id:params.id,
		zoneid:params.zoneId,
	}
	return request({
		url:'console/ecm/bks/volumebackupdata/',
		method:'get',
		params:data
	})
}

export function CreateBks(data){
	data.regionid = getRegionId();
	return request({
		url:'console/ecm/ebs/volumebackups/',
		method:'post',
		data
	})
}

export function DeleteBks(Bksid){
	let data  ={
		regionid:getRegionId(),
	}
	return request({
		url:'console/ecm/ebs/volumebackups/'+Bksid+'/',
		method:'delete',
		data
	})
}

export function restoreBks(data,Bksid){
	data.regionid = getRegionId();
	return request({
		url:'console/ecm/ebs/volumebackups/'+Bksid+'/',
		method:'post',
		data
	})
}