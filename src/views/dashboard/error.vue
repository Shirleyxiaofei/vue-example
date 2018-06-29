<template>
  <div class='errorContent'>
      <div>
        <img v-if="errorCode==404" v-bind:src=error404 />
        <img v-if="errorCode==500" v-bind:src=error500 />
      </div>
      <div class="errorInfo">
        <span class="errorMsg">{{message}}</span>
        <span :class='{ "reback404":errorCode==404,"reback500":errorCode==500}' @click="reback">返回首页</span>
      </div>
  </div>
</template>

<script>
  import error404 from '@/assets/404.png';
  import error500 from '@/assets/500.png';
  export default {
    data (){
      return {
        errorCode:'',
        message:'123',
        errorType:'',
        error404,
        error500,
        error_image:''
      }
    },
    methods:{
      getErrorMsg(errorCode){
        if(errorCode==404){
          this.message='页面不存在哦'
        }else if(errorCode==500){
          this.message='服务器开小差了'
        }
      },
      reback(){
        this.$router.push('/console')
      }
    },
    created(){
        console.log('123434');
      this.getErrorMsg(this.$route.params.errorCode);
      this.errorCode = this.$route.params.errorCode;
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .errorContent{
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(50%);
    width: 50%;
    img{
      width: 100%;
    }
    .errorInfo{
      text-align: center;
      position: absolute;
      left: 40%;
      top:20%;
      .errorMsg{
        display: block;
        /*margin-bottom: 50px;*/
        font-size: 1.8em;
        line-height: 3.6em;
        color: #48536A;
      }
      .reback404{
        display: block;
        width: 120px;
        margin: 0 auto;
        color: #fff;
        font-weight: 500;
        font-size: 1.2em;
        line-height: 2em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #E93C4A;
      }
      .reback500{
        display: block;
        width: 120px;
        margin: 0 auto;
        color: #fff;
        font-weight: 500;
        font-size: 1.2em;
        line-height: 2em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #F7B528;
      }
    }

  }
</style>
