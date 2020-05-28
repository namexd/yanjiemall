<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
           待发货：<span>{{data.to_deliver}}</span>
          </div>
        </el-card>

      </el-col>
      <el-col :span="6" :offset="3" >
        <el-card class="box-card">
          <div class="static">
            待收货：<span>{{data.to_revieved}}</span>

          </div>
        </el-card>

      </el-col>

    </el-row>
    <el-row :gutter="20" style="margin-top: 100px">
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
            今日下单：<span>{{data.total_orders}}</span>单

          </div>
        </el-card>

      </el-col>
      <el-col :span="6" :offset="3" >
        <el-card class="box-card">
          <div class="static">
            今日成交金额：<span>{{data.total_money}}</span>元

          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getOrderStat } from '../../api/orders'

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
         const res=await getOrderStat()
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
