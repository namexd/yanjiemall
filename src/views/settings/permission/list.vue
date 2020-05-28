<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddAdmin">添加员工账号</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="adminList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)">
            编辑
          </el-button>
          <el-button type="warning" size="mini" @click="handleRule(scope)">
            权限分配
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getAdmin"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑员工账号':'新增员工账号'">
      <el-form ref="editForm" :model="admin" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="admin.account" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="admin.password" placeholder="请输入密码"/>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmAdmin('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" title="编辑权限">
      <el-tree
        ref="tree"
        :check-strictly="checkStrictly"
        :data="ruleList"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        class="permission-tree"
      />
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible2=false">取消</el-button>
        <el-button type="primary" @click="confirmRule()">保存</el-button>
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
    getAdmins,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    showAdmin, getAdminRules, updateAdminRules
  } from '../../../api/settings'

  const defaultAdmin = {
    account: '',
    password: ''
  }
  export default {
    components: { Pagination, Upload },
    directives: { waves },
    data() {
      return {
        admin: Object.assign({}, defaultAdmin),
        adminList: [],
        ruleList: [],
        dialogVisible: false,
        dialogVisible2: false,
        checkStrictly: false,
        dialogType: 'new',
        defaultProps: {
          children: 'child',
          label: 'menu_name'
        },
        adminId: null,
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page: 20
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 4, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getAdmin()
    },
    methods: {
      async getAdmin() {
        this.listLoading = true
        const res = await getAdmins(this.listQuery)
        this.adminList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleAddAdmin() {
        this.admin = Object.assign({}, defaultAdmin)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        showAdmin(scope.row.id).then(res => {
          this.admin = res.data
        })
      },
      handleRule(scope) {
        this.dialogVisible2 = true
        this.checkStrictly = true
        this.adminId = scope.row.id
        getAdminRules(scope.row.id).then(res => {
          this.ruleList = res.data
          this.$nextTick(() => {
            const routes = this.generateRoutes(res.data)
            this.$refs.tree.setCheckedNodes(this.generateArr(routes))
            this.checkStrictly = false
          })
        })
      },
      generateRoutes(routes) {
        const res = []

        for (let route of routes) {
          // skip some route
          if (route.is_select == 0) {
            continue
          }
          const data = {
            id: route.id,
            title: route.menu_name
          }
          if (route.child) {
            data.child = this.generateRoutes(route.child)
          }
          res.push(data)
        }
        return res
      },
      generateArr(routes) {
        let data = []
        routes.forEach(route => {
          data.push(route)
          if (route.child) {
            const temp = this.generateArr(route.child)
            if (temp.length > 0) {
              data = [...data, ...temp]
            }
          }
        })
        return data
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此账号吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteAdmin(row.id)
            this.adminList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      confirmRule() {
        let menus = this.$refs.tree.getCheckedKeys()
        updateAdminRules(this.adminId, { menu_rule: menus.join(',') }).then(res => {
          res.code == 0 ? this.$message.success('修改权限成功！') : this.$message.error('修改权限失败！')
          this.dialogVisible2 = false
        })
      },
      confirmAdmin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const isEdit = this.dialogType === 'edit'
            if (isEdit) {
              let id = this.admin.id
              delete this.admin.id
              updateAdmin(id, this.admin).then(res => {
                this.getAdmin()
                this.dialogVisible = false
                this.$notify({
                  title: 'Success',
                  message: '操作成功！',
                  type: 'success'
                })
              })
            } else {
              addAdmin(this.admin).then(res => {
                this.getAdmin()
                this.dialogVisible = false
                this.$notify({
                  title: 'Success',
                  message: '操作成功！',
                  type: 'success'
                })
              })
            }

          } else {
            this.$notify({
              title: 'Error',
              message: '请按照正确格式输入！',
              type: 'error'
            })
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
