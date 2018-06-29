import i18n from '@/lang'

import Layout from '@/views/Layout'
import EcmDashboard from '@/views/ecm/ecmDashboard'
import EcmList from '@/views/ecm/EcmList'

let Router ={
	path:'/ecm',
	name:'ecm',
	component:Layout,
	redirect:'/ecm/ecmDashboard',
	children:[
		{
      path:'ecmDashboard',
      name:'ecmDashboard',
      component:EcmDashboard,
    },
    {
    	path:'ecmList',
    	name:'ecmList',
    	component:EcmList,
    	props: { name: i18n.ecm.ecmPathName, buttonText: i18n.ecm.ecmButtonName },
      // children:[
      //   {
      //     path:'yunList',
      //     name:'yunList',
      //     component:YunList
      //   }
      // ]
    }
        
	]
};



export default Router;