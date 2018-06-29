import axios from 'axios'
import request from '@/utils/request'
import { getRegionId, getZoneId } from '@/utils/auth'


/*总览*/
export function GetDashboard(params){
	return request({
		url:'console/ecm/ecs/dashboard/',
		method:'get',
		params
	})
}
/*资源个数*/
export function GetRegionNum(params){
	params.regionid || (params.regionid = getRegionId());
	return request({
		url:'console/index/resourcenum/',
		method:'get',
		params
	})
}

/*获取云服务器列表*/
export function getEcmList(params){
//	let data = {
//		limit: params.limit || 10,
//		regionid:getRegionId(),
//		page:params.page || 1,
//		status:params.status,
//		id:params.id,
//		displayname:params.displayname
//	}
	params && (params.regionid = getRegionId()) &&(params.zoneid = getZoneId())
	return request({
		url:'console/ecm/ecs/servers/',
		method:'get',
		params
	})

}

export function GetEcmDetail(serverId){
	let data = {
		regionid:getRegionId(),
		zoneid:getZoneId(),
		id:serverId
	}
	return request({
		url:'console/ecm/ecs/servers/',
		method:'get',
		params:data
	})

}

export function GetEbsDetailById(serverId){
	let data = {
		regionid:getRegionId(),
		zoneid:getZoneId(),
		instance_uuid:serverId
	}
	return request({
		url:'console/ecm/ebs/volumes/',
		method:'get',
		params:data
	})

}
/*os获取网卡列表详情*/
export function GetNetworkById(instance_uuid){
	let data = {
		regionid:getRegionId(),
		zoneid:getZoneId(),
		"action":"get_server_interfaces",
		instance_uuid
	}
	return request({
		//url:'console/network/subnetdata/'+networkid+'/',
		url:'console/api/instances/action/',
		method:'post',
		data
	})
}
export function GetNetworkDetail(id){
	let data = {
		regionid:getRegionId(),
		zoneid:getZoneId(),
		//uuid:networkid
		id
	}
	return request({
		//url:'console/network/subnetdata/'+networkid+'/',
		url:'console/network/subnets/',
		method:'get',
		params:data
	})

}

export function GetACLListDetail(networkid){
	let data = {
		regionid:getRegionId(),
		networkid
	}
	return request({
		url:'console/network/securitygroups/',
		method:'get',
		params:data
	})

}

export function EcmAction(servers,params){
	let data = {
		regionid:getRegionId(),
    servers,
    operation:params.action
  }
  return request({
    url:'console/ecm/ecs/action/',
		method:'post',
		data
	})

}

//获取镜像列表
export function getEcmImages(params){
	if(!params){
		params = {
			regionid:getRegionId(),
			zoneid:getZoneId(),
		}
	}else{
		params.zoneid = getZoneId();
		params.regionid = getRegionId();
	}
	return request({
		//url:'console/ecm/ecs/images/',
		url:'console/ecm/ecs/orderimages/',
		method:'get',
		params:params
	});
}
//OS 镜像 修改删除
//修改镜像
export function EditImagesByOs(params){
	
	params.regionid = getRegionId();
	
	return request({
		url:'console/ecm/ecs/images/',
		method:'put',
		data:params
	})
}
//创建私有镜像
export function CreateImageByOs(params){
	params.regionid = getRegionId();
	return request({
		url:'console/ecm/ecs/images/',
		method:'post',
		data:params
	})
}
//删除私有镜像
export function DeleteImageByOs(id){
	let data= {
		regionid:getRegionId(),
		id
	}
	return request({
		url:'console/ecm/ecs/images/',
		method:'delete',
		data
	})
}

//虚拟私有ACLLIST或者叫安全组
export function getEcmSecurityGroups(params){
	return request({
		url:'console/network/securitygroups/',
		method:'get',
		params:params
	});
}
//获取os安全组列表
export function GetEcmSecByOs(server_id){
	let data = {
		regionid:getRegionId(),
		zoneid:getZoneId()
	}
	return request({
		url:'console/ecm/ecs/servers/' + server_id + '/os-security-groups/',
		method:'get',
		params:data
	})
}
//获取资源池列表
export function getEcmPlatforms(params){
	return request({
		url:'console/index/platform/',
		method:'get',
		params:params
	});
}
//获取可用分区列表
export function getEcmZones(params){
	return request({
		url:'console/ecm/ecs/zones/',
		method:'get',
		params:params
	});
}
//获取密钥对列表
export function getEcmOsKeypairs(params){
	if(params){
		params.regionid = getRegionId()
		params.zoneid = getZoneId()
	}else{
		params = {
			regionid:getRegionId(),
			zoneid:getZoneId()
		}
	}
	
	return request({
		url:'console/ecm/key/os-keypairs/',
		method:'get',
		params:params
	});
}
//创建密钥对
export function CreateOsKeypairs(params){
	params.regionid = getRegionId();
	return request({
		url:'console/ecm/key/os-keypairs/',
		method:'post',
		data:params
	});
}
//删除密钥对
export function DeleteKeypairs(name){
	let params = {
		regionid:getRegionId(),
		name
	}
	return request({
		url:'console/ecm/key/os-keypairs/',
		method:'delete',
		data:params
	});
}

