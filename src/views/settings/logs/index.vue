<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="6">
            <el-form-item label="日志类型" class="postInfo-container-item">
              <el-select v-model="listQuery.type" placeholder="请选择" clearable class="filter-item" style="width: 50%">
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
          {{scope.row.type|TypeFilter}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联事项">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作账号">
        <template slot-scope="scope">
          {{ scope.row.admin_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          {{scope.row.create_at }}
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
    1: '挖矿券--申诉处理',
    2: '挖矿券--添加挖矿券',
    3: '挖矿券--指定ID',
    4: '充值金币',
    5: '充值消费券',
    6: '修改账号权重',
  }
  export default {
    components: { Pagination },
    directives: { waves },
    filters:{
      TypeFilter(type){
        return logType[type]
      }
    },
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
