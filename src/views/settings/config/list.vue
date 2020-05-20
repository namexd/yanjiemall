<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>金币设置</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>订单设置</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>手续费设置</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getConfigs } from '../../../api/settings'

  export default {
    directives: { waves },

    data() {
      return {
        configList:[]
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      async getConfig() {
        const res = await getConfigs(this.listQuery)
        this.configList = res.data.items
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
