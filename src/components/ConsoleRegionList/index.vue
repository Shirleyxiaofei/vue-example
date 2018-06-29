<template>
  <el-select class="node-list" v-model="currentId" placeholder="请选择"  @change="changeArea(currentId)">
    <el-option class="node-li"
      v-for="item in areas"
      :key="item.uuid"
      :label="item.name"
      :value="item.uuid"
    >
    </el-option>
  </el-select>
</template>

<script>
  import {Loading} from 'element-ui'
  import store from '@/store'
  import { getRegionId, setRegionId, SetZoneId, SetVnc,SetRegionType,getRegionType } from '@/utils/auth'
  import {getRegionList} from '@/api/login'
  export default{
    props:{
      name:[String],
      buttonText:[String,Array],
      buttonTexts:[String],
      type:[String],
      regionData:[Array,Object]
    },
    data(){
      return {
        currentId:'',
        areas:[

        ],
        options:[],
      }
    },
    methods:{
      changeArea(area){
        let uuid = area;
        let zoneid;
        let vnc;
        let regionType;
        this.areas.map(item=>{
            if(item.uuid==uuid){
              zoneid = item.details.zoneId;
              vnc = item.details.hasVnc;
              regionType = item.type;
            }
        });
        setRegionId(uuid)
        SetZoneId(zoneid)
        SetVnc(vnc)
        SetRegionType(regionType);
        this.$store.dispatch('changeRegionType',getRegionType());
        this.currentId = uuid;
        window.location.reload();
      },
      getRegionList(){
        /*let loadingInstance = Loading.service({
         fullscreen:true,
         target:'main'
         });*/
        this.areas = this.$store.state.user.regionList;

//        this.areas.map(item=>{
//          item.zoneid = item.details && item.details.zoneId;
//          item.hasVnc = item.details && item.details.hasVnc;
//          item.regionType = 1 == item.type ? 'cs' : 2 == item.type && 'os';
//        })
//        this.type && (this.areas = this.areas.filter(item=>{
//          return item.regionType == this.type
//        }))
        if(getRegionId()){
          this.currentId = getRegionId()
          this.$store.dispatch('changeRegionType',getRegionType())
        }else{
          let uuid = this.areas[0].uuid
          let zoneid = this.areas[0].zoneid;
          let hasVnc = this.areas[0].hasVnc;
          let regionType = this.areas[0].regionType;
          this.currentId = uuid
          setRegionId(uuid)
          SetZoneId(zoneid)
          SetVnc(hasVnc)
          SetRegionType(regionType)
          this.$store.dispatch('changeRegionType',getRegionType())
        }

        /*getRegionList().then((res)=>{
         let data = res.data;
         this.areas = data.platforms;
         if(getRegionId()){
         this.currentId = getRegionId()
         }else{
         let uuid = this.areas[0].uuid
         this.currentId = uuid
         setRegionId(uuid)
         }
         loadingInstance.close()
         })
         .catch((req) => {
         loadingInstance.close()
         console.log(req)
         })*/

      }
    },
    computed:{
//      regionNum(){
//        return this.regionData
//      }
    },
    mounted(){
      //console.log(this.$store.state.user.regionList)
      this.getRegionList()
    }
  }
</script>

<style lang="scss">
.node-list{
  background-color: #343434;
  color: #fff;
  .el-input{
    background-color: #343434;
    color: #fff;
  }
  input{
    background-color: #343434;
    color: #fff;
    border: none;
  }
}
</style>
