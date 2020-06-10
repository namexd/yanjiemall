<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="5"  :offset="6">
        <el-card class="box-card">
          <div class="static">
            <div><b>{{88888888}}</b></div>
            <div>原始券价值</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="5" :offset="1">
        <el-card class="box-card">
          <div class="static">
            <div><b>{{ 8888888888}}</b></div>
            <div>商品销售利润</div>

          </div>
        </el-card>

      </el-col>
    </el-row>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
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
