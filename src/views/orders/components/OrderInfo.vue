<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>订单信息</span>
    </div>
    <div class="user-bio">
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-body">
          <div class="progress-item">
            <b>订单状态</b>
            <span>{{order.status|statusFilter}}</span>
          </div>
          <div class="progress-item">
            <b>订单编号</b>
            <span>{{order.order_no}}</span>
          </div>
          <div class="progress-item">
            <b>交易单号</b>
            <span>{{order.id}}</span>
          </div>
          <div class="progress-item">
            <b>订单类型</b>
            <span>{{order.order_type|oderTypeFilter}}</span>
          </div>
          <div class="progress-item">
            <b>支付方式</b>
            <span>{{order.pay_type | payTypeFilter}}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  const PayTypes = [
    { key: 1, display_name: '支付宝' },
    { key: 2, display_name: '微信' },
    { key: 3, display_name: '金币' },
    { key: 4, display_name: '消费券' }
  ]
  const OrderTypes = [
    { key: 1, display_name: '普通' },
    { key: 2, display_name: '消费券商品' },
    { key: 3, display_name: '推客商品' }
  ]
  const calendarTypeKeyValue = PayTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  const orderTypeKeyValue = OrderTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    filters:{
      statusFilter(status){
        let display_name='';
        switch (status) {
          case 1:
            display_name='待付款'
            break;
            case 2:
            display_name='待发货'
            break;
            case 3:
            display_name='待收货'
            break;
            case 4:
            display_name='已完成'
            break;
            case 5:
            display_name='已关闭'
            break;
            case 6:
            display_name='已退款'
            break;
        }
        return display_name;
      } ,
      payTypeFilter(status){
        return calendarTypeKeyValue[status];
      },
      oderTypeFilter(status){
        return orderTypeKeyValue[status];
      }
    },
    props: {
      order: {
        type: Object,
        default: () => {
          return {
          }
        }
      }
    },
  methods:{

  }
  }
</script>

<style lang="scss" scoped>
  .box-center {
    margin: 0 auto;
    display: table;
  }
  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }

  .text-muted {
    color: #777;
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    color: #606266;
    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 16px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
