
var state = {
	running:'运行中',
	stopped:'关机',
	active:'运行中',
	shutoff:'关机',
	
	present:'',
	destroyed:'已销毁',
	expunging:'删除中',
	expunged:'已删除',
	rebuild:'重建中',
	resize:'规格变更中',
	stopping:'停止中',
	starting:'启动中',
	restarting:'重启中',
	ready:'正常',
	subnetactive:'正常',
	error:'错误',
	mounting:'挂载中',
	mount:'已挂载',
	'in-use':'已挂载',
	'available':'未挂载',
	uninstall:'未挂载',
	uninstalling:'卸载中',
	allocated:'已绑定',
	allocatin:'未绑定',
	releasing:'释放',
	unbinding:'未绑定',
	down:'未绑定',
	up:'已绑定',
	binding:'已绑定',
	bindings:'绑定中',
	unbundings:'解绑中',
	instance:'一对一映射',
	portforwarding:'端口转发',
	loadbalancer:'负载均衡',
	backedup:'可用',
  	implemented:'已实施',
	backingup:'创建中',
	allocateds:'已分配',
	implemented:'已实施',
	setup:'正常',
	implementing:'实施中',
	
	creating:'创建中',
	inactive:'错误',
	enabled:'启用',
}


export function statFormat(item){
	item = item && item.toLowerCase();
	return state[item];

}

let volumeType = {
	'SATA':'普通IO',
	'SAS':'高IO',
	'SSD':'超高IO'
};
export function diskType(item){
	return volumeType[item];
}