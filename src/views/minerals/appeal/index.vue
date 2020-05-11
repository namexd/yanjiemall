<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="4">
            <el-form-item label="账号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="请输入预约人账号" style="width: 200px;" class="filter-item"
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
    <el-table ref="dragTable" v-loading="listLoading" :data="appealsList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" row-class-name="rowStyle" >
      <el-table-column align="center" label="申诉人账号" width="220">
        <template slot-scope="scope">
          <div>
            {{ scope.row.mobile }}
            <div class="bottom_content"><span>订单编号：{{scope.row.mine_no}}</span> <span style="color: red">内容：{{scope.row.explain}}</span></div>
          </div>
          </template>
      </el-table-column>
      <el-table-column align="center" label="被申诉人账号">
        <template slot-scope="scope">
          {{scope.row.be_mobile}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="挖矿券名称">
        <template slot-scope="scope">
          {{ scope.row.product_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{scope.row.order_state | statusShowFilter}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款凭证">
        <template slot-scope="scope">
          {{ scope.row.explain_img }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申诉时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            出售人
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">买家</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getAppeals"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getAppeals
  } from '../../../api/minerals'

  const statusShow = {
    1: '待付款',
    2: '已付款',
    3: '已完成',
    4: '已关闭'
  }
  export default {
    components: { Pagination },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          '1': 'info',
          '2': 'success'
        }
        return statusMap[status]
      },
      statusShowFilter(status) {
        return statusShow[status]
      }
    },
    data() {
      return {
        appealsList: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        }
      }
    },
    created() {
      this.getAppeals()
    },
    methods: {
      async getAppeals() {
        const res = await getAppeals(this.listQuery)
        this.appealsList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getAppeals()
      }
    }
  }
</script>

<style>
  .rowStyle{
    height: 100px;
  }
  .bottom_content{
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
