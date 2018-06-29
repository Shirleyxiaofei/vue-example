<template>
	<div class='login' :style="{height:mainHeight+'px'}">
		<div class="loginLogo">
			<div></div>
		</div>
		<div class="login-form">
			
			<div class="login-form-header">
				<div class="login-form-header-title">密码登录</div>
				<div class="login-form-header-intro">VIP用户可直接登录</div>				
			</div>
			<div class='login-form-body'>
				<el-form :model="loginForm" :rules="loginRules" ref="loginForm">
					<el-form-item prop="username">
						<el-input placeholder='用户名'
							type="text"
							v-model='loginForm.username'
							:disabled='loading'
							prefix-icon='el-icon-star-on'>
						</el-input>
					</el-form-item>
					<el-form-item prop='password'>
						<el-input 
							type='password'
							placeholder='密码'
							v-model='loginForm.password'
							:disabled='loading'
							@keyup.enter.native="login"
							prefix-icon='el-icon-star-off'>
						</el-input>
					</el-form-item>
					<el-form-item>
						<slider @introduce="sliderCallback" :isDragOk="isDragOk"></slider>
						<input v-if="false" type="hidden" name="captchaId" value="fffc9360980142aeb31603e22c0ac7f9">
      					<div v-if="false" id="captcha"></div>
					</el-form-item>
				</el-form>	
			</div>
			<div class="login-form-footer" v-if="!loading">
				<el-button type='warning' style='width:100%;display: block;' :disabled="islogin"  @click.native.prevent='login'>登录</el-button>
			</div>
			<div class="login-form-footer" v-if='loading'>
				<el-button type='warning' style='width:100%' :loading = true>登录中</el-button>
			</div>
			
		</div>
	</div>
</template>

<script>
	import slider from '../components/SlideVerification';

	export default {
		components:{
			slider
		},
		data (){
			/*const validateUsername = (rule, value, callback) => {
		      if (!isvalidUsername(value)) {
		        callback(new Error('请输入正确的用户名'))
		      } else {
		        callback()
		      }
		    }
		    const validatePassword = (rule, value, callback) => {
		      if (value.length < 6) {
		        callback(new Error('密码不能小于6位'))
		      } else {
		        callback()
		      }
		    }*/
			return {
				msg :'登录界面',
				mainHeight:document.body.clientHeight,
				isDragOk: false,//是否拖动成功
				slideBtn: true,			

				loginForm:{
					username:'',
					password:''
				},
				loginRules:{
					username: [{ required: true, trigger: 'blur', message:'请输入用户名' }],
        			password: [{ required: true, trigger: 'blur', message:'密码不能为空' }]
				},
				loading:false
			}
		},
		mounted(){
			let that = this
		    // _.debounce 是一个通过 lodash 限制操作频率的函数。
		    window.onresize = this._.debounce(() => {
		        
		        that.mainHeight = document.body.clientHeight
		        console.log("onresize:" + that.mainHeight)
		    }, 400)
			return;

			var self = this;
			window.initNECaptcha({
		        captchaId: 'fffc9360980142aeb31603e22c0ac7f9',
		        element: '#captcha',
		        mode: 'float',
		        width: 290,
		        onReady: function(instance){
		        	// 验证码一切准备就绪，此时可正常使用验证码的相关功能
		        },
		        onVerify: function(err, data){
		        	//console.log(err, data,'onVerify');
		        	if(data){
		        		self.slideBtn = false;
		        	}
		        }
		      }, function onload (instance) {
		        // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
		      }, function onerror (err) {
		        // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
		        console.log(err,'失败');
		      });
		},
		
		methods:{
			login(){
				if(this.islogin) return false;
				this.$refs.loginForm.validate(valid=>{
					if(valid){
						this.loading = true;
						this.$store.dispatch('LoginByUsername', this.loginForm).then((data) => {
							console.log(data)
				            this.loading = false
				            this.$router.push({ path: '/' })
				        }).catch((error) => {
				        	console.log(error)
				            this.loading = false;
				            this.isDragOk = false;
				            this.slideBtn = true;
				        })
						
					}else{
						console.log('error submit!!')
         				return false
					}					
				})
			},
			sliderCallback(isAdopt){
				this.isDragOk = isAdopt
				this.slideBtn = !isAdopt;
			}
		},
		computed: {
			islogin: function () {
				if(this.loginForm.username == ''){
					return true;
				}else if(this.loginForm.password == ''){
					return true;
				}else{
					return this.slideBtn;
				}
	    	}
		},
		
	}
</script>

<style scoped="scoped">
.login{
	width:100%;
	height: 100%;
	/*min-height: 734px;
	min-width:1336px;*/
	background-image: url(../assets/login.gif);
	background-repeat: no-repeat;
	background-position:center;
	background-size:100%;
	background-color:#242b39;
	position: relative;
}
.loginLogo{
	padding-top:20px;
}
.loginLogo>div{
	height:45px;
	line-height: 45px;
	background: url(../assets/loginLogo.png) no-repeat 5%;
	background-size:contain ;
}
.login-form{
	width:340px;
	
	padding:25px;
	box-sizing: border-box;
	background: #FFFFFF;
	display: table-cell;
	vertical-align: middle;
	position:absolute;
	right:15%;
	top:30%;
	border-radius: 5px;
	-webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.login-form:before{
	content: "";
	display: block;
	width:100%;
	height:30px;
	background: url(../assets/loginTitle.png) no-repeat 47% center;
	background-size:contain ;
	position: absolute;
	left:0;
	top:-23%;
}

.login-form .login-form-body{
	margin:20px 0;
}
.login-form-header-title{
 	font-size:16px;
	color:#333333;
}
.login-form-header-intro{
	padding-top:20px;
	font-size:14px;
	color:#d5d9e1;
}
.el-button{
}
</style>