<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddCategory">新增分类</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="categoryList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="分类名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分类图片" width="220">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.pic_url"
            :preview-src-list="[scope.row.pic_url]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{scope.row.status | statusShowFilter}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="商品数">
        <template slot-scope="scope">
          {{ scope.row.goods_num }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!=2" type="success" size="mini" @click="showCategory(scope.row.id)">
            显示
          </el-button>
          <el-button v-if="scope.row.status!=1" size="mini" @click="showCategory(scope.row.id)">
            隐藏
          </el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getCategory"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑分类':'新增分类'">
      <el-form :model="category" label-width="80px" label-position="left">
        <el-form-item label="分类名称">
          <el-input v-model="category.name" placeholder="分类名称"/>
        </el-form-item>

        <el-form-item label="分类图片" prop="pic_url">
                      <Upload v-model="category.pic_url" />

        </el-form-item>
        <el-form-item v-if="dialogType==='new'" label="状态" prop="status" style="margin-bottom: 30px;">

          <el-switch
            v-model="category.status"
            active-text="显示"
            inactive-text="隐藏"
            active-value="2"
            inactive-value="1"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmCategory">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import Sortable from 'sortablejs'
  import waves from '@/directive/waves' // waves directive

  import { deepClone } from '@/utils'
  import Pagination from '@/components/Pagination'

  import {
    getGoodsCategory,
    addGoodsCategory,
    updateGoodsCategory,
    showGoodsCategory,
    deleteGoodsCategory,
    categoryUpdown
  } from '../../api/goods'

  const statusShow = {
    1: '隐藏',
    2: '显示'
  }
  const defaultCategory = {
    id: '',
    name: '',
    pic_url: ''
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
        category: Object.assign({}, defaultCategory),
        params: {
          'name': '',
          'pic_url': ''
        },
        categoryList: [],
        dialogVisible: false,
        dialogType: 'new',
        checkStrictly: false,
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        sortable: null,
        oldList: [],
        newList: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page:20
        }
      }
    },
    created() {
      this.getCategory()
    },
    methods: {
      async getCategory() {
        this.listLoading = true

        const res = await getGoodsCategory()
        this.categoryList = res.data.items
        this.total = res.data._meta.total_count
        this.oldList = this.categoryList.map(v => v.id)
        this.newList = this.oldList.slice()
        this.listLoading = false

        this.$nextTick(() => {
          this.setSort()
        })
      },
      setSort() {
        const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
          setData: function(dataTransfer) {
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
            dataTransfer.setData('Text', '')
          },
          onEnd: evt => {
            const targetRow = this.categoryList.splice(evt.oldIndex, 1)[0]
            this.categoryList.splice(evt.newIndex, 0, targetRow)
            //
            // // for show the changes, you can delete in you code
            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
            this.newList.splice(evt.newIndex, 0, tempIndex)
            // console.log(evt)
            // console.log(tempIndex)
            let data = {
              'is_up': evt.newIndex < evt.oldIndex ? 1 : 2,
              'step': Math.abs( evt.newIndex - evt.oldIndex)
            }
            categoryUpdown(targetRow.id,data).then(res=>{
              if (res.code==0)
              {
                this.$notify({
                  title: 'Success',
                  message: '操作成功！',
                  type: 'success'
                })
              }
            })
          }
        })
      },
      handleAddCategory() {
        this.category = Object.assign({}, defaultCategory)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        this.checkStrictly = true
        this.category = deepClone(scope.row)
      },
      showCategory(id) {
        showGoodsCategory(id).then(res => {
          if (res.code == 0) {
            this.getCategory()
          }
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此分类吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteGoodsCategory(row.id)
            this.categoryList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async confirmCategory() {
        const isEdit = this.dialogType === 'edit'
        this.params.name = this.category.name
        this.params.pic_url = this.category.pic_url

        if (isEdit) {
          await updateGoodsCategory(this.category.id, this.params)
          for (let index = 0; index < this.categoryList.length; index++) {
            if (this.categoryList[index].id === this.category.id) {
              this.categoryList.splice(index, 1, Object.assign({}, this.category))
              break
            }
          }
        } else {
          this.params.status = this.category.status
          const { data } = await addGoodsCategory(this.params)
          this.category.id = data.id
          this.categoryList.push(this.category)
        }

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
  img{
    width: 60px;
    height: 60px;
  }
  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
