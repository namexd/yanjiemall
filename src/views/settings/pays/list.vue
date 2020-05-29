<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddPay">添加支付方式</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付类型">
        <template slot-scope="scope">
          {{ scope.row.type|typeShowFilter }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="状态">
        <template slot-scope="scope">
          <el-button :type="scope.row.status | statusFilter" size="mini" @click="handleShow(scope.row)">
            {{scope.row.status | statusShowFilter}}
          </el-button>
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
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getPay"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑支付方式':'新增支付方式'">
      <el-form :model="pay" label-position="left" label-width="100px" aria-multiline="">
        <el-form-item label="标题">
          <el-input v-model="pay.title" placeholder="标题"/>
        </el-form-item>
        <el-form-item label="支付类型">
          <el-radio v-model="pay.type" v-if="dialogType==='edit'" disabled :label="1">支付宝</el-radio>
          <el-radio v-model="pay.type" v-if="dialogType==='edit'" disabled :label="2">微信</el-radio>
          <el-radio v-model="pay.type" v-if="dialogType==='new'" :label="1">支付宝</el-radio>
          <el-radio v-model="pay.type" v-if="dialogType==='new'" :label="2">微信</el-radio>
        </el-form-item>
        <div v-if="pay.type==1">
          <el-form-item label="公众号appid">
            <el-input v-model="pay.app_id" placeholder="公众号appid"/>
          </el-form-item>
          <el-form-item label="商户号">
            <el-input v-model="pay.mch_id" placeholder="商户号"/>
          </el-form-item>
          <el-form-item label="支付秘钥">
            <el-input v-model="pay.key" placeholder="支付秘钥"/>
          </el-form-item>
          <el-form-item label="商户证书">
            <Upload v-model="pay.cert_client"></Upload>
          </el-form-item>
          <el-form-item label="商户key证书">
            <Upload v-model="pay.cert_key"></Upload>
          </el-form-item>
        </div>
        <div v-if="pay.type==2">
          <el-form-item label="应用id">
            <el-input v-model="pay.app_id" placeholder="应用id"/>
          </el-form-item>
          <el-form-item label="支付宝公钥">
            <el-input v-model="pay.public_key" placeholder="支付宝公钥"/>
          </el-form-item>
          <el-form-item label="	支付宝私钥">
            <el-input v-model="pay.private_key" placeholder="	支付宝私钥"/>
          </el-form-item>
        </div>
        <el-form-item label="应用渠道">
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedSupports">
            <el-checkbox v-for="(support,index) in supports" :label="index" :key="index">{{support}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmPay">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import Upload from '@/components/Upload/SingleIFile'

  import Pagination from '@/components/Pagination'

  import {
    getPays,
    addPay,
    updatePay,
    deletePay,
    showPay, changePay
  } from '../../../api/settings'

  const PaySupport = {
    1: 'H5',
    2: 'APP'
  }
  const typeOptions = {
    1: '微信',
    2: '支付宝'
  }
  const statusShow = {
    1: '已启用',
    0: '未启用'
  }
  const defaultPay = {
    title: '',
    type: '',
    app_id: '',
    mch_id: '',
    cert_client: '',
    cert_key: '',
    secret: '',
    public_key: '',
    private_key: '',
    pay_support: '',
    key: ''
  }
  export default {
    components: { Pagination, Upload },
    directives: { waves },

    filters: {
      statusFilter(status) {
        const statusMap = {
          '0': 'info',
          '1': 'success'
        }
        return statusMap[status]
      },
      statusShowFilter(status) {
        return statusShow[status]
      },
      typeShowFilter(type) {
        return typeOptions[type]
      }
    },
    data() {
      return {
        pay: Object.assign({}, defaultPay),
        list: [],
        dialogVisible: false,
        dialogType: 'new',
        total: 0,
        listLoading: true,
        supports: PaySupport,
        typeOptions,
        statusShow,
        listQuery: {
          page: 1,
          per_page: 20
        },
        checkedSupports: []
      }
    },
    created() {
      this.getPay()
    },
    methods: {
      async getPay() {
        this.listLoading = true

        const res = await getPays(this.listQuery)
        this.list = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleAddPay() {
        this.pay = Object.assign({}, defaultPay)
        this.checkedSupports=[]
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        showPay(scope.row.id).then(res => {
          this.pay = res.data
          this.checkedSupports=this.getSupports2(this.pay.pay_support)
        })
      },
      handleShow(row) {
        changePay(row.id).then(res => {
          res.code == 0 ? this.$message.success('操作成功！') : this.$message.success('操作失败！')
            row.status=row.status==1?0:1
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此支付方式吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deletePay(row.id)
            this.list.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async confirmPay() {
        const isEdit = this.dialogType === 'edit'
        this.pay.pay_support = this.getSupports(this.checkedSupports)
        if (isEdit) {
          let id = this.pay.id
          delete this.pay.id
          await updatePay(id, this.pay)
        } else {
          await addPay(this.pay)
        }
        this.getPay()
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          message: '操作成功！',
          type: 'success'
        })
      },

      getSupports(array) {
        if (array.length == 0) {
          return 0
        }
        if (array.length == 1) {
          return array[0]
        }
        if (array.length == 2) {
          return 3
        }
      } ,
      getSupports2(s) {
        if (s==1) {
          return ['1']
        }
        if (s == 2) {
          return ['2']
        }
        if (s == 3) {
          return ['1','2']
        }
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
