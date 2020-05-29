<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="7" :xs="24" :offset="3">
        <el-card>
          <div @click="showRight(place_one_list,1)">
            <el-row>
              <el-col :span="4" v-for="i in place_one_list">
                <div class="leftNav">
                  <el-image :src="i.image">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div class="leftNavText">{{i.name}}</div>
              </el-col>
            </el-row>

          </div>
          <div style="margin-top:80px" @click="showRight(place_two_list,2)">
            <el-row :gutter="20">
              <el-col :span="4" v-for="i in place_two_list">
                <div class="leftNav">
                  <el-image :src="i.image">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div class="leftNavText">{{i.name}}</div>
              </el-col>
            </el-row>
          </div>

        </el-card>
      </el-col>
      <el-col :span="6" :xs="24" :offset="3">
        <div style="height:700px;overflow-y: auto">
        <div v-for="(item,key) in items">
          <el-card class="box-card">
            <div slot="header" class="clearfix" @click="handleClick(item)">
              <Upload v-model="item.image" style="width: 50%;float: left"></Upload>
              <div style="float: right" v-if="item.isEdit==true">
                <i class="el-icon-check" @click="handleEdit(item)"></i>
                <i class="el-icon-close" style="margin-left: 10px" @click="handleDelete(key,item)"></i>
              </div>

            </div>
            <el-form>
              <el-form-item label="文字">
                <el-input
                  style="width: 80%"
                  type="text"
                  placeholder="请输入内容"
                  v-model="item.name"
                  maxlength="5"
                  show-word-limit
                  @focus="handleClick(item)"
                ></el-input>
              </el-form-item>
              <el-form-item label="链接">
                <el-input
                  style="width: 50%"
                  type="text"
                  placeholder="请选择内容"
                  v-model="item.display"
                  suffix-icon="el-icon-paperclip"
                  @focus="handleSelect(item)"
                ></el-input>
              </el-form-item>

              <!--              <el-form-item label="商品分类" v-if="item.type==1">-->
              <!--                <el-select v-model="item.goods_cid" placeholder="请选择分类" @focus="handleClick(item)">-->
              <!--                  <el-option-->
              <!--                    v-for="item in options"-->
              <!--                    :key="item.id"-->
              <!--                    :label="('商品分类-')+item.name"-->
              <!--                    :value="item.id">-->
              <!--                  </el-option>-->
              <!--                </el-select>-->

              <!--              </el-form-item>-->
              <!--              <el-form-item label="商品链接" v-if="item.type==2">-->
              <!--                <el-select v-model="item.link" placeholder="请选择链接" @focus="handleClick(item)">-->
              <!--                  <el-option-->
              <!--                    v-for="item in options2"-->
              <!--                    :key="item.module_name"-->
              <!--                    :label="item.module_name"-->
              <!--                    :value="item.link">-->
              <!--                  </el-option>-->
              <!--                </el-select>-->
              <!--              </el-form-item>-->
            </el-form>
          </el-card>
        </div>

        <el-row>
          <el-button style="width: 100% ;border:1px dashed #b4b4b4" @click="handleAddNav"><i class="el-icon-plus">添加</i>{{items.length}}/5
          </el-button>
        </el-row>
        </div>
      </el-col>
    </el-row>


    <el-dialog :visible.sync="dialogVisible" title="链接选择器">
      <div style="min-height: 250px;">
        <el-tabs tab-position="left" v-model="select.type">
          <el-tab-pane label="商品分类" :name="1">
            <el-table
              :data="options"
              highlight-current-row
              height="250"
              @current-change="handleCurrentChange"
            >
              <el-table-column
                property="name"
                label="分类名称"
              >
              </el-table-column>
              <el-table-column
                property="goods_num"
                label="商品数"
              >
              </el-table-column>
              <el-table-column
                property="create_at"
                label="创建时间">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="商城链接" :name="2">
            <el-table
              :data="options2"
              highlight-current-row
              height="250"
              @current-change="handleCurrentChange2"
            >
              <el-table-column
                property="module_name"
                label="模块名"
              >
              </el-table-column>
              <el-table-column
                property="link"
                label="地址"
              >
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="dialogVisible = false">保存</el-button>

  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage2'
  import waves from '@/directive/waves' // waves directive

  import { deepClone } from '@/utils'

  import {
    getNav,
    addNav,
    updateNav,
    deleteNav
  } from '../../../api/settings'
  import { getGoodModules, getGoodsCategory } from '../../../api/goods'

  const DefaultItem = {
    name: '',
    link: '',
    image: '',
    goods_cid: '',
    type: 1,
    isEdit: true
  }
  const TypeOptions = [
    { key: 1, label: '商品分类' },
    { key: 2, label: '商城链接' }
  ]
  export default {
    components: { Upload },
    directives: { waves },

    data() {
      return {
        DefaultItem,
        TypeOptions,
        dialogVisible: false,
        select: {},
        place: '',
        items: [],
        place_one_list: [],
        place_two_list: [],
        options: [],
        options2: []
      }
    },
    created() {
      this.getNav()
    },
    methods: {
      handleCurrentChange(val) {
        this.select.goods_cid = val.id
        this.select.display = '商品分类-' + val.name
      },
      handleCurrentChange2(val) {
        this.select.link = val.link
        this.select.display = '商品链接-' + val.module_name
      },
      async handleClick(e) {
        e.isEdit = true
      },
      async handleSelect(row) {
        row.isEdit = true
        this.select = row
        this.dialogVisible = true
      },
      getNav() {
        this.getCategories()
        this.getGoodModules()
        getNav().then(res => {
          this.place_one_list = res.data.place_one_list
          this.place_two_list = res.data.place_two_list
          this.items = res.data.place_one_list
          this.showRight(this.items, 1)
        })

      },
      getCategoryName(id) {
        const category = this.options.filter(item => item.id == id)
        if (category.length > 0) {
          return category[0].name
        } else {
          return ''
        }
      },
      getLinkName(link) {
        const module = this.options2.filter(item => item.link == link)
        if (module.length > 0) {
          return module[0].module_name
        } else {
          return ''
        }
      },
      displayName(list) {
        list.forEach((value, index, array) => {
          if (value.id) {
            if (value.type == 1) {
              value.display = '商品分类-' + this.getCategoryName(value.goods_cid)
            }
            if (value.type == 2) {
              value.display = '商品链接-' + this.getLinkName(value.link)
            }
          }
        })
        return list
      },
      getCategories() {
        getGoodsCategory({ per_page: 10000 }).then(res => {
          this.options = res.data.items
        })
      },
      getGoodModules() {
        getGoodModules().then(res => {
          this.options2 = res.data
        })
      },
      showRight(list, place) {
        this.place = place
        this.items = this.displayName(list)
      },

      handleAddNav() {
        if (this.items.length == 5) {
          this.$message({
            type: 'error',
            message: '已达上限!'
          })
          return false
        }
        let new_item = deepClone(DefaultItem)
        this.items.push(new_item)
      },
      handleEdit(item) {
        let params = deepClone(item)
        delete params.isEdit
        if (item.id) {
          delete params.id
          updateNav(item.id, params).then(res => {
            item.isEdit = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })

        } else {
          params.place = this.place
          addNav(params).then(res => {
            item.isEdit = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
        }
      },
      handleDelete(key, item) {
        item.isEdit = false
        if (item.id) {
          this.$confirm('确定要删除?', 'Warning', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async() => {
              await deleteNav(item.id)
              this.items.splice(key, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(err => {
              console.error(err)
            })
        } else {
          this.items.splice(key, 1)
        }

      }
    }
  }
</script>

<style>
  .leftNav img {
    border-radius: 80px;
    width: 50px;
    height: 50px;
  }

  .leftNav {
    text-align: center;
  }

  .leftNavText {
    font-size: 13px;
    text-align: center;
    padding: 5px;
  }

</style>
