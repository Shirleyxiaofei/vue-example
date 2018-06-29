<template>
	<el-main>
	  <el-form label-width="120px" size ="samll" label-position="left" class="vpc-ruleForm" :model="dataForm" :rules="rules" ref="actionForm">
	    <div>
				<p class="title">VPC</p>
			</div>
	    <el-form-item
	      :label='dataForm.name.label'
	      prop="name"
	      required
	    >
	      <el-input class="value" type="age" v-model.trim="dataForm.name.value"></el-input>
	      <el-tooltip content="不能使用中文,且长度为2-63字符" placement="right"><i class="el-icon-question"></i></el-tooltip>
	    </el-form-item>
	    <el-form-item
	        label="vpc描述："
	        prop="vpcDisplaytext"
	      >
	        <el-input class="value" type="age" v-model.trim="dataForm.vpcDisplaytext.value"></el-input>
	      </el-form-item>
	    <el-form-item
	      :label='dataForm.cidr.label'
	      prop="cidr"
	      required
	    >
	      <div class="vpcIp">
	        <span class="tiny_input_ip_container valid_error_input" id="VpcCidrIp" >
	          <input 
	          	@change = 'changeSubnet(1)'
	          	v-on:input="changValue($event,0,'VpcCidrIp')" v-on:keydown ="onkeydowns($event,0,'VpcCidrIp')" maxlength='3'
	          	v-model="dataForm.cidr.first" value="192" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	          <input 
	          	@change = 'changeSubnet(1)'
	           	v-on:input="changValue($event,1,'VpcCidrIp')" v-on:keydown ="onkeydowns($event,1,'VpcCidrIp')" maxlength='3'
	          	v-model="dataForm.cidr.second" value="168" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	          <input
	          	@change = 'changeSubnet(1)'
	          	 v-on:input="changValue($event,2,'VpcCidrIp')" v-on:keydown ="onkeydowns($event,2,'VpcCidrIp')" maxlength='3'
	          	v-model="dataForm.cidr.third" value="0" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet" ></input>
	                <span class="tiny_input_ip_division">.</span>
	          <input 
	          	@change = 'changeSubnet(1)'
	          	v-on:input="changValue($event,3,'VpcCidrIp')" v-on:keydown ="onkeydowns($event,3,'VpcCidrIp')" maxlength='3'
	          	v-model="dataForm.cidr.four" value="0" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet" ></input>
	              </span>
	        <span class="ng-scope">/</span>
	        <span class="tiny-textbox-container" id="VpcPortal" style="width: 50px;">
	          <el-input 
	          	@blur = 'changeSubnet(1)'
	          	@keypress.native="replaceNum($event)" :maxlength="2"
	          	v-model="dataForm.cidr.last" type="text" value="24" spellcheck="false" class="tiny-input-text valid_error_input" validator="true"></el-input>
	         </span>
	        <div v-if="dataForm.cidr.mark" class="mark">可使用网段:10.0.0.0/8-24、172.16.0.0/12-24、192.168.0.0/16-24</div>
	      </div>
	    </el-form-item>
	    <div>
				<p class="title">子网</p>
			</div>
	    <el-form-item
	      :label='dataForm.sub_name.label'
	      prop="sub_name"
	      required
	    >
	      <el-input class="value" type="age" v-model.trim="dataForm.sub_name.value"></el-input>
	      <el-tooltip content="不能使用中文,且长度为2-63字符" placement="right"><i class="el-icon-question"></i></el-tooltip>
	    </el-form-item>
	    <el-form-item
	        label="子网描述："
	        prop="subDisplaytext"
	      >
	        <el-input class="value" type="age" v-model.trim="dataForm.subDisplaytext.value"></el-input>
	      </el-form-item>
	    <el-form-item label="子网类型：" prop="subType">
				<el-radio-group v-model="dataForm.sub_type.values" @change = radioValue>
			      	<el-radio :label="0">普通子网</el-radio>
			      	<!--<el-radio :label="1">负载均衡</el-radio>-->
				</el-radio-group>
			</el-form-item>
	    <el-form-item
	      :label='dataForm.sub_cidr.label'
	      prop="sub_cidr"
	      required
	    >
	      <div class="vpcIp">
	        <span class="tiny_input_ip_container valid_error_input" id="netCidrIp">
	          <input 
	          	v-on:input="changValue($event,0,'netCidrIp')" v-on:keydown ="onkeydowns($event,0,'netCidrIp')" maxlength='3'
	          	@change='changeSubnet'
	          	v-model="dataForm.sub_cidr.first" value="192" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	            <span class="tiny_input_ip_division">.</span>
	          <input 
	          	v-on:input="changValue($event,1,'netCidrIp')" v-on:keydown ="onkeydowns($event,1,'netCidrIp')" maxlength='3'
	          	@change='changeSubnet'
	          	v-model="dataForm.sub_cidr.second" value="168" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	            <span class="tiny_input_ip_division">.</span>
	          <input 
	          	v-on:input="changValue($event,2,'netCidrIp')" v-on:keydown ="onkeydowns($event,2,'netCidrIp')" maxlength='3'
	          	@change='changeSubnet'
	          	v-model="dataForm.sub_cidr.third" value="0" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	            <span class="tiny_input_ip_division">.</span>
	          <input 
	          	v-on:input="changValue($event,3,'netCidrIp')" v-on:keydown ="onkeydowns($event,3,'netCidrIp')" maxlength='3'
	          	@change='changeSubnet'
	          	v-model="dataForm.sub_cidr.four" value="0" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	        </span>
	        <span class="ng-scope">/</span>
	        <span class="tiny-textbox-container" id="netPortal" style="width: 50px;">
	          <el-input 
	          	@keypress.native="replaceNum($event)"
	          	@blur='changeSubnet' :maxlength="2"
	          	v-model="dataForm.sub_cidr.last" type="text" value="24" spellcheck="false" class="tiny-input-text valid_error_input" validator="true"></el-input>
	              </span>
	        <!--<div class="mark">可使用网段:10.0.0.0/8-24、172.16.0.0/12-24、192.168.0.0/16-24</div>-->
	      </div>
	    </el-form-item>
	    <el-form-item
	        :label='dataForm.gateway_ip.label'
	        prop="gateway_ip"
	        required
	      >
	        <div class="vpcIp">
	            <span class="tiny_input_ip_container valid_error_input" id="gateway_ip">
	              <input 
	              	v-on:input="changValue($event,0,'gateway_ip')" v-on:keydown ="onkeydowns($event,0,'gateway_ip')" maxlength='3'
	              	v-model="dataForm.gateway_ip.first" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input 
	              	v-on:input="changValue($event,1,'gateway_ip')" v-on:keydown ="onkeydowns($event,1,'gateway_ip')" maxlength='3'
	              	v-model="dataForm.gateway_ip.second" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input 
	              	v-on:input="changValue($event,2,'gateway_ip')" v-on:keydown ="onkeydowns($event,2,'gateway_ip')" maxlength='3'
	              	v-model="dataForm.gateway_ip.third" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input 
	              	v-on:input="changValue($event,3,'gateway_ip')" v-on:keydown ="onkeydowns($event,3,'gateway_ip')" maxlength='3'
	              	v-model="dataForm.gateway_ip.four" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	            </span>
	        </div>
	      </el-form-item>
	    <!--<el-form-item>
	    	<el-button type="text" @click="toggleCheck">
	    		{{checked ?  dataForm.display.name :'显示高级选项'}}
	    	</el-button>
	      
	    </el-form-item>
	    <el-form-item
	        v-show="checked"
	        :label='dataForm.dns1.label'
	        prop="dns1"
	        required
	      >
	        <div>
	            <span class="tiny_input_ip_container valid_error_input" id="dns1">
	              <input 
	              	@keypress.native="replaceNum($event)"
	              	v-model="dataForm.dns1.first" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input 
	              	@keypress.native="replaceNum($event)"
	              	v-model="dataForm.dns1.second" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input 
	              	@keypress.native="replaceNum($event)"
	              	v-model="dataForm.dns1.third" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input 
	              	@keypress.native="replaceNum($event)"
	              	v-model="dataForm.dns1.four" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	            </span>
	        </div>
	      </el-form-item>
	    <el-form-item
	      v-show="checked"
	      :label='dataForm.dns2.label'
	      prop="dns2"
	      required
	    >
	      <div>
	            <span class="tiny_input_ip_container valid_error_input" id="dns2">
	              <input v-model="dataForm.dns2.first" @keypress.native="replaceNum($event)" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input v-model="dataForm.dns2.second" @keypress.native="replaceNum($event)" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input v-model="dataForm.dns2.third" @keypress.native="replaceNum($event)" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	                <span class="tiny_input_ip_division">.</span>
	              <input v-model="dataForm.dns2.four" @keypress.native="replaceNum($event)" type="text" class="tiny_input_ip_anchor tiny_input_ip_octet"></input>
	            </span>
	      </div>
	    </el-form-item>-->
	    <div v-if="regionType == 'cs'">
				<p class="title">ACL规则</p>
			</div>
			<el-form-item label="ACL：" prop="chargeAclType" class='aclStyle' v-if="regionType =='cs'">
				<el-radio-group v-model="dataForm.Acl.type" @change="chargeChange" fill='#f9cc76'>
					<el-radio-button class="radio-group-btn" label="使用默认"></el-radio-button>
			    <el-radio-button class="radio-group-btn" label="创建新的ACL" ></el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item v-if='regionType == "cs" && aclShow' class="acl" label="默认acl: " prop="Acl.aclid">
		    <el-select v-model='dataForm.Acl.aclid' :disabled = "seleceCheck" @change="getAclName">
		      <el-option v-for = '(item,index) in acllist'
		                 :label='item.name'
		                 :value='item.id' :key="index"></el-option>
		    </el-select>
			</el-form-item>
			<el-form-item v-if='regionType == "cs" && !aclShow'
	      :label='dataForm.Acl.label' prop="Acl" required>
	      <el-input class="value" type="age" v-model.trim="dataForm.Acl.value"></el-input>
	      <el-tooltip content="不能使用中文,且长度为2-63字符" placement="right"><i class="el-icon-question"></i></el-tooltip>
	    </el-form-item>
	    <el-form-item v-if='regionType == "cs" && !aclShow'
	        label="acl描述："
	        prop="aclDisplaytext"
	      >
	        <el-input class="value" type="age" v-model.trim="dataForm.aclDisplaytext.value"></el-input>
	    </el-form-item>
	    <el-form-item label="acl规则：" prop="aclRules" v-if="regionType == 'cs' &&!aclShow" class='AclRule'>
						<el-table
	                  class="inner-table"
	                  ref="multipleTables"
	                  :data="dataForm.aclRule.data"
	                  tooltip-effect="dark"
	                  @buttonClick = 'buttonClick'
	                  :header-cell-style = 'changethSty'
	                  v-if='dataForm.aclRule.data.length>0'
	                  >
	                  <el-table-column
	                    v-for="(item,index) in tableOptions"
	                    :prop="item.prop"
	                    :label='item.label'
	                    :width='item.width'
	                    :key='index'
	                    align="center"
	                    :show-overflow-tooltip=true
	                    v-if="item.temp"
	                  >
		                  <template slot-scope="scope">
		                  	<span v-if="item.direction">{{ scope.row[item.prop] == 'ingress' ? '入方向' : '出方向' }}</span>
		                  	<span v-if="item.action">{{ scope.row[item.prop] }}</span>
		                  	<span v-if="item.protocol">{{ scope.row[item.prop] }}</span>
		                  	<span v-if="item.port">{{ scope.row.code ? scope.row.code + '/' + scope.row.type : scope.row.port_range_max ? scope.row.port_range_min + '/' + scope.row.port_range_max : ''}}</span>
		                  	<span v-if="item.cidr">{{ scope.row[item.prop] }}</span>
		                  </template>
	                  </el-table-column>
	                  <el-table-column label="操作" :width='60'>
	                    <template slot-scope="scope">
	                      <el-button v-for='(Operation,index) in aclOperation' :key='index' type="text" @click='click(Operation.fun,scope.row)'>{{Operation.value}}</el-button>
	                    </template>
	                  </el-table-column>
	                </el-table>
	    	<el-button v-if="addShow" type="text" @click="addRule">添加acl规则</el-button>
				<span class="addTip">您还可以添加{{dataForm.aclRule.num-dataForm.aclRule.data.length}}条规则</span>
	    </el-form-item>
	  </el-form>
  </el-main>
