import i18n from '@/lang'
import router from '@/router'

let list = [
	{
		id:"ecm",
		name:i18n.common.security,
		subList:[
			{
				title:i18n.common.dashboard,
				path:'/ecm/ecmList',
				id:'ecmSub'
			},
			{
				title:i18n.common.serverList,
				path:'/yun/YunList',
				id:'ecmEbsSub'
			},
			{
				title:i18n.common.inventory,
				path:'/ecm/ebs/ebsList',
				id:'ecmEbsSub',
				isSub: true,
				hide: true,
				index: '1-0',
				subList: [
					{
						title: '概览',
						path: '/monitor/ecmMonitor',
						index: '1-0',
					},
					{
						title: '监听端口',
						path: '/monitor/ecmMonitor',
						index: '1-0',
					},
					{
						title: '运行进程',
						path: '/monitor/ecmMonitor',
						index: '1-0',
					}
				]
			},
			{
				title:i18n.common.intrusionDetection,
				path:'/ecm/ebs/ebsList',
				id:'ecmEbsSub',
				isSub: true,
				hide: true,
				index: '1-0',
				subList: [
					{
						title: '异常登录',
						path: '/monitor/ecmMonitor',
						index: '1-0',
					}
				]
			},
			{
				title:i18n.common.integrity,
				path:'/ecm/ebs/ebsList',
				id:'ecmEbsSub',
				isSub: true,
				hide: true,
				index: '1-0',
				subList: [
					{
						title: '检测事件',
						path: '/monitor/ecmMonitor',
						index: '1-0',
					},
					{
						title: '检测规则',
						path: '/monitor/ecmMonitor',
						index: '1-0',
					}
				]
			},
			{
				title:i18n.common.setting,
				path:'/ecm/ebs/ebsList',
				id:'ecmEbsSub',
				isSub: true,
				hide: true,
				index: '1-0',
				subList: [
					{
						title: '告警设置',
						path: '/monitor/ecmMonitor',
						index: '1-0',
					}
				]
			},
		]
	},
]

export default list
