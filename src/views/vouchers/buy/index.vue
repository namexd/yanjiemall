<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" >
        <el-row>
          <el-col :span="4" style="text-align: right">
            <el-form-item  class="postInfo-container-item">
              <el-select v-model="listQuery.type" placeholder="请选择账号类型" clearable class="filter-item" style="width: 150px">
                <el-option v-for="item in TypeOption" :key="item.key" :label="item.display_name"
                           :value="item.key"/>
              </el-select>
            </el-form-item>

          </el-col>
          <el-col :span=4 >
            <el-form-item  class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="请输入账号" style="width: 200px;" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span=4 style="text-align: right">
            <el-form-item class="postInfo-container-item">
              <el-date-picker
                v-model="listQuery.start_at"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="listQuery.end_at"
              type="datetime"
              placeholder="选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
          </el-col>
        </el-row>

      </el-form>

    </div>
    <el-table ref="dragTable" v-loading="listLoading" :data="buyList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="交易编号" width="220">
        <template slot-scope="scope">
          {{ scope.row.order_no }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="出售人账号">
        <template slot-scope="scope">
          {{scope.row.seller_mobile}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="买家账号">
        <template slot-scope="scope">
          {{ scope.row.buyer_mobile }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="成交数量">
        <template slot-scope="scope">
          {{ scope.row.kbt_num }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="单价">
        <template slot-scope="scope">
          {{ scope.row.day_value }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="成交价格">
        <template slot-scope="scope">
          {{ scope.row.kbt_value }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="成交时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getBuys"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getBuys,
  } from '../../../api/voucher'

  const TypeOption = [
    { key: 1, display_name: '出售人账号' },
    { key: 2, display_name: '买家账号' },
  ]

  const typeOptionKeyValue = TypeOption.reduce((acc, cur) => {
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
        TypeOption,
        productList: [],
        total: 0,
        buyList:[],
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
        }
      }
    },
    created() {
      this.getBuys()
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getBuys()
      },
      async getBuys() {
        const res = await getBuys(this.listQuery)
        this.buyList = res.data.items
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