</template>
<script>
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import { getVpcList,getDefaultAcl,getAclList} from '@/api/vpc'
  import aclDilogView from '@/views/vpc/aclDilogView'
  import i18n from '@/lang'
  import ConsoleTable from '@/components/ConsoleTable'
  import { ipValidatorSelf, maskAndSubnetValidator, prefix2mask, broadcastValidator, subnetValidator, getIpValue, ipValue2Str,nameRule  } from '@/utils/validator'
  
  export default {
    components: {
      ElInput,
      ElFormItem,
      ConsoleTable
    },
    props:{
      dataForm:[Object]
    },
    data() {
    	  let _this = this;
    	  let lowest = 16
    	  let ipNotStartWith100_64 = (ip)=>{
					let data, ip1, ip2;
					try {
						data = ip.split(".");
						if (4 === data.length) {
							ip1 = parseInt(data[0], 10);
							ip2 = parseInt(data[1], 10);
							if (10 === ip1) {
								lowest = 8;
								return !0
							}
							if (172 === ip1 && ip2 > 15 && ip2 < 32) {
								lowest = 12;
								return !0
							}
							if (192 === ip1 && 168 === ip2) {
								lowest = 16;
								return !0
							}
							return !1
						}
						return !1
					} catch (e) {
						return !1
					}
				}
        /*let portRangeValidator = (){
        	var port = parseInt($("#" + $scope.portal.id).widget().getValue(), 10);
					if (port > 24 || port < parseInt($scope.lowest, 10)) return validator.i18nReplace($scope.i18n.common_term_range_valid, {
						"1": $scope.lowest,
						"2": 24
					});
					return !0
        }*/
        var checkName=(rule, value, callback) => {
//      	let nameRule = /^[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9]$/;
	      	if(!value.value){
          	callback(new Error('名称不能为空！'));
       		}else if(value.value.length > 63 || value.value.length < 2){
		      		callback(new Error('长度为2-63字符'));
      		}else if(nameRule(value.value)){
      				callback(new Error('不能使用中文'));
	      	}else{
            let val=value.value;
            let params= {
		          status:'',
		          id:'',
		          name:val
		        };
	        	getVpcList(params).then((res)=>{
		          let vpclist = res.data.results;
		          if(vpclist.length>0){
		            callback(new Error('VPC名称不能重复'));
		          }else{
		            callback();
		          }
		        }).catch((error)=>{
		          console.log(error)
		        })
          }
        }
        var checkAclName=(rule, value, callback) => {
//      	let nameRule = /^[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9]$/;
	      		if(!value.value){
	          	callback(new Error('名称不能为空！'));
	       		}else if(value.value.length > 63 || value.value.length < 2){
		      		callback(new Error('长度为2-63字符'));
      			}else if(nameRule(value.value)){
      				callback(new Error('不能使用中文'));
	      		}else{
	            let val=value.value;
	            let params= {
			          status:'',
			          id:'',
			          name:val
			        };
		        	getAclList(params).then((res)=>{
			          let acllist = res.data.results;
			          if(acllist.length>0){
			            callback(new Error('ACL名称不能重复!'));
			          }else{
			            callback();
			          }
			        }).catch((error)=>{
			          console.log(error)
			        })
          	}
        }
        var checkSubName=(rule, value, callback) => {
//      	let nameRule = /^[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9]$/;
	      	if(!value.value){
          	callback(new Error('名称不能为空！'));
       		}else if(value.value.length > 63 || value.value.length < 2){
		      		callback(new Error('长度为2-63字符'));
      		}else if(nameRule(value.value)){
      				callback(new Error('不能使用中文'));
	      	}else{
			      callback();
          }
        }
        //cidr 检测
        var checkCidr=(rule, value, callback)=>{
            let ipNotStartTip = '不能使用此网段。'
            let ip = value.first + '.' + value.second + '.' + value.third + '.' + value.four;
            //检测输入的ip是否合法
            if(ipValidatorSelf(ip)){
            	//检测网段是否合理
            	if(value.name == 'cidr' && ipNotStartWith100_64(ip) || value.name=='sub_cidr'){
            		//检测port取值范围是否合理
            		let port = parseInt(value.last);
            		
            		if(value.name == 'cidr' && (port>24 || port < parseInt(lowest,10))){
            			callback(new Error('掩码取值范围是'+lowest + '与24之间'))
            		}else if(value.name == 'sub_cidr' && (port>28 || port < 16)){
            			callback(new Error('掩码取值范围是16与28之间'))
            		}else{
            			//子网ip与掩码匹配检测
            			if(value.name == 'sub_cidr'){
            				let cidr = _this.dataForm.cidr;
            				console.log(_this.dataForm.cidr);
            				let cidrPort = parseInt(cidr.last);
            				//子网端口与Vpc端口对比
	            			if(parseInt(cidrPort) > parseInt(port)){
	            				callback(new Error('子网IP地址不在可用网段内。'))
	            			}
	            			let mask = prefix2mask(cidrPort)
	            			let subnet = cidr.first + '.' + cidr.second + '.' + cidr.third + '.' + cidr.four;
			            	let cidrResult = subnetValidator(mask, ip,subnet)
			            	if(cidrResult){
			            		callback()
			            	}else{
			            		callback(new Error('网段IP地址与掩码不匹配。'))
			            	}
	            		}
            			
            			//vpc子网IP与掩码匹配检测
            			if(value.name == 'cidr'){
            				let mask = prefix2mask(parseInt(value.last))
			            	let cidrResult = maskAndSubnetValidator(mask, ip)
			            	if(cidrResult){
			            		_this.cidrOk = true
			            		callback()
			            	}else{
			            		callback(new Error('网段IP地址与掩码不匹配。'))
			            	}
            			}
	            		
            		}
            	}else{
            		callback(new Error(ipNotStartTip))
            	}
            }else{
            	callback(new Error('IP地址不合法'))
            }
        };
        //子网检测
        
        //网关检测
        let checkGateway = (rule,value,callback)=>{
        	console.log(value)
	        let ip = value.first + '.' + value.second + '.' + value.third + '.' + value.four;
	        //检测输入的ip是否合法
	        if(ipValidatorSelf(ip)){
		        	let sub_cidr = _this.dataForm.sub_cidr;
		        	let sub_cidrPort = parseInt(sub_cidr.last)
		        	//校验网关是否合法
		        	let mask = prefix2mask(sub_cidrPort)
							let subnet = sub_cidr.first + '.' + sub_cidr.second + '.' + sub_cidr.third + '.' + sub_cidr.four;
							if (ip == subnet){
									callback(new Error('网关地址不在子网范围内。'))
							}else{
									let cidrResult = subnetValidator(mask, ip,subnet)
		            	if(cidrResult){
		            			let broadResut = broadcastValidator(subnet,sub_cidrPort,ip);
		            			if(broadResut){
		            				callback();
		            			}else{
		            				callback(new Error('广播地址不能作为网关。'))
		            			}
		            	}else{
		            			callback(new Error('网关地址不在子网范围内。'))
		            	}
							}
	        }else{
	        		callback(new Error('IP地址不合法'))
	        }
        }
        let ipValidator = (rule,value,callback) => {
        	console.log(value);
        	let ip = value.first + '.' + value.second + '.' + value.third + '.' + value.four;
        	if(ipValidatorSelf(ip)){
        		callback()
        	}else{
        		callback(new Error('IP地址不合法'))
        	}
        }
        let valueJudge = (rule,value,callback) => {
        	if(value.first > 255 || value.second > 255 || value.third > 255 || value.four > 255){
        		callback(new Error('dns地址输入不合法'))
        	}else{
        		callback()
        	}
        }
        let dnsJudge = (rule,value,callback) => {
        	let ip = value.first + '.' + value.second + '.' + value.third + '.' + value.four;
        	let dns1 = this.dataForm.dns1.first + '.' + this.dataForm.dns1.second + '.' + this.dataForm.dns1.third + '.' + this.dataForm.dns1.four;
        	if(ip == dns1){
        		callback(new Error('dns地址不可重复'))
        	}else{
        		callback()
        	}
        }
      return {
        checked: false,
        cidrOk:false,
        aclShow:true,
        seleceCheck:true,
        acllist:[],
        aclOperation:[{
    			value:i18n.vpc.delete,
    			fun:(data)=>{
    				return this.delete(data);
    			}
    		}],
    		tableOptions:[
            {'label':'方向',prop:'direction',width:'70',temp:true,direction:true},
            {'label':'类型',prop:'action',width:'70',temp:true,action:true},
            {'label':'协议',prop:'protocol',width:'70',temp:true,protocol:true},
            {'label':'端口范围/ICMP类型',prop:'port',width:'180',temp:true,port:true},
            {'label':'CIDR',prop:'remote_ip_prefix',width:'130',temp:true,cidr:true},
        ],
        Form:{
            name:''
        },
        rules:{
          name: [
            { validator: checkName, trigger: 'blur' }
//            {required: true, message: '请输入VPC名称', trigger: 'blur'},
//            {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
          ],
          cidr:[
            {validator: checkCidr, trigger: 'change,blur'}
          ],
          sub_name:[
            { validator: checkSubName, trigger: 'blur'}
          ],
          sub_cidr:[
            {validator: checkCidr, trigger: 'blur,change'}
          ],
          gateway_ip:[
            {validator: checkGateway, trigger: 'blur,change'}
          ],
          aclid:[
          	{required: true,message: '请选择acl名称', trigger: 'change'},
          ],
          Acl:[
          	{ validator: checkAclName, trigger: 'blur'}
          ]
//        aclRules:[
//        	{required: true,message: '请选择acl规则', trigger: 'change'},
//        ]
//        ,
//        dns1:[
//          {validator: ipValidator, trigger: 'blur,change'},
//          {validator: valueJudge, trigger: 'blur,change'},
//        ],
//        dns2:[
//          {validator: ipValidator, trigger: 'blur,change'},
//          {validator: valueJudge, trigger: 'blur,change'},
//          {validator: dnsJudge, trigger: 'blur,change'}
//        ]
        }
      };
    },
		
    methods:{
      onkeyup(){
          console.log(this.value);
      },
      click(name,data){
				  name(data)
			},
      delete(data){
      	console.log(data)
      	this.dataForm.aclRule.data = this.dataForm.aclRule.data.filter(function(item){
      		if(item.id == data.id){
      			return false
      		}else{
      			return true
      		}
      	});
      },
      addRule(){
      	let alertMsg=this.$message;
        let view = aclDilogView;
        let data = {};
        let _this = this;
        data.type='createRule';
        data.title="增加ACL规则";
        let form = {
          "direction": "ingress",
          "port_range_min": "33",
          "ethertype": "IPv4",
          "port_range_max": "33",
          "remote_ip_prefix": "0.0.0.0/0",
          "security_group_id": '',
          "protocol": "tcp",
          "action":""
        }
        let aclid='';
        let option = {
          data,
          view,
          form
        }
        this.$alertDialog(option).then((res)=>{
            console.log(res);
            let data;
            if(res.protocol=='icmp'){
              data={
                "direction": res.direction,
                "port_range_min": res.port_range_min,
                "remote_ip_prefix":res.remote_ip_prefix,
                "ethertype": "IPv4",
                "code": res.icmpcode,
                "type":res.icmptype,
                "security_group_id": '',
                "protocol": res.protocol,
                "action":res.action
              }
            }else if(res.protocol=='all'){
              data={
                "direction": res.direction,
                "ethertype": "IPv4",
                "remote_ip_prefix":res.remote_ip_prefix,
                "security_group_id": '',
                "protocol": res.protocol,
                "action":res.action
              }
            }else{
              data={
                "direction": res.direction,
                "port_range_min": res.port_range_min,
                "ethertype": "IPv4",
                "port_range_max": res.port_range_max,
                "remote_ip_prefix":res.remote_ip_prefix,
                "security_group_id": '',
                "protocol": res.protocol,
                "action":res.action
              }
            }
            data.id = new Date().getTime();
            _this.dataForm.aclRule.data.push(data);
        });
      },
      chargeChange(val){
      	if(val == '使用默认'){
					this.aclShow = true;
					this.getDefaultAcl();
				}else{
					this.dataForm.Acl.aclid = '';
					this.dataForm.Acl.value = this.dataForm.Acl.values;
					this.aclShow = false;
				}
      },
      getAclName(val){
      	console.log(val);
      	let aclData = this._.find(this.acllist, { 'id': val});
      	this.dataForm.Acl.value = aclData.name;
      },
      getDefaultAcl(){
      	this.dataForm.Acl.type = '使用默认';
      	let params={
					default: 1,
		    }
	      this.seleceCheck = true;
  			getDefaultAcl(params).then((res)=>{
  				console.log(res)
  				let acllist = res.data.results;
		        if(acllist.length > 0){
			        this.acllist=acllist;
			        this.seleceCheck = false;
			        console.log(acllist);
			        this.dataForm.Acl.aclid = acllist[0].id;
			        this.dataForm.Acl.value = acllist[0].name;
		        }else{
		        	this.acllist=[];
		        	this.seleceCheck = false;
		        	this.dataForm.Acl.aclid = '';
		        	this.dataForm.Acl.value = '';
			        this.$message({
			          	message: '暂无acl',
			          	type: 'warning'
			        });
		        }
  			}).catch((error)=>{
		        this.seleceCheck = false;
		        this.acllist = [];
		        this.dataForm.Acl.aclid = '';
		        console.log(error)
  			})
      },
      buttonClick(funName,data){
        funName(data);
      },
      radioValue(val){
      	console.log(val);
      	this.dataForm.sub_type.value= val ? '负载均衡' : '普通子网';
      },
			order(){
				console.log('vpc表单页');
				this.validateForm().then(valid=>{
					this.$emit('orderResult');
				}).catch(err=>{
					console.log(err)
				})
			},
			replaceNum(event){
				let code = window.event ? event.keyCode : event.which;
				if(!window.event){
					let arr = [8,9,110,37,39,0];
					if(arr.includes(code)) return
				}
				if(code==46){
					let next = event.target.parentElement.nextElementSibling ? event.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild :'';
					next && next.focus()
					next && next.setSelectionRange(0,3);
				}
				code>=48 && code<=57 || event.preventDefault()
			},
			subnetAndGateway2Str(ip){
				let value = getIpValue(ip);
				//this.dataForm.sub_cidr.value = ipValue2Str(value);
				this.replaceIp('sub_cidr',value)
				//this.dataForm.gateway_ip.value = ipValue2Str(value + 1);
				this.replaceIp('gateway_ip',value+1)
			},
			replaceIp(opt,value){
				let val = ipValue2Str(value).split('.')
				//let val = this.dataForm[opt].value.split('.');
				this.dataForm[opt].first = val[0];
				this.dataForm[opt].second = val[1];
				this.dataForm[opt].third = val[2];
				this.dataForm[opt].four = val[3];
			},
			toggleCheck(){
				this.checked = !this.checked;
			},
			validateForm(){
				return this.$refs['actionForm'].validate()
			},
			onkeydowns(event,num,target){
				let e = window.event || event; 
				let inputs=document.getElementById(target).getElementsByTagName("input");
				let valueLength = e.target.value.length;
				let InputValue = e.target.value - 0;
	　 			let code = e.keyCode||e.which||e.charCode; 
				if((code >= 48 && code<=57) || (code >= 96 && code<=105)){
					if((valueLength >= 3) && (inputs[num].selectionStart != inputs[num].selectionEnd)){
						return true
					}else if((valueLength >= 3) && (inputs[num].selectionStart == inputs[num].selectionEnd)){
						if(num <3){
							inputs[num+1].focus();
							inputs[num+1].setSelectionRange(0,0);
						}
					}
					this.changValue(event,num,target);
					return true
				}else if((code == 39) || (code == 190)){
					let cursurPosition=-1;
					if(inputs[num].value || inputs[num].value == '0'){
						if(inputs[num].selectionStart || inputs[num].selectionStart == '0'){//非IE浏览器
							cursurPosition= inputs[num].selectionStart;
						}else{//IE
							let range = document.selection.createRange();
							range.moveStart("character",-inputs[num].value.length);
							cursurPosition=range.text.length;
						}
					}else{
						cursurPosition = 0;
					}
					console.log(inputs[num].selectionStart);
					if(cursurPosition == inputs[num].value.length){
						if(num <3){
							let pos = inputs[num+1].value.length;
							if(inputs[num+1].setSelectionRange){
								inputs[num+1].focus()
								inputs[num+1].setSelectionRange(0,0);
							}else if (inputs[num+1].createTextRange) {
								let range = obj.createTextRange();
								range.collapse(!0);
								range.moveEnd("character", pos);
								range.moveStart("character", pos);
								range.select();
							}
						}
					}
					if(code == 190){
						event.preventDefault()
					}
				}else if(code == 37){
					let cursurPosition=-1;
					if(inputs[num].value || inputs[num].value == '0'){
						if(inputs[num].selectionStart || inputs[num].selectionStart == '0'){//非IE浏览器
							cursurPosition= inputs[num].selectionEnd;
						}else{//IE
							let range = document.selection.createRange();
							range.moveStart("character",-inputs[num].value.length);
							cursurPosition=range.text.length;
						}
					}else{
						cursurPosition = 0;
					}
					console.log(cursurPosition,inputs[num].selectionEnd);
					if(cursurPosition == '0'){
						if(num > 0){
							let ele = inputs[num-1];
							let pos = ele.value.length;
							if(ele.setSelectionRange){
								setTimeout(function(){
									ele.focus()
									ele.selectionStart = pos;
									ele.selectionEnd = pos;
									ele.setSelectionRange(pos,pos);
								},10)
							}else if (ele.createTextRange) {
								setTimeout(function(){
									let range = obj.createTextRange();
									range.collapse(!0);
									range.moveEnd("character", pos);
									range.moveStart("character", pos);
									range.select();
								},10)
							}
						}
					}
				}else if(code == 8){
					let cursurPosition=-1;
					let inputVaLen = inputs[num].value.length;
					if(inputs[num].value || inputs[num].value == '0'){
						if(inputs[num].selectionStart || inputs[num].selectionStart == '0'){//非IE浏览器
							cursurPosition= inputs[num].selectionStart;
						}else{//IE
							let range = document.selection.createRange();
							range.moveStart("character",-valueLength);
							cursurPosition=range.text.length;
						}
					}else{
						cursurPosition = 0;
					}
					
					if(cursurPosition == 0){
						if(inputs[num].selectionStart == '0' && inputVaLen == inputs[num].selectionEnd && inputs[num].value ){
							return true
						}else{
							if(num > 0){
								inputs[num-1].selectionStart = inputs[num-1].value.length;
								inputs[num-1].focus()
							}
						}
					}
					return true
				}else if(code == 9){
					return true
				}else{
					event.preventDefault()
				}
			},
			changValue(event,num,target){
				let e = window.event || E;
				console.log(e);
				let valueLength = e.target.value.length;
				let inputs=document.getElementById(target).getElementsByTagName("input");
				let InputValue = e.target.value - 0;
//				if(InputValue > 255){
//					setTimeout(function(){
//						e.target.value = '255';
//					},10);
//				}
			},
			changeSubnet(val){
				//自动填写子网和网关
				if(val == '1'){
					let _this = this;
					this.$refs['actionForm'].validateField('cidr',function(res){
						if(!res){
							console.log(_this.dataForm.cidr)
							let cidr = _this.dataForm.cidr
							let ip = cidr.first + '.' + cidr.second + '.' + cidr.third + '.' + cidr.four;
							_this.subnetAndGateway2Str(ip)
						}
						
					})
				}else{
					let _this = this;
					this.$refs['actionForm'].validateField('sub_cidr',function(res){
						if(!res){
							console.log(_this.dataForm.cidr)
							let cidr = _this.dataForm.sub_cidr
							let ip = cidr.first + '.' + cidr.second + '.' + cidr.third + '.' + cidr.four;
							_this.subnetAndGateway2Str(ip)
						}
						
					})
				}
				
			}
   	},
   	computed: {
   		addShow: function () {
    		if(this.dataForm.aclRule.num - this.dataForm.aclRule.data.length < 1){
    			return false
    		}else{
    			return true
    		}
    	},
  		changethSty(row,index){
  			return{'background':'#f0f2f7','color':'#333333','font-size':'12px','font-weight':'600',}
  		},
  		regionType(){
  			return this.$store.getters.regionType;
  		}
   	},
   	mounted(){
			this.regionType == 'cs' && this.getDefaultAcl();
		}
  }
