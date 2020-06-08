<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" >
        <el-row>
          <el-col :span="6">
            <el-form-item label="预约人账号" class="postInfo-container-item">
              <el-input clearable v-model="listQuery.mobile" placeholder="请输入预约人账号" style="width: 200px;" class="filter-item"
                        @keyup.enter.native="handleFilter"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="挖矿券:" class="postInfo-container-item">
              <el-select v-model="listQuery.product_id" placeholder="请选择" clearable class="filter-item"  >
                <el-option v-for="item in productList" :key="item.id" :label="item.product_title"
                           :value="item.id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态:" class="postInfo-container-item">
              <el-select v-model="listQuery.state" placeholder="请选择" clearable class="filter-item" >
                <el-option v-for="item in stateTypes" :key="item.key" :label="item.display_name"
                           :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="类型:" class="postInfo-container-item">
              <el-select v-model="listQuery.type" placeholder="请选择" clearable class="filter-item"  >
                <el-option v-for="item in appointTypes" :key="item.key" :label="item.display_name"
                           :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="选择日期范围:">
              <el-date-picker
                v-model="dateRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                placeholder="选择日期"
                @change="getDate"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                align="right"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>
    <el-table ref="dragTable" v-loading="listLoading" :data="appointList" row-key="id" fit highlight-current-row
              style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="预约账号" width="220">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="挖矿券名称">
        <template slot-scope="scope">
          {{scope.row.product_title}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="预约时间">
        <template slot-scope="scope">
          {{ scope.row.create_at }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="类型">
        <template slot-scope="scope">
          {{ scope.row.type|appointTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="加速">
        <template slot-scope="scope">
          <span v-if="scope.row.speed_type>0">{{scope.row.speed_voucher}}/</span>{{ scope.row.speed_type | speedTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="券状态">
        <template slot-scope="scope">
          {{ scope.row.state|stateTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                @pagination="getAppoints"/>

  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves' // waves directive

  import {
    getAppoints,
    getMinerals
  } from '../../../api/minerals'
  import { deepClone } from '../../../utils'

  const stateTypes = [
    { key: 1, display_name: '预约中' },
    { key: 2, display_name: '抢券中' },
    { key: 3, display_name: '抢购成功' },
    { key: 4, display_name: '抢购失败' },
  ]
  const appointTypes = [
    { key: 1, display_name: '预约' },
    { key: 2, display_name: '预约后抢购' },
    { key: 3, display_name: '抢购' },
    { key: 4, display_name: '预约未抢购' },
  ]
  const speedType = {
    0:'未加速',
   1:'低档',
    2:'中档',
    3:'高档',
  }

  const stateTypeKeyValue = stateTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  const appointTypeKeyValue = appointTypes.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})


  export default {
    components: { Pagination },
    directives: { waves },
    filters:{
      speedTypeFilter(type){
        return speedType[type]
      } ,
      appointTypeFilter(type){
        return appointTypeKeyValue[type]
      } ,
      stateTypeFilter(type){
        return stateTypeKeyValue[type]
      }
    },
    data() {
      return {
        stateTypes,
        appointTypes,
        productList: [],
        total: 0,
        appointList:[],
        listLoading: true,
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
      this.getAppoints()
      this.getMinerals()
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
      handleFilter() {
        this.listQuery.page = 1
        this.getAppoints()
      },
      async getAppoints() {
        const res = await getAppoints(this.listQuery)
        this.appointList = res.data.items
        this.total = res.data._meta.total_count
        this.listLoading = false
      },
      async getMinerals() {
        const res = await getMinerals()
        this.productList = res.data.items
        this.total = res.data._meta.total_count
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
</style>
