<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddBanner">添加轮播图</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="bannerList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="排序"  >
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="轮播图名称"  >
        <template slot-scope="scope">
          {{ scope.row.name }}
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
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getBanner"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑轮播图':'新增轮播图'">
      <el-form :model="banner"   label-position="left" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="banner.name" placeholder="轮播图名称"/>
        </el-form-item>
        <el-form-item label="显示排序">
          <el-input v-model="banner.sort" placeholder="显示排序"/>
        </el-form-item>
        <el-form-item label="地址地址">
          <el-input v-model="banner.link" placeholder="轮播图地址"/>
        </el-form-item>

        <el-form-item   label="状态"   style="margin-bottom: 30px;">

          <el-switch
            v-model="banner.status"
            active-text="显示"
            inactive-text="隐藏"
            :active-value=2
            :inactive-value=1
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="上传图片" prop="pic_url">
                                <Upload v-model="banner.image" />
          <p>建议图片宽度750，高度200-950</p>

        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmBanner">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive

  import Pagination from '@/components/Pagination'

  import {
    getBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    showBanner,
  } from '../../../api/settings'

  const statusShow = {
    1: '隐藏',
    2: '显示'
  }
  const defaultBanner = {
    sort: '',
    name: '',
    image: '',
    link: '',
    status: 2
  }
  export default {
    components: { Pagination, Upload },
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
        banner: Object.assign({}, defaultBanner),
        bannerList: [],
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
      this.getBanner()
    },
    methods: {
      async getBanner() {
        this.listLoading = true

        const res = await getBanners(this.listQuery)
        this.bannerList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleAddBanner() {
        this.banner = Object.assign({}, defaultBanner)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        showBanner(scope.row.id).then(res=>{
          this.banner = res.data
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此轮播图吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteBanner(row.id)
            this.bannerList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async confirmBanner() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          let id=this.banner.id
          delete this.banner.id
          await updateBanner(id,this.banner)
        } else {
          await addBanner(this.banner)
        }
        this.getBanner()
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
