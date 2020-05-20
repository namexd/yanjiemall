<template>
  <div class="app-container">
    <div style="margin: 10px">
      <el-page-header @back="goBack" content="订单详情">
      </el-page-header>
    </div>
    <div v-if="order">
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
          <el-card style="margin-bottom: 20px">
            <el-steps :active="order.status">
              <el-step title="买家下单" :description="order.create_at"></el-step>
              <el-step title="买家付款" :description="order.pay_at?order.pay_at_format:''"></el-step>
              <el-step title="卖家发货" :description="order.express_at?order.express_at_format:''"></el-step>
              <el-step title="交易完成" :description="order.end_at?order.end_at_format:''"></el-step>
            </el-steps>
          </el-card>
        </el-col>

      </el-row>
      <el-row :gutter="20">

        <el-col :span="8" :xs="24">
          <order-info :order="order"></order-info>
        </el-col>

        <el-col :span="8" :xs="24">
          <user-info :order="order"></user-info>
        </el-col>

        <el-col :span="8" :xs="24">
          <other-info :order="order"></other-info>
        </el-col>

      </el-row>
      <el-row :gutter="20">

        <el-col :span="24" :xs="24">
          <goods-info :order="order"></goods-info>
        </el-col>

      </el-row>

    </div>
  </div>
</template>

<script>
  import { getOrder } from '../../api/orders'
  import OrderInfo from './components/OrderInfo'
  import UserInfo from './components/UserInfo'
  import OtherInfo from './components/OtherInfo'
  import GoodsInfo from './components/GoodsInfo'

  export default {
    name: 'Detail',
    components: { OrderInfo, UserInfo, OtherInfo, GoodsInfo },
    data() {
      return {
        order: {}
      }
    },
    created() {
      this.getOrder()
    },
    methods: {
      goBack() {
        this.$router.back()
      },
      getOrder() {
        let id = this.$route.query.id
        getOrder(id).then(res => {
          this.order = res.data
        })
      }
    }
  }
</script>
