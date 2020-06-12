<template>
  <div>
    <el-card style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>会员资料</span>
        <el-button v-if="user.status==1" @click="handleUserBlock(user.status)" style="float: right;" type="warning"
                   size="mini">移除黑名单
        </el-button>
        <el-button v-if="user.status==2" @click="handleUserBlock(user.status)" style="float: right;" type="danger"
                   size="mini">加入黑名单
        </el-button>
      </div>

      <div class="user-profile">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="card-panel-description">
              <div class="card-panel-text">
                挖矿卷
              </div>
              <el-button type="text" @click="showLogs" style="color: red;font-size: 15px">{{user.mine_count}}</el-button>
              <el-button type="text" @click="addMine">添加</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="card-panel-description">
              <div class="card-panel-text">
                金币
              </div>
              <span>{{user.left_gold_coin}}</span>
              <el-button type="text" @click="addGold">充值</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="card-panel-description">
              <div class="card-panel-text">
                消费券
              </div>
              <span>{{user.share_mine}}</span>
              <el-button type="text" @click="addVoucher">充值</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="user-bio">
        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="skill"/>
          </div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <b>手机号</b>
              <span>{{user.mobile}}</span>
            </div>
            <div class="progress-item">
              <b>注册时间</b>
              <span>{{user.create_at}}</span>
            </div>
            <div class="progress-item">
              <b>默认收货人</b>
              <span>{{user.address_name}}</span>
            </div>
            <div class="progress-item">
              <b>默认收货地址</b>
              <span>{{user.total_address}}</span>
            </div>
            <div class="progress-item">
              <b>邀请人</b>
              <span>{{user.invite_user}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="用户挖矿券列表" :visible.sync="dialogMineListVisible" width="80%">
      <div>
        <div class="filter-container">
          <el-form :model="listQueryMine" >
            <el-row>
              <el-col :span="4">
                <el-form-item label="状态:" class="postInfo-container-item">
                  <el-select v-model="listQueryMine.status" placeholder="请选择" clearable class="filter-item" style="width: 130px">
                    <el-option v-for="item in stateTypes" :key="item.key" :label="item.display_name"
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
        <el-table ref="dragTable" v-loading="listLoading" :data="mineList" row-key="id" fit highlight-current-row
                  style="width: 100%;margin-top:30px;" border>
          <el-table-column align="center" label="挖矿券名称" width="220">
            <template slot-scope="scope">
              {{ scope.row.product_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="挖矿券编号">
            <template slot-scope="scope">
              {{scope.row.mine_no}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="价值">
            <template slot-scope="scope">
              {{ scope.row.price}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="收益">
            <template slot-scope="scope">
              {{ scope.row.days }}天/{{scope.row.percent}}%
            </template>
          </el-table-column>
          <el-table-column align="center" label="领取来源">
            <template slot-scope="scope">
              {{ scope.row.from_user}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="领取时间">
            <template slot-scope="scope">
              {{ scope.row.create_at}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="券状态">
            <template slot-scope="scope">
              {{ scope.row.status|stateTypeFilter }}
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQueryMine.page" :limit.sync="listQueryMine.per_page"
                    @pagination="getUserMines"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMineListVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加挖矿券" :visible.sync="dialogMineVisible">
      <el-form :model="mineParams">
        <el-form-item label="挖矿券列表" label-width="150ppx" required>
          <el-select v-model="mineParams.product_id" placeholder="请选择挖矿券" >
            <el-option v-for="item in mines" :label="item.product_title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogMineVisible = false">取 消</el-button>
        <el-button type="primary" @click="postMine">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="充值金币" :visible.sync="dialogGoldVisible">
      <el-form :model="goldParams">
        <el-form-item label="金额" label-width="150px" required>
          <el-input type="number" v-model="goldParams.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="150px" required>
          <el-input type="textarea" v-model="goldParams.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGoldVisible = false">取 消</el-button>
        <el-button type="primary" @click="postGold">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="充值消费券" :visible.sync="dialogVouchersVisible">
      <el-form :model="vouchersParams">
        <el-form-item label="数量" label-width="150px" required>
          <el-input type="number" v-model="vouchersParams.amount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="150px" required>
          <el-input type="textarea" v-model="vouchersParams.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVouchersVisible = false">取 消</el-button>
        <el-button type="primary" @click="postVoucher">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import { addGold, addMine, addVoucher, getUserMines, userBlack } from '../../../../api/user'
  import { getMinerals } from '../../../../api/minerals'

  const stateTypes = [
    { key: 1, display_name: '挖矿中' },
    { key: 2, display_name: '待转让' },
    { key: 3, display_name: '转让中' },
    { key: 4, display_name: '已完成' },
    { key: 5, display_name: '已转出' },
    { key: 6, display_name: '已裂变' },
  ]

  const stateTypeKeyValue = stateTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  export default {
    components: { Pagination },
    directives: { waves },

    props: {
      user: {
        type: Object,
        default: () => {
          return {
            status: '',
            share_mine: '',
            left_gold_coin: '',
            mobile: '',
            create_at: '',
            address_name: '',
            total_address: '',
            mine_count: '',
            invite_user: ''
          }
        }
      }
    },
    filters:{
      stateTypeFilter(type){
        return stateTypeKeyValue[type]
      }
    },
    data() {
      return {
        mines: [],
        dialogMineVisible: false,
        dialogGoldVisible: false,
        dialogMineListVisible: false,
        dialogVouchersVisible: false,
        vouchersParams: {
          user_id:this.$route.query.id,
          type:1
        },
        mineParams: {},
        goldParams: {
          user_id:this.$route.query.id,
          type:1
        },
        stateTypes,
        total: 0,
        mineList:[],
        listLoading: true,
        listQueryMine: {
          page: 1,
          per_page: 20,
        }
      }
    },
    created() {
      this.getMinerals()
      this.getUserMines()

    },
    methods: {
      handleFilter() {
        this.listQueryMine.page = 1
        this.getUserMines()
      },
      async getUserMines() {
        const res = await getUserMines(this.$route.query.id,this.listQueryMine)
        this.mineList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      showLogs()
      {
        this.dialogMineListVisible=true
      },
      handleUserBlock(status) {
        userBlack(this.$route.query.id).then(res => {
          this.user.status = status == 1 ? 2 : 1
        })
      },
      async getMinerals() {
        const res = await getMinerals()
        this.mines = res.data.items
      },
      addMine() {
        this.dialogMineVisible = true
      },
      addGold() {
        this.dialogGoldVisible = true
      },
      addVoucher() {
        this.dialogVouchersVisible = true
      },
      postMine() {
        this.dialogMineVisible = false
        addMine(this.$route.query.id, this.mineParams).then(res => {
          if (res.code == 0) {
            this.$message.success('添加挖矿券成功')
            this.user.mine_count++
          } else {
            this.$message.success('添加挖矿券失败')
          }
        })
      },
      postGold() {
        this.dialogGoldVisible = false
        addGold(this.$route.query.id, this.goldParams).then(res => {
          if (res.code == 0) {
            this.$message.success('充值金币成功')
            this.user.left_gold_coin=Number(this.user.left_gold_coin)+Number(this.goldParams.amount)
          } else {
            this.$message.success('充值金币失败')
          }
        })
      },
      postVoucher() {
        this.dialogVouchersVisible = false
        addVoucher(this.$route.query.id, this.vouchersParams).then(res => {
          if (res.code == 0) {
            this.$message.success('充值消费券成功')
            this.user.share_mine=Number(this.user.share_mine)+Number(this.vouchersParams.amount)
          } else {
            this.$message.success('充值消费券失败')
          }
        })
      }
    }
  }
</script>
<style>
  .el-button span:not:first-child {
    font-size: 12px
  }
</style>
<style lang="scss" scoped>

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }

  .text-muted {
    color: #777;
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 16px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
