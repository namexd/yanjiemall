<template>
  <div class="app-container">
    <el-button style="margin-bottom: 20px" type="success" @click="handleAddGoods">新增商品</el-button>
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="6">
            <el-form-item label="商品名称" class="postInfo-container-item">
              <el-input v-model="listQuery.goods_name" placeholder="请输入商品名称" style="width: 50%;" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品分类:" class="postInfo-container-item">
              <el-select v-model="listQuery.cid" placeholder="请选择" clearable class="filter-item" style="width: 50%;" >
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name"
                           :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商品类型:" class="postInfo-container-item">
              <el-select v-model="listQuery.type" placeholder="请选择" clearable class="filter-item" style="width: 50%;" >
                <el-option v-for="item in GoodsTypes" :key="item.key" :label="item.display_name"
                           :value="item.key"/>
              </el-select>
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
    <el-table ref="dragTable" v-loading="listLoading" :data="goodsList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column min-width="300px" label="权重" width="200">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.sort" class="edit-input" size="small"/>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="text"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.sort }}</span>
          <el-button
            v-if="row.edit"
            type="text"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            确定
          </el-button>
          <el-button
            v-else
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品" width="220">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="12">
              <el-image
                style="width: 60px; height: 60px"
                :src="scope.row.goods_cover_pic"
                :preview-src-list="[scope.row.goods_cover_pic]">
              </el-image>
            </el-col>
            <el-col :span="12">
              <div style="margin-top: 20%">{{ scope.row.goods_name }}</div>
            </el-col>
          </el-row>

        </template>
      </el-table-column>
      <el-table-column align="header-center" label="价格">
        <template slot-scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column v-if="this.$route.name=='selled'" align="header-center" label="售罄时间">
        <template slot-scope="scope">
          {{ scope.row.saled_at }}
        </template>
      </el-table-column>
      <el-table-column v-if="this.$route.name!='selled'" align="header-center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="库存">
        <template slot-scope="scope">
          {{ scope.row.left_stock }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="销量">
        <template slot-scope="scope">
          {{ scope.row.total_sales }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="推荐">
        <template slot-scope="scope">
          <el-tag v-if=" scope.row.is_pick==0" type="warning"> 否</el-tag>
          <el-tag v-if=" scope.row.is_pick==1" type="success"> 是</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button v-if="scope.row.status!=2" type="success" size="mini" @click="showGoods(scope.row.id)">
            上架
          </el-button>
          <el-button v-if="scope.row.status!=1" size="mini" @click="showGoods(scope.row.id)">
            下架
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getGoods"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑商品':'新增商品'" @close="handleClose">
      <el-form :model="goods" :rules="rules" label-width="100px" label-position="left" ref="goodsForm">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础信息" name="first">

            <el-form-item label="商品类型">
              <el-radio-group v-model="goods.type" size="medium">
                <el-radio border :disabled="dialogType==='edit'?true:false" v-for="item in GoodsTypes"
                          :label="item.key">{{item.display_name}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品名称" prop="goods_name">
              <el-input clearable maxlength="40" show-word-limit v-model="goods.goods_name" placeholder="商品名称"
                        style="width: 280px"/>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input type="textarea" clearable v-model="goods.subtitle" placeholder="副标题" style="width: 280px"/>
            </el-form-item>
            <el-form-item  label="商品轮播图" prop="pic_url">
              <Upload v-if="change"  v-model="goods.pic_url"/>
              <p>建议尺寸750*750像素，最多上传10张</p>
            </el-form-item>
            <el-form-item label="商品分类:" class="postInfo-container-item">
              <el-select v-model="goods.cid" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                <el-option v-for="item in  categoryList" :key="item.id" :label="item.name"
                           :value="item.id"/>
              </el-select>
            </el-form-item>
            <el-form-item label="是否推荐:" v-if="goods.type==1">
              <el-radio v-model="goods.is_pick" :label="1">推荐</el-radio>
              <el-radio v-model="goods.is_pick" :label="0">不推荐</el-radio>
            </el-form-item>
            <el-form-item label="规格类型">
              <el-radio v-model="goods.sku_tag" :label="goods.sku_tag">多规格商品</el-radio>
            </el-form-item>
            <el-form-item label="商品规格:" class="postInfo-container-item" required>
              <el-button type="primary" icon="el-icon-plus" @click="addSkuTag">添加规格</el-button>
              <div>
                <el-input clearable v-model="goods.sku_tag" placeholder="请填写规格名称"
                          style="width: 200px;margin-top: 10px"></el-input>

              </div>
              <el-form ref="dynamicValidateForm">
                <el-table
                  :data="isString(goods.skus)?JSON.parse(goods.skus):goods.skus"
                  style="width: 100%">
                  <el-table-column
                    label="规格名称"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :rules="[ { required: true, message: '年龄不能为空',trigger: 'blur'},]">
                        <el-input clearable v-model="scope.row.sku_name" placeholder="子规格名称"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="图片"
                  >
                    <template slot-scope="scope">
                      <Upload2 v-model="scope.row.sku_cover_pic"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="price"
                    label="价格(元)">
                    <template slot-scope="scope">
                      <el-form-item
                        :rules="[{ required: true, message: '价格不能为空',trigger: 'blur'},]">
                        <el-input clearable v-model="scope.row.price" placeholder="价格"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="left_stock"
                    label="库存">
                    <template slot-scope="scope">
                      <el-form-item
                        :rules="[ { required: true, message: '库存不能为空',trigger: 'blur'},]">
                        <el-input clearable v-model="scope.row.left_stock" placeholder="库存"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="weight"
                    label="重量(kg)">
                    <template slot-scope="scope">
                      <el-form-item
                        :rules="[ { required: true, message: '重量不能为空',trigger: 'blur'},]">
                        <el-input clearable v-model="scope.row.weight" placeholder="重量"/>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                  >
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="deleteRow(scope.$index, goods.skus)"
                        type="text"
                        size="small">
                        移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>

            </el-form-item>
            <el-form-item label="赠送金币" prop="gold_coins" v-if="goods.type==1" required>
              <el-input clearable v-model="goods.gold_coins" placeholder="请输入数量" style="width: 280px"/>
            </el-form-item>
            <el-form-item label="虚拟销量" >
              <el-input clearable v-model="goods.invent_sales" placeholder="请输入数量" style="width: 280px"/> 虚拟销量不计入商品数据统计
            </el-form-item>
            <el-form-item label="运费" prop="freight">
              <el-input clearable v-model="goods.freight" placeholder="请输入运费" style="width: 280px"/>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio v-model="goods.status" :label="2">上架售卖</el-radio>
              <el-radio v-model="goods.status" :label="1">放置仓库</el-radio>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="商品详情" name="second">
            <el-form-item label="商品详情" prop="content" required>
              <Tinymce v-if="change" v-model="goods.content" :height="400"></Tinymce>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div style="text-align:right;margin-top: 50px">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmGoods">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage3'
  import Upload2 from '@/components/Upload/SingleImage2'
  import Tinymce from '@/components/Tinymce'

  import { deepClone } from '@/utils'
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getGoodsCategory, getGoods, showGoods, updateGoods, addGoods, deleteGoods, getGood, sortGoods
  } from '../../api/goods'
  import { objectMerge } from '../../utils'

  const defaultGoods = {
    goods_name: '',
    subtitle: '',
    type: 1,
    pic_url: [],
    cid: '',
    sku_tag: '',
    skus: [],
    gold_coins: '',
    freight: 0,
    status: 1,
    content: '',
    is_pick: 0
  }
  const skus = { sku_name: '', sku_cover_pic: '', left_stock: '', price: '', weight: '' }
  const goodsFilter = {
    selling: {
      goods_type: 3
    },
    selled: {
      goods_type: 1
    },
    repertory: {
      goods_type: 2
    }
  }

  const GoodsTypes = [
    { key: 1, display_name: '普通商品' },
    { key: 2, display_name: '消费券商品' },
    { key: 3, display_name: '分销商品' }
  ]

  export default {
    components: { Pagination, Upload, Tinymce, Upload2 },
    directives: { waves },
    data() {
      return {
        rules: {
          goods_name: [
            { required: true, message: '填写商品名称', trigger: 'blur' }
          ],
          pic_url: [
            { required: true, message: '请至少上传一张图片', trigger: 'blur' }
          ],
          gold_coins: [
            { required: true, message: '请填写赠送金币数量', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '商品详情不能为空', trigger: 'blur' }
          ]
        },
        defaultGoods,
        GoodsTypes,
        goodsFilter,
        skus,
        activeName: 'first',
        params: {},
        goods: [],
        goodsList: [],
        category: [],
        categoryList: [],
        dialogVisible: false,
        change: false,
        dialogType: 'new',
        total: 0,
        new_skus: [],
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20,
          goods_type: 3
        }
      }
    },

    created() {
      this.getGoods()
      this.getGoodsCategory()
    },
    methods: {
      cancelEdit(row) {
        row.sort = row.originalSort
        row.edit = false
        this.$message({
          message: '取消修改权重',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        sortGoods(row.id, { sort: row.sort }).then(res => {
          row.edit = false
          row.originalSort = row.sort
          this.$message({
            message: '权重已修改',
            type: 'success'
          })
        })
      },
      isString(val) {
        return typeof val === 'string' || val instanceof String
      },
      addSkuTag() {
        const add = deepClone(skus)
        this.goods.skus.push(add)
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      async getGoods() {
        const res = await getGoods(this.listQuery)
        const items = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
        this.goodsList = items.map(v => {
          this.$set(v, 'edit', false)
          v.originalSort = v.sort
          return v
        })
      },
      async getGoodsCategory() {
        const res = await getGoodsCategory()
        this.categoryList = res.data.items
        this.total = res.data._meta.total_count
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getGoods()
      },
      handleAddGoods() {
        this.goods =deepClone(defaultGoods)
        this.change=true
        this.$nextTick(() => {
          this.dialogType = 'new'
          this.dialogVisible = true
        })

      },
      handleEdit(scope) {
        getGood(scope.row.id).then(res => {
          this.goods = res.data
          this.$nextTick(() => {
            this.change=true
            this.dialogType = 'edit'
            this.dialogVisible = true
          })

        })

      },
      showGoods(id) {
        showGoods(id).then(res => {
          if (res.code == 0) {
            this.getGoods()
          }
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此商品吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteGoods(row.id)
            this.goodsList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      handleClose(){
        this.change=false
      },
      async confirmGoods() {
        const isEdit = this.dialogType === 'edit'
        this.$refs.goodsForm.validate(valid => {
          if (this.goods.skus.length == 0) {
            this.$message.error('请填写商品规格')
            return false
          }
          if (valid) {
            let data = deepClone(this.goods)
            const skus = data.skus.filter(item => item.id !== undefined)
            const new_skus = data.skus.filter(item => item.id == undefined)
            data.pic_url = JSON.stringify(data.pic_url)
            data.skus = JSON.stringify(data.skus)
            if (isEdit) {
              let id = data.id
              delete data.type
              delete data.id
              data.new_skus = JSON.stringify(new_skus)
              data.skus = JSON.stringify(skus)
              updateGoods(id, data).then(res => {
                if (res.code == 0) {
                  this.getGoods()
                  this.dialogVisible = false
                  this.$notify({
                    title: 'Success',
                    message: '操作成功！',
                    type: 'success'
                  })
                }
              }).catch(err => {
                this.$message.error(err.message)
              })
            } else {
              delete data.new_skus
              addGoods(data).then(res => {
                if (res.code == 0) {
                  this.getGoods()
                  this.dialogVisible = false
                  this.$notify({
                    title: 'Success',
                    message: '操作成功！',
                    type: 'success'
                  })
                }
              }).catch(err => {
                this.$message.error(err.message)
              })
            }
          } else {
            if (!this.goods.content) {
              this.$message.error('商品详情不能为空')

            } else {
              this.$message.error('请按照提示信息输入')
            }
            return false
          }
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
