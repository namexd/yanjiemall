<template>
  <div class="app-container">
    <el-form label-width="250px">
    <el-row style="margin-bottom: 50px">
      <el-col :span="20" :offset="2">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>金币设置</span>
            </div>
            <el-form-item label="自动关闭未付款订单，下单后：" >
              <el-input v-model="configList.close_order_time" clearable autocomplete="off" style="width: 20%"></el-input><span  class="right" style="margin-right: 100px">分钟</span> <span>不能小于15分钟</span>
            </el-form-item>
            <el-form-item label="自动确认收货，发货后：" >
              <el-input v-model="configList.confirm_order_time" clearable autocomplete="off" style="width: 20%"></el-input><span class="right">天</span>
            </el-form-item>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 50px">
      <el-col :span="20" :offset="2">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>订单设置</span>
            </div>
            <el-form-item label="挖矿券转出消费券，手续费：金币" >
              <el-input v-model="configList.mine_to_share" clearable autocomplete="off" style="width: 20%"></el-input><span class="right">%</span>
            </el-form-item>
            <el-form-item label="金币兑换消费券，手续费：金币" >
              <el-input v-model="configList.gold_to_share" clearable autocomplete="off" style="width: 20%"></el-input><span class="right">%</span>
            </el-form-item>
            <el-form-item label="推广余额提现，手续费：消费券" >
              <el-input v-model="configList.balance_to_mine" clearable autocomplete="off" style="width: 20%"></el-input><span class="right">%</span>
            </el-form-item>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <div>
          <el-card>
            <el-form-item label="1金币=" >
              <el-input v-model="configList.gold_to_bean" clearable autocomplete="off" style="width: 20%"></el-input><span class="right">铜币</span>
            </el-form-item>

          </el-card>
        </div>
      </el-col>
    </el-row>
      <el-row>
      <el-col :span="20" :offset="2">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>育成奖</span>
            </div>
            <el-form-item  >
              <el-radio v-model="configList.grown_promote_fee_status" :label="1">开启</el-radio>
              <el-radio v-model="configList.grown_promote_fee_status" :label="0">关闭</el-radio>
            </el-form-item>
            <el-form-item   v-if="configList.grown_promote_fee_status==1">
              <el-input v-model="configList.grown_promote_fee"  placeholder="请输入提成数" style="width: 20%"></el-input><span class="right">%</span>
            </el-form-item>
          </el-card>
        </div>
      </el-col>
    </el-row>

    </el-form>
    <div   class="footer">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { getConfigs, updateConfigSeat } from '../../../api/settings'

  export default {
    data() {
      return {
        configList:[],
        radio:1
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      async getConfig() {
        const res = await getConfigs(this.listQuery)
        this.configList = res.data
      },
      save()
      {
        updateConfigSeat(this.configList).then(res=>{
          res.code==0?this.$message.success('保存成功！'):this.$message.success('保存失败！')
          this.getConfig()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer{
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .right{
    margin-left: 10px;
  }
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
