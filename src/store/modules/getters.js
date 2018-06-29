const getters = {
  //sidebar: state => state.app.sidebar,
  language: state => state.user.language,
  //visitedViews: state => state.tagsView.visitedViews,
  //cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  //avatar: state => state.user.avatar,
  name: state => state.user.name,
  email:state => state.user.email,
  id: state => state.user.id,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  regionId: state => state.user.regionId,
  regionType:state => state.user.regionType
  //permission_routers: state => state.permission.routers,
  //addRouters: state => state.permission.addRouters,
  //errorLogs: state => state.errorLog.logs
}
export default getters
