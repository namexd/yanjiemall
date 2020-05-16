<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="4">
            <el-form-item label-width="60px" label="状态:" class="postInfo-container-item">
              <el-select v-model="listQuery.status" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                <el-option v-for="(item,key) in statusShow" :key="key" :label="item"
                           :value="key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>

    <el-table ref="dragTable" v-loading="listLoading" :data="balancesList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="提现账号"  >
        <template slot-scope="scope">
          {{ scope.row.order_no }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="等级名称">
        <template slot-scope="scope">
          {{ scope.row.level_name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="申请金额">
        <template slot-scope="scope">
            {{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="提现方式" v-if="status==1">
        <template slot-scope="scope">
            {{scope.row.product_name}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="提现手续费(消费券)"  >
        <template slot-scope="scope">
          {{ scope.row.service_fee }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="打款时间" v-if="status==1" >
        <template slot-scope="scope">
          {{ scope.row.update_at }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{scope.row.status | statusShowFilter}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==0" type="warning" size="mini" @click="handleAgree(scope.row)">
            同意
          </el-button>
          <el-button v-if="scope.row.status==0" type="danger" size="mini" @click="handleRefuse(scope.row)">拒绝</el-button>
          <el-button v-if="scope.row.status!==0" type="primary" size="mini" @click="handleShow(scope.row)">查看</el-button>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getBalance"/>

    <el-dialog title="确认密码" :visible.sync="dialogFormVisible">
      <el-form :model="agreeParams">
        <el-form-item label="请输入密码" label-width="150px">
          <el-input v-model="agreeParams.pwd" type="password" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="请选择产品" label-width="150px">
          <el-select v-model="agreeParams.product_id" placeholder="请选择" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in productOptions" :key="item.id" :label="item.product_title"
                       :value="item.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postAgree">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import {
    balancesAgree, balancesRefuse,
    getBalances
  } from '../../../api/apps'
  import { deepClone } from '../../../utils'
  import { getMinerals } from '../../../api/minerals'
  const statusShow = {
    0: '待审核',
    1: '同意',
    2: '拒绝'
  }
  export default {
    components: { Pagination, Upload },
    directives: { waves },
    filters: {
      statusFilter(status) {
        const statusMap = {
          '0': 'warning',
          '1': 'success',
          '2': 'error'
        }
        return statusMap[status]
      },
      statusShowFilter(status) {
        return statusShow[status]
      }
    },
    data() {
      return {
        productOptions: [],
        balancesList: [],
        agreeParams:{},
        total: 0,
        listLoading: true,
        dialogFormVisible: false,
        statusShow,
        status,
        listQuery: {
          page: 1,
          per_page:20,
        }
      }
    },
    created() {
      this.getBalance()
    },
    methods: {
      async getBalance() {
        const res = await getBalances(this.listQuery)
        this.balancesList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleAgree(row) {
        this.agreeParams.id=row.id
        this.dialogFormVisible=true;
        getMinerals({money:row.money}).then(res=>{
          this.productOptions=res.data.items
        })
      },
      postAgree()
      {
        this.dialogFormVisible=false;
        const params=deepClone(this.agreeParams)
        const id=params.id
        delete params.id
        balancesAgree(id,params).then(res=>{
          res.code==0?this.$message.success('操作成功！'):this.$message.success('操作失败！')
        })
      },
      handleRefuse(row) {
        balancesRefuse(row.id).then(res=>{
          res.code==0?this.$message.success('操作成功！'):this.$message.success('操作失败！')
        })
      },
      handleShow(row) {
         this.$router.push({name:'balanceDetail',query:{id:row.id}})
      },
      handleFilter() {
        this.listQuery.page = 1
        const item=deepClone(this.listQuery)
        this.status=item.status
        this.getBalance()
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
