import ecmRouter from './ecm'
// import yunRouter from './yun'

//因为嵌套路由问题，把所有云服务器下面的路由嵌套到ecm下面
ecmRouter.children.push();


export default ecmRouter;
