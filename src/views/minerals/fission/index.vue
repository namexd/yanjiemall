<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="5">
            <el-form-item label="账号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="请输入账号" style="width: 50%"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="产品编号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mine_no" placeholder="请输入产品编号" style="width: 50%"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="选择日期范围:">
              <el-date-picker
                style="width: 50%"
                v-model="dateRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                placeholder="选择日期"
                @change="getDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                align="right"
                :picker-options="pickerOptions">
              </el-date-picker>
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
    <el-table ref="dragTable" v-loading="listLoading" :data="fissionsList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="挖矿券名称">
        <template slot-scope="scope">
          {{ scope.row.product_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价值">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="产品编号">
        <template slot-scope="scope">
          {{scope.row.mine_no}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="裂变时间">
        <template slot-scope="scope">
          {{scope.row.fission_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="裂变产品编号/价值/买入账户">
        <template slot-scope="scope">
          <div v-for="item in scope.row.child_mine" class="child_mine">
            <span>{{item.mine_no}}</span>/ <span> {{item.price}}</span>/<span>{{item.point_user}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getFissions"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getFissions
  } from '../../../api/minerals'

  export default {
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        fissionsList: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        },
        dateRange:[],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created() {
      this.getFissions()
    },
    methods: {
      getDate()
      {
        if (this.dateRange)
        {
          this.listQuery.start_time=this.dateRange[0]
          this.listQuery.end_time=this.dateRange[1]
        }else
        {
          delete  this.listQuery.start_time
          delete  this.listQuery.end_time
        }

      },
      async getFissions() {
        const res = await getFissions(this.listQuery)
        this.fissionsList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getFissions()
      }
    }
  }
</script>

<style>
  .child_mine {
    padding: 5px;
  }
  .child_mine span{
    padding: 0 5px;
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
