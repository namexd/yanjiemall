<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="5"  :offset="1">
        <el-card class="box-card">
          <div class="static">
            <div><b>{{data.total_mine}}</b></div>
            <div>挖矿券总数</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="5" :offset="1">
        <el-card class="box-card">
          <div class="static">
            <div><b>{{data.total_fission}}</b></div>
            <div>裂变数</div>

          </div>
        </el-card>

      </el-col>
      <el-col :span="7" :offset="1">
        <el-card class="box-card">
          <div class="static">
            <div><b>{{data.total_money}}</b></div>
            <div>挖矿券价值</div>

          </div>
        </el-card>

      </el-col>
      <el-col :span="4"  >
        <el-card class="box-card">
          <div class="static">
            <div><b>{{data.product_name}}</b></div>
            <div>申诉中</div>

          </div>
        </el-card>

      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 100px">
      <el-col :span="23" :offset="1">
        <el-card class="box-card">
          <div class="static">
            <div class="filter-container">
              <el-form>
                <el-row>
                  <el-col :span="4">
                    <el-form-item >
                      <el-date-picker
                        v-model="listQuery.search_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        @change="getData"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

            </div>
            <el-table ref="dragTable" :data="list" row-key="id" fit highlight-current-row
                       border>
              <el-table-column align="center" label="挖矿券名称">
                <template slot-scope="scope">
                  {{ scope.row.product_name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="总数">
                <template slot-scope="scope">
                  {{ scope.row.total_mine }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="总价值">
                <template slot-scope="scope">
                  {{ scope.row.mine_price }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="分配状态">
                <template slot-scope="scope">
                  {{ scope.row.status | stateFilter }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="预约人数">
                <template slot-scope="scope">
                  {{scope.row.total_appoint}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="抢券人数">
                <template slot-scope="scope">
                  {{scope.row.total_panic}}
                </template>
              </el-table-column>
              <el-table-column align="center" label="券数量">
                <template slot-scope="scope">
                  {{ scope.row.total_cir_mine }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="抢券成功">
                <template slot-scope="scope">
                  {{ scope.row.panic_success }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="交易成功">
                <template slot-scope="scope">
                  {{ scope.row.order_success }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="抢券失败">
                <template slot-scope="scope">
                  {{ scope.row.panic_fail }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button  type="danger" v-if="scope.row.can_panic==1" @click="panic(scope.row)">分配</el-button>
                  <el-button  type="info"   v-if="scope.row.can_panic==0&&scope.row.status==3"  >已结束</el-button>
                  <el-button      v-if="scope.row.can_panic==0&&scope.row.status==1"  >未开始</el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </el-card>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import { getMineralsStat, productPanic } from '../../api/minerals'

  const statusOptions = {
    1: '未开始', 2: '分配中', 3: '已结束'
  }
  export default {
    filters: {
      stateFilter(status) {
         return statusOptions[status]
      }
    },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
        data: {},
        list: [],
        listQuery: {}
      }
    },
    created() {
      this.getData()
    },
    methods: {
      panic(row)
      {
        productPanic(row.product_id).then(res=>{
          res.code==0?this.$message.success('分配成功'):this.$message.error('分配失败')
          this.getData()
        })
      },
      async getData() {
        const res = await getMineralsStat(this.listQuery)
        this.data = res.data
        this.list = res.data.mine_data_date
      }
    }
  }
</script>

<style>
  .static {
    min-height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .static b {
    color: #20a0ff;
  }
</style>
