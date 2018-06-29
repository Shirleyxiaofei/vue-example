/**
 * Created by liudongxu on 2018/1/16.
 */
import request from '@/utils/request'
import { getRegionId, getZoneId } from '@/utils/auth'
//查询异步任务
export function queryAsyncJob(jobid){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/ecm/jobs/'+jobid+'/',
    method:'get',
    params:params
  })
}

export function listZone(){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/ecm/ecs/zones/',
    method:'get',
    aysnc:'false',
    params:params
  })

}


export function getVpcList(params){
  /*let data;
  if(params.name){
    data= {
      limit: params.limit || 10,
      regionid:getRegionId(),
      zoneid:getZoneId(),
      page:params.page || 1,
      status:params.status,
      id:params.id,
      name:params.name
    }
  }else{
    data = {
      limit: params.limit || 10,
      regionid:getRegionId(),
      zoneid:getZoneId(),
      page:params.page || 1,
      status:params.status,
      id:params.id,
      keyword:params.keyword
    }
  }*/
 params.regionid = getRegionId();
 params.zoneid = getZoneId();

  return request({
    url:'console/network/vpcs/',
    method:'get',
    params
  })

}
export function RegiongetVpcList(params,zoneid){
  let data;
    data = {
      limit: params.limit || 100,
      regionid:params.regionid,
      zoneid:zoneid,
      page:params.page || 1,
    }
  return request({
    url:'console/network/vpcs/',
    method:'get',
    params:data
  })

}
export function creatVpc(data){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/vpcs/',
    method:'post',
    params:params,
    data
  })

}
export function GetVpcDetail(serverId,detail){
  let data = {
    id:serverId,
    regionid:getRegionId(),
   	zoneid:getZoneId(),
   	detail
  }
  console.log(data)
  return request({
    url:'console/network/vpcs/',
    method:'get',
    params:data
  })

}
export function getNetList(params){
  let data
  if(params.name){
    data= {
      limit: params.limit || 10,
      regionid: getRegionId(),
      page: params.page || 1,
      id: params.id,
      vpc_id: params.vpcid,
      zoneid:getZoneId(),
      subnet_name: params.name
    }
  }else{
      data= {
        limit: params.limit || 10,
        regionid:getRegionId(),
        zoneid:getZoneId(),
        page:params.page || 1,
        id:params.id,
        vpc_id:params.vpcid,
        keyword:params.keyword
    }
  }
  return request({
    url:'console/network/subnets/',
    method:'get',
    params:data
  })
}
export function getAclList(params){
  let data
  if(params.name){
    data = {
      limit: params.limit || 10,
      regionid:getRegionId(),
      page:params.page || 1,
      name:params.name,
      vpcid:params.id
    }
  }else if(params.search){
  	data = {
      limit: params.limit || 10,
      regionid:getRegionId(),
      page:params.page || 1,
      name:params.name,
      id:params.id
    }
  }else{
    data = {
      limit: params.limit || 10,
      regionid:getRegionId(),
      page:params.page || 1,
      keyword:params.keyword,
      vpcid:params.id
    }
  }

  return request({
    url:'console/network/securitygroups/',
    method:'get',
    params:data
  })
}
export function getAclDetailById(id){
	let data = {
		id,
		regionid:getRegionId()
	}
	return request({
    	url:'console/network/securitygroups/',
	    method:'get',
	    params:data
	  })
}
export function getDefaultAcl(params){
   	let data = {
      limit: params.limit || 10,
      regionid:getRegionId(),
      page:params.page || 1,
      default:params.default
    }
  return request({
    url:'console/network/securitygroups/',
    method:'get',
    params:data
  })
}
export function deleteVpc(uuid){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/vpcs/'+uuid+'/',
    method:'delete',
    params:params
  })
}
export function editVpc(uuid,data){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/vpcs/'+uuid+'/',
    method:'put',
    params:params,
    data
  })
}
export function deleteSubnet(uuid,vpcid){
  let params = {
    regionid:getRegionId(),
    vpcid:vpcid
  }
  return request({
    url:'console/network/subnets/'+uuid+'/',
    method:'delete',
    params:params
  })
}
export function editSubnet(uuid,data){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/subnets/'+uuid+'/',
    method:'put',
    params:params,
    data
  })
}
export function createSubnet(data){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'/console/network/subnets/',
    method:'post',
    params:params,
    data
  })
}
// export function getAclList(params){
//   let data = {
//     limit: params.limit || 10,
//     page:params.page || 1,
//     id:params.id
//   }
//   return request({
//     url:'/console/network/securitygroups/',
//     method:'post',
//     params:data
//   })
// }

export function getEipList(params){
  console.log(params);
  let data;
  if(params.id){
    data = {
      limit: params.limit || 10,
      zoneid:getZoneId(),
      regionid: getRegionId(),
      page: params.page || 1,
      status: params.status,
      attached:params.attached,
      resource_type:params.resource_type,
      id:params.id
    }
  }else if(params.create){
  		data= {
	      	limit: params.limit,
	      	regionid:params.regionid,
	      	zoneid:getZoneId(),
	      	page:params.page,
	      	status:params.status,
	      	id:params.id,
	      	name:params.name
    	}
  }else{
    data = {
      limit: params.limit || 10,
      vpcid:params.vpcid,
      regionid: getRegionId(),
      page: params.page || 1,
      status: params.status,
      zoneid:getZoneId(),
      attached:params.attached,
      resource_type:params.resource_type,
      keyword:params.keyword,

    }
  }

  return request({
    url:'console/network/eipsdata/',
    method:'get',
    params:data
  })
}

