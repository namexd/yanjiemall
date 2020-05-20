<template>
  <div class="app-container">
    <el-table
      row-key="id"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="权重" align="center ">
        <template slot-scope="{row}">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column label="等级名称" align="center ">
        <template slot-scope="{row}">
          {{ row.level_name }}
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center ">
        <template slot-scope="{row}">
          {{ row.level_desc }}
        </template>
      </el-table-column>
      <el-table-column label="消费券权益" align="center ">
        <template slot-scope="{row}">
          {{ row.discount }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.status==2" type="success">启用</el-tag>
          <el-tag v-if="row.status==1" type="warning">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="small" @click="handleView(row)">
            编辑
          </el-button>
          <el-button v-if="row.status==1" size="small" type="success"
                     @click="handleModifyStatus(row,2)">
            启用
          </el-button>
          <el-button v-if="row.status==2" size="small" type="danger" @click="handleModifyStatus(row,1)">
            禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getList"/>

    <el-dialog title="编辑分销商等级" :visible.sync="dialogFormVisible">
      <el-form :model="promoter" label-width="150px">
        <el-form-item label="等级名称" required>
          <el-input v-model="promoter.level_name" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="推荐“推广员”" v-if="promoter.id!=='1'" required>
          <el-input type="number" v-model="promoter.accum_cnt" style="width: 70%"></el-input>
          人
        </el-form-item>
        <el-form-item label="推广收益" required>
          <el-select v-model="promoter.two_interest" style="width: 70%">
            <el-option v-for="item in two_interestOptions" :label="item.display_name" :value="item.key" :key="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消费券权益" required>
          <el-input v-model="promoter.discount" style="width: 70%"></el-input>
          折
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { getPromoterLevel, getPromoterLevels, showPromoter, updatePromoter } from '../../../api/apps'
  import { deepClone } from '../../../utils' // secondary package based on el-pagination

  const two_interestOptions = [
    { key: 0, display_name: '一级' },
    { key: 1, display_name: '二级' }
  ]

  export default {
    components: { Pagination },
    data() {
      return {
        list: [],
        promoter: [],
        promoterType: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        },
        two_interestOptions,
        dialogFormVisible: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      test(i) {

      },
      getList() {
        this.listLoading = true
        getPromoterLevels(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data._meta.total_count
          this.listLoading = false
        })
      },
      handleModifyStatus(row, status) {
        showPromoter(row.id).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.status = status
        })
      },
      handleView(row) {
        getPromoterLevel(row.id).then(res => {
          this.promoter = res.data
          this.dialogFormVisible = true
        })
      },
      handleSubmit() {
        const params = deepClone(this.promoter)
        const id = params.id
        delete params.id
        updatePromoter(id, params).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.getList()
          this.dialogFormVisible = false

        })
      }
    }
  }
</script>
