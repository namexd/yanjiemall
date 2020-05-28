<template>
  <div class="app-container">
    <back-to-prev path-name="balance" detail="提现申请详情"></back-to-prev>
    <el-row>
      <el-col :span="24">
        <el-steps :active="2">
          <el-step title="提交申请" :description="balance.create_at"></el-step>
          <el-step title="商家打款" :description="balance.update_at"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>提现信息</span>
          </div>
          <div class="text item">
            <div class="left">申请金额：</div>
            <div class="right">{{balance.money}}</div>
          </div>
          <div class="text item">
            <div class="left">手续费(消费券)：</div>
            <div class="right">{{balance.service_fee}}</div>
          </div>
          <div class="text item">
            <div class="left">申请时间：</div>
            <div class="right">{{balance.create_at}}</div>
          </div>
          <div class="text item">
            <div class="left">打款时间：</div>
            <div class="right">{{balance.update_at}}</div>
          </div>
          <div class="text item">
            <div class="left">提现方式：</div>
            <div class="right">{{balance.product_name}}<br>挖矿券编号：{{balance.mine_no}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分销商信息</span>
          </div>
          <div class="text item">
            <div class="left">账号：</div>
            <div class="right">{{promoter.mobile}}</div>
          </div>
          <div class="text item">
            <div class="left">分销商等级：</div>
            <div class="right">{{promoter.level_name}}</div>
          </div>
          <div class="text item">
            <div class="left">成为分销商的时间：</div>
            <div class="right">{{promoter.promot_at}}</div>
          </div>
          <div class="text item">
            <div class="left">累计佣金：</div>
            <div class="right">{{promoter.total_balance}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分销人数</span>
          </div>
          <div class="text item">
            <div class="left">一级：</div>
            <div class="right">{{promoter.first_relation}}</div>
          </div>
          <div class="text item">
            <div class="left">二级：</div>
            <div class="right">{{promoter.second_relation}}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import BackToPrev from '../../../components/BackToPrev/index'
  import { getBalance } from '../../../api/apps'

  export default {
    name: 'detail',
    components: { BackToPrev },
    data() {
      return {
        balance: {},
        promoter: {},
      }
    },
    created() {
      this.getBalance()
    },
    methods: {
      async getBalance() {
        const res = await getBalance(this.$route.query.id)
        this.balance = res.data.balance
        this.promoter = res.data.promoter
      }
    }
  }
</script>

<style scoped>
.right{
  float: right;
  width: 50%;
  text-align: left;
  padding: 15px;
}
.left{
  float: left;
  width: 50%;
  text-align: left;
  padding: 15px;
}
  .box-card{
    min-height: 400px;
  }
</style>
