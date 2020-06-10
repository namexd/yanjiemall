<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="5">
            <el-form-item label="状态:" class="postInfo-container-item">
              <el-date-picker
                style="width: 50%"
                v-model="listQuery.order_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
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
    <el-table ref="dragTable" v-loading="listLoading" :data="statList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="时间" width="220">
        <template slot-scope="scope">
          {{ scope.row.order_date }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          {{scope.row.avg_value}}
          <el-button v-if="tomorrow_stat && scope.$index==0" type="text" @click="handleChange(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getStats"/>


    <el-dialog title="修改价格" :visible.sync="dialogFormVisible">
      <el-form :model="tomorrow_stat">
        <el-form-item label="价格" label-width="150px">
          <el-input v-model="tomorrow_stat.avg_value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getStats, updateStat
  } from '../../../api/voucher'
  import { deepClone } from '../../../utils'

  export default {
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        total: 0,
        statList: [],
        tomorrow_stat: [],
        dialogFormVisible: false,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        }
      }
    },
    created() {
      this.getStats()
    },
    methods: {
      handleFilter() {
        this.listQuery.page = 1
        this.getStats()
      },
      async getStats() {
        const res = await getStats(this.listQuery)
        this.statList = res.data.items
        const tomorrow_stat = res.data.tomorrow_stat
        if (tomorrow_stat) {
          this.tomorrow_stat = tomorrow_stat
          this.statList.unshift(res.data.tomorrow_stat)
        }
        console.log(this.tomorrow_stat)
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleChange() {
        this.dialogFormVisible = true
      },
      submitChange() {
        const params = deepClone(this.tomorrow_stat)
        delete params.order_date
        updateStat(params).then(res => {
          res.code == 0 ? this.$message.success('修改成功') : this.$message.error('修改失败')
          this.dialogFormVisible = false
          this.getStats()
        })
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
