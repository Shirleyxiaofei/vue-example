<template>
	<div class="el-slide-scale">
		<template v-if="isOften">
			<el-slider v-model="cycleCnt_new" :min="ofterMin" :max="often" :format-tooltip="sliderFormatTooltip"></el-slider><div class="el-slider-label" style="right: 30px;">
			<span style="padding-right: 5px;" class="huang">{{parseInt(cycleCntValue)}}</span>{{cycleCntValue.match(/[\u4e00-\u9fa5]/g).join("")}}</div>
			<div class="slider-mark">
				<div class="scale">
					<span v-for="number in often" :style="'width:' + 100/(often-1) + '%'" :key="number">|</span>
				</div>
				<div class="scaleInfo" ref="scaleInfo">
					<span  v-for="number in often" :style="{width: 100/(often-1) + '%',marginLeft:  (number == 1 ?(-100/(often-1)/2):'') + '%'}" :key="number">
						<span v-if="number == 12">1年</span>
						<span v-else-if="number == 13">2年</span>
						<span v-else-if="number == 14">3年</span>
						<span v-else>{{number}}个月</span>
					</span>
				</div>
			</div>
		</template>
		<template v-else>
			<el-slider v-model="bandwidth" :max="broadbandMax" :min="broadbandMin" :step="broadbandStep"></el-slider>
			<div class="el-slider-label"><span style="padding-right: 5px;" class="huang">{{bandwidth}}</span>Mbit/s</div>
			<div class="slider-mark">
				<div class="scale">
					<span v-for="number in bbScale" :style="'width:' + 100/bbScale + '%'" :key="number">|</span>
					<span>|</span>
				</div>
				<div class="scaleInfo">
					<span style="margin-left: -2px;">1</span>
					<span style="margin-left: 30.5%;">100</span>
					<span style="margin-left: 30%;">200</span>
					<span style="right: -10.6px;">300</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default{
	name:'slideScale',
	props:{
        cycleCnt:{
        	type: Number,
        	default: 1,
        },
        isOften:{
        	type: Boolean,
        	default: true,
        },
        bandwidths:{
        	type: Number,
        	default: 100,
        },
    },
	data(){
		return {
			often: 14,
			ofterMin: 1,
			cycleType: 'M',
			cycleCnt_new: 1,
			bandwidth: 100,
			broadbandMax: 300,
			broadbandMin: 1,
			broadbandStep: 1,
			bbScale: 30,
		}
	},
	methods: {
		sliderFormatTooltip (value) {
      		if(value == 12){
      			this.cycleType = 'Y';
      			return '1年';
      		}else if(value == 13){
      			this.cycleType = 'Y';
      			return '2年';
      		}else if(value == 14){
      			this.cycleType = 'Y';
      			return '3年';
      		}else{
      			this.cycleType = 'M';
      			return value+'个月';
      		}
      }
	},
	computed: {
		cycleCntValue: function(){
			return this.sliderFormatTooltip(this.cycleCnt_new);
		}
	},
	mounted () {
		this.cycleCnt_new = this.cycleCnt;
		this.bandwidth = this.bandwidths;
	},
	watch: {
		cycleCnt_new: function(){
			this.$emit('ofterCallback',this.cycleCnt_new);
		},
		bandwidth: function(){
			this.$emit('ofterCallback',this.bandwidth);
		}
	}
}
</script>

<style  scoped lang="scss">
.el-slide-scale{
	margin-right: 80px;
	.el-slider-label{
		position: absolute;
	    right: -5px;
	    top: 0px;
	    color: #afbfda;
	}
	.huang {
		color: #eec26a;
	}
	.slider-mark > .scale > span {
	    display: inline-block;
	    height: 100%;
	}
	.slider-mark {
    	margin-top: -15px;
    	color: #afbfda;
    }
    .el-form-item__content {
	    margin-right: 80px;
	}
	.el-slider__button-wrapper {
	    top: -18px;
	}
	.slider-mark > .scaleInfo > span:last-child {
	    position: absolute;
	}
	.slider-mark > .scale {
		height: 20px;
	}
	.slider-mark > .scale > span:last-child {
		width: auto !important;
		display: inline;
	    float: right;
	    margin-top: -40px;
	}
	.slider-mark > .scaleInfo {
		font-size: 12px;
		position: relative;
	}
	.slider-mark > .scaleInfo > span{
		display: inline-block;
		text-align: center;
	}
}
</style>
<style>
.el-slide-scale .el-slider__bar {
	background-color: #3dc7fa;
	border-color: #3dc7fa;
}
.el-slide-scale .el-slider__button {
	border-color: #3dc7fa;
}
</style>