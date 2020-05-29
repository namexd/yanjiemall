<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>商品信息</span>
    </div>
    <div class="user-bio"  >
      <el-table
        :data="order.goods"
        style="width: 100%">
        <el-table-column
          label="商品"
           >
          <template slot-scope="{row}">
            <el-image
              style="width: 60px; height: 60px"
              :src="row.goods_cover_pic"
              :preview-src-list="[row.goods_cover_pic]">
            </el-image>
            <div style="float: right;margin-right: 25%;"> {{row.goods_name}}<br>{{row.sku_name}} </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          >
        </el-table-column>
        <el-table-column
          prop="order_num"
          label="数量">
        </el-table-column>
        <el-table-column
          label="小计">
          <template slot-scope="{row}">
            ￥{{getSmallTotal(row)}}
          </template>
        </el-table-column>
      </el-table>
      <div >
        <ul class="total" >
          <li>商品总计： {{order.total_price}}</li>
          <li>运费： {{order.freight}}</li>
          <li v-if="order.pay_type==1||order.pay_type==2">实付款：{{order.actual_price}}</li>
          <li v-if="order.pay_type==3">实付金币：{{order.actual_price}}</li>
          <li v-if="order.pay_type==4">实付消费券：{{order.actual_price}}</li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
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
     getSmallTotal(row)
     {
       let price = parseFloat(row.price);
       let num = parseInt(row.order_num);
       return  price*num
     }
  }
  }
</script>

<style lang="scss" scoped>
  .total{
    text-align: left;padding: 5px;float: right;list-style: none
  }
  .total li{
    padding: 2px;
  }
  .total li:last-child{
    color: red;
  }
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
