<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" >
        <el-row>
          <el-col :span="4">
            <el-form-item label="关键词" class="postInfo-container-item">
              <el-input v-model="listQuery.mobile" placeholder="请输入关键词" style="width: 200px;" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="分销等级:" class="postInfo-container-item">
              <el-select v-model="listQuery.level" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                <el-option v-for="item in levelList" :key="item.id" :label="item.level_name"
                           :value="item.id"/>
              </el-select>
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
    <el-table ref="dragTable" v-loading="listLoading" :data="promotersList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="id">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="手机号">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="分销等级">
        <template slot-scope="scope">
          {{ scope.row.user_level }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="账号权重">
        <template slot-scope="scope">
          {{ scope.row.trust_score }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="推荐人">
        <template slot-scope="scope">
          {{ scope.row.p_mobile }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="累计佣金/提现佣金">
        <template slot-scope="scope">
          {{ scope.row.total_balance }}/{{ scope.row.balance }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="下级总数">
        <template slot-scope="scope">
          {{ scope.row.total_cnt }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="下级分销商总数">
        <template slot-scope="scope">
          {{ scope.row.promoter_num }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">
            查看
          </el-button>
          <el-button type="danger" size="mini" @click="handleOrders(scope.row)">分销订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getPromoters"/>

    <el-dialog :visible.sync="dialogVisible" title="查看详情">
      <el-card class="box-card">
        <div class="text item">
          ID：{{promoters.id}}
        </div>
        <div class="text item">
          手机号：{{promoters.mobile}}
        </div>
        <div class="text item">
          分销等级：{{promoters.user_level}}
        </div>
        <div class="text item">
          账号权重：{{promoters.trust_score}}
        </div>
        <div class="text item">
          推荐人：{{promoters.p_mobile}}
        </div>
        <div class="text item">
          累计佣金：{{promoters.total_balance}}
        </div>
        <div class="text item">
          提现佣金：{{promoters.balance}}
        </div>
        <div class="text item">
          下级总数：{{promoters.total_cnt}}
        </div>
        <div class="text item">
          下级分销商总数：{{promoters.promoter_num}}
        </div>
        <div class="text item">
          注册时间：{{promoters.create_at}}
        </div>
      </el-card>
    </el-dialog>

    <el-dialog title="订单列表" :visible.sync="dialogVisible2" width="80%">
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
      </el-table>
      <pagination v-show="total2>0" :total="total2" :page.sync="listQuery2.page" :limit.sync="listQuery2.per_page"
                  @pagination="getPromoterOrder"/>
    </el-dialog>

  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination'
  import {
    getPromoterLevels, getPromoters,getPromoterOrder
  } from '@/api/apps'
  export default {
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        activeName: 'first',
        params: {},
        promoters: [],
        promotersList: [],
        category: [],
        categoryList: [],
        list: [],
        dialogVisible: false,
        dialogVisible2: false,
        id:0,
        total: 0,
        total2: 0,
        levelList: [],
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
        } ,
        listQuery2: {
          page: 1,
          per_page: 20,
        }
      }
    },
    created() {
      this.getPromoters()
      this.getPromoterLevels()
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      async getPromoterOrder() {
        const res= await getPromoterOrder(this.id,this.listQuery2)
        this.list = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      async getPromoters() {
        const res = await getPromoters(this.listQuery)
        this.promotersList= res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      async getPromoterLevels() {
        const res = await getPromoterLevels()
        this.levelList = res.data.items
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getGoods()
      },
      handleView(row) {
          this.promoters = Object.assign({},row)
          this.dialogVisible = true
      },
      handleOrders(row) {
        this.id=row.id
        this.dialogVisible2 = true
        this.getPromoterOrder()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
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
