<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery">
        <el-row>
          <el-col :span="6">
            <el-form-item label="账号" class="postInfo-container-item">
              <el-select v-model="listQuery.type" placeholder="请选择账号" clearable class="filter-item" style="width: 130px">
                <el-option v-for="(item,index) in typeList" :key="index" :label="item"
                           :value="index"/>
              </el-select>
              <el-input clearable v-model="listQuery.mobile" placeholder="请输入账号" style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
<!--          <el-col :span="10">-->
<!--            <el-form-item label="选择日期范围:">-->
<!--              <el-date-picker-->
<!--                v-model="dateRange"-->
<!--                type="datetimerange"-->
<!--                range-separator="至"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期"-->
<!--                placeholder="选择日期"-->
<!--                @change="getDate"-->
<!--                value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                format="yyyy-MM-dd HH:mm:ss"-->
<!--                align="right"-->
<!--                :picker-options="pickerOptions">-->
<!--              </el-date-picker>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="4">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>
    <el-table ref="dragTable" v-loading="listLoading" :data="appealsList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" row-class-name="rowStyle" >
      <el-table-column align="center" label="申诉信息" width="220">
        <template slot-scope="scope">
          <div>
            <div style="text-align: left" class="dubble" >出售人：{{scope.row.seller_appeals.mobile}}  <el-tag v-if="scope.row.seller_appeals.create_at" size="mini" type="warning">申诉</el-tag></div>
            <div style="text-align: left" class="dubble">买家：{{scope.row.buyer_appeals.mobile}}  <el-tag v-if="scope.row.buyer_appeals.create_at"   size="mini" type="warning">申诉</el-tag></div>
            <div class="bottom_content"><span>订单编号：{{scope.row.order_no}}</span><span>挖矿券编号：{{scope.row.mine_no}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申诉时间">
        <template slot-scope="scope">
          <div class="dubble">{{ scope.row.seller_appeals.create_at }}</div>
          <div class="dubble">{{scope.row.buyer_appeals.create_at}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款凭证">
        <template slot-scope="scope">
          <div class="dubble">
          <div class="demo-image__preview ">
            <el-image
              lazy
              style="width: 30px; height: 30px"
              :src=" scope.row.seller_appeals.explain_img"
              :preview-src-list="[scope.row.seller_appeals.explain_img]">
            </el-image>
          </div>
          </div>
          <div class="dubble">

          <div class="demo-image__preview dubble" v-if="scope.row.buyer_appeals.create_at">
            <el-image
                       lazy
                       style="width: 30px; height: 30px"
                       :src=" scope.row.buyer_appeals.explain_img"
                       :preview-src-list="[scope.row.buyer_appeals.explain_img]">
            </el-image>
          </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申诉内容">
        <template slot-scope="scope">
          <div class="dubble" style="color: red">{{scope.row.seller_appeals.explain}}</div>
          <div class="dubble" style="color: red">{{scope.row.buyer_appeals.explain}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="挖矿券名称">
        <template slot-scope="scope">
          {{ scope.row.product_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{scope.row.order_state | statusShowFilter}}
          </el-tag>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.state==1">
            <el-button type="primary" size="mini" @click="handleDistribute(scope.row,2)">
              出售人
            </el-button>
            <el-button type="danger" size="small" @click="handleDistribute(scope.row,1)">买家</el-button>
          </div>
          <div v-if="scope.row.state==0">
            申诉已处理： <span v-if="scope.row.point_type==1" style="color: red">买家</span>
            <span v-if="scope.row.point_type==2" style="color: red">出售人</span>
            <span v-if="scope.row.point_type==0" style="color: red">--</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getAppeals"/>


    <el-dialog title="手动确认挖矿券归属" :visible.sync="dialogFormVisible">
      <el-form :model="distributeParams">
        <el-form-item label-width="60px">
          请确认已核实完相关凭证，您确定将此券分配给： <span style="color: red">{{title}}</span>
        </el-form-item>

        <el-form-item label="后台登陆密码" label-width="150px">
          <el-input v-model="distributeParams.pwd" type="password" style="width: 90%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="postDistribute">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    appealDistribute,
    getAppeals
  } from '../../../api/minerals'
  import { deepClone } from '../../../utils'

  const statusShow = {
    1: '待付款',
    2: '已付款',
    3: '已完成',
    4: '已关闭'
  }
  const typeList = {
    1: '买家',
    2: '出售人',
  }
  export default {
    components: { Pagination },
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
        typeList,
        appealsList: [],
        dialogFormVisible: false,
        title: '',
        total: 0,
        listLoading: true,
        distributeParams: {
          pwd: ''
        },
        listQuery: {
          page: 1,
          per_page: 20,
        },
        dateRange:[],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created() {
      this.getAppeals()
    },
    methods: {
      getDate()
      {
        if (this.dateRange)
        {
          this.listQuery.start_time=this.dateRange[0]
          this.listQuery.end_time=this.dateRange[1]
        }else
        {
          delete  this.listQuery.start_time
          delete  this.listQuery.end_time
        }

      },
      handleDistribute(row, type) {
        this.distributeParams.type = type
        this.distributeParams.id = row.id
        this.dialogFormVisible = true
        type == 1 ? this.title = '买家' : this.title = '出售人'
      },
      postDistribute() {
        const params = deepClone(this.distributeParams)
        const id = params.id
        delete params.id
        appealDistribute(id, params).then(res => {
          this.dialogFormVisible = false
          res.code == 0 ? this.$message.success('操作成功') : this.$message.error('操作失败')
          this.getAppeals()
        })
      },
      async getAppeals() {
        const res = await getAppeals(this.listQuery)
        this.appealsList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getAppeals()
      },

    }
  }
</script>

<style>
  .rowStyle {
    height: 100px;
  }
</style>
<style lang="scss" scoped>
  .dubble{
    height: 30px;
  }
  .bottom_content {
    position: absolute;
    z-index: 2;
    width: 750%;
    text-align: left;
    bottom: 5px;
    white-space: nowrap;
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
