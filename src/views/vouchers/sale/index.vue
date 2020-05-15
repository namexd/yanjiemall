<template>
  <div class="app-container">
    <el-table ref="dragTable" v-loading="listLoading" :data="saleList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="出售人账号" width="220">
        <template slot-scope="scope">
          {{ scope.row.seller_mobile }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="出售总数">
        <template slot-scope="scope">
          {{scope.row.kbt_num}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="未出售数量">
        <template slot-scope="scope">
          {{ scope.row.kbt_deal_num }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="未出售价值">
        <template slot-scope="scope">
          {{ scope.row.kbt_left_num }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="单价">
        <template slot-scope="scope">
          {{ scope.row.kbt_value }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getSales"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getSales,
  } from '../../../api/voucher'




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
        total: 0,
        saleList:[],
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
        }
      }
    },
    created() {
      this.getSales()
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getSales()
      },
      async getSales() {
        const res = await getSales(this.listQuery)
        this.saleList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
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
