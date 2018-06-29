<<<<<<< HEAD
<template>
	<div class="ecmmain">
		<RegionList :name ='name' :regionData='regionData' :buttonText ='buttonText' @create='create' @changeRegion = 'changeRegion'></RegionList>
		<div class="content">
			<div class="content_top">
				<!-- <ConsoleSearch
					:optionsValue ='optionsValue'
					@searchEvent = 'search'
					:statusOnOff=true
					@clear = 'clear'
					:PublicOperation="PublicOperation"
					@PublicOperEvent="aciton"
					:disableData='changeTableData'
					@refreshEvent = 'refresh'
					></ConsoleSearch>
			</div>
			<div id="ecmTable">
				<ConsoleTable ref="tableChild"
					:tableData='ecmListData'
					:tableOptions="tableOptions"
					:checkBox=true
					@selectChange = "selectChange"
					:operationOrNot=true
					:OperationEvents='ecmOperation'
					@buttonClick="handleClick"
					@changeTable="changeTable"
					:loading = 'loading'
					:dragable=true
					:Pagination = 'Pagination'
					@pagingEvent = 'pagingChange'
					></ConsoleTable> -->
			</div>

		</div>
	</div>
</template>

<script>
	import service from '@/utils/request'
	import RegionList from '@/components/RegionList'
	import ConsoleSearch from '@/components/ConsoleSearch'
	import ConsoleTable from '@/components/ConsoleTable'
	import i18n from '@/lang'

	import { getEcmList, GetEcmDetail, EcmAction, GetFlavor, TelnetVnc, ChangeSpc, Reinstall, MakeSnapshot, RenewEcm, GetPwd, ResetPwd,ChangePwd, Refundorder, GetRegionNum } from '@/api/ecm'
	import { queryQuota} from '@/api/vpc'
	import { GetJobDetail } from '@/api/console'

	import { getRegionId, setRegionId, GetVnc } from '@/utils/auth'
	import { timeExpired, timeService } from '@/utils/timeformat'

	import ConsoleAction from '@/components/ConsoleAction'
	// import ecmSystem from './ecmSystem'
	import ecmChangeSpc from './ecmChangeSpc'
	// import ecmMakeSnapshot from './ecmMakeSnapshot'
	import ecmRenew from './ecmRenew'
	// import ecmResetPwd from './ecmResetPwd'
	let LodingCount = 0;
	export default {
		props: {
			name: [String],
			buttonText: [String]
		},
		components: {
			RegionList,
			ConsoleSearch,
			ConsoleTable,
			ConsoleAction
		},
		data() {
			return {
				regionId: '',
				totalCount: 0,
				loading: false,
				snapshotLimitQuota:30,
//				expiredShow:0,
				changeTableData:[],
				regionData:[],
				noTimeList:[],
				unRenewList:[],
				unOperationList:[],
				jobIds:[],
				newEcmName:'',
				detroyAutoRefresh:false,
				form:{
					cpu:'1核'
				},
				filter: {
					status: '',
					limit: 10,
					page: 1,
					keyword: '',
					id: ''
				},
				Pagination: {
					'pagingData': [10, 20, 50],
					'total': 0,
					'show': false
				},
				ecmListData: [],
				multipleSelection: [],
				path: '/ecm/ecmDetail',
				selectOptions: [{
					value: '',
					label: i18n.common.allStatus
				}, {
					value: 'Running',
					label: i18n.common.active
				}, {
					value: 'Stopped',
					label: i18n.common.shutOff
				}],
				optionsValue: '',
				PublicOperation: [{
						value: i18n.common.started,
						disable: false,
						fun: 'start',
						state:'ShutState'
					},
					{
						value: i18n.common.shutOff,
						disable: false,
						fun: 'stop',
						state:'RunState'
					},
					{
						value: i18n.common.restart,
						disable: false,
						fun: 'reboot',
						state:'RunState'
					},
					{
						value: i18n.common.renew,
						disable: false,
						fun: 'renew',
						state:'All'
					}
				],
				tableOptions: [{
						prop: 'name',
						propId: 'id',
						label: i18n.common.nameOrID,
						width: '135px',
						temp: true,
						detail: true,
						path: '/ecm/ecmDetail',
					}, {
						prop: 'templatedisplaytext',
						props: 'os_types',
						label: '',
						width: '40px',
						temp: true,
						ims: true,
					}, {
						prop: 'stateTxt',
						label: i18n.common.status,
						/*width:'120px',*/
						temp: true,
						filter: true,
						status: true,
						selectOptions: [{
							value: 'Running',
							text: i18n.common.active
						}, {
							value: 'Stopped',
							text: i18n.common.shutOff
						}],
					},
					{
						prop: 'ipText',
						label: i18n.common.IPAddress,
						ip: true,
						html:true
					}, {
						prop: 'flavorTxt',
						label: i18n.common.flavor,
					},
					{
						prop: 'created',
						label: i18n.common.createAt,
					},/* {
						prop: 'lastStartTime',
						label: i18n.ecm.lastStartTime,
					}, {
						prop: 'running_time',
						label: i18n.ecm.runningTime,
					}*/
				],
				ecmOperation: [{
					value: i18n.ecm.changeSpc,
					id: 'changeSpc',
					fun: (data) => {
						return this.changeSpc(data)
					}
				}, {
					value: i18n.ecm.telnet,
					id: 'telnet',
					fun: (data) => {
						return this.telnet(data);
					}
				}, {
					value: i18n.ecm.makeSnapshot,
					id: 'makeSnapshot',
					fun: (data) => {
						return this.makeSnapshot(data)
					}
				}, {
					value: i18n.ecm.resetPw,
					id: 'resetPw',
					fun: (data) => {
						return this.resetPw(data)
					}
				}, {
					value: i18n.ecm.getPwd,
					id: 'getPwd',
					fun: (data) => {
						return this.getPwd(data)
					}
				}, {
					value: i18n.ecm.reinstall,
					id: 'reinstall',
					fun: (data) => {
						return this.reinstall(data)
					}
				}]

			}
		},
		methods: {
			selectChange(value) {
				this.filter.keyword = ''
				this.filter.id = ''
				this.filter.status = value;
				this.filter.page = 1;
				this.getEcmList()
			},
			search(filter) {
				this.filter.status = ''
				this.filter.keyword = ''
				this.filter.id = ''
				if(filter.name == 'name') {
					filter.name = 'keyword'
				}
				console.log(filter)
				this.filter[filter.name] = filter.value;
				this.getEcmList()
			},
			refresh(action) {
				//this.filter.status = ''
				//this.filter.keyword = ''
				//this.filter.id = ''
				this.getEcmList(action)
				this.getRegionNums()
			},
			clear(){
      			this.filter.keyword='';
      			this.filter.name='';
      			this.filter.id=''
      		},
			aciton(action,label){
				let h = this.$createElement
				let view = action == 'renew' ? ecmRenew : ConsoleAction;
				let data = this.filterData(this.changeTableData, action);
				console.log(data);
				/*if(!data.data.length){
					this.$message({
						message:data.actionWaring,
						type:'error'
					})
					return;
				}*/
				data.type = 'warn'
				data.title = label;
				let form = {};

				let option = {
					data,
					view,
					form
				}
				/*if(action == 'renew'){
					option.actionTips = ['(按月购买的产品只能按月续费,按年购买的产品只能按年续费)'];
				}*/

				this.$alertDialog(option).then((res) => {
					if(action == 'telnet') {
						this.telnet(data.data[0]);
					} else if(action == 'resetPw') {
						this.resetPw(data.data[0]);
					} else {
						let servers = []
						let promise, params;
						if(action == 'renew') {
							promise = RenewEcm
							params = {
								cycleType: res.cycleType,
								cycleCnt: res.cycleCnt
							}
							servers = res.data;
						} else {
							console.log(data);
							data.data[0].map((item) => {
								servers.push(item.id)
							})
							promise = EcmAction
							params = {
								action
							}
						}
						console.log(params, servers)
						promise(servers, params).then((res) => {
							console.log(res)
							this.$message({
								message: '操作成功',
								type: 'warning'
							})
							let actions = {
								action,
								servers
							}
							this.refresh(actions)
							let response = res.data.response || res.data.results || undefined;
							this.autoRefresh(response)
						}).catch((req) => {
							console.log(req)
							/*this.$message({
							 message:'操作失败：'+req.msg,
							 type:'error'
							 })*/
						})
					}
				})

			},
			filterData(data, action) {
				let actionLable = [{
						prop: 'name',
						label: i18n.common.name,
						temp: true,
						detail: true,
					},
					{
						prop: 'stateTxt',
						label: i18n.common.status,
						temp: true,
						status: true
					},
					{
						prop: 'expire_date',
						label: i18n.common.finishAt,

					}
				];
				let renewLable = [{
					prop: 'name',
					label: i18n.common.name,
					temp: true,
					detail: true,
				}, {
					prop: 'privateIp',
					label: i18n.common.privateIp,
				},
				/*{
					prop:'chargeMode',
	        		label:i18n.common.chargeMode,
	        	},*/
				{
					prop: 'templatedisplaytext',
					label: i18n.common.ims,
				}, {
					prop: 'expire_date',
					label: i18n.common.finishAt,

				}, {
					prop: 'stateTxt',
					label: i18n.common.status,
					temp: true,
					status: true
				}];

				let tableData = {};
				let _this = this;
				_this.unRenewList = [];
				_this.unOperationList = [];
				/*定义过滤的头部选项*/
				let filterAction = ['start', 'stop', 'delete', 'reboot', 'unsubscribe', 'telnet', 'resetPw'];
				let filterRenew = ['renew'];
				/*对操作进行顾虑 确定头部选项是哪些*/
				filterAction.find((item) => {
					return item == action
				}) && (tableData.option = actionLable)

				filterRenew.find((item) => {
					return item == action
				}) && (tableData.option = renewLable)

				/*根据action 过滤数据*/
				data = data.filter((item) => {

					switch(action) {
						case 'start':
							tableData.actionTip = [i18n.ecm.actionStartTip, '', '开机'];
							tableData.actionWaring = '只有在关机状态下才能进行此操作';
							if(item.state == 'Stopped' || item.status == 'SHUTOFF') {
								return true
							} else {
								_this.unOperationList.push(item);
								return false
							}
							break;
						case 'stop':
							tableData.actionWaring = '只有在开机状态下才能进行此操作';
							tableData.actionTip = [i18n.ecm.actionStopTip, i18n.ecm.actionStopTip2, '关机'];
							if(item.state == 'Running' || item.status == 'ACTIVE') {
								return true
							} else {
								_this.unOperationList.push(item);
								return false
							}
							break;
						case 'reboot':
							tableData.actionWaring = '只有在开机状态下才能进行此操作';
							tableData.actionTip = [i18n.ecm.actionRebootTip, i18n.ecm.actionRebootTip2, '重启'];
							if(item.state == 'Running' || item.status == 'ACTIVE') {
								return true
							} else {
								_this.unOperationList.push(item);
								return false
							}
							break;
						case 'renew':
							tableData.actionWaring = '只有在开机或关机状态下才能进行此操作';
							tableData.actionTip = [i18n.ecm.actionRenewTip, '云服务器'];
							if(item.state == 'Stopped' || item.state == 'Running' || item.status == 'SHUTOFF' || item.status == 'ACTIVE') {
								return true
							} else {
								_this.unRenewList.push(item);
								return false
							}
							break;
			            case 'telnet':
			              tableData.actionWaring='只有在开机状态下才能进行此操作';
			              tableData.actionTip=[i18n.ecm.telnetTip,'远程登录会打开新的页面','远程登录'];
			              if(item.state == 'Running' || item.status == 'ACTIVE'){
			                return true
			              }else{
			                _this.unOperationList.push(item);
			                return false
			              }
			              break;
			            case 'resetPw':
			              tableData.actionWaring = '';
			              tableData.actionTip = [i18n.ecm.telnetTip, '重置密码'];
			              if (item.state == 'Stopped' && item.passwordenabled) {
			                return true
			              } else {
			                _this.unOperationList.push(item);
			                return false
			              }
			              break;
			            default:
							return true
					}
				});
				tableData.data = [data];
				if(action == 'renew') {
					tableData.data.push(_this.unRenewList);
				} else {
					tableData.data.push(_this.unOperationList);
				}
				return tableData
			},
			changeTable(val) {
				this.changeTableData = val;
				let RunState = this._.find(this.changeTableData, {
					'state': "Running"
				}) || this._.find(this.changeTableData, {
					'status': "ACTIVE"
				});
				let ShutState = this._.find(this.changeTableData, {
					'state': "Stopped"
				}) ||this._.find(this.changeTableData, {
					'status': "SHUTOFF"
				});
				let ShutAndImg = this.changeTableData.filter(function(item){
					if(item.state == 'Stopped' && item.passwordenabled){
						return true
					}else{
						return false
					}
				}).length;
				let active ={
					RunState,
					ShutState,
					ShutAndImg,
					All:RunState || ShutState
				}
				let count = 0;
				if(this.changeTableData.length) {
					let errorData = this.changeTableData.filter(function(item) {
						return item.state == 'ERROR' || item.status == 'ERROR'
					});

					this.PublicOperation.map(item=>{
						if(errorData.length && errorData.length == this.changeTableData.length){
							item.disable = false
						}else{
							item.disable = !!active[item.state]
						}
						item.title = '';
					})
				}else{
					this.PublicOperation.map(item=>{
						item.disable = false
						item.title = '请选择云服务器'
					})
				}

			},
			telnet(rowData){
          		var ids='';
			    if(Object.prototype.toString.call(rowData)=='[object Array]'){
		            rowData.map(function(item){
		              ids=ids+','+item.id;
		            });
            		ids=ids.substr(1);
		        }else{
		            ids=rowData.id;
		        }
				let tempWin = window.open("","_blank");
				TelnetVnc(ids).then(res=>{
					let data = res.data.results;
			          let vncurl = this._.head(data).vnc_url || '' ;
			          tempWin.opener = null;
			          vncurl ? tempWin.location.href = vncurl : tempWin.close()

				}).catch(error=>{
					console.log(error)
					tempWin.close();
				})
			},
			changeSpc(rowData) {
				let view = ecmChangeSpc;
				let data = {}
				data.data = [];
				data.data.push(rowData)
				data.title = i18n.ecm.changeSpc;
				data.actionTip = [i18n.ecm.changeSpcTip],
					data.option = [{
							prop: 'name',
							label: i18n.common.name,
							temp: true,
							detail: true,
						},
						{
							prop: 'flavorTxt',
							label: i18n.common.flavor,

						},
						{
							prop: 'templatedisplaytext',
							label: i18n.common.ims,
						},
						{
							prop: 'created',
							label: i18n.common.createAt,
						},
						{
							prop: 'stateTxt',
							label: i18n.common.status,
						}
					]

				let form = {
					cpu: '',
					mem: ''
				}

				let option = {
					data,
					view,
					form
				}

				this.$alertDialog(option).then((formreq) => {
					console.log(formreq)
					ChangeSpc(rowData.id, formreq.cpu, formreq.mem).then((res) => {
						console.log(res)
						this.$message({
							message: '正在变更规格，请稍后',
							type: 'warning'
						})
						let that = this
						setTimeout(() => {
							that.refresh()
						}, 3000)

					}).catch((error) => {
						console.log(error)
						this.refresh()
					})
				})
			},
			reinstall(rowData) {
				let view = ecmSystem;
				let fun = () => {
					return ChangeSpc()
				}
				let data = {};
				let form = {
					image_id: ''
				}
				data.data = []
				data.data.push(rowData);
				data.actionTip = [i18n.ecm.reinstallTip];
				data.title = i18n.ecm.reinstall;

				let option = {
					data,
					view,
					form
				}
				this.$alertDialog(option).then((formData) => {

					Reinstall(rowData.id, formData.image_id,formData.password).then((res) => {
						this.$message({
							message: '正在一键重装，请稍后',
							type: 'warning'
						})
						this.refresh()
						let data = res.data.results;
						/*if(data[0].jobid !== ''){
							setTimeout(()=>{
								this.refresh()
							},6e3)
						}*/
						this.autoRefresh(data,'reinstall')
					}).catch((error) => {
						console.log(error)
					})
				})
			},

			makeSnapshot(rowData){
				let params ={
					resource:'snapshot',
					regionid:getRegionId()
				}
				let snapRemainCount;
				GetRegionNum(params).then( res => {
					let snapData = res.data.results[0].SNAPSHOT;
					snapRemainCount = this.snapshotLimitQuota - snapData.total_count;
					if(snapRemainCount > 0){
						let data ={}
						let view = ecmMakeSnapshot;
						data.actionTip = [i18n.ecm.snapshotTip]
						data.title = i18n.ecm.makeSnapshot;
						data.data = rowData
						let form ={}

						let option ={data,view,form}

						this.$alertDialog(option).then((form)=>{

							let name = form.name;
							MakeSnapshot(rowData.id,name).then((res)=>{
								console.log(res)
								this.$message({
									message:'正在创建快照，请稍后',
									type:'warning'
								})
							}).catch((error)=>{
								console.log(error)
							})
						})
					}else{
						this.$message({
				          	message: '快照配额不足!',
				          	type: 'warning'
				        });
					}
				})
			},
			makeIms(rowData){
				window.open(`/#/ecm/ims/createPrivateIms?instance_uuid=${rowData.id}`)
			},
			resetPw(rowData) {
				if(this.regionType == 'cs'){
					let ids = [];
					if(Object.prototype.toString.call(rowData) == '[object Array]') {
						rowData.map(function(item) {
							ids.push(item.id);
						})
					} else {
						ids.push(rowData.id);
					}
					ResetPwd(ids).then((res) => {
						this.$message({
							message: '正在重置密码，请稍后',
							type: 'warning'
						})
					}).catch((error) => {
						console.log(error)
					})
				}
				if(this.regionType == 'os'){
					let option ={
						data:{
							title:'重置密码',
							actionTip:['重置密码需要重启云主机，会影响您正在使用的业务，请谨慎操作。如有疑问，请拨打热线电话：4008109889']

						},
						form:{
							new_password:''
						},
						view:ecmResetPwd
					};
					this.$alertDialog(option).then(form=>{
						ChangePwd(rowData.id,form.new_password).then(res=>{
							this.$message({
								type:'success',
								message:'云服务器正在重置密码，请稍后'
							})
							this.refresh()
						})
					}).catch(error=>{
						console.log(error)
					})
				}
			},
			getPwd(rowData) {
				GetPwd(rowData.id).then((res) => {
					let data = res.data.results[0]
					let username = 'root'
					let password = data.encryptedpassword;
					let msg = '用户名: ' + username + ' 密码： ' + password;
					this.$msgbox({
						title: '获取密码',
						message: msg,
						showCancelButton: true,
					})
				}).catch((error) => {
					console.log(error)
				})

			},
			ubsubscribe(rowData) {
				let options = {
					data: {
						title: i18n.ecm.refundOrder,
						actionTip: [i18n.ecm.refundOrderTip],
						data: rowData,
						view: 'ubsubscribe'
					},
					view: ecmSystem,
					form: {
						describe: ''
					}
				}
				this.$alertDialog(options).then(formData => {
					console.log(formData)
					Refundorder(rowData.id, formData.describe).then(res => {
							this.$message({
								message: '正在退订，请稍后',
								type: 'warning'
							})
							this.refresh()
							console.log(res)
						})
						.catch(error => {
							console.log(error)
						})
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleClick(funName, rowData) {
				funName(rowData)
			},
			create() {
				window.open('/#/ecm/ecmCreate')
			},
			changeRegion(uuid) {
				service.cancle('CancelToken');
				//this.getRegionNums()
				//this.getEcmList()
				if(this.regionType){
					console.log(this.regionType)
				}
				this.refresh();
			},
			getDetail(id){
      			let _this = this;
      			let timer;
      			if(this.detroyAutoRefresh) return
      			GetEcmDetail(id).then((res)=>{
					let data = res.data.results;
					let servers = data.length && data[0] || item;
      				if(servers.no_time && servers.no_time == '1'){
      					setTimeout(()=>{
							_this.getDetail(servers.id)
						},5000)
      				}else{
      					_this.filterServers(servers)
	      				this.ecmListData.map((item,index) =>{
							if(item.id == servers.id){
								_this.$set(_this.ecmListData,index,servers)
								return true;
							}
						})
      					_this.addOperation(servers);
      					this._.remove(this.noTimeList,(item)=>{
							return item.id == servers.id;
						})
      				}
				}).catch((req)=>{
					console.log(req)
				})
      		},
      		autoRefreshTime(Ids){
      			if(Ids){
      				if(typeof(jobIds)=='string'){

      					this.getDetail(jobIds)

	      			}else if(Array.isArray(Ids)){
	      				Ids.map(item =>{
	      					console.log(item)
	      					item.id && this.getDetail(item.id)
	      				})
	      			}else{
	      				console.log(jobIds)
	      			}
      			}
      		},
			getEcmList(action) {
				let params = this.filter;
				this.loading = true;
				getEcmList(params).then((res) => {
					let servers = Array.from(res.data.results);
					let totalCount = res.data.total_count;
					this.filterServers(servers, action)
					this.ecmListData = servers;
					this.totalCount = totalCount;
					this.Pagination.total = this.totalCount;
					if(totalCount > this.Pagination.pagingData[0]) {
						this.Pagination.show = true
					}
					this.loading = false
				}).catch((error) => {
					if(error.message == 'CancelToken') {

					} else {
						this.loading = false
					}
					console.log(error)
				})

			},
			addOperation(server) {
				let startDisable = ['changeSpc', 'resetPw','makeIms','reinstall'];
				let stopDisable = ['telnet','changePwd'];
				let refundOrder = ['ubsubscribe']
				let pwdMenu = ['getPwd', 'resetPw']
				let menuState = ['stopping', 'starting', 'restarting', 'error','rebuild']
				/*定义操作 之变更规格*/
				let operation=[{
					value: i18n.ecm.changeSpc,
					id: 'changeSpc',
					fun: (data) => {
						return this.changeSpc(data)
					}
				}];

				/*创建快照*/
				let makeSnapshot = {
					value: i18n.ecm.makeSnapshot,
					id: 'makeSnapshot',
					fun: (data) => {
						return this.makeSnapshot(data)
					}
				};
				/*制作镜像*/
				let makeIms ={
					value:i18n.ecm.makeIms,
					id:'makeIms',
					fun:(data) =>{
						return this.makeIms(data)
					}
				}
				/*远程登录*/
				let telnet = {
					value: i18n.ecm.telnet,
					id: 'telnet',
					fun: (data) => {
						return this.telnet(data);
					}
				}
				/*重置密码*/
				let resetPwd = {
					value: i18n.ecm.resetPw,
					id: 'resetPw',
					fun: (data) => {
						return this.resetPw(data)
					}
				}
				/*获取密码*/
				let getPwd = {
					value: i18n.ecm.getPwd,
					id: 'getPwd',
					fun: (data) => {
						return this.getPwd(data)
					}
				}
				/*更改密码*/
				let changePwd = {
					value: i18n.ecm.resetPw,
					id: 'changePwd',
					fun: (data) => {
						return this.resetPw(data)
					}
				}
				/*一键重装*/
				let reinstall = {
					value: i18n.ecm.reinstall,
					id: 'reinstall',
					fun: (data) => {
						return this.reinstall(data)
					}
				}
				/*判断是否拥有远程登录*/
				let hasVnc = GetVnc();
				let that = this;
				if(hasVnc == 0) {
					operation = operation;
				}else if(hasVnc == 1) {
					operation.push(telnet)
				}else{
					operation.push(telnet)
				}
				/*判断是OS还是cs*/
				if('cs' == this.regionType){
					operation.push(makeSnapshot,resetPwd,getPwd,reinstall)
				}
				if('os' == this.regionType){
					operation.push(makeIms,changePwd,reinstall)
				}

				operation.map(item => {
					if('cs' == that.regionType) {
						'running' == server.state.toLowerCase() && startDisable.includes(item.id) && (item.disabled = true) && (item.title = "只有关机状态下才可进行此操作")
						'stopped' == server.state.toLowerCase() && stopDisable.includes(item.id) && (item.disabled = true) && (item.title = "只有开机状态下才可进行此操作")
						if(timeExpired(server.created, true)) {
							refundOrder.includes(item.id) && (item.disabled = true) && (item.title = "只有创建时间不超过7天的云主机才可退订")
						}
						if(!server.passwordenabled) {
							pwdMenu.includes(item.id) && (item.disabled = true) && (item.title = "该云主机未启用密码服务,请切换镜像")
						}
						if(menuState.includes(server.state.toLowerCase())) {
							item.disabled = true
						}

					}

					if('os' == that.regionType) {
						'active' == server.status.toLowerCase() && startDisable.includes(item.id) && (item.disabled = true) && (item.title = "只有关机状态下才可进行此操作")
						'shutoff' == server.status.toLowerCase() && stopDisable.includes(item.id) && (item.disabled = true) && (item.title = "只有开机状态下才可进行此操作")
						if(timeExpired(server.created_at, true)) {
							refundOrder.includes(item.id) && (item.disabled = true) && (item.title = "只有创建时间不超过7天的云主机才可退订")
						}
						/*if(!server.passwordenabled) {
							pwdMenu.includes(item.id) && (item.disabled = true) && (item.title = "该云主机未启用密码服务,请切换镜像")
						}*/
						if(menuState.includes(server.status.toLowerCase())) {
							item.disabled = true
							item.title="云服务器中间状态不可进行操作"
						}
					}
					if(server.expired) {
						item.disabled = true
						item.title = "当前云服务器已过期，请续订"
					}
				})
				this.$set(server, 'operation', operation)
			},
			filterServers(servers, action) {
				let _this = this;
				let _ = this._;
				let privateIp, flavor;
				if(Array.isArray(servers) && servers.length) {
					servers.forEach(function(item) {
						/*cs下的私有IP和规格*/
						if('cs' == _this.regionType) {
							privateIp = _.first(item.nic) ? _.first(item.nic).ipaddress : '--'
							flavor = item.cpunumber + '核 | ' + item.memory / 1024 + 'G';
							if(item.state.toLowerCase() !== 'restarting') {
								action && 'reboot' == action.action && action.servers.includes(item.id) && (item.state = 'restarting');
							}
						}
						/*cs下的私有IP和规格*/
						if('os' == _this.regionType) {
							let nics = item.addresses ? item.addresses[item.metadata.vpcname] : [];
							let addr = _.find(nics, {
								'OS-EXT-IPS:type': 'fixed'
							})
							privateIp = addr ? addr.addr : '--'
							let flavors = item.flavor;
							flavor = flavors ? (flavors.vcpus + '核 | ' + flavors.ram / 1024 + 'G') : '--';
							item.templatedisplaytext = item.metadata && item.metadata.image_name || '--';
						}

						//item.lastStartTime = item.last_start_time ? timeService(item.last_start_time) : '--';
						//item.running_time = item.running_time ? item.running_time + 'h' : '--';

						item.finishAt = item.expire_date ? timeService(item.expire_date) : '--';
						item.chargeMode = item.cycle_type == 'M' ? '按月' : '按年';

						if(item.os_type == '2') {
							item.os_types = 'windows'
						} else if(item.os_type == '1') {
							item.os_types = 'linux'
						} else if(item.os_type == '3') {
							item.os_types = 'redhat'
						} else if(item.os_type == '4') {
							item.os_types = 'ubuntu'
						} else {
							item.os_types = ''
						}

						//获取私有IP
						item.privateIp = privateIp || '--';
						/*转换ip显示*/
						item.ipText = privateIp !='--' ? item.publicip ? `${item.privateIp}(私)</br>${item.publicip}(公)`:`${item.privateIp}(私)` : '--';
						item.chargeMode = item.cycle_type == 'M' ? '按月' : '按年';
						item.flavorTxt = flavor || '--';

						item.expired = timeExpired(item.finishAt);
						item.showNum = 2;
						_this.addOperation(item);
						//cs 下的异步刷新
						item.jobid ? _this.autoRefresh(item.jobid) && (item.name == _this.newEcmName && _this.startTimer(item, 'clear')) : !item.id && (item.state.toLowerCase() == 'starting') && _this.getStarting(item)
						if(!item.jobid){
	      					if(item.no_time && item.no_time == '1'){
	      						_this.noTimeList.push({id : item.id});
	      					}
	      				}
					})
				} else {

					if('cs' == _this.regionType) {
						privateIp = _.first(servers.nic) ? _.first(servers.nic).ipaddress : '--'
						flavor = servers.cpunumber + '核 | ' + servers.memory / 1024 + 'G';
					}
					if('os' == _this.regionType) {
						let nics = servers.addresses[servers.metadata.vpcname]
						let addr = _.find(nics, {
							'OS-EXT-IPS:type': 'fixed'
						})
						privateIp = addr ? addr.addr : '--'
						let flavors = servers.flavor;
						flavor = flavors ? (flavors.vcpus + '核 | ' + flavors.ram / 1024 + 'G') : '--';
						servers.templatedisplaytext = servers.metadata && servers.metadata.image_name || '--';
					}
					servers.privateIp = privateIp || '--'

					/*转换ip显示*/
					servers.ipText = `私:${servers.privateIp}</br>公:${servers.publicIp}`;
					servers.flavorTxt = flavor || '--'

					servers.chargeMode = servers.cycle_type == 'M' ? '按月' : '按年';
					servers.running_time = servers.running_time ? servers.running_time + 'h' : '--';
					servers.lastStartTime = servers.last_start_time ? timeService(servers.last_start_time) : '--';

					servers.finishAt = servers.expire_date ? timeService(servers.expire_date) : '--';
					servers.expired = timeExpired(servers.finishAt);
					if(servers.os_type == '2') {
						servers.os_types = 'windows'
					} else if(servers.os_type == '1') {
						servers.os_types = 'linux'
					} else if(servers.os_type == '3') {
						servers.os_types = 'redhat'
					} else if(servers.os_type == '4') {
						servers.os_types = 'ubuntu'
					} else {
						servers.os_types = ''
					}

					servers.showNum = 2;
					_this.addOperation(servers);
				}

			},
			pagingChange(type, val) {
				if(type == 'num') {
					this.filter.limit = val;
				} else if(type == 'page') {
					this.filter.page = val;
				}
				this.loading = true;
				this.getEcmList();
			},
			autoRefresh(jobIds) {
				if(jobIds) {
					if(typeof(jobIds) == 'string') {
						//!this.jobIds.includes(jobIds) && this.jobIds.push(jobIds)
						!this.jobIds.includes(jobIds) && this.jobIds.push(jobIds) && this.getJobDetail(jobIds)

					} else if(Array.isArray(jobIds)) {
						jobIds.map(item => {
							item.jobid && !this.jobIds.includes(item.jobid) && this.jobIds.push(item.jobid)
							//item.jobid && !this.jobIds.includes(item.jobid) && this.jobIds.push(item.jobid) && this.getJobDetail(item.jobid)
						})
						this.jobIds.length && this.getLoding();
					} else {
						console.log(jobIds)
					}

				}
			},
			getLoding() {
				let that = this;
				if(this.detroyAutoRefresh) return;
				if(!this.loading) {
					LodingCount = 0;
					this.jobIds.map(item => {
						this.getJobDetail(item)
					})
				} else {
					if(LodingCount++ > 8) {
						return
					}
					setTimeout(() => {
						that.getLoding();
					}, 5000);
				}

			},
			getJobDetail(id,action){
      			let _this = this;
      			let timer;
      			if(this.detroyAutoRefresh) return

      			GetJobDetail(id).then(res=>{
  					let result = res.data.results[0];
  					if(result.jobstatus == 1){
  						let server = result.jobresult.virtualmachine;
  						this.ecmListData.map((item,index) =>{
  							if(item.id == server.id){
  								if(!item.expire_date || (!item.publicip) || (item.expire_date == '--') || (action=='reboot') || (action=='reinstall')){
  									GetEcmDetail(item.id).then(res=>{
  										let data = res.data.results;
  										let server = data.length && data[0] || item;
  										_this.filterServers(server)
  										_this.$set(_this.ecmListData,index,server)
  										if(server.has_ip && server.has_ip == '1' && (!server.publicip)){
  											setTimeout(function(){
												_this.getEcmDetailData(item.id);
											},5000)
  										}else if(server.no_time && server.no_time == '1'){
  											setTimeout(function(){
												_this.getEcmDetailData(item.id);
											},5000)
  										}
  									}).catch(
  										error=>{
  										console.log(error)
  										_this.refresh()
  									})
  									return
  								}
  								item.state = server.state;
  								_this.filterServers(item);

  								//this.$set(this.ecmListData,index,server)
  								//console.log(index,server)
  							}
  						})
  						this._.remove(this.jobIds,(item)=>{
  							return item == id;
  						})
  					}else if(result.jobstatus == 2){
  						clearTimeout(timer)
  						console.log('失败')
  						this.refresh()
  						this._.remove(this.jobIds,(item)=>{
  							return item == id;
  						})
  					}else{
  						timer = setTimeout(()=>{
  							_this.getJobDetail(result.jobid,action)
  						},5000)
  					}

  				}).catch(error=>{
  					console.log(error)
  					this.refresh()
  				})
      		},
      		getEcmDetailData(id){
      			let _this = this;
      			GetEcmDetail(id).then(res=>{
					let data = res.data.results;
					let server = data.length && data[0] || item;
					if(server.has_ip && server.has_ip == '1' && (!server.publicip)){
						setTimeout(function(){
							_this.getEcmDetailData(id);
						},5000)
						return
					}else if(server.no_time && server.no_time == '1'){
						setTimeout(function(){
							_this.getEcmDetailData(id);
						},5000)
					}
					_this.filterServers(server);
					_this.ecmListData.map((item,index) =>{
						if(item.id == server.id){
							_this.$set(_this.ecmListData,index,server)
						}
					})
				}).catch(
					error=>{
					console.log(error)
					_this.refresh()
				})
      		},
			getRegion() {
				let timer1;
				if(getRegionId()) {
					clearTimeout(timer1)
					this.changeRegion();
				} else {
					let _this = this;
					timer1 = setTimeout(function() {
						_this.getRegion()
					}, 300)
				}
			},

      		getStarting(item,clear){
      			if(!this.newEcmName){
      				this.startTimer(item)
      			}
      		},
      		startTimer(item,clear){
      			let that = this
      			if(this.detroyAutoRefresh) return
      			that.newEcmName || (that.newEcmName = item.name);
      			if(clear){
      				this.newEcmName = '';
      				this.refresh();
      				return;
      			}
      			setTimeout(()=>{
      				that.refresh()
      				//that.startTimer()
      			},60000)
      		},
      		getRegionNums(){
				let params ={
					resource:'vm',
					regionid:getRegionId()
				}
				GetRegionNum(params).then(res => {
					let data = res.data.results[0].VM;
					console.log(data)
					if(data && data.detail) {
						this.regionData = data.detail;
					}

				})
			},
			queryQuotas(){
		      	queryQuota().then((res)=>{
		          console.log(res.data.results);
		          let Quota = res.data.returnObj;
//		          this.snapshotLimitQuota = Quota.snapshot_limit - 0;
					this.snapshotLimitQuota =Quota.snapshot_limit　? Quota.snapshot_limit - 0　:'';
		        }).catch((error)=>{
		          console.log(error)
		        })
		    },
		},

		mounted() {
			this.getRegion();
//			this.queryQuotas();
			let quotas = this.$store.state.user.user.quotas;
			if(quotas.snapshot_limit){
				this.snapshotLimitQuota = quotas.snapshot_limit - 0;
			}else{
				this.queryQuotas();
			}
		},
		computed: {
			regionType() {
				let resetPW ={
					value: i18n.ecm.resetPw,
					disable: false,
					fun: 'resetPw',
					id:'resetPw',
					state:'ShutAndImg'
				};
				if('cs' == this.$store.getters.regionType){
					this.PublicOperation.push(resetPW)
				}

				if('os' == this.$store.getters.regionType){
					this.PublicOperation.find(item=>{
						return item.id == 'resetPw'
					}) && this.PublicOperation.splice(-1,1);
				}
				console.log(this.$store.getters.regionType)
				return this.$store.getters.regionType
			}
		},
		beforeDestroy() {
			console.log('detroy')
			this.detroyAutoRefresh = true;
		}

	}
</script>

<style lang="scss" scoped="scoped">

	.ecmmain{
  		background: #f6f8fb;
  	}
	.content{
	  	.content_top{
	  		background: #ffffff;
	  		padding-top: 30px;
	  		padding-left: 20px;
	  		padding-bottom: 20px;
	  	}
	}
</style>
