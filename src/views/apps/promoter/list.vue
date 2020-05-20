<template>
  <div class="app-container">
    <el-button style="margin-bottom: 20px" type="success" @click="handleAddGoods">新增商品</el-button>
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
      <el-table-column align="center" label="id" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="手机号">
        <template slot-scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="分销等级">
        <template slot-scope="scope">
          {{ scope.row.left_stock }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="账号权重">
        <template slot-scope="scope">
          {{ scope.row.total_sales }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="推荐人">
        <template slot-scope="scope">
          {{ scope.row.total_sales }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="累计佣金/提现佣金">
        <template slot-scope="scope">
          {{ scope.row.total_sales }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="下级总数">
        <template slot-scope="scope">
          {{ scope.row.total_sales }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="下级分销商总数">
        <template slot-scope="scope">
          {{ scope.row.total_sales }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="注册时间">
        <template slot-scope="scope">
          {{ scope.row.total_sales }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">
            查看
          </el-button>
          <el-button type="danger" size="small" @click="handleOrders(scope.row)">分销订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getPromoters"/>

    <el-dialog :visible.sync="dialogVisible" title="查看详情">
      <el-form :model="promoters" label-width="80px" label-position="left" ref="promotersForm">
            <el-form-item label="商品名称" prop="promoters_name">
              <el-input clearable maxlength="10" v-model="promoters.promoters_name" placeholder="商品名称" style="width: 280px"/>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input type="textarea" clearable v-model="promoters.subtitle" placeholder="副标题" style="width: 280px"/>
            </el-form-item>
            <el-form-item label="规格类型">
              <el-radio v-model="promoters.sku_tag" :label="promoters.sku_tag">多规格商品</el-radio>
            </el-form-item>
            <el-form-item label="赠送金币" prop="gold_coins">
              <el-input clearable v-model="promoters.gold_coins" placeholder="请输入数量" style="width: 280px"/>
            </el-form-item>
            <el-form-item label="运费" prop="freight">
              <el-input clearable v-model="promoters.freight" placeholder="请输入运费" style="width: 280px"/>
            </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  import waves from '@/directive/waves' // waves directive

  import {
    getPromoter,
    getPromoterLevels, getPromoters
  } from '../../../api/apps'
  export default {
    components: {  },
    directives: { waves },
    data() {
      return {
        activeName: 'first',
        params: {},
        promoters: [],
        promotersList: [],
        category: [],
        categoryList: [],
        dialogVisible: false,
        dialogType: 'new',
        total: 0,
        levelList: [],
        listLoading: true,
        listQuery: {
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
        getPromoter(row.id).then(res=>{
          this.promoters = Object.assign({}, res.data)
          this.dialogVisible = true
        })
      },
      handleOrders(row) {
        const id=row.id
      },
    }
  }
</script>

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
