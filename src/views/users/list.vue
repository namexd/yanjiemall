<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="4">
          <el-form-item label-width="60px" label="手机号" class="postInfo-container-item">
            <el-input v-model="listQuery.moble" placeholder="请输入手机号" style="width: 200px;" class="filter-item"
                      @keyup.enter.native="handleFilter"/>
          </el-form-item>
          </el-col>
          <el-col :span="4">
          <el-form-item label-width="60px" label="黑名单:" class="postInfo-container-item">
            <el-select v-model="listQuery.status" placeholder="请选择" clearable class="filter-item" style="width: 130px">
              <el-option v-for="item in userStatusOptions" :key="item.key" :label="item.display_name"
                         :value="item.key"/>
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

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center ">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号"   align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile}}</span><el-tag  v-if="row.status==1" type="warning">黑名单</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="等级"   >
        <template slot-scope="{row}">
          <el-tag>{{ row.is_promoter | PromoterFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="成交订单"   align="center">
        <template slot-scope="{row}">
          <span>{{ row.order_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金币总数/可用金币" >
        <template slot-scope="{row}">
         {{row.gold_coin}}/{{row.left_gold_coin}}
        </template>
      </el-table-column>
      <el-table-column label="消费券数量" align="center" >
        <template slot-scope="{row}">
          <span>{{ row.share_mine }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"   class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="small" @click="handleView(row)">
            查看
          </el-button>
          <el-button v-if="row.status!=1" size="small" type="success"
                     @click="handleModifyStatus(row)">
            黑名单
          </el-button>
          <el-button v-if="row.status!=2" size="small" @click="handleModifyStatus(row)">
            移除黑名单
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page"  :limit.sync="listQuery.per_page" @pagination="getList"/>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination'
  import { getUsers, userBlack } from '../../api/user' // secondary package based on el-pagination

  const userStatusOptions = [
    { key: '0', display_name: '全部' },
    { key: '1', display_name: '是' },
    { key: '2', display_name: '否' }
  ]
  const promoterOptions = {1:'普通用户',2:'推广员'}

  // arr to obj, such as { CN : "China", US : "USA" }
  const userStatusKeyValue = userStatusOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    name: 'ComplexTable',
    components: { Pagination },
    directives: { waves },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return userStatusKeyValue[type]
      },
      PromoterFilter(type) {
        return promoterOptions[type]
      }
    },
    data() {
      return {
        tableKey: 0,
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
          mobile: undefined,
          status: undefined,
        },
        userStatusOptions,
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getUsers(this.listQuery).then(response => {
          console.log(response)
          this.list = response.data.items
          this.total = response.data._meta.total_count
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleModifyStatus(row, status) {
        userBlack(row.id).then(res=>{
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.status = status
        })
      },
      sortChange(data) {
        const { prop, order } = data
        if (prop === 'id') {
          this.sortByID(order)
        }
      },
      sortByID(order) {
        if (order === 'ascending') {
          this.listQuery.sort = '+id'
        } else {
          this.listQuery.sort = '-id'
        }
        this.handleFilter()
      },
      handleView(row) {
          this.$router.push({
            name:'usersDetail',
            query: {
              id:row.id
            }
          })
      },
    }
  }
</script>
