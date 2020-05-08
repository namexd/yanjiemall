<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-page-header @back="goBack" content="查看下线列表">
      </el-page-header>
    </div>
    <el-card class="box-card">
      <el-row :gutter="5">
        <el-col :span="6" :xs="24">
          <div>
            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                 alt="">
          </div>
        </el-col>
        <el-col :span="12" :xs="24">
          <div style="margin-top: 35px">下线总数:{{(this.first_relation)+(this.second_relation)}}</div>
        </el-col>
      </el-row>
    </el-card>


    <el-card class="box-card">

      <el-row>

        <el-col :span="24" :xs="24">
          <el-tabs v-model="activityName" @tab-click="handleClick">
            <el-tab-pane label="一级下线" name="1">
              <el-row :gutter="5">
                <el-col :span="8">
                  <div class="relation-item"><span>人数：{{this.first_relation}}</span> <span class="promote">分销商人数：{{this.first_relation_promote}}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  查看下线：
                  <el-select clearable v-model="promoter" placeholder="请选择" @change="changeSelect">
                    <el-option
                      v-for="(key,value) in promoterOptions"
                      :key="value "
                      :label="key"
                      :value="value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>

            </el-tab-pane>
            <el-tab-pane label="二级下线" name="2">
              <el-row :gutter="5">
                <el-col :span="8">
                  <div class="relation-item"><span>人数：{{this.second_relation}}</span> <span class="promote">分销商人数：{{this.second_relation_promote}}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  查看下线：
                  <el-select clearable v-model="promoter" placeholder="请选择" @change="changeSelect">
                    <el-option
                      v-for="(key,value) in promoterOptions"
                      :key="value "
                      :label="key"
                      :value="value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row>

        <el-col :span="24" :xs="24">
          <el-table
            :data="user_relations"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column label="ID" prop="user_id" align="center ">
              <template slot-scope="{row}">
                <span>{{ row.user_id }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.user_mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column label="会员等级">
              <template slot-scope="{row}">
                <el-tag>{{ row.is_promoter | PromoterFilter }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="注册时间" align="center">
              <template slot-scope="{row}">
                <span>{{ row.create_at }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <el-button type="primary" size="small" @click="handleView(row)">
                  查看用户详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page"
                      @pagination="getUserRelations"/>
        </el-col>

      </el-row>
    </el-card>
  </div>
</template>
<style>
  .relation-item {
    margin-bottom: 10px;
    font-size: 14px;
    padding : 10px;
  }
  .promote{
    margin-left: 10px;
  }
</style>
<script>
  import { getUserRelations } from '../../api/user'
  import Pagination from '@/components/Pagination'

  const promoterOptions = { 1: '普通用户', 2: '推广员' }

  export default {
    name: 'relation',
    components: { Pagination },
    data() {
      return {
        user_relations: [],
        first_relation: 0,
        second_relation: 0,
        first_relation_promote: 0,
        second_relation_promote: 0,
        activityName: '1',
        total: 0,
        promoter:'普通用户',
        promoterOptions,
        listQuery: {
          page: 1,
          per_page: 20,
          is_promoter: 1,
          pid: 1
        }
      }
    },
    filters: {
      PromoterFilter(type) {
        return promoterOptions[type]
      }
    },
    created() {
      this.getUserRelations()
    },
    methods: {
      changeSelect(i)
      {
        if (i)
        {
          this.listQuery.pid=i;
        }else
        {
          this.listQuery.pid=1;
        }
        this.getUserRelations()

      },
      handleView(row) {
        this.$router.push({
          name: 'usersDetail',
          query: {
            id: row.user_id
          }
        })
      },
      handleClick(tab, v) {
        this.listQuery.pid = tab.name
        this.listQuery.page = 1
        this.getUserRelations()
      },
      goBack() {
        this.$router.back()
      },
      getUserRelations() {
        let id = this.$route.query.id
        getUserRelations(id, this.listQuery).then(res => {
          this.user_relations = res.data.items
          this.total = res.data._meta.total_count
          this.first_relation = res.data.first_relation
          this.second_relation = res.data.second_relation
          this.first_relation_promote = res.data.first_relation_promote
          this.second_relation_promote = res.data.second_relation_promote
        })
      }
    }
  }
</script>