export function CreateEip(data){
	data.platformId = getRegionId();
  return request({
    url:'console/network/eip/buyeip/',
    method:'post',
    data
  })
}
export function CreateAcl(data){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/securitygroups/',
    method:'post',
    params:params,
    data
  })
}
export function deleteAcl(uuid){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/securitygroups/'+uuid+'/',
    method:'DELETE',
    params:params,
  })
}
/*批量删除安全组*/
export function deleteAcls(data){
	let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/securitygroups/',
    method:'DELETE',
    params:params,
    data
  })
}
export function editAcl(uuid,data){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/securitygroups/'+uuid+'/',
    method:'put',
    params:params,
    data
  })
}
export function addRule(data){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/securitygrouprule/00000000-0000-0000-0000-000000000000/',
    method:'post',
    params:params,
    data
  })
}
export function deleteRule(uuid){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/network/securitygrouprule/'+uuid+'/',
    method:'delete',
    params:params,
  })
}
/*获取云服务器列表*/
export function getEcmList(params,vpcid){
	let data = {
		limit: params.limit || 10,
		regionid:getRegionId(),
		zoneid:getZoneId(),
		page:params.page || 1,
		status:params.status,
		id:params.id,
		displayname:params.displayname,
		vpcid:vpcid,
	}
	return request({
		url:'console/ecm/ecs/servers/',
		method:'get',
		params:data
	})

}

export function renewEip(data){
  let params = {
    regionid:getRegionId(),
  }
	return request({
		url:'console/ecm/ecs/renew/',
		method:'post',
    params:params,
		data
	})
}

export function unsubscribeEip(eip_id){
	let data = {
		regionid:getRegionId(),
	}
	return request({
		url:'console/refundorder/'+eip_id+'/',
		method:'post',
		data
	})
}

export function upgradeEip(bandwidth,eip_id){
	let data = {
		regionid:getRegionId(),
		bandwidth:bandwidth,
	}
	return request({
		url:'console/network/eip/eipextend/'+eip_id+'/',
		method:'post',
		data
	})
}

export function GetEipDetail(eipId){
	let data = {
		regionid:getRegionId(),
		zoneid:getZoneId(),
		id:eipId
	}
	return request({
		url:'console/network/eipsdata/',
		method:'get',
		params:data
	})

}

export function mappingEip(server_id,eip_id,fixed_ip_address){
	let data = {
		regionid:getRegionId(),
		server_id,
		fixed_ip_address,
	}
	return request({
		url:'console/network/eip/eipbind/'+eip_id+'/',
		method:'post',
		data
	})
}


export function portMappingEip(dataMsg){
	let data;
	if(dataMsg.data){
		data= {
			regionid: getRegionId(),
			publicip_uuid: dataMsg.id,
			privateport: dataMsg.rule.privateport,
	        privateendport: dataMsg.rule.privateendport,
	        publicendport: dataMsg.rule.publicendport,
	        publicport: dataMsg.rule.publicport,
	        instance_uuid: dataMsg.data.id,
	        protocol: dataMsg.rule.protocol.toLowerCase(),
	        subnet_uuid:dataMsg.data.nic[0].networkid,
		}
	}else{
		data= {
			regionid: getRegionId(),
			publicip_uuid: dataMsg.id,
			privateport: dataMsg.rule.privateport,
	        privateendport: dataMsg.rule.privateendport,
	        publicendport: dataMsg.rule.publicendport,
	        publicport: dataMsg.rule.publicport,
	        instance_uuid: dataMsg.instance_uuid,
	        protocol: dataMsg.rule.protocol.toLowerCase(),
	        subnet_uuid:dataMsg.subnet_uuid,
		}
	}
	return request({
		url:'console/network/portforwardingrules/',
		method:'post',
		data
	})
}

export function deleteEip(eip_id){
	let data = {
		regionid:getRegionId(),
	}
	return request({
		url:'console/network/eip/eipbind/'+eip_id+'/',
		method:'delete',
		data
	})
}

//配额
export function queryQuota(){
  let params = {
    regionid:getRegionId(),
  }
  return request({
    url:'console/api/adminorder/customerquotas/',
    method:'get',
    params:params
  })
}

//端口转发列表
export function GetPortDetail(params){
  params.regionid = getRegionId();

  return request({
    url:'console/network/portforwardingrules/',
    method:'get',
    params:params
  })
}

//查询续订方式
export function getrenewcycle(data){
  let params = {
    regionid:getRegionId(),
  }
	return request({
		url:'console/ecm/ecs/getrenewcycle/',
		method:'post',
    	params:params,
		data
	})
}
//删除端口转发规则
export function deletePort(portforwarding_id){
	let data = {
		regionid:getRegionId(),
	}
	return request({
		url:'/console/network/portforwardingrules/?id='+portforwarding_id,
		method:'delete',
		data
	})
}
