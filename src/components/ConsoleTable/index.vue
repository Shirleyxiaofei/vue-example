<template>
	<div class="tableStyle">
		<el-table
		    ref="multipleTable"
		    :data="tableData1"
		    @cell-click = 'handleSelection'
		    tooltip-effect="dark"
		    style="width: 100%"
		    :border='dragable'
		    v-loading="loading"
		    :header-row-style = 'changeRowSty'
		    :header-cell-style = 'changethSty'
		    :row-class-name="tableRowClassName"
		    :max-height='height'
		    @filter-change='filterTag'
		    @selection-change="handleSelectionChange"
		    @expand-change = 'expendDetail'>

		    <el-table-column v-if='expand'
		      
		      type="expand"
		      width="40">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item v-for="(item,index) in detilOptions"
		    		:label='item.label + "："'
		    		:key='index'>
		    		<span v-if="!item.html">{{props.row[item.prop]}}</span>
		    		<span v-html="props.row[item.prop]" v-if="item.html"></span>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>

		    <el-table-column v-if='checkBox'
		      type="selection"
		      width="40">
		    </el-table-column>
		    <!--<el-table-column v-if='expiredShow' width="70">
		    	<template slot-scope="scope">
		    		<i v-if='scope.row.expired' style="display: block; width: 10px; height: 10px; background: #fa767c;border-radius: 50%; margin-left: 12px;"></i>
		    		<span v-if='scope.row.expired' style="color: red; font-size: 12px;">已过期</span>
		    	</template>
		    </el-table-column>-->
			<el-table-column v-if='radioShow' width="50">
                <template slot-scope="scope">
                      <el-radio class="radio" v-model="selectedRadio" :label="scope.row.id" :disabled = "EcmdisabledEvent(scope.row)" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column v-if='radioShows' width="50">
                <template slot-scope="scope">
                      <el-radio class="radio" v-model="selectedRadio" :label="scope.row.id" :disabled = "disabledEvent(scope.row)" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column v-if='eipRadioShow' width="50">
                <template slot-scope="scope">
                      <el-radio class="radio" v-model="selectedRadio" :label="scope.row.id" :disabled = "eipdisabledEvent(scope.row)" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column v-if='bksradioShow' width="50">
                <template slot-scope="scope">
                      <el-radio class="radio" v-model="selectedRadio" :label="scope.row.id" :disabled = "bksdisabledEvent(scope.row)" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column
		    	v-for="(item,index) in tableOptions"
		    	:prop="item.prop"
		    	:label='item.label'
		    	:width='item.width'
		    	:key='index'
		    	v-if="item.temp && !item.filter && item.tempTip">
		    	<template slot-scope="scope">
		    		<span  v-if="item.details">
		    			<el-tooltip class='ipTip' placement="top">
		    				<div slot="content">{{scope.row[item.prop]}}</div>
		    				<router-link v-if="!expand && !noEffect && scope.row[(item.key||'id')]" :to=" item.path+'/'+scope.row[(item.key||'id')]" class="linkTag">{{ scope.row[item.prop] }}</router-link>
		    				<span v-if="!expand && !noEffect && !scope.row[(item.key||'id')]" class="linkTag">{{ scope.row[item.prop] }}</span>
		    				<span v-if="expand && !noEffect" class="linkTag">{{ scope.row[item.prop] }}</span>
		    				<span v-if="noEffect">{{ scope.row[item.prop] }}</span>
				        </el-tooltip>
				        <br v-if='scope.row[item.propId]' />
				        <el-tooltip v-if='scope.row[item.propId]' class='ipTip' placement="top">
		    				<div slot="content">{{scope.row[item.propId]}}</div>
				        	<span v-if="scope.row[item.propId]" class="">{{ scope.row[item.propId] }}</span>
				        </el-tooltip>
		    		</span>
			     </template>
		    </el-table-column>
		    <el-table-column
		    	v-for="(item,index) in tableOptions"
		    	:prop="item.prop"
		    	:label='item.label'
		    	:width='item.width'
		    	:key='index'
		    	:show-overflow-tooltip=true
		    	v-if="item.temp && !item.filter && !item.tempTip">
		    	<template slot-scope="scope">
		    		<span  v-if="item.detail">
		    			<router-link v-if="!expand && !noEffect && scope.row[(item.key||'id')]" :to=" item.path+'/'+scope.row[(item.key||'id')]" class="linkTag">{{ scope.row[item.prop] }}</router-link>
		    			<span v-if="!expand && !noEffect && !scope.row[(item.key||'id')]" class="linkTag">{{ scope.row[item.prop] }}</span>
		    			<span v-if="expand && !noEffect" class="linkTag">{{ scope.row[item.prop] }}</span>
              			<span v-if="noEffect">{{ scope.row[item.prop] }}</span>
              			<br v-if="item.propId" /><span v-if="item.propId" class="">{{ scope.row[item.propId] }}</span>
		    		</span>
		    		<span  v-if="item.routerIp">
		    			<router-link :to="item.path+'/'+scope.row.id" class="linkTag">{{ scope.row[item.prop] }}</router-link>
		    		</span>
		    		<span v-if="item.EipIp">{{scope.row[item.prop]}}</span>
		    		<span v-if="item.linkProp" class="linkTag">{{scope.row[item.prop]}}</span>
		    		<span v-if="item.status">
				        <span  class="status" :class="scope.row.statusIcon">{{ scope.row[item.prop] }}</span>
		    		</span>
		    		<span v-if="item.ims">
				        <el-tooltip :enterable='false' :content = 'scope.row[item.prop]' placement="top">
				        	<svg-icon :icon-class="scope.row[item.props]"></svg-icon>
				        </el-tooltip>
		    		</span>
			     </template>
		    </el-table-column>
		    <el-table-column
		    	v-for="(item,index) in tableOptions"
		    	:prop="item.prop"
		    	:label='item.label'
		    	:width='item.width'
		    	:key='index'
		    	column-key = 'filter'
		    	:show-overflow-tooltip=true
		    	:filters="item.selectOptions"
  				filter-placement="bottom"
  				:filter-multiple = false
		    	v-if="item.filter">
		    	<template slot-scope="scope">
		    		<span v-if="item.status">
				        <span  class="status" :class="scope.row.statusIcon">{{ scope.row[item.prop] }}</span>
		    		</span>
			     </template>
		    </el-table-column>
		    <el-table-column
		    	v-for="(item,index) in tableOptions"
		    	:prop="item.prop"
		    	:label='item.label'
		    	:width='item.width'
		    	:show-overflow-tooltip=true
		    	:key='index'
		    	v-if="item.ip">
		    	<template slot-scope="scope">
		    		<span v-html="scope.row[item.prop]" v-if="item.html">
				        <!--<span  v-if="scope.row[item.prop1]">{{scope.row[item.prop1]}}</span><br v-if="scope.row[item.prop1]"/>
				        <span>{{scope.row[item.prop2]}}</span>-->
		    		</span>
		    		<span v-else>
				        <span  v-if="scope.row[item.prop1]">{{scope.row[item.prop1]}}</span><br v-if="scope.row[item.prop1]"/>
				        <span>{{scope.row[item.prop2]}}</span>
		    		</span>
		    		<!--<span>
		    			<el-tooltip v-if="scope.row[item.prop1]" class='ipTip' placement="top">
		    				<div slot="content">{{scope.row[item.prop1]}}</div>
				        	<span v-if="scope.row[item.prop1]">{{scope.row[item.prop1]}}</span><br v-if="scope.row[item.prop1]"/>
				        </el-tooltip>
				        <br v-if="scope.row[item.prop1]" />
				        <el-tooltip class='ipTip' placement="top">
		    				<div slot="content">{{scope.row[item.prop2]}}</div>
				        	<span>{{scope.row[item.prop2]}}</span>
				        </el-tooltip>
		    		</span>-->
		    		<div v-if="item.btn">
		    			<el-button  type="text" @click='click(item.fun,scope.row)'>{{ scope.row[item.prop] }}</el-button>
		    		</div>
			     </template>
		    </el-table-column>
		    <el-table-column
		    	v-for="(item,index) in tableOptions"
		    	:prop="item.prop"
		    	:label='item.label'
		    	:width='item.width'
		    	:key='index'
		    	:show-overflow-tooltip=true
		    	 v-if="!item.temp && !item.filter && !item.ip"
		    	>
		    	<template slot-scope="scope">
		    		<div v-if="item.isEmpty">{{scope.row[item.prop] || item.empty_st}}</div>
		    		<div v-else-if="item.isIpaddress">{{scope.row.nic[0].ipaddress || item.empty_st}}</div>
		    		<div v-else-if="item.companyDay" :class="scope.row[item.prop] < 1 ? 'day_c' : ''">
		    			<i class="el-icon-warning" v-show="scope.row[item.prop] < 1"></i>
		    			<span v-if="scope.row[item.prop] < 1">过期{{Math.abs(scope.row[item.prop]) + item.company_st}}</span>
		    			<span v-else>{{Math.abs(scope.row[item.prop]) + item.company_st}}</span>
		    		</div>
		    		<div v-else-if="item.replace">未开通</div>
		    		<div v-else-if="item.prop == 'zabbixStatus'">
		    			<span v-if="scope.row[item.prop] == '正常'" style="color: #52ec29;">{{scope.row[item.prop]}}</span>
		    			<span v-else-if="scope.row[item.prop] == '获取中...'">{{scope.row[item.prop]}}</span>
		    			<span v-else style="color: red;">{{ scope.row[item.prop] }}</span>
		    		</div>
		    		<span v-else>{{scope.row[item.prop]}}</span>
		    	</template>
		    </el-table-column>
		    <el-table-column label="操作" v-if='operationOrNot' :width="OperationWidth || 170">
		    	<template slot-scope="scope">
		    		<div v-if="scope.row.operation">
		    			<el-button v-for='(Operation,index) in scope.row.operation' v-if='scope.row.showNum == 2 ? ( index == 0 || (scope.row.operation.length <= 3 && index ==1) ) : ( index == 0 || (index == 1) || (scope.row.operation.length <= 3 && index ==2) )' :key='index' type="text" @click='click(Operation.fun,scope.row)' :disabled = 'Operation.disabled' :title="Operation.title">{{Operation.value}}</el-button>
						<el-dropdown v-if='scope.row.operation.length > 3'>
				  			<span class="el-dropdown-link" style="color: #66b1ff; font-size: 12px; margin-left: 10px; cursor: pointer;font-weight: 500;">
				    			更多
				  			</span>
						  	<el-dropdown-menu slot="dropdown" class="table-drapdown">
						    	<el-dropdown-item v-for='(Operations,index) in scope.row.operation' :key='index' v-if='scope.row.showNum == 2 ?  ( index !== 0 ) : ( index !== 0 && (index !== 1) )'><el-button style="display: block; width: 100%; height: 100%;"  @click='click(Operations.fun,scope.row)' :disabled = 'Operations.disabled' :title="Operations.title">{{Operations.value}}</el-button></el-dropdown-item>
						  	</el-dropdown-menu>
						</el-dropdown>
		    		</div>
		    		<div v-else>
		    			<el-button v-for='(Operation,index) in OperationEvents' v-if='scope.row.showNum == 2 ? ( index == 0 || (OperationEvents <= 3 && index ==1) ) : ( index == 0 || (index == 1) || (OperationEvents <= 3 && index ==2) )' :key='index' type="text" @click='click(Operation.fun,scope.row)'>{{Operation.value}}</el-button>
						<el-dropdown v-if='OperationEvents.length > (scope.row.showNum ? scope.row.showNum : 3)'>
				  			<span class="el-dropdown-link" style="color: #66b1ff; font-size: 12px; margin-left: 10px; cursor: pointer;">
				    			更多
				  			</span>
						  	<el-dropdown-menu slot="dropdown" class="table-drapdown">
						    	<el-dropdown-item v-for='(Operations,index) in OperationEvents' :key='index' v-if='scope.row.showNum == 2 ?  ( index !== 0 ) : ( index !== 0 && (index !== 1) )'><el-button style="display: block; width: 100%; height: 100%;"  @click='click(Operations.fun,scope.row)'>{{Operations.value}}</el-button></el-dropdown-item>
						  	</el-dropdown-menu>
						</el-dropdown>
		    		</div>

		    	</template>
		    </el-table-column>

		</el-table>
    <el-pagination v-if='Pagination && Pagination.show'
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="Pagination.pagingData"
                   :page-size="Pagination.pagingData[0]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="Pagination.total">
    </el-pagination>
	</div>
