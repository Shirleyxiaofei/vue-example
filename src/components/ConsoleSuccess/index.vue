<template>
  <div class="success_component">
    <span class="success_icon">
        <i class="el-icon-circle-check"></i>
   </span>
    <div style="display: inline-block;">
       <div v-if='!creataWay' class="create_state">创建{{system_type}}“{{system_name}}”<span class="create_state">提交成功</span></div>
       <div v-if='creataWay' class="create_state">创建{{system_type}}<span class="create_state">提交成功</span></div>
        <div v-if='!orderWay'>
          <span>订单编号：</span>
          <span>{{order_number}}</span>
        </div>
        <div class="reback_msg">页面将于{{new_second_number}}秒内返回<span class="timer">{{new_second_number}}</span></div>
        <div class="return_btn">
          <el-button type="primary" size="small" @click.stop="returnUrl">返回</el-button>
        </div>
  	</div>
  </div>
</template>

<script>
  export default {
    props:{
      creataWay:[Boolean],
      orderWay:[Boolean],
      system_type:[String],
      system_name:[String],
      params:[Object],
      return_url:{
          type : String,
          default : '--',
      },
      order_number:{
          type : String,
          default : '--',
      },
      second_number:{
          type : Number,
          default : 5,
      }
    },
    data() {
      return {
         new_second_number:5,
      };
    },
    methods: {
      returnUrl () {
      	if(this.params){
      		this.$router.push({path: this.return_url,query:this.params });
      		return
      	}
          this.$router.push({path: this.return_url });
      },
      timerOut () {
           this.timer = setTimeout(() => {
                if(this.new_second_number === 1){
                  this.returnUrl();
                }else{
                  this.new_second_number --;
                  this.timerOut();
                }
            }, 1000);
      }
    },
    mounted() {
        if ( this.timer ) {  
            clearTimeout(this.timer);  
        }
        this.new_second_number = this.second_number;
        this.timerOut();
    }
  }
</script>
<style lang="scss" scoped="scoped">
  .submit_title{
    .success_component{
      /*display: flex;*/
      /*flex-direction: row;*/
      width: 100%;
      margin: 0 auto;
      text-align: center;
      padding-top: 5%;
      .reback_msg{
        color: #999999;
        margin-top: 20px;
        font-size: 12px;
      }
      .success_icon{
	    	display: inline-block;
	    	vertical-align: top;
	    }
    }

  div{
    text-align: left;
  }
  }
  .buttons{
    text-align: center;
  }
  .success_icon{
    .el-icon-circle-check{
      color: #56d6c4;
      font-size: 40px;
      margin-right: 10px;
    }
  }
  .return_btn {
      padding: 20px 0 0 15px;
      .el-button{
      	background-color: #3ac0f1;
      }
  }
  .create_state {
      font-size: 20px;
      padding-bottom: 5px;
  }
  .timer {
      padding-left: 10px;
      font-size: 15px;
      color: #ecc79a;
  }
</style>
