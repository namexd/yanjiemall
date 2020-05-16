<template>
  <div class="app-container">

    <el-table ref="dragTable" v-loading="listLoading" :data="orderList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;"
              :span-method="arraySpanMethod" border
    >
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          {{ scope.row.order_no }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单商品信息" width="220">
        <template slot-scope="scope">
          <div>
            <el-row v-for="good in scope.row.goods" style="border-bottom: 1px solid #dfe6ec">
              <el-col :span="8"><div class="grid-content bg-purple">  <img :src="good.goods_cover_pic" alt=""></div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple">  {{good.goods_name}}<br>
                {{good.sku_name}}</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple"> x{{good.price}}<br>
                x{{good.sku_name}}</div></el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价/数量">
        <template slot-scope="scope">
          {{scope.row.price}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单总价">
        <template slot-scope="scope">
          {{ scope.row.total_price }}<br>
          （运费：{{scope.row.freight}}）
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式">
        <template slot-scope="scope">
          {{ calendarTypeKeyValue[scope.row.pay_type] }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="买家">
        <template slot-scope="scope">
          {{ scope.row.user_mobile }}<br>
          {{ scope.row.address_name }}<br>
          {{ scope.row.address_mobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope)">
            查看详情
          </el-button>
          <div v-if="scope.row.status==1">
            <span>等待付款</span><br>
            <el-button type="danger" size="mini" @click="closeOrder(scope.row.id)">
              关闭
            </el-button>
            <el-button type="warning" size="mini" @click="showOrders(scope.row.id)">
              改价
            </el-button>
          </div>
          <div v-if="scope.row.status==2">
            <span>等待发货</span><br>
            <el-button type="danger" size="mini" @click="handelExpressOrder(scope.row.id)">
              立即发货
            </el-button>
            <el-button type="warning" size="mini" @click="showOrders(scope.row.id)">
              退款
            </el-button>
          </div>
          <div v-if="scope.row.status==3">
            <span>待收货</span><br>
            <el-button type="danger" size="mini" @click="showOrders(scope.row.id)">
              确认收货
            </el-button>
            <el-button type="warning" size="mini" @click="showOrders(scope.row.id)">
              延长收货
            </el-button>
          </div>
          <div v-if="scope.row.status==4">
            <span>已完成</span><br>
          </div>
          <div v-if="scope.row.status==5">
            <span>已取消</span><br>
          </div>
          <div v-if="scope.row.status==6">
            <span>整单退款完成</span><br>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getOrders"/>

    <el-dialog title="发货信息" :visible.sync="dialogFormVisible">
      <el-form :model="expressForm">
        <el-form-item label="快递公司" label-width="120px">
          <el-input v-model="expressForm.express_company	" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" label-width="120px">
          <el-input v-model="expressForm.express_no" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postExpress">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import Tinymce from '@/components/Tinymce'

  import { deepClone } from '@/utils'
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import { objectMerge } from '../../utils'
  import { closeOrder, expressOrder, getOrders } from '../../api/orders'

  const ordersFilter = {
    waitPay: {
      status: 1
    },
    waitSend: {
      status: 2
    },
    waitConfirm: {
      status: 3
    },
    confirmed: {
      status: 4
    },
    closed: {
      status: 5
    },
    refund: {
      status: 6
    }
  }

  const AddressList = [
    { key: 'address_name', display_name: '收货人姓名' },
    { key: 'address_mobile', display_name: '收货人手机' }
  ]
  const TimeList = [
    { key: 'create_begin_at', display_name: '创建时间' },
    { key: 'pay_begin_at', display_name: '支付时间' }
  ]
  const OrderTypes = [
    { key: 1, display_name: '金币' },
    { key: 2, display_name: '消费券商品' },
    { key: 3, display_name: '推客商品' }
  ]
  const PayTypes = [
    { key: 1, display_name: '支付宝' },
    { key: 2, display_name: '微信' },
    { key: 3, display_name: '金币' },
    { key: 4, display_name: '共享券' }
  ]
  const calendarTypeKeyValue = PayTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    components: { Pagination, Upload, Tinymce },
    directives: { waves },
    data() {
      return {
        OrderTypes,
        ordersFilter,
        PayTypes,
        AddressList,
        TimeList,
        calendarTypeKeyValue,
        params: {},
        total: 0,
        listLoading: true,
        addressType: 'address_name',
        addressValue: '',
        timeType: 'create_begin_at',
        timeValue: '',
        orderList: [],
        dialogFormVisible: false,
        listQuery: {
          page: 1,
          per_page: 20,
          user_id:this.$route.query.user_id
        },
        expressForm: {
          id: 0,
          express_company: '',
          express_no: ''
        }
      }
    },
    created() {
      this.getOrders()
    },
    methods: {
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 1) {
          return [1, 2]
        } else if (columnIndex === 2) {
          return [0, 0]
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      async getOrders() {
        let params = deepClone(this.listQuery)
        if (this.addressValue) {
          params[this.addressType] = this.addressValue
        }
        if (this.timeValue) {
          params[this.timeType] = this.timeValue
        }
        params = objectMerge(ordersFilter[this.$route.name], params)
        const res = await getOrders(params)
        this.orderList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1

        this.getOrders()
      },
      handleEdit(scope) {
        this.$router.push({ name: 'orderDetail', query: { id: scope.row.id } })
      },
      closeOrder(id) {
        closeOrder(id).then(res => {
          if (res.code == 0) {
            this.$message.success('订单关闭成功')
            this.getOrders()
          }
        })
      },
      handleDelete({ $index, row }) {
        this.$confirm('确定要删除此订单吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteOrders(row.id)
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
      handelExpressOrder(id) {
        this.dialogFormVisible = true
        this.expressForm.id = id
      },
      postExpress() {
        let id = this.expressForm.id
        delete this.expressForm.id
        expressOrder(id, this.expressForm).then(res => {
          if (res.code == 0) {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '操作成功！',
              type: 'success'
            })
            this.getOrders()
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
