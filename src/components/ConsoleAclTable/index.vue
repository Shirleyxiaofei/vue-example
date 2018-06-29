<template>
  <div class="aclTable">
    <el-table
      ref="multipleTable"
      :data="tableData"
      class='out_table'
      @cell-click = 'handleSelection'
      tooltip-effect="dark"
      style="width: 100%"
      :border=true
      v-loading="loading"
      :header-row-style = 'changeRowSty'
      :header-cell-style = 'changethSty'
      @selection-change="handleSelectionChange"
      @expand-change = 'expendDetail'>

      <el-table-column v-if='expand'
                       type="expand"
                       width="55">
        <template slot-scope="props">
        	
          <el-form class="inner-table-expand">
          	
            <el-form-item v-if="expandTable">
              <div>
                <div class="inner-table-ID">
                  <span>ID : </span><span>{{props.row.id}}</span>
                  <span style="margin-left: 40px;">子网名称：{{props.row.netName ? props.row.netName : '--'}}</span>
                  <span v-if="props.row.addButton" class="addRule" @click='click(addRule,props.row)'>
                    	增加规则
                  </span>
                </div>
                <p style="text-align: left;">描述：{{props.row.description ? props.row.description : '--'}}</p>
                <el-table
                  class="inner-table"
                  ref="multipleTables"
                  :data="props.row['security_group_rules']"
                  @cell-click = 'handleSelection'
                  tooltip-effect="dark"
                  style="width: 100%"
                  :border=true
                  v-loading="loading"
                  :header-cell-style = 'changethSty'
                  @selection-change="handleSelectionChange"
                  >
                  <el-table-column
                    v-for="(item,index) in detilOptions"
                    :prop="item.prop"
                    :label='item.label'
                    :width='item.width'
                    :key='index'
                    :show-overflow-tooltip=true
                    v-if="!item.temp"
                  >
                  </el-table-column>
                  <el-table-column label="操作" v-if='operationdetailOrNot' :min-width="160">
                    <template slot-scope="scope">
                      <el-button v-for='(Operation,index) in scope.row.OperationdetailEvents' v-if='index == 0 || index == 1 || (OperationdetailEvents.length <= 3 && index ==2)' :key='index' type="text" @click='click(Operation.fun,scope.row)' :disabled = 'Operation.disabled'>{{Operation.value}}</el-button>
                      <el-dropdown trigger="click" v-if='OperationdetailEvents.length > 3'>
			  			<span class="el-dropdown-link" style="color: #66b1ff; margin-left: 10px; cursor: pointer;">
			    			更多
			  			</span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for='(Operations,index) in OperationdetailEvents' :key='index' v-if='index !== 0 && index !== 1'><span style="display: block; width: 100%; height: 100%;"  @click='click(Operations.fun,scope.row)'>{{Operations.value}}</span></el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form-item>
            
          </el-form>
          
        </template>
      </el-table-column>

      <el-table-column v-if='checkBox'
                       type="selection"
                       width="55">
      </el-table-column>

      <el-table-column
        v-for="(item,index) in tableOptions"
        :prop="item.prop"
        :label='item.label'
        :key='index'
        :show-overflow-tooltip=true
        v-if="item.temp"
      >
        <template slot-scope="scope">
		    		<span  v-if="item.detail">
              <span class="no-link-name" @click = 'changeAcl(scope.row)'>{{ scope.row.name }}</span>
		    		</span>
          <!--<span v-if="item.status">
			    		<i class="el-icon-time"></i>
				        <span style="margin-left: 10px">{{ scope.row.status }}</span>
		    		</span>-->
          <span v-if="item.rule">
                <span class="icon" v-if="item.direction==='in'">
                  <svg-icon icon-class="Ingress"></svg-icon>
                  <span>{{scope.row.describe_in}}</span>
                  <span style="margin-left: 10px">{{ scope.row.rule_in_num }}</span>
                </span>

                <span class="icon" v-if="item.direction==='out'">
                  <svg-icon icon-class="Egress"></svg-icon>
                  <span>{{scope.row.describe_out}}</span>
                  <span style="margin-left: 10px">{{ scope.row.rule_out_num }}</span>
                </span>
								<span v-if="item.vpc">
                  <span>{{item.label}}</span>
                  <span style="margin-left: 10px">{{ scope.row.vpcname ? scope.row.vpcname : '--' }}</span>
                </span>
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
        v-if="!item.temp"
      >
      </el-table-column>
      <el-table-column label="操作" v-if='operationOrNot'>
        <template slot-scope="scope">
          <el-button v-for='(Operation,index) in scope.row.aclOperation' v-if='index == 0 || index == 1 || (scope.row.operation.length <= 3 && index ==2)' :key='index' type="text" @click='click(Operation.fun,scope.row)' :disabled = 'Operation.disabled'>{{Operation.value}}</el-button>
          <el-dropdown trigger="click" v-if='OperationEvents.length > 3'>
			  			<span class="el-dropdown-link" style="color: #66b1ff; margin-left: 10px; cursor: pointer;">
			    			更多
			  			</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for='(Operations,index) in OperationEvents' :key='index' v-if='index !== 0 && index !== 1'><span style="display: block; width: 100%; height: 100%;"  @click='click(Operations.fun,scope.row)'>{{Operations.value}}</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  import i18n from '@/lang'
  import { statFormat } from '@/utils/statformat'
  import { timeService } from '@/utils/timeformat'
  export default{
    props:{
      tableData:[Array,Object],
      tableOptions:[Array],
//      detilData:[Array],
      detilOptions:[Array],
      OperationEvents:[Array],
      OperationdetailEvents:[Array],
      operationOrNot:[Boolean],
      operationdetailOrNot:[Boolean],
      checkBox:[Boolean],
      expand:[Boolean],
      loading:[Boolean],
      noEffect:[Boolean],
      noHead:[Boolean],
      expandTable:[Boolean],
      addRule:[Function],
      Pagination:[Array,Object],
    },
    data(){
      return{
        currentPage:1,
        Checked:false,
      }
    },
    methods:{
    	expendDetail(row){
				if(!this.Checked){
					row.expendStatus = !row.expendStatus;
				}
				this.Checked = false;
        this.$emit('detailClick',row.id);
     },
    	changeAcl(row){
    		row.expendStatus = !row.expendStatus;
    		this.Checked = true;
    		this.$refs.multipleTable.toggleRowExpansion(row,row.expendStatus);
    	},
      handleSelection(row, column){

        if(column.id == "el-table_1_column_2"){
          /*console.log('跳转详情');
           console.log(this.$router.path)
           console.log(this.$route)*/
        }

      },
      handleSelectionChange(val) {
        //console.log(val);
        this.multipleSelection = val;
        this.$emit('changeTable',val)
      },
      handleSizeChange(val) {
        console.log(val);
        this.$emit('pagingEvent','num',val)
      },
      handleCurrentChange(val) {
        console.log(val);
        this.$emit('pagingEvent','page',val)
      },
      click(name,data){
      	console.log(data);
        this.$emit('buttonClick',name,data);
      },
    },
    computed:{
      changeRowSty(row,index){
        if(this.noHead){
          return{'background':'#f0f2f7','display':'none'}
        }else{
          return{'background':'#f0f2f7'}
        }


      },
      changethSty(row,index){
        return{'background':'#f0f2f7','color':'#333333','font-size':'12px','font-weight':'600',}
      },
    },
    mounted(){


    }
  }
