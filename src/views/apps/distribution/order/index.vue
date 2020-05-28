<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="6">
            <el-form-item label="分销订单编号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.order_no" placeholder="分销订单编号" style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="买家信息" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="手机号" style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单时间" class="postInfo-container-item">
              <el-date-picker
                v-model="listQuery.seller_confirm_at"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>
    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" row-class-name="rowStyle">
      <el-table-column align="center" label="买家账号" width="220">
        <template slot-scope="scope">
          <div class="bottom_content"><span>订单编号：{{scope.row.order_no}}</span>
          </div>
          <div>
            {{ scope.row.mobile }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="挖矿券名称">
        <template slot-scope="scope">
          {{ scope.row.product_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="配送数量">
        <template slot-scope="scope">
          {{ scope.row.income }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="成交时间">
        <template slot-scope="scope">
          {{ scope.row.seller_confirm_at }}
        </template>
      </el-table-column>
      <el-table-column align="left" label="分销商">
        <template slot-scope="scope">
          <div v-for="items in scope.row.promote_data">
            <div>{{items.type}}级分销商:{{items.mobile}}</div>
            <div>佣金:{{items.money}}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getPromoterOrders"/>


  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import { getPromoterOrders, getPromoterOrder } from '../../../../api/apps'

  export default {
    components: { Pagination },
    directives: { waves },

    data() {
      return {
       list: [],
        dialogFormVisible: false,
        title: '',
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        }
      }
    },
    created() {
      this.getPromoterOrders()
    },
    methods: {
      async getPromoterOrders() {
       const res= await getPromoterOrders(this.listQuery)
        this.list = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getPromoterOrders()
      }
    }
  }
</script>

<style>
  .rowStyle {
    height: 100px;
  }

  .bottom_content {
    position: absolute;
    z-index: 2;
    width: 750%;
    top: 15px;
    text-align: left;
  }
</style>
<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }

</style>
