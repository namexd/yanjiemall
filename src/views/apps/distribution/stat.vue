<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.total_team_leader}}</span>
            <div>队长数</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="6" :offset="3" >
        <el-card class="box-card">
          <div class="static">
             <span>{{data.total_bonus}}</span>
            <div>累计分红(元)</div>

          </div>
        </el-card>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import { getTeamsStat } from '../../../api/apps'

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
        const res=await getTeamsStat()
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
