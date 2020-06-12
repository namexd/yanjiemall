<template>
  <div class="app-container">
    <el-row :gutter="20">
      <h1>经营概况</h1>

      <el-col :span="10"  >
        <el-card class="box-card">
          <div class="static">
            <div><b>{{data.original_mine_price}}</b></div>
            <div>累计原始券价值</div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="10" :offset="2">
        <el-card class="box-card">
          <div class="static">
            <div><b>{{ data.goods_profit}}</b></div>
            <div>累计商品销售利润</div>
          </div>
        </el-card>

      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 50px">
      <el-tabs type="card">
        <el-tab-pane label="今日">
          <el-col :span="10"  >
          <el-card class="box-card">
            <div class="static">
              <div><b>{{data.today_original_mine_price}}</b></div>
              <div>今日原始券价值</div>
            </div>
          </el-card>

        </el-col>
          <el-col :span="10" :offset="2">
            <el-card class="box-card">
              <div class="static">
                <div><b>{{ data.today_goods_profit}}</b></div>
                <div>今日商品销售利润</div>
              </div>
            </el-card>

          </el-col>
        </el-tab-pane>
        <el-tab-pane label="昨日">
          <el-col :span="10"  >
            <el-card class="box-card">
              <div class="static">
                <div><b>{{data.yesterday_original_mine_price}}</b></div>
                <div>昨日原始券价值</div>
              </div>
            </el-card>

          </el-col>
          <el-col :span="10" :offset="2">
            <el-card class="box-card">
              <div class="static">
                <div><b>{{ data.yesterday_goods_profit}}</b></div>
                <div>昨日商品销售利润</div>
              </div>
            </el-card>

          </el-col>
        </el-tab-pane>
      </el-tabs>


    </el-row>
  </div>

</template>

<script>
import { getStats } from '../../api/home'

export default {
  name: 'Dashboard',
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.getStat()
  },
  methods:{
    async getStat(){
     const res=await getStats()
      this.data=res.data
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