</script>

<style lang="scss">
	.aclTable{
  .linkTag{
    color:#3ac0f1;

  }
  .no-link-name{
    color: #3ac0f1;
    cursor: pointer;
  }
  .inner-table-ID{
    text-align: left;
  }
  .el-table td, .el-table th.is-leaf{
    border:none;
    border-bottom: 1px solid #D5DEED;
  }
  .inner-table .el-table__body-wrapper table tbody tr{
  	background-color: #ffffff;
  }
  .inner-table tr,.inner-table td{
  	padding: 0 !important;
  	font-size: 12px;
  }
  .inner-table .el-table__header-wrapper table thead tr th .cell,
  .inner-table .el-table__body-wrapper table tbody tr td .cell{
  	line-height: 30px;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .addRule{
    color: #3ac0f1;
    float: right;
    cursor: pointer;
  }
  .el-pagination{
		margin-top: 20px;
		text-align: right;
	}
  /*.inner-table-expand{
    width: 100%;
    .el-form-item{
      width: 100%;
      .el-form-item__content{
        width:100%;
      }
    }
  }*/
  .inner-table{
    th,td{
      /*padding: 0;*/
      text-align: center;
    }
    tbody{
      td:last-child{
        text-align: center;
        button{
          margin-right:0 ;
        }
      }
    }
    /*.aclList tr td:last-child*/
  }
  .icon{
    svg{
      /*width: 2em !important;
      height: 2em !important;*/
      color: #333;
      /*vertical-align: -0.5em !important;*/
     font-size: 20px;
    }
  }
}
</style>