</script>
<style lang="scss" scoped="scoped">
  .vpc-ruleForm{
  	/*.ng-scope{
    	margin: 0 5px;
    }*/
   	.title{
			padding: 20px 0;
			background-color: #fff;
		}
    .el-form-item{
      .value{
        width: 255px;
      }
      .mark{
        color: #999999;
      }

      .tiny_input_ip_container{
        display: inline-block;
        width: 50%;
        .tiny_input_ip_octet{
          width: 19%;
        }
      }
      .tiny-input-text{
        /*width: 100%;*/
      }
    }
  }
  .tiny-textbox-container input{
    width: 40px;
    overflow: hidden;
  }
  .vpc-ruleForm .el-form-item .tiny_input_ip_container{
    display: inline-block;
    line-height: 25px;
    border:1px solid #dcdfe6;
    border-radius: 4px;
    width: 200px;
  }
  .vpc-ruleForm .el-form-item .tiny_input_ip_container .tiny_input_ip_octet{
    display: inline-block;
    line-height: 25px;
    border:none;
    background-color: #fff;
  }
  .vpc-ruleForm .el-form-item .tiny-input-text{
    display: inline-block;
    width: 40px;
    line-height: 25px;
    border:1px solid #dcdfe6;
    background-color: #fff;
    border-radius: 4px;
  }
  .el-form-item.is-error .valid_error_input{
  	border-color:#f56c6c !important;
  }
  /*.el-form-item.is-error .tiny_input_ip_container{
  	border-color:#f56c6c !important;
  }*/
