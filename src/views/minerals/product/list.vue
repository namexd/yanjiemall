<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddMineral">添加挖矿券</el-button>

    <el-table ref="dragTable" v-loading="listLoading" :data="mineralList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="权重"  >
        <template slot-scope="scope">
          {{ scope.row.sort }}
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
      <el-form :model="mineral"   label-position="left" label-width="100px" >
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
              <el-input v-model="mineral.min_money" placeholder="最低价格" style="width: 100%"/>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item label="最高价格" required>
              <el-input v-model="mineral.max_money" placeholder="最高价格" style="width: 100%"/>
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
              <el-time-picker value-format="HH:mm" format="HH:mm"  type="datetime" placeholder="选择时间" v-model="mineral.end_time" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
          </el-row>
        <el-form-item label="周期" required>
          <el-input v-model="mineral.days" placeholder="周期" style="width: 50%"/>
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
        <el-form-item label="加速" required>
          <el-input v-model="mineral.low_speed" placeholder="请输入消费券数量" style="width: 30%"/> <span style="margin-left: 10px">低档</span>
        </el-form-item>
        <el-form-item   required>
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
    getMineral,
  } from '../../../api/minerals'
  import { deepClone } from '../../../utils'

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
        this.mineralList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
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
        this.$confirm('确定要删除此挖矿券吗?', 'Warning', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            await deleteMineral(row.id)
            this.mineralList.splice($index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(err => {
            console.error(err)
          })
      },
      async confirmMineral() {
        const isEdit = this.dialogType === 'edit'
        let params=deepClone(this.mineral)
        if (isEdit) {
          delete params.id
          await updateMineral(this.mineral.id,params)
        } else {
          await addMineral(params)
        }
        this.getMineral()
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          message: '操作成功！',
          type: 'success'
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
  .line{
    text-align: center;
    line-height: 35px;

  }
</style>
