<template>
  <div class="subnet-main">
    <div class="subnet-content" v-if="tableData.length>0" v-for="(net,index) in tableData">
	    <el-row :gutter="20">
	    	<el-col :span='3'>
	    		<div class="subnet-title">
		        <svg-icon icon-class="subnet" class="subnet-icon"></svg-icon>
		        <div class="subnet-line"> </div>
		      </div>
	    	</el-col>
				<el-col :span="17">
		      <div :key="index" label-width="120px" class="subnet-info" size="small">
		      		<el-row :gutter='20'>
		      			<h4>{{net.name}}({{net.id}})</h4>
		      		</el-row>
		      		<el-row :gutter='20'>
		      			<el-col :span='20'>
		      				<el-row :gutter='20'>
		      					<el-col :span='8'>
		      						<div class="row-sub">
							          <div class="term">
							            <span>状态：</span><span>{{net.state || net.status || '--'}}</span>
							          </div>
							          <div class="term">
							            <span>所属VPC：</span><span>{{net.vpcname ? net.vpcname : '--'}}</span>
							          </div>
							          <div class="term desc">
							            <span>描述：</span><span class="desc" :title="net.displaytext">{{net.displaytext ? net.displaytext : '--'}}</span>
							          </div>
							        </div>
		      					</el-col>
		      					<el-col :span='8'>
		      						<div class="row-sub">
							          <div class="term">
							            <span>子网：</span><span>{{net.cidr}}</span>
							          </div>
							          <div class="term">
							            <span>网关：</span><span>{{net.gateway}}</span>
							          </div>
							        </div>
		      					</el-col>
		      					<el-col :span='8'>
		      						<div class="row-sub">
							          <!--<div class="term">
							            <span>DNS服务器地址1:</span><span>{{net.dns1}}</span>
							          </div>
							          <div class="term">
							            <span>DNS服务器地址2:</span><span>{{net.dns2}}</span>
							          </div>-->
							          <div class="term">
							            <span>子网类型：</span><span>{{net.is_lb ? '负载均衡' : '普通子网'}}</span>
							          </div>
							          <div class="term" v-if="regionType == 'cs'">
							            <span>acl名称：</span><span>{{net.aclname ? net.aclname : '--'}}</span>
							          </div>
							        </div>
		      					</el-col>
		      				</el-row>
		      			</el-col>
		      		</el-row>
			    </div>
			  </el-col>
			  <el-col :span='4'>
  				<div class="row-btn">
		          <span class="btn">
		            <el-button @click='click(edit,net)' type="primary" icon="el-icon-edit" :disabled = 'net.disabled'></el-button>
		          </span>
		          <span class="btn">
		            <el-button @click='click(deleteNet,net)' type="primary" icon="el-icon-delete" :disabled = 'net.disabled'></el-button>
		          </span>
		        </div>
  			</el-col>
	    </el-row>
    </div>
    <el-pagination v-if='Pagination && Pagination.show'
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="Pagination.pagingData"
                   :page-size="Pagination.pagingData[0]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="Pagination.total">
    </el-pagination>
    <div style="text-align: center;line-height: 100px;" v-if="tableData.length===0">暂无数据</div>
  </div>
</template>

<script>
  export default{
    props:{
      tableData:[Array],
      netOperation:[Array],
      deleteNet:[Function],
      edit:[Function],
      loading:[Boolean],
      Pagination:[Array,Object],
    },
    data(){
      return {
        currentPage:1,

      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(val);
        this.$emit('pagingEvent','num',val)
      },
      handleCurrentChange(val) {
        console.log(val);
        this.$emit('pagingEvent','page',val)
      },
      click(name,data){
        console.log(name);
        this.$emit('buttonClick',name,data);
      }
    },
    computed:{
    	regionType(){
    		return this.$store.getters.regionType;
    	}
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .subnet-main{
    .subnet-content{
      background-color: #fff;
      margin-top: 20px;
      .subnet-title{
      	position: relative;
        .subnet-icon{
          width: 50px;
          height: 56px;
          padding: 25px 30px;
        }
        .subnet-line{
	        border-right:1px dashed #d5deed;
	        display: inline-block;
	        height: 86px;
	        margin-top: 12px;
	        position:absolute;
	        /*left: 0;*/
	      }
      }
      .row-btn{
	      text-align: center;
	      height: 106px;
	      .btn{
	        display: inline-block;
	        margin-top: 40px;
	        .el-button{
	        	font-size: 18px;
	        }
	      }
	    }
	    .el-button--primary{
	      background-color: #ffffff;
	      color: #333;
	      border:none;
	    }
      .subnet-info{
        position: relative;
        height: 80px;
        h4{
          height: 20px;
          margin-top: 10px;
          font-size: 16px;
          color: #000;
        }
        .el-form-item__content{
          margin-left: 0;
        }
        .row-sub{
          font-size: 12px;
          margin-bottom: 10px;
          text-align: left;
        }
        .term{
          margin-top: 10px;
        }
        .desc{
	      	white-space: nowrap;
	      	text-overflow: ellipsis;
	      	overflow: hidden;
	      }
      }
    }
  }
</style>
<style lang="scss">
	.subnet-main{
		background: #f6f8fb;
		.el-pagination{
			margin-top: 20px;
			text-align: right;
		}
	}
</style>