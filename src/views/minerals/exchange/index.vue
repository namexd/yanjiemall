<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" >
        <el-row>
          <el-col :span="5">
            <el-form-item label="出售人账号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.seller_mobile" placeholder="请输入出售人账号" style="width: 200px;" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="买家账号:" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.buyer_mobile" placeholder="请输入买家账号" style="width: 200px;" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="交易状态:" class="postInfo-container-item">
              <el-select v-model="listQuery.status" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                <el-option v-for="item in stateTypes" :key="item.key" :label="item.display_name"
                           :value="item.key"/>
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
    <el-table ref="dragTable" v-loading="listLoading" :data="exchangetList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="出售人账号" width="220">
        <template slot-scope="scope">
          {{ scope.row.seller_mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家账号" width="220">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="挖矿券名称">
        <template slot-scope="scope">
          {{scope.row.product_title}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="价格">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="付款凭证">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              lazy
              style="width: 100px; height: 100px"
              :src=" scope.row.voucher"
              :preview-src-list="[scope.row.voucher]">
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="交易状态">
        <template slot-scope="scope">
          {{ scope.row.status|stateTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="购买时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="成交时间">
        <template slot-scope="scope">
          {{ scope.row.seller_confirm_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
<!--          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getExchanges"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getExchanges,
    getMinerals
  } from '../../../api/minerals'

  const stateTypes = [
    { key: 1, display_name: '待付款' },
    { key: 2, display_name: '已付款' },
    { key: 3, display_name: '已完成' },
    { key: 4, display_name: '已关闭' },
  ]

  const stateTypeKeyValue = stateTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    components: { Pagination },
    directives: { waves },
    filters:{
      stateTypeFilter(type){
        return stateTypeKeyValue[type]?stateTypeKeyValue[type]:'未知'
      }
    },
    data() {
      return {
        stateTypes,
        productList: [],
        total: 0,
        exchangetList:[],
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
        }
      }
    },
    created() {
      this.getExchanges()
      this.getMinerals()
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getExchanges()
      },
      async getExchanges() {
        const res = await getExchanges(this.listQuery)
        this.exchangetList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      async getMinerals() {
        const res = await getMinerals()
        this.productList = res.data.items
        this.total = res.data._meta.total_count
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
