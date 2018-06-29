import Cookies from 'js-cookie'
import { loginByUsername, logout, getUserInfo, getRegionList } from '@/api/login'
import { getToken, setToken, removeToken, getRegionId, setRegionId } from '@/utils/auth'


const user = {
  state: {
    stack:'',
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    email:'',
    avatar: '',
    introduction: '',
    regionId:'',
    regionType:'',
    regionList:[],
    roles: [],
    setting: {
      articlePlatform: []
    },
    echartsList: [],
    language: Cookies.get('language') || 'zh'
  },

  mutations: {
    SET_STACK: (state, code) => {
    state.stack = code
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_EMAIL:(state, email)=>{
    	state.email = email
    },
    SET_ID:(state, id)=>{
    	state.id = id
    },
    SET_REGIONID:(state,data)=>{
    	state.regionList = data.platforms;
    },
    SET_USER:(state,data)=>{
    	state.user = data;
    },
    SET_REGIONTYPE:(state,type)=>{
    	state.regionType = type;
    },
    ADD_ECHARTS:(state,chart)=>{
      state.echartsList.push(chart);
    },
    CLEAR_ECHARTS:(state,chart)=>{
      state.echartsList = chart;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          console.log(data)
          commit('SET_TOKEN', getToken())
          //setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          commit('SET_STACK', data.stack)
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.customer_name)
          commit('SET_EMAIL', data.email)
          commit('SET_ID', data.id)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_USER',data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetRegionId({ commit, state }){
    	return new Promise((resolve,reject)=>{
    		getRegionList().then((res)=>{
    			const data = res.data;
    			//第一次设置
    			//setRegionId(data.platforms[0].uuid)
    			commit('SET_REGIONID',data)
    			resolve(res)
    		}).catch((error)=>{
    			reject(error)
    		})
    	})
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },
    //动态修改资源池
    changeRegionType({commit},type){
    	commit('SET_REGIONTYPE',type)
    }
  }
}

export default user
