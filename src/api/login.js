import request from '@/utils/request'

export function loginByUsername(email,password){
  const data = {
    email,
    password
  }
  return request({
    url: 'login/',
    method: 'post',
    data
  })
}
//验证密码
export function validationPw(password,regionid){
  const data = {
    password,
    regionid
  }
  return request({
    url: '/console/api/adminorder/verfiypassword/',
    method: 'post',
    data
  })
}

export function logout(){
	return request({
    url: 'logout/',
    method: 'get',
    data:{
    	regionid:'all'
    }
  })
}

export function getUserInfo(token) {
  return request({
    url: 'console/ecm/rest/me/',
    method: 'get',
    params: {
    	regionid:'all'
    }
  })
}

export function getRegionList(){
	return request({
		url:'console/index/platform/',
		method:'get',
		params: {
    	regionid:'all'
    }
	})

}

//修改用户密码
export function ChangePwd(data){
	return request({
		url:'console/api/adminorder/changepasswd/',
		method:'post',
		params:{
			regionid:'all'
		},
		data
	})
}
