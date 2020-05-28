<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.total_promoter}}</span>
            <div>分销商总数</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="4" :offset="3" >
        <el-card class="box-card">
          <div class="static">
             <span>{{data.check_balance}}</span>
            <div>提现待审核(元)</div>

          </div>
        </el-card>

      </el-col>
      <el-col :span="5" :offset="3" >
        <el-card class="box-card">
          <div class="static">
             <span>{{data.total_balance}}</span>
            <div>累计佣金(元)</div>

          </div>
        </el-card>

      </el-col>
      <el-col :span="5" >
        <el-card class="box-card">
          <div class="static">
             <span>{{data.used_balance}}</span>
            <div>已提现佣金(元)</div>

          </div>
        </el-card>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import { getDistributionStat} from '../../../api/apps'

  export default {
    data(){
      return{
        data:{}
      }
    },
    created() {
      this.getData()
    },
    methods:{
      async getData()
      {
        const res=await getDistributionStat()
        this.data=res.data;
      }
    }
  }
</script>

<style scoped>
  .static{
    min-height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .static span{
    color: #20a0ff;
  }
</style>
