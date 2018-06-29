<template>
  <div class="e-charts" ref="echarts">
      <el-popover ref="popover5" placement="top" width="200" v-model="visible">
            <p>聚合是云监控系统对原始采样数据按照不同的周期采取平均值、最大值、最小值、求和值、方差值计算的过程。</p>
            <el-checkbox v-model="checkedOriginal" @change="changeOriginal" :disabled="disabledOriginal">聚合</el-checkbox>
            <el-form ref="form" :model="params" label-width="60px" size="mini">
               <el-form-item label="周期" required>
                <el-select v-model="params.period" placeholder="请选择周期" :disabled="!checkedOriginal">
                  <el-option :label="time.name" :value="time.value*60" v-for="(time,index) in times" :key="index"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="方法" required>
                <el-select v-model="params.filter" placeholder="请选择方法" :disabled="!checkedOriginal">
                  <el-option :label="method.name" :value="method.value" v-for="(method,index) in methods" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="setCallback">确定</el-button>
            </div>
      </el-popover>
      <div class="title">
        <label class="title_name">{{monitorData.metric_name}}</label>
         <div class="btn f_right" v-if="isMax">
          <el-button type="text" size="medium" v-if="false"><svg-icon icon-class="m_add"></svg-icon></el-button>
          <el-button type="text" size="medium" @click.stop="refresh"><svg-icon icon-class="m_refresh"></svg-icon></el-button>
          <el-button type="text" size="medium" v-popover:popover5><svg-icon icon-class="m_set"></svg-icon></el-button>
          <el-button type="text" size="medium" @click.stop="_minimization"><svg-icon icon-class="m_retract"></svg-icon></el-button>
        </div>
        <div class="btn f_right" v-else-if="isCollect">
          <el-button type="text" size="medium" @click.stop="del"><svg-icon icon-class="delete"></svg-icon></el-button>
          <el-button type="text" size="medium" @click.stop="update"><svg-icon icon-class="m_set"></svg-icon></el-button>
          <el-button type="text" size="medium" @click.stop="_maximization(monitorData)"><svg-icon icon-class="m_open"></svg-icon></el-button>
        </div>
        <div class="btn f_right" v-else>
          <el-button type="text" size="medium" v-if="false"><svg-icon icon-class="m_add"></svg-icon></el-button>
          <el-button type="text" size="medium" @click.stop="_maximization(monitorData)"><svg-icon icon-class="m_open"></svg-icon></el-button>
        </div>
        <el-row>
          <el-col :span="8" v-if="maxVal != '--'"><div class="grid-content">
            <div class="f_12_6 p_l_20 p_t_10"><label class="val">最大值</label><label class="p_l_10 val">最小值</label></div>
            <div class="f_16_e3 p_l_20 p_t_5">
              <el-tooltip class="item" effect="dark" :content="maxVal+''" placement="top">
                <label class="val overflow">{{maxVal}}</label>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="minVal+''" placement="top">
                <label class="p_l_10 val overflow">{{minVal}}</label>
              </el-tooltip>
            </div>
          </div></el-col>
          <el-col :span="maxVal != '--' ? 16 : 24">
            <div class="grid-content location_info" v-if="!isMax"><i class="el-icon-location location_icon"></i>{{monitorData.region_name || '---'}}</div>
            <div class="grid-content t_a_r" v-if="isMax">
              <el-radio-group v-model="params.time_range" size="mini" @change="timeRangeChange">
                <el-radio-button :label="btnItem.time_range" v-for="(btnItem,index) in _btnDatas" :key="index">{{btnItem.name}}</el-radio-button>
              </el-radio-group>
            </div>
            <div class="p_t_5 t_a_r" v-if="isMax">
                <label class="f_12_6">自定义时间段：</label>
                <el-date-picker
                  v-model="value7"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2" size="mini" @change = "dateChange">
                </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
      <div :id="id" class="chart"></div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
