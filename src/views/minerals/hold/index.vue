<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" >
        <el-row>
          <el-col :span="6">
            <el-form-item label="账号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="请输入手机号" style="width: 50%" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="挖矿券编号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mine_no" placeholder="请输入编号" style="width: 50%" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="挖矿券:" class="postInfo-container-item">
              <el-select v-model="listQuery.product_id" placeholder="请选择" clearable class="filter-item" style="width: 50%">
                <el-option v-for="item in productList" :key="item.id" :label="item.product_title"
                           :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="状态:" class="postInfo-container-item">
              <el-select v-model="listQuery.status" placeholder="请选择" clearable class="filter-item" style="width: 50%">
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
    <el-table ref="dragTable" v-loading="listLoading" :data="holdList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="账号" width="220">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="挖矿券编号">
        <template slot-scope="scope">
          {{scope.row.mine_no}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="挖矿券名称">
        <template slot-scope="scope">
          {{scope.row.product_name}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="买入价">
        <template slot-scope="scope">
          {{ scope.row.source_price }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="收益">
        <template slot-scope="scope">
          {{ (scope.row.price)-(scope.row.source_price) }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="卖出价">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="持有状态">
        <template slot-scope="scope">
          {{ scope.row.status|stateTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="买入时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="到期时间">
        <template slot-scope="scope">
          {{ scope.row.end_at }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="剩余天数">
        <template slot-scope="scope">
          {{ scope.row.remain_day }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getHolds"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getHolds,
    getMinerals
  } from '../../../api/minerals'

  const stateTypes = [
    { key: 1, display_name: '挖矿中' },
    { key: 2, display_name: '待转让' },
    { key: 3, display_name: '转让中' },
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
        return stateTypeKeyValue[type]
      }
    },
    data() {
      return {
        stateTypes,
        productList: [],
        total: 0,
        holdList:[],
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
        }
      }
    },
    created() {
      this.getHolds()
      this.getMinerals()
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getHolds()
      },
      async getHolds() {
        const res = await getHolds(this.listQuery)
        this.holdList = res.data.items
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
