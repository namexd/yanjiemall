<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="5">
            <el-form-item label="出售人账号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="出售人账号" style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="挖矿券:" class="postInfo-container-item">
              <el-select v-model="listQuery.product_id" placeholder="请选择" clearable class="filter-item"
                         style="width: 130px">
                <el-option v-for="item in productList" :key="item.id" :label="item.product_title"
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
    <el-table ref="dragTable" v-loading="listLoading" :data="transferList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="预约账号" width="220">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="挖矿券名称">
        <template slot-scope="scope">
          {{scope.row.product_name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="抢券时间-结束时间">
        <template slot-scope="scope">
          {{ scope.row.product_start_time }}-{{scope.row.product_end_time}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出售价格">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="券状态">
        <template slot-scope="scope">
          {{ scope.row.state|stateTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="指定账户">
        <template slot-scope="scope">
          {{ scope.row.point_mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handlePoint(scope.row)">指定账号</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getTransfers"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getTransfers,
    getMinerals
  } from '../../../api/minerals'

  const stateTypes = [
    { key: 1, display_name: '待转让' },
    { key: 2, display_name: '转让中' },
    { key: 3, display_name: '转让中(待付款)' },
    { key: 4, display_name: '转让中(待确认)' },
    { key: 5, display_name: '已完成' },
    { key: 6, display_name: '待转让(已退回)' }
  ]

  const stateTypeKeyValue = stateTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    components: { Pagination },
    directives: { waves },
    filters: {
      stateTypeFilter(type) {
        return stateTypeKeyValue[type]
      }
    },
    data() {
      return {
        stateTypes,
        productList: [],
        total: 0,
        transferList: [],
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        }
      }
    },
    created() {
      this.getTransfers()
      this.getMinerals()
    },
    methods: {
      handlePoint(row) {
        this.$router.push({
          name: 'mineralsPoint', query: {
            id: row.product_id,
            mine_id: row.mine_id,
            mobile: row.mobile,
            product_name: row.product_name,
            price: row.price
          }
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getTransfers()
      },
      async getTransfers() {
        const res = await getTransfers(this.listQuery)
        this.transferList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      async getMinerals() {
        const res = await getMinerals()
        this.productList = res.data.items
        this.total = res.data._meta.total_count
      }
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
