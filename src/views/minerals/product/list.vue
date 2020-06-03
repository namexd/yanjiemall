<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddMineral">添加挖矿券</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="mineralList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="权重"  >
          <template slot-scope="{row}">
            <template v-if="row.edit">
              <el-input v-model="row.sort" class="edit-input" size="small"/>
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="text"
                @click="cancelEdit(row)"
              >
                取消
              </el-button>
            </template>
            <span v-else>{{ row.sort }}</span>
            <el-button
              v-if="row.edit"
              type="text"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              确定
            </el-button>
            <el-button
              v-else
              type="text"
              size="small"
              icon="el-icon-edit"
              @click="row.edit=!row.edit"
            >
              修改
            </el-button>
          </template>
      </el-table-column>
      <el-table-column align="center" label="名称"  >
        <template slot-scope="scope">
          {{ scope.row.product_title }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="预约金币">
        <template slot-scope="scope">
            {{scope.row.advance_gold_coin}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="非预约金币">
        <template slot-scope="scope">
            {{scope.row.un_advance_gold_coin}}
        </template>
      </el-table-column>

      <el-table-column align="header-center" label="价格区间">
        <template slot-scope="scope">
            {{scope.row.min_money}}-{{scope.row.max_money}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="开始时间-结束时间">
        <template slot-scope="scope">
            {{scope.row.start_time}}-{{scope.row.end_time}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="周期(天)">
        <template slot-scope="scope">
            {{scope.row.days}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="总数量">
        <template slot-scope="scope">
          {{scope.row.total_num}}
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
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getMineral"/>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑挖矿券':'新增挖矿券'">
      <el-form :model="mineral"   label-position="left" label-width="120px" >
        <el-form-item label="显示排序" required>
          <el-input v-model="mineral.sort" placeholder="显示排序" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="名称" required>
          <el-input v-model="mineral.product_title" placeholder="挖矿券名称" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="预约金币" required>
          <el-input v-model="mineral.advance_gold_coin" placeholder="预约金币" style="width: 50%"/>
        </el-form-item>
        <el-form-item label="非预约金币" required>
          <el-input v-model="mineral.un_advance_gold_coin" placeholder="非预约金币" style="width: 50%"/>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="最低价格" required>
              <el-input v-model="mineral.min_money" v-if="mineral.id" disabled placeholder="最低价格" style="width: 100%"/>
              <el-input v-model="mineral.min_money" v-else placeholder="最低价格" style="width: 100%"/>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item label="最高价格" required>
              <el-input v-model="mineral.max_money" v-if="mineral.id" disabled placeholder="最高价格" style="width: 100%"/>
              <el-input v-model="mineral.max_money" v-else placeholder="最高价格" style="width: 100%"/>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="11">
            <el-form-item label="开抢时间" required>
              <el-time-picker  value-format="HH:mm" format="HH:mm"  type="datetime" placeholder="选择日期" v-model="mineral.start_time" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item label="结束时间" required>
              <el-select v-model="end_time" placeholder="请选择">
                <el-option
                  label="开抢后五分钟"
                  :value="5"
                   selected>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          </el-row>
        <el-form-item label="周期" required>
          <el-input v-model="mineral.days" placeholder="周期" style="width: 30% "/><span style="margin-left: 10px">天</span>
        </el-form-item>
        <el-form-item label="收益" required>
          <el-input v-model="mineral.percent" placeholder="收益" style="width: 30%"/> <span style="margin-left: 10px">%</span>
        </el-form-item>
        <el-form-item label="标签" required>
          <el-select v-model="mineral.product_label" placeholder="请选择标签" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in productLabelOptions" :key="item.key" :label="item.display_name"
                       :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="加速(消费券)" required >
          <el-input v-model="mineral.low_speed" placeholder="请输入消费券数量" style="width: 30%"/> <span style="margin-left: 10px">低档</span>
        </el-form-item>
        <el-form-item  required>
          <el-input v-model="mineral.medium_speed" placeholder="请输入消费券数量" style="width: 30%"/> <span style="margin-left: 10px">中档</span>
        </el-form-item>
        <el-form-item   required>
          <el-input v-model="mineral.high_speed" placeholder="请输入消费券数量" style="width: 30%"/> <span style="margin-left: 10px">高档</span>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmMineral">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Upload from '@/components/Upload/SingleImage'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination'

  import {
    getMinerals,
    addMineral,
    updateMineral,
    deleteMineral,
    getMineral, sortProduct
  } from '../../../api/minerals'
  import { deepClone ,parseTime} from '../../../utils'

  const productLabelOptions = [
    { key: 1, display_name: '新手' },
    { key: 2, display_name: '特别' },
    { key: 3, display_name: '大额消费' },
    { key: 4, display_name: '日常消费' }
  ]
  const defaultMineral = {
    sort: '',
    product_title: '',
    advance_gold_coin: '',
    un_advance_gold_coin: '',
    min_money: '',
    max_money: '',
    start_time: '',
    end_time: '',
    days: '',
    percent: '',
    product_label: '',
    low_speed: '',
    medium_speed: '',
    high_speed: '',
  }
  export default {
    components: { Pagination, Upload },
    directives: { waves },
    data() {
      return {
        productLabelOptions,
        mineral: Object.assign({}, defaultMineral),
        mineralList: [],
        dialogVisible: false,
        dialogType: 'new',
        total: 0,
        end_time: 5,
        listLoading: true,
        listQuery: {
          page: 1,
          per_page:20
        }
      }
    },
    created() {
      this.getMineral()
    },
    methods: {
      async getMineral() {
        this.listLoading = true

        const res = await getMinerals(this.listQuery)
        const items = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
        this.mineralList = items.map(v => {
          this.$set(v, 'edit', false)
          v.originalSort = v.sort
          return v
        })
      },
      handleAddMineral() {
        this.mineral = Object.assign({}, defaultMineral)
        this.dialogType = 'new'
        this.dialogVisible = true
      },
      handleEdit(scope) {
        this.dialogType = 'edit'
        this.dialogVisible = true
        getMineral(scope.row.id).then(res=>{
          this.mineral = res.data
        })
      },
      handleDelete({ $index, row }) {
          this.$prompt('请输入管理员密码', '确定要删除此挖矿券吗?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            inputErrorMessage: '请输入密码'
          }).then(({ value }) => {
            deleteMineral(row.id,{pwd:value}).then(res=>{
              if (res.code==0){
                this.mineralList.splice($index, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })}else {
                this.$message.error('删除失败')
              }
            })
          }).catch(() => {
          });
        this.getMineral()
      },
      async confirmMineral() {
        const isEdit = this.dialogType === 'edit'
        let params=deepClone(this.mineral)
       const newDay=new Date()
        const newTime=new Date(newDay.getFullYear()+' '+params.start_time+':00')
        const min=(newTime.getMinutes())
        newTime.setMinutes(min+5);
        params.end_time=parseTime(newTime,'{h}:{i}')
        if (isEdit) {
          delete params.id
           updateMineral(this.mineral.id,params).then(res=>{
             res.code==0?this.$message.success('编辑成功'):this.$message.error('编辑失败')
           })
        } else {
           addMineral(params).then(res=>{
             res.code==0?this.$message.success('添加成功'):this.$message.error('添加失败')
           })
        }
        this.getMineral()
        this.dialogVisible = false
      },
      confirmEdit(row) {
        console.log(111,row)
        row.edit = false
        row.originalSort = row.sort
        sortProduct(row.id, { sort: row.sort }).then(res => {
           this.$message({
             message: '权重已修改',
             type: 'success'
           })
        })
      },
      cancelEdit(row) {
        console.log(222,row)
        row.sort = row.originalSort
        row.edit = false
        this.$message({
          message: '取消修改权重',
          type: 'warning'
        })
      },
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
  .line{
    text-align: center;
    line-height: 35px;

  }
</style>
