<template>
  <el-table class='confirm'
    ref="multipleTable"
    :data="tableData.elseData"
    tooltip-effect="dark"
    style="width: 100%" 
    headerCellClassName="tableHeaderbg"
    :header-row-style = 'changeRowSty'
		:header-cell-style = 'changethSty'
  >
    <el-table-column
      label='产品名称'
    >
      <template slot-scope="scope"><span>{{scope.row.system_type}}</span></template>
    </el-table-column>
    <el-table-column
      label='配置' min-width='220'
    >
      <template slot-scope="scope">
        <div class="mt5" v-for= '(tdata,index) in scope.row.confirmData'>
          <span class="label_title" v-if="tdata.label && !tdata.show">{{tdata.label}}:</span>
          <span class="value" v-if="tdata.label && !tdata.show" v-html = 'tdata.value'></span>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item,index) in tableData.tableOptions"
      :prop="item.prop"
      :label='item.label'
      :width='item.width'
      :key='index'
    >
    </el-table-column>

  </el-table>
</template>

<script>
  export default {
    props:{
      tableData:[Object,Array]
    },
    data() {
      return {
        checked: true,
      };
    },
    computed:{
			changeRowSty(row,index){
  			return{'background':'#f0f2f7'}
  		},
  		changethSty(row,index){
  			return{'background':'#f0f2f7','color':'#333333','font-size':'12px','font-weight':'600',}
  		},
		},

    methods: {

    }
  }
</script>
<style lang="scss" scoped="scoped">
  .confirm_title {
    .mt5 {
      display: block;
      margin-top: 5px;
			span{
				display: inline-block;
				vertical-align:top;
			}
    }
  }
  .mt5{
    display: flex;
    flex-direction: row;
    .label_title {
      color: #999999;
      margin-right: 20px;
    }
  }
</style>
<style lang="scss">
	.confirm{
		.el-table__body-wrapper{
			table{
				tr{
					font-size: 12px;
				}
			}
		}
	}
</style>
