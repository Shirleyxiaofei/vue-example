<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="searchBoxSubnet">
          <el-select v-if='ByVpc' v-model="statusValue" placeholder="所属虚拟私有云" @change="statusChange(statusValue)">
            <el-option
              v-for="(item,index) in options"
              :key="item.index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="子网名称" v-model.trim="searchValue" :clearable=true  @change="clears">
            <el-button slot="append" icon="el-icon-search" @click = "search"></el-button>
          </el-input>
          <el-button style='vertical-align: top; padding: 8px 10px;font-size: 16px;' icon="el-icon-refresh" @click="refresh"></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import i18n from '@/lang'
  export default{
    props:{
      optionsValue:[String],
      options:[Array],
      PublicOperation:[Array],
      statusOnOff:[Boolean],
      btnClose:[Boolean],
      disableData:[Array,Object],
      ByVpc:[Boolean]
    },
    data(){
      return{
//				options: options,
        statusValue: this.optionsValue,
        nameOptions: [{
          value: 'name',
          label: i18n.common.name,
        }, {
          value: 'id',
          label: i18n.common.ID,
        }],
        nameValue: 'name',
        searchValue:'',
        Numvalue:0,
      }
    },
    methods:{
      statusChange(value){

        var filters={};
        filters['vpcid']=this.statusValue;
        this.$emit('selectChange',filters)
      },
      clears(val){
				if(!val){
					console.log('清空');
					this.searchValue = '';
					this.$emit('clear');
				}
			},
      nameChange(value){
        console.log(value);
      },
      search(){
        let filters={};
        filters.subnetName = this.searchValue;
        this.$emit('searchEvent',filters);
      },
      refresh(){
        this.statusValue = ''
        this.searchValue = '';
        this.$emit('refreshEvent');
      },
      btnClick(value,index,label){
        console.log(21212)
        this.Numvalue = index;
        this.$emit('PublicOperEvent',value,label);
      }
    },
    computed:{
      disableCom(){
        return this.disableData.length
      }
    },
    watch:{
    	options:function(value,oldValue){
    		this.statusValue = '';
    	}
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .searchBoxSubnet{
    height: 35px;
  }
  .btnBox{
    text-align: right;
    button{
      font-size: 12px;
      padding: 10px 27px;
      color: #666666;
      background: #f0f2f7;
      border: 1px solid #f0f2f7;
      white-space: nowrap;
      cursor: pointer;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      font-weight: 500;
      border-radius: 4px;
      margin-right: 10px;
      &:hover{
        border: 1px solid #56d6c4;
        background: #56d6c4;
        color: #ffffff;
      }
    }
    /*.active{
            border: 1px solid #56d6c4;
            background: #56d6c4;
            color: #ffffff;
        }*/
    .disable{
      cursor:not-allowed;
      &:hover{
        border: 1px solid #f0f2f7;
        background: #f0f2f7;
        color: #666666;
      }
    }
  }
</style>
<style lang="scss">
  .searchBoxSubnet{
  	padding-right: 20px;
    .el-input__inner{
      height: 35px;
    }
    .el-input-group__append{
      padding: 0 9px;
      overflow: hidden;
			.el-button{
				vertical-align: middle;
			}
    }
    .el-select{
      width: 150px;
      vertical-align: top;
      .el-input{
        width: 150px;
      }
    }
    .el-input{
      width: 180px;
      .el-input__inner{
        /*line-height: 3;*/
      }
    }
  }
</style>
