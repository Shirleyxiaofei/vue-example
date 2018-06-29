<template>
  <div id="app"  >
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return {
  		mainHeight:document.body.clientHeight,
  	}
  },
  mounted(){
  	/*const that = this
    // _.debounce 是一个通过 lodash 限制操作频率的函数。
    window.onresize = this._.debounce(() => {
        console.log("onresize:" + that.mainHeight)
        that.mainHeight = document.body.clientHeight
    }, 400)*/
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #666;
  height:100%;
  min-height: 624px;
	min-width:1336px;
}
</style>
