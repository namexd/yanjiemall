<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4"  :offset="1">
        <el-card class="box-card">
          <div class="static">
            <div>{{data.total_mine}}</div>
            <div>挖矿券总数</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="4" :offset="3">
        <el-card class="box-card">
          <div class="static">
            <div>{{data.total_fission}}</div>
            <div>裂变数</div>

          </div>
        </el-card>

      </el-col>
      <el-col :span="8" :offset="4">
        <el-card class="box-card">
          <div class="static">
            <div>{{data.total_money}}</div>
            <div>挖矿券价值</div>

          </div>
        </el-card>

      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 100px">
      <el-col :span="19" :offset="1">
        <el-card class="box-card">
          <div class="static">
            <div class="filter-container">
              <el-form :model="listQuery">
                <el-row>
                  <el-col :span="4">
                    <el-form-item >
                      <el-date-picker
                        v-model="listQuery.search_date"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        @change="getData"
                        value-format="yyyy-MM-DD"
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
                  {{ scope.row.total_mine }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="成功">
                <template slot-scope="scope">
                  {{ scope.row.panic_success }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="失败">
                <template slot-scope="scope">
                  {{ scope.row.panic_fail }}
                </template>
              </el-table-column>
            </el-table>

          </div>
        </el-card>

      </el-col>
      <el-col :span="4"  >
        <el-card class="box-card">
          <div class="static">
            <div>{{data.product_name}}</div>
            <div>申诉中</div>

          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getMineralsStat } from '../../api/minerals'

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
      async getData() {
        const res = await getMineralsStat(this.listQuery)
        this.data = res.data
        this.list = res.data.mine_data_date.items
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

  .static span {
    color: #20a0ff;
  }
</style>
