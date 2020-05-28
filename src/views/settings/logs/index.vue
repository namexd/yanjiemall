<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="4">
            <el-form-item label="日志类型" class="postInfo-container-item">
              <el-select v-model="listQuery.type" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                <el-option v-for="(item,index) in logType" :key="index" :label="item"
                           :value="index"/>
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
    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" row-class-name="rowStyle">
      <el-table-column align="center" label="日志">
        <template slot-scope="scope">
          {{scope.row.be_mobile}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联事项">
        <template slot-scope="scope">
          {{ scope.row.product_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作账号">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          {{scope.row.order_state }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getOptLogs"/>


  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getOptLogs
  } from '../../../api/settings'

  const logType = {
    1: '操作',
    2: '登陆',
  }
  export default {
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        logType,
        list: [],
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
      this.getOptLogs()
    },
    methods: {
      async getOptLogs() {
        const res = await getOptLogs(this.listQuery)
        this.list = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getOptLogs()
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
    text-align: left;
    margin-top: 5px;
    white-space: nowrap;
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
