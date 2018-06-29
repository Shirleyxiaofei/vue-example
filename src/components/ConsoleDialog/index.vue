<template>
	<div class="consoledialog">
		<el-dialog
			:title="title"
  			:visible.sync="visible"
  			:width = 'dialogWidth'
 	 		@close='close'>
 	 		<transition name="consoledialog-fade">
	  			<div class="dialog-content" ref="content" v-if="visible">
	  				<slot name="content"></slot>
	  			</div>
 	 		</transition>
		  	<div slot="footer" class="dialog-footer">
			    <div @click="handle('cancel')" class="dialog-button dialog-button-cancel">取 消</div>
			    <div type="primary" @click="handle('confirm')" class="dialog-button dialog-button-confirm">确 定</div>
		  	</div>
		</el-dialog>
	</div>
</template>

<script>
	import {Dialog,Button} from 'element-ui'
	export default {
	    data() {
	      return {
	        thisView:''
	      };
	    },
	    components:{
	    	ElDialog:Dialog,
	    	ElButton:Button
	    },
	    props:{
	    	 'title': {
		        type: String,
		        default:"提示"
		      },
		      'visible': {
		        type: Boolean,
		        default: false
		      },
		      'dialogWidth':{
		      	type:[String,Number],
		      	default:'450px'
		      },
		      validateName:[String],
		      dataName:[String]
	    },
	    methods: {
	    	handle(action){
	    		if(action =='confirm'){
	    			let win;
	    			
	    			//this.close()
	    			if(!this.validateName && !this.dataName){
	    				this.visible = false
	    				if(this.win){
	    					let that = this;
		    				setTimeout(()=>{
		    				that.win = window.open("","_blank");
		    				that.callback(this.win)
		    				},300)
		    				return		
		    			}
	    				that.callback()
	    				return
	    			}
	    			
	    			let thisView = this.$slots.content.length && this.$slots.content[0].componentInstance;
	    			thisView[this.validateName]().then(res=>{
	    				this.callback(thisView[this.dataName],thisView)
	    				this.visible = false;
	    			}).catch(error=>{
	    				console.log(error)
	    			});
	    		}else{
	    			this.visible = false;
	    			//this.$slots = [];
	    		}
	    	},
	    	close(){
	    		console.log('关闭');
	    	},
	    	
	    },
	   
  	};
</script>

<style lang="scss" scoped="scoped">
.consoledialog{
	.dialog-footer{
		font-size:0px;
		height:40px;
		.dialog-button{
			display: inline-block;
			width:50%;
			font-size:12px;
			line-height: 40px;
			height: 100%;
			cursor: pointer;
			font-weight: 500;
		}
		.dialog-button-cancel{
			background: #f0f2f6;
			color:#606266;
			&:hover{
				background:#e5e8f1;
			}
		}
		.dialog-button-confirm{
			background: #f8cd75;
			color:#FFFFFF;
			&:hover{
				background:#fcd995;
			}
		}
	}
}

.consoledialog-fade-leave-active {
  animation: dialog-fade-out .3s;
}


@keyframes consoledialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}

</style>