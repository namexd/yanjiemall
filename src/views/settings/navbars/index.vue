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
              <el-col :span="6" v-for="i in place_two_list">
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
        <div v-for="(item,key) in items">
          <el-card class="box-card">
            <div slot="header" class="clearfix"  @click="handleClick(item)">
              <Upload v-model="item.image"  style="width: 50%;float: left"></Upload>
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
              <el-form-item label="导航类型">
                <el-select v-model="item.type" placeholder="请选择链接" @focus="handleClick(item)">
                  <el-option
                    v-for="item in TypeOptions"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                  </el-option>
                </el-select>

              </el-form-item>

              <el-form-item label="商品分类" v-if="item.type==1">
                <el-select v-model="item.goods_cid" placeholder="请选择链接" @focus="handleClick(item)">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="('商品分类-')+item.name"
                    :value="item.id">
                  </el-option>
                </el-select>

              </el-form-item>
              <el-form-item label="链接" v-if="item.type==2">
                <el-input
                  style="width: 80%"
                  type="text"
                  placeholder="请输入链接"
                  v-model="item.link"
                  @focus="handleClick(item)"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <el-row>
          <el-button style="width: 100% ;border:1px dashed #b4b4b4" @click="handleAddNav"><i class="el-icon-plus">添加</i>{{items.length}}/5
          </el-button>
        </el-row>
      </el-col>
    </el-row>
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
  import { getGoodsCategory } from '../../../api/goods'

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
    { key: 2, label: '外链' }
  ]
  export default {
    components: { Upload },
    directives: { waves },

    data() {
      return {
        DefaultItem,
        TypeOptions,
        place:'',
        items: [],
        place_one_list: [],
        place_two_list: [],
        options: []
      }
    },
    created() {
      this.getNav()
      this.getCategories()
    },
    methods: {
     async handleClick(e) {
        e.isEdit = true
      },
      async getNav() {
        const res = await getNav()
        this.place_one_list = res.data.place_one_list
        this.place_two_list = res.data.place_two_list
        this.items = this.place_one_list
      },
      getCategories() {
        getGoodsCategory({ per_page: 10000 }).then(res => {
          this.options = res.data.items
        })
      },
      showRight(list,place) {
        this.items = list
        this.place = place
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
        console.log(item)
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
          params.place=this.place
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
        item.isEdit=false
        if (item.id)
        {
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
        }else
        {
          this.items.splice(key, 1)
        }

      },
    }
  }
</script>

<style  >
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

  .app-container {
    .roles-table {
      margin-top: 30px;
    }

    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