</template>

<script>
	import service from '@/utils/request'
	import i18n from '@/lang'
	import { statFormat } from '@/utils/statformat'
	import { timeService } from '@/utils/timeformat'
	export default{
		props:{
			tableData:[Array,Object],
			tableOptions:[Array],
			expiredShow:[Array,Number],
			detilOptions:[Array],
//			options:[Array],
			OperationEvents:[Array],
			operationOrNot:[Boolean],
			checkBox:[Boolean],
			expand:[Boolean],
			loading:[Boolean],
			dragable:[Boolean],
      		noEffect:[Boolean],
      		radioShow:[Boolean],
      		radioShows:[Boolean],
      		eipRadioShow:[Boolean],
      		bksradioShow:[Boolean],
      		eipStatus:[Boolean],
      		Pagination:[Array,Object],
      		height:[Number],
      		OperationWidth:[Number]
		},
		data(){
			return{
				selectedRadio:'1',
				currentPage:1,
				statusIcon:{
					running:'active',
					ready:'active',
					creating:'starting',
					restarting:'starting',
					stopped:'shutoff',
					shutoff:'shutoff',
					active:'active',
					starting:'starting',
					mounting:'starting',
					stopping:'stopping',
					uninstalling:'stopping',
					rebuild:'starting',
					resize:'starting',
					binding:'active',
					instance:'active',
					portforwarding:'active',
					loadbalancer:'active',
					unbinding:'shutoff',
					down:'shutoff',
					up:'active',
					"in-use":"active",
					"available":'shutoff',
					backedup:'active',
					error:'shutoff',
					mount:'active',
					uninstall:'shutoff',
					backingup:'starting',
					bindings:'starting',
					creating:'starting',
					enabled:'active',
					unbundings:'stopping',
					inactive:'shutoff',
					expunging:'stopping',
				}
			}
		},
		methods:{
			handleSelection(row, column,cell,event){
				/*console.log(row,column,cell,event)*/

				if(this.expand && event.target.className == 'linkTag'){
					/*console.log('跳转详情');
					console.log(this.$router.path)
					console.log(this.$route)*/
					
					this.$refs.multipleTable.toggleRowExpansion(row)
				}

			},
			tableRowClassName({row, rowIndex}) {
		        if (row.expired) {
		          return 'warning-row';
		        }
		        return '';
		   	},
		   	filterTag(value) {
      			console.log(value);
      			let val;
      			if(value.filter.length == 0){
      				val = '';
      			}else{
      				val = value.filter[0];
      			}
      			this.$emit('selectChange',val)
      		},
//    		clearFilter(){
//    			let value = {
//    				filter:[]
//    			}
//    			this.filterTag(value);
//    		},
      		clearSelection(){
      			console.log('1111');
      		},
			handleSelectionChange(val) {
				//console.log(val);
        		this.multipleSelection = val;
        		this.$emit('changeTable',val)
      		},
      		handleSizeChange(val) {
        		console.log(val);
        		service.cancle('CancelToken');
        		this.$emit('pagingEvent','num',val)
      		},
      		handleCurrentChange(val) {
        		console.log(val);
        		service.cancle('CancelToken');
        		this.$emit('pagingEvent','page',val)
      		},
      		click(name,data){
				this.$emit('buttonClick',name,data);
			},
			expendDetail(row,expandedRows){
				console.log('change',row);
				this.$emit('detailClick',row.id);
			},
			getCurrentRow(row){
				console.log(row);
				this.$emit('radioChange',row)
			},
			EcmdisabledEvent(row){
				if((row.state == 'Starting') || (row.state == 'ERROR') || (row.attached_volumes_number == '6')){
					return true
				}else{
					return false
				}
			},
			disabledEvent(row){
				if(!(row.states == 'Ready') || row.state == 'error'){
					return true
				}else{
					return false
				}
			},
			eipdisabledEvent(row){
				console.log(row);
				if((row.publicip) || (row.state == 'Starting') || (row.state == 'ERROR')){
					return true
				}else{
					return false
				}
			},
			bksdisabledEvent(row){
				if((row.states == 'BackingUp') || row.state == 'Error'){
					return true
				}else{
					return false
				}
			}
		},
		computed:{
			changeRowSty(row,index){
      			return{'background':'#f0f2f7'}
      		},
      		changethSty(row,index){
      			return{'background':'#f0f2f7','color':'#333333','font-size':'12px','font-weight':'600',}
      		},
      		tableData1(){
      			let that = this;
      			if(this.tableData && this.tableData.length > 0){
					this.tableData.forEach(function(value,index,array){
						value.stateTxt = statFormat(value.state) || value.state || statFormat(value.status) || value.status;
						value.statusIcon = value.state && value.state !='--' ? (that.statusIcon[value.state.toLowerCase()] || value.state.toLowerCase()) : value.status ? (that.statusIcon[value.status.toLowerCase()] || value.status.toLowerCase()) : '';
						console.log(value.statusIcon)
						value.created = value.created && value.created != '--' ? (timeService(value.created) || value.created) : value.created_at && value.created_at!='--' ? (timeService(value.created_at) || value.created_at) : '--';
						value.created_at && ( value.created_at = timeService(value.created_at) || value.created_at);
						value.expire_date = timeService(value.expire_date) || value.expire_date;
					})
				}
      			return this.tableData
      		},
		},
		mounted(){
			//console.log(this.OperationEvents)
		}
	}
