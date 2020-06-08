<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="5">
            <el-form-item label="账号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="请输入账号" style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="选择日期范围:">
              <el-date-picker
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
    <el-table ref="dragTable" v-loading="listLoading" :data="rolloutsList" row-key="id" fit highlight-current-row
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
      <el-table-column align="center" label="转出消费券数量">
        <template slot-scope="scope">
          {{scope.row.share_mine_num}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="消费券单价">
        <template slot-scope="scope">
          {{(scope.row.price)/(scope.row.share_mine_num)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="转出时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getRollouts"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getRollouts
  } from '../../../api/minerals'

  export default {
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        rolloutsList: [],
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
      this.getRollouts()
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
      async getRollouts() {
        const res = await getRollouts(this.listQuery)
        this.rolloutsList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getRollouts()
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
