<template>
  <div class="app-container">
    <back-to-prev path-name="mineralsPoint" detail="指定账号"></back-to-prev>
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="4" :offset="8">
            <el-form-item label="账号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="请输入账号" style="width: 200px;"
                        class="filter-item"
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
    <el-table ref="dragTable" v-loading="listLoading" :data="pointsList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" row-class-name="rowStyle">
      <el-table-column align="center" label="预约账号">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分销等级">
        <template slot-scope="scope">
          {{ scope.row.level }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="权重">
        <template slot-scope="scope">
          {{ scope.row.trust_score }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="预约时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleAppoint(scope.row)">指定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getPoints"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive
  import BackToPrev from '@/components/BackToPrev'
  import {
    getPoints, postPoints
  } from '../../../api/minerals'

  export default {
    components: { BackToPrev, Pagination },
    directives: { waves },

    data() {
      return {
        pointsList: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
          product_id: this.$route.query.id
        }
      }
    },
    created() {
      this.getPoints()
    },
    methods: {
      async getPoints() {
        const res = await getPoints(this.listQuery)
        this.pointsList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getPoints()
      },
      handleAppoint(row) {
        const {
          id, mobile,
          product_name,
          price
        } = this.$route.query
        const params = { mobile: row.mobile, mine_id: id }
        this.$confirm('确定要把' + mobile + '的' + product_name + '(价值' + price + ')指定给：' + row.mobile + '?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          postPoints(params).then(res => {
            res.code == 0 ? this.$message.success('指定成功') : this.$message.error('指定失败')
            delete this.listQuery.mobile
            this.getPoints()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })

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
