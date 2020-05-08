<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddNotice">添加公告</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="noticeList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="公告标题"  >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getNotice"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑公告':'新增公告'">
      <el-form :model="notice"   label-position="left" label-width="80px">
        <el-form-item label="公告标题">
          <el-input v-model="notice.title" placeholder="公告标题"/>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input type="textarea" v-model="notice.content" placeholder="公告内容"/>
        </el-form-item>
        <el-form-item   label="是否弹窗"   style="margin-bottom: 30px;">

          <el-switch
            v-model="notice.is_pop"
            active-text="是"
            inactive-text="否"
            :active-value=2
            :inactive-value=1
          >
          </el-switch>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmNotice">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import { deepClone } from '@/utils'
  import Pagination from '@/components/Pagination'

  import {
    getNotices,
    addNotice,
    updateNotice,
    deleteNotice,
    showNotice,
  } from '../../../api/settings'

  const defaultNotice = {
    title: '',
    content: '',
    is_pop: 1,
  }
  export default {
    components: { Pagination, Upload },
    directives: { waves },
    data() {
      return {
        notice: Object.assign({}, defaultNotice),
        noticeList: [],
        dialogVisible: false,
        dialogType: 'new',
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page:20
        }
      }
    },
    created() {
      this.getNotice()
    },
    methods: {
      async getNotice() {
        this.listLoading = true

        const res = await getNotices(this.listQuery)
        this.noticeList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleAddNotice() {
        this.notice = Object.assign({}, defaultNotice)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        showNotice(scope.row.id).then(res=>{
          this.notice = res.data
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此公告吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteNotice(row.id)
            this.noticeList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async confirmNotice() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          let id=this.notice.id
          delete this.notice.id
          await updateNotice(id,this.notice)
        } else {
          await addNotice(this.notice)
        }
        this.getNotice()
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          message: '操作成功！',
          type: 'success'
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