</style>
<style lang="scss" >
  /*#VpcCidrIp input{
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    border: none;
    text-align: center;
  }*/
 	.vpc-ruleForm{
 		.aclStyle{
 			.el-radio-group{
				.el-radio-button{
					margin-right: 10px;
				}
			}
			.radio-group-btn > span {
		    border: 1px solid #dcdfe6;
		    border-radius: 4px !important;
		    background: #ebedf2;
		    padding: 7px 15px;
			}
			.el-form-item__content{
				.el-select{
					margin-top: 10px;
					/*display: block;*/
					width: 215px;
				}
			}
		}
		.addTip{
			font-size: 12px;
		  color: #666;
		}
		.AclRule{
			.el-table th,.el-table td{
				padding: 0px;
			}
		}
	}
 	.vpcIp input{
		padding: 0;
    margin: 0;
   	outline:0;
   	border: 0;
    text-align: center;
    width: 38px;
    height: 34px;
	}

  /*#netCidrIp input{
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    border: none;
    text-align: center;
  }*/
 
  #VpcPortal{
  	vertical-align: top;
  	/*line-height: 25px;*/
    /*border: 1px solid #cccccc;
  	display: inline-block;*/
  	/*border-radius: 4px;*/
  	/*background-color: #f6f8fb;*/
  }
  #VpcPortal input{
    padding: 0;
    margin: 0;
    /*display: block;
    width: 100%;*/
    /*border: none;*/
    text-align: center;
    width: 38px;
    height: 35px;
    outline:0;
   	border: 0;
  }
  #netPortal{
  	vertical-align: top;
  	/*line-height: 25px;*/
    /*border: 1px solid #cccccc;
  	display: inline-block;*/
  /*	border-radius: 4px;*/
  }
  #netPortal input{
    padding: 0;
    margin: 0;
    /*display: block;
    width: 100%;
    border: none;*/
    text-align: center;
    width: 38px;
    height: 35px;
    outline:0;
   	border: 0;
  }
  #gateway_ip{
  	line-height: 25px;
    border: 1px solid #dcdfe6;
  	display: inline-block;
  }
  #gateway_ip input{
    padding: 0;
    margin: 0;
    /*display: block;
    width: 100%;
    border: none;*/
    text-align: center;
    width: 38px;
    height: 34px;
    outline:0;
   	border: 0;
  }
  #dns1 input{
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    border: none;
    text-align: center;
  }
  #dns2 input{
    padding: 0;
    margin: 0;
    display: block;
    width: 100%;
    border: none;
    text-align: center;
  }
</style>