</script>

<style >
	.linkTag{
		color:#3ac0f1;

	}
	.el-table td, .el-table th.is-leaf{
		border:none;
		border-bottom: 1px solid #D5DEED;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	  }
	.el-table--border{
		border:none;
	}
	.el-table .warning-row {
	    background-color: #fdf5f5;
	}
	.el-pagination{
		margin-top: 20px;
		text-align: right;
	}
  /*.vpclist td{
    text-align: center;
  }
  .vpclist th{
    text-align: center;
  }*/
  .table-drapdown .el-button{
	font-size: 12px;
  }
</style>
<style lang="scss">
  .table-drapdown{
  	padding:0;
  	li.el-dropdown-menu__item{
  		padding:0;
  		button.el-button.el-button--default{
  			border-radius: 0;
  			border:none;
  		}
  	}
  }
  .tableStyle{
  	.el-table__body{
		.el-table__expanded-cell{
			background-color: #fbfcfd;
			.demo-table-expand{
				.el-form-item{
					text-align: left;
					.el-form-item__label{
						font-size: 12px;
					}
					.el-form-item__content{
						font-size: 12px;
					}
				}
			}
		}
		.el-table__expanded-cell:hover{
			background-color: #fbfcfd!important;
		}
	}
  	.el-table .el-table__header-wrapper thead tr{
  		height: 30px;
  	}
  	.el-table .el-table__body-wrapper tbody tr{
  		height: 38px;
  	}
  	.el-table .el-table__header-wrapper thead tr th,
  	.el-table .el-table__body-wrapper tbody tr td{
		/*padding: 0px 0px;*/
		font-size: 12px;
	}
	.el-table td,.el-table th{
		padding:0;
	}
	.el-table .el-table__body-wrapper td .el-button{
		font-size: 12px;
	}
	.el-table__empty-block{
		color:#666666;
	}
	
	.el-table .el-table__expanded-cell{
		padding: 20px 50px;
	}
	/*.el-table .cell.el-tooltip{
		&:before {
  			content: '';
  			display: block;
		}
	}*/
	.el-table .cell .el-tooltip.ipTip{
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
  }

</style>
<style lang="scss" scoped="scoped">

 	@import '../../styles/mixin.scss';
	.status{
		position:relative;
	}
	.active{
		padding-left:15px;
		&:before{
			@include BorderContent(10px,#aaf595,#52ec29,-5px,calc(50% - 5px));
		}
	}
	.shutoff{
		padding-left:15px;
		&:before{
			@include BorderContent(10px,#f8a8ab,#f6585e,-5px,calc(50% - 5px));
		}
	}
	.starting{
		color:#53ec29;
		padding-left:15px;
		&:before{
			@include Content(16px,-8px,0px);
			background: url(../../assets/gree.gif);
		}
	}
	.stopping{
		color:#F6585E;
		padding-left:17px;
		&:before{
			@include Content(16px,-8px,2px);
			background: url(../../assets/red.gif);
		}
	}
	.day_c{
		color: #fb5b62;
	}
</style>
