<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" >
        <el-row>
          <el-col :span="4" style="text-align: right">
            <el-form-item  class="postInfo-container-item">
              <el-select v-model="searchQuery.key" placeholder="请选择账号类型" clearable class="filter-item" style="width: 150px">
                <el-option v-for="item in TypeOption" :key="item.key" :label="item.display_name"
                           :value="item.key"/>
              </el-select>
            </el-form-item>

          </el-col>
          <el-col :span=4 >
            <el-form-item  class="postInfo-container-item">
              <el-input clearable v-model="searchQuery.value" placeholder="请输入账号" style="width: 200px;" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
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
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="姓名"  >
        <template slot-scope="scope">
          {{ scope.row.true_name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="身份证号">
        <template slot-scope="scope">
          {{scope.row.idcard}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="账号">
        <template slot-scope="scope">
          {{ scope.row.user_mobiles }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="持有券价值">
        <template slot-scope="scope">
          {{ scope.row.mine_price }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getUserRisk"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getUserRisk,
  } from '../../api/user'

  const TypeOption = [
    { key: 'idcard', display_name: '身份证号' },
    { key: 'true_name', display_name: '姓名' },
  ]

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
        total: 0,
        list:[],
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
        },
        searchQuery:{ key: 'idcard', value: '' },
      }
    },
    created() {
      this.getUserRisk()
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getUserRisk()
      },
      async getUserRisk() {
        const params={
          [this.searchQuery.key]:this.searchQuery.value
        }
        const res = await getUserRisk(params)
        this.list = res.data.items
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