//获取虚拟私有云列表
export function getEcmVpcs(params){
	return request({
		url:'console/network/vpcs/',
		method:'get',
		params:params
	});
}
//云服务器订购
export function getEcmBuyserver(params){
	return request({
		url:'console/ecm/ecs/buyserver/',
		method:'POST',
		data:params
	});
}
//获取规格参数
export function getServerextenddata(params){
	//params.regionid = getRegionId();
	return request({
		url:'console/ecm/ecs/serverextenddata/',
		method:'get',
		params:params
	});
}
//弹性公网IP列表
export function getEcmEipsdata(params){
	params.regionid = getRegionId();
	return request({
		url:'console/network/eipsdata/',
		method:'get',
		params:params
	});
}
/*获取规格列表*/
export function GetFlavor(){
	let data = {
		regionid:getRegionId(),
	}
	return request({
		url:'console/ecm/ecs/flavors/',
		method:'get',
		params:data
	})

}
/*远程登录*/
export function TelnetVnc(serverid){
	let data = {
		regionid:getRegionId(),
	}
	return request({
		url:'console/ecm/ecs/vncconsoles/?instance_uuid=' +serverid,
		method:'get',
		params:data
	})
}

/*变更规格*/
export function ChangeSpc(serverid,cpu,mem){
	let data = {
		regionid:getRegionId(),
		cpu,
		mem
	}
	return request({
		url:'console/ecm/ecs/serverextend/'+serverid+'/',
		method:'post',
		data
	})


}
//获取变更规格列表
export function SpcExtend(){
	let data = {
		regionid:getRegionId()
	}
	return request({
		url:'console/ecm/ecs/serverextenddata/',
		method:'get',
		params:data
	})
}
/*重装系统*/
export function Reinstall(serverid,image_id,password){
	let data = {
		regionid:getRegionId(),
		image_id,
		password
	}
	return request({
		url:'console/ecm/ecs/servers/'+serverid+'/rebuild/',
		method:'post',
		data
	})


}
/*快照列表*/
export function GetSnapshotList(params){
	/*let data = {
		regionid:getRegionId(),
		name:params ? params.name : '',
		id:params ? params.id : '',
		limit:params ? params.limit : 10,
		page:params ? params.page : 1
	}*/
	params &&(params.regionid = getRegionId()) && (params.zoneid = getZoneId())
	return request({
		//url:'console/ecm/ecs/servers/00000000-0000-0000-0000-000000000000/vmsnapshot/',
		url:'console/ecm/ecs/vmsnapshots/',
		method:'get',
		params
	})
}

/*创建快照*/
export function MakeSnapshot(serverid,name){
	let data  ={
		regionid:getRegionId(),
		name,
	}
	return request({
		url:'console/ecm/ecs/servers/'+serverid+'/vmsnapshot/',
		method:'post',
		data
	})
}
/*删除快照*/
export function DeleteSnapshot(snapshotid){
	let data  ={
		regionid:getRegionId(),
	}
	return request({
		url:'console/ecm/snapshots/vmsnapshot/'+snapshotid+'/',
		method:'delete',
		data
	})
}

/*回滚快照*/
export function RebackSnapshot(snapshotid){
	let data  ={
		regionid:getRegionId(),
	}
	return request({
		url:'console/ecm/snapshots/vmsnapshot/'+snapshotid+'/',
		method:'post',
		data
	})
}
/*续订*/
export function RenewEcm(serverid,params){
	let data  ={
		regionid:getRegionId(),
		id:serverid,
		cycleType:params.cycleType,
		cycleCnt:params.cycleCnt
	}
	return request({
		url:'console/ecm/ecs/renew/',
		method:'post',
		data
	})
}
/*退订*/
export function Refundorder(serverid,des){
	let data = {
		regionid:getRegionId(),
		des
	}
	return request({
		url:'console/refundorder/'+serverid+'/',
		method:'post',
		data
	})
}
/*重置密码*/
export function ResetPwd(serverid){
	let data  ={
		regionid:getRegionId(),
    	instance_uuid:serverid,
	}
	return request({
		url:'/console/ecm/ecs/passwords/',
		method:'post',
		data
	})
}
/*更改密码 OS*/
export function ChangePwd(instance_id,new_password){
	let data = {
		regionid:getRegionId(),
		new_password
	}
	return request({
		url:`console/ecm/ecs/servers/${instance_id}/password/`,
		method:'post',
		data
	})
}
/*获取密码*/
export function GetPwd(serverid){
	let data  ={
		regionid:getRegionId(),
	}
	return request({
		url:'console/ecm/ecs/servers/'+serverid+'/password/',
		method:'get',
		params:data
	})
}

/*绑定弹性公网IP*/
export function EcmBindEip(params){
	let data  ={
		regionid:getRegionId(),
		server_id:params.serverid
	}
	let floatId = params.id
	return request({
		url:'console/network/eip/eipbind/'+floatId+'/',
		method:'post',
		data
	})
}
/*解绑弹性公网IP*/
export function EcmUnbindEip(id){
	let data  ={
		regionid:getRegionId(),
	}
	return request({
		url:'console/network/eip/eipbind/'+id+'/',
		method:'delete',
		data
	})
}
/*发送多个并发请求*/
export function requestsAll(RequestsList,Callback){
	axios.all(RequestsList)
	  .then(axios.spread(Callback));
}
