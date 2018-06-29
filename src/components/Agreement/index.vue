<template>
  <div class="Agreement_component">
    <!--<p>{{mark}}</p>-->
    <p>
      <el-checkbox v-model="checked">我已阅读并同意相关协议</el-checkbox>
      <span class="Agreement" @click="ViewProtocol">{{Agreement.name}}</span>
    </p>
  </div>
</template>
<script>
  export default {
    props:{
      mark:[String],
      Agreement:[Object]
    },
    data() {
      return {
        checked: true,
      };
    },

    methods: {
      ViewProtocol(){
        window.open(this.Agreement['url']);
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .Agreement_component{
    font-size: 12px;
    .Agreement{
      color: blue;
    }
  }
</style>