//require('echarts/lib/component/title')
import { btnDatas,filter } from '@/views/monitor/config/monitorConfig'
  export default {
    props: {
      id:{
        type: String,
        default: 'myChart'
      },
      width:{
        type: String,
        default: '300px'
      },
      height:{
        type: String,
        default: '300px'
      },
      monitorData: {
        type: Object,
        default: {
          metric_name: '------',
          data: {
            xAxis_data: [],
            chartData: []
          },
          id: new Date().getTime()+'',
        }
      },
      isMax:{
        type: Boolean,
        default: false,
      },
      isCollect:{
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        msg: 'echarts',
        e_obj: {
          width: '300px', 
          height: '300px'
        },
        myChart:'',
        _btnDatas: [],
        visible: false,
        checkedOriginal: true,
        disabledOriginal: false,
        times: btnDatas[1].times,
        methods: filter.methods,
        form:{
          region: 'shanghai',
        },
        params:{
          uuid: undefined,
          metric_name: this.monitorData.id,
          period: 300,
          filter: 'avg',
          time_range: '3h',
          time_from: undefined,
          time_till: undefined,
        },
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() < (new Date().getTime()-3600 * 1000 * 24 * 7) || time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: ''
      }
    },
    created() {
      this.e_obj = {
        width: this.width, 
        height: this.height
      };
      this._btnDatas = btnDatas;
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById(this.id));
      this.$store.commit('ADD_ECHARTS',this.myChart);
      //this.myChart.showLoading();
      this.drawLine();
    },
    methods: {
      drawLine() {
        this.myChart.clear();
        let series = [],xAxis_data = [];
        if(this.monitorData.series){
          series = this.monitorData.series;
          xAxis_data = this.monitorData.xAxis_data;
        }else{
          series.push(
              {
                  name: this.monitorData.metric_name,
                  type:'line',
                  smooth: true,
                  connectNulls: true,
                  data: this.monitorData.data.chartData,
              }
          );
          xAxis_data = this.monitorData.data.xAxis_data;
          //this.myChart.hideLoading();
        }
        var option = {
            tooltip: {
                trigger: 'axis',
                confine: true,
                formatter: (params) => {
                  let content = [];
                  content.push(params[0].name+ '<br />');
                  params.map((item, index, array) => {
                    if(item.seriesName.indexOf('%') > -1){
                      if(item.value === '' || item.value === '无' || item.value === '-'){
                        content.push(item.marker + item.seriesName + ':-<br />');
                      }else{
                        content.push(item.marker + item.seriesName + ':' + item.value +'%' + '<br />');
                      }
                    }else if(item.seriesName.indexOf('Bps') > -1){
                      let val = '';
                      if(item.value === '' || item.value === '无' || item.value === '-'){
                        val = '-';
                      }else if(item.value < 1){
                        val = (item.value * 1024).toFixed(2) + 'Bps';
                      }else if(1 <= item.value && item.value < 1024){
                        val = item.value.toFixed(2) + 'KBps';
                      }else if(1024 <= item.value && item.value < 1024*1024){
                        val = (item.value / 1024).toFixed(2) + 'MBps';
                      }else{
                        val = (item.value / (1024 * 1024)).toFixed(2) + '1GBps';
                      }
                      content.push(item.marker + item.seriesName + ':' + val + '<br />');
                    }else{
                      if(item.value === '' || item.value === '无' || item.value === '-'){
                        content.push(item.marker + item.seriesName + ':-<br />');
                      }else{
                        content.push(item.marker + item.seriesName + ':' + item.value + '<br />');
                      }
                    }
                  });
                  return content.join('');
                },
                //position: ['25%', '25%']
            },
            legend: {
                height: this.$refs.echarts.clientWidth,
                width: this.$refs.echarts.clientHeight
            },
            grid: {
                top: (this.isMax ? '120px' : '80px'),
                left: (this.isMax ? '5%' : '3%'),
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                  saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis_data,
            },
            yAxis: {
                type: 'value',
            },
            series: series,
            color: ['#3dc7fa','#5de1c6','#9799f7','#f185f2','#fcb36d']
        };
        this.myChart.setOption(option);
      },
      _maximization(monitorData) {
        this.$emit('maximization',monitorData);
      },
      _minimization(){
        this.$emit('minimization');
      },
      del(){
        this.$emit('delItem');
      },
      update(){
        this.$emit('updateItem');
      },
      timeRangeChange(val){
        var btnData = this._.find(btnDatas,{time_range: val});
        this.params.period = btnData.index * 60;
        this.times = btnData.times;
        this.disabledOriginal = btnData.cheDisabled;
        this.checkedOriginal = true;
        this.params.time_range = val;
        this.params.time_from = undefined;
        this.params.time_till = undefined;
        this.value7 = '';
        this.$emit('getMonitor',this.params,() => {
          this.drawLine();
        });
      },
      changeOriginal(val){
        console.log(val);
      },
      refresh(){
        let params = null;
        if(!this.checkedOriginal){
          params = JSON.parse(JSON.stringify(this.params));
          params.period = 60;
        }else{
          params = this.params;
        }
        this.$emit('getMonitor',params,() => {
          this.drawLine();
        });
      },
      dateChange(val){
        if(val){
          this.params.time_from = parseInt(val[0].getTime()/1000);
          this.params.time_till = parseInt(val[1].getTime()/1000);
          this.params.time_range = undefined;
          this.times = btnDatas[4].times;
          this.disabledOriginal = btnDatas[4].cheDisabled;
          this.params.period = btnDatas[4].index * 60;
          this.checkedOriginal = true;
          this.$emit('getMonitor',this.params,() => {
            this.drawLine();
          });
        }else{
          this.times = btnDatas[1].times;
          this.disabledOriginal = btnDatas[1].cheDisabled;
          this.params.time_range = btnDatas[1].time_range;
          this.params.period = btnDatas[1].index * 60;
          this.checkedOriginal = true;
          this.params.time_from = undefined;
          this.params.time_till = undefined;
          this.$emit('getMonitor',this.params,() => {
            this.drawLine();
          });
        }
      },
      setCallback(){
        this.visible = false;
        let params = null;
        if(!this.checkedOriginal){
          params = JSON.parse(JSON.stringify(this.params));
          params.period = 60;
        }else{
          params = this.params;
        }
        this.$emit('getMonitor',params,() => {
          this.drawLine();
        });
      }
    },
    computed: {
      maxVal(){
        if(this.monitorData.series){
          return '--';
        }else{
          var tempSr = JSON.stringify(this.monitorData.data.chartData).replace(/"无",/g, '').replace(/,"无"/g, '');
          return this._.max(JSON.parse(tempSr));
        }
      },
      minVal(){
        if(this.monitorData.series){
          return '--';
        }else{
          var tempSr = JSON.stringify(this.monitorData.data.chartData).replace(/"无",/g, '').replace(/,"无"/g, '');
          return this._.min(JSON.parse(tempSr));
        }
      },
    },
    watch:{
      'monitorData.series'(curVal,oldVal){
          if(curVal.length == JSON.parse(this.monitorData.content).length){this.drawLine();}
　　　　},
    },
    beforeDestory() {
      console.log('销毁echart');
    },
    destoryed() {
      console.log('销毁echart-------');
    }
  }
</script>

<style scoped lang="scss">
.e-charts {
  position: relative;
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 100%;
  }
  .title {
    position: absolute;
    width: 100%;
    z-index: 5;
  }
  .title_name {
    padding-left: 10px;
    padding-top: 10px;
    display: inline-block;
    font-size: 14px;
    color: #333;
  }
  .f_right {
    float: right;
  }
  .btn {
    padding-right: 10px;
  }
  .p_l_20 {
    padding-left: 20px;
  }
  .p_l_10 {
    padding-left: 10px;
  }
  .p_t_10 {
    padding-top: 10px;
  }
  .p_t_5 {
    padding-top: 5px;
  }
  .f_12_6 {
    font-size: 12px;
    color: #666;
  }
  .f_16_e3 {
    font-size: 10px;
    color: #67e3c8;
  }
  .val {
    display: inline-block;
    width: 40px;
    text-align: center;
  }
  .overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .location_info{
      text-align: right;
      margin-right: 20px;
  }
  .location_icon{
      color: #56d6c4;
  }
  .t_a_r {
    text-align: right;
  }
}
</style>
<style>
.e-charts{
  .el-button--text{
    color: #d7deec;
  }
}
</style>