<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.frozen_share_mine}}</span>
            <div>当前委托数</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.total_value}}</span>
            <div>今日成交数</div>

          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.today_price}}</span>
            <div>今日成交价</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.yesterday_price}}</span>
            <div>昨日成交价</div>

          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.total_share_mine}}</span>
            <div>会员持有消费券总数</div>
          </div>
        </el-card>

      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.total_order_spend}}</span>
            <div>消费券购物消耗</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="6" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <span>{{data.total_fee_spend}}</span>
            <div>手续费消耗</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getVoucherStat } from '../../api/voucher'
  export default {
    data() {
      return {
        data: {},
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        const res = await getVoucherStat()
        this.data = res.data
      }
    }
  }
</script>

<style>
  .static {
    min-height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .static span {
    color: #20a0ff;
  }
  .el-row{
    margin-bottom: 30px;
  }
</style>
