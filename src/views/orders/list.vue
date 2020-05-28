<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" ref="ruleForm">
        <el-row>
          <el-col :span="4">
            <el-form-item label="订单名称" class="postInfo-container-item">
              <el-input v-model="listQuery.order_no" placeholder="请输入订单编号" clearable style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-select v-model="addressType" placeholder="请选择" clearable class="filter-item" style="width: 130px">
              <el-option v-for="item in AddressList" :key="item.key" :label="item.display_name"
                         :value="item.key"/>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input v-model="addressValue" clearable style="width: 200px;" class="filter-item"/>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-select v-model="timeType" placeholder="请选择" clearable class="filter-item" style="width: 130px">
              <el-option v-for="item in TimeList" :key="item.key" :label="item.display_name"
                         :value="item.key"/>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-date-picker
              v-model="timeValue"
              type="datetime"
              placeholder="请选择日期时间">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="订单类型" class="postInfo-container-item">
              <el-select v-model="listQuery.oder_type" placeholder="请选择" clearable class="filter-item"
                         style="width: 130px">
                <el-option v-for="item in OrderTypes" :key="item.key" :label="item.display_name"
                           :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="支付方式:" class="postInfo-container-item">
              <el-select v-model="listQuery.pay_type" placeholder="请选择" clearable class="filter-item"
                         style="width: 130px">
                <el-option v-for="item in PayTypes" :key="item.key" :label="item.display_name"
                           :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="4">-->
          <!--            <el-form-item label="维权状态:" class="postInfo-container-item">-->
          <!--              <el-select v-model="listQuery.type" placeholder="请选择" clearable class="filter-item" style="width: 130px">-->
          <!--                <el-option v-for="item in OrdersTypes" :key="item.key" :label="item.display_name"-->
          <!--                           :value="item.key"/>-->
          <!--              </el-select>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <el-col :span="4">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
            <el-button class="filter-item" @click="resetForm('ruleForm')">清空条件</el-button>
          </el-col>
        </el-row>

      </el-form>

    </div>

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
              <el-col :span="8">
                <div>
                  <el-image
                    style="width: 60px; height: 60px"
                    :src="good.goods_cover_pic"
                    :preview-src-list="[good.goods_cover_pic]">
                  </el-image>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="text-align: left"> {{good.goods_name}}<br>
                  {{good.sku_name}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple"> x{{good.price}}<br>
                  x{{good.order_num}}
                </div>
              </el-col>
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
            <el-button type="danger" size="mini" @click="closeOrder(scope.row)">
              关闭
            </el-button>
            <el-button type="warning" size="mini" @click="changeOrderPrice(scope.row.id)">
              改价
            </el-button>
          </div>
          <div v-if="scope.row.status==2">
            <span>等待发货</span><br>
            <el-button type="danger" size="mini" @click="handelExpressOrder(scope.row)">
              立即发货
            </el-button>
            <el-button type="warning" size="mini" @click="closeOrder(scope.row)">
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
        <el-form-item label="收货地址" label-width="120px">
          {{total_address}}
        </el-form-item>
        <el-form-item label="快递公司" label-width="120px">
          <el-input v-model="expressForm.express_company" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" label-width="120px">
          <el-input v-model="expressForm.express_no" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postExpress">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="关闭订单/退款" :visible.sync="dialogCloseVisible">
      <el-form :model="closeParam">
        <el-form-item label="" label-width="50px">
          是否退款并关闭订单
        </el-form-item>
        <el-form-item label="关闭原因" label-width="120px">
          <el-input maxlength="200"
                    show-word-limit type="textarea" clearable v-model="closeParam.reason" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCloseVisible = false">取 消</el-button>
        <el-button type="primary" @click="postClose">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="订单改价" :visible.sync="dialogChangePriceVisible">
      <el-row>
        <el-col :span="24">
          <el-table
            :data="changeData"
             >
            <el-table-column
              label="商品名称"
              >
              <template slot-scope="scope">
                {{ scope.row.goods_name }}-{{scope.row.sku_name}}
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              >
              <template slot-scope="scope">
                ￥{{ scope.row.price }}
              </template>
            </el-table-column>
            <el-table-column
              label="数量">
              <template slot-scope="scope">
                {{ scope.row.order_num }}
              </template>
            </el-table-column>
            <el-table-column
              label="小计">
              <template slot-scope="scope">
                {{ (scope.row.order_num)*(scope.row.price ) }}
              </template>
            </el-table-column>
            <el-table-column
              label="改价">
              <template slot-scope="scope">
                <el-input v-model="scope.row.modify_price"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="运费">
              <template slot-scope="scope">
                <el-input v-if="scope.$index==0" v-model="changePriceParam.freight"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
         <div style="text-align: right">
          <p>  实付：改价+运费 </p>
         <span v-for="p in changeData">￥{{p.modify_price}}+</span>
           <span>￥{{changePriceParam.freight}}=</span>
           <span style="color: red">￥{{getTotal()+Number(changePriceParam.freight)}}</span>
         </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChangePriceVisible = false">取 消</el-button>
        <el-button type="primary" @click="postChange">确 定</el-button>
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
  import { closeOrder, expressOrder, getOrderPrice, getOrders, putOrderPrice } from '../../api/orders'

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
        total_address: '',
        changePriceParam: {
          goods:'',
          freight:0
        },
        closeParam: {},
        orderList: [],
        changeData: [],
        dialogFormVisible: false,
        dialogCloseVisible: false,
        dialogChangePriceVisible: false,
        listQuery: {
          page: 1,
          per_page: 20
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
      closeOrder(row) {
        this.dialogCloseVisible = true
        this.closeParam.id = row.id
      },
      changeOrderPrice(id) {
        this.dialogChangePriceVisible = true
        this.changePriceParam.id = id
        getOrderPrice(id).then(res=>{
          this.changeData=res.data.goods
          this.changePriceParam.freight=res.data.freight
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
      handelExpressOrder(row) {
        this.dialogFormVisible = true
        this.expressForm.id = row.id
        this.total_address = row.total_address
      },
      postExpress() {
        const param = deepClone(this.expressForm)
        let id = this.expressForm.id
        delete param.id
        expressOrder(id, param).then(res => {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: '操作成功！',
            type: 'success'
          })
          this.getOrders()
        })
      },
      postClose() {
        const param = deepClone(this.closeParam)
        let id = this.closeParam.id
        delete param.id
        closeOrder(id, param).then(res => {
          this.dialogCloseVisible = false
          this.$message.success('订单关闭成功')
          this.getOrders()
        })
      },
      postChange() {
        const param = deepClone(this.changePriceParam)
        let id = this.changePriceParam.id
        delete param.id
        param.goods=JSON.stringify(this.changeData)
        putOrderPrice(id, param).then(res => {
          this.dialogChangePriceVisible = false
          this.$message.success('订单改价成功')
          this.getOrders()
        })
      },
      getTotal() {
        let total_change=0
        this.changeData.forEach((i)=>{
          total_change+=Number(i.modify_price)
        })
        return total_change
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
