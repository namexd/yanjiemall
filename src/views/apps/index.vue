<template>
  <el-row :gutter="40" class="panel-group">
    <div @click="goTo('teamBonusIndex')">
      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <el-row :gutter="40" class="panel-group">
          <el-col :span="8" :offset="3">
            <div class="demo-image__error">
              <div class="block">
                <el-image>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <h1>分销</h1>
            <div style="margin-top:100px">裂变分销，智能锁定，快速沉淀客户</div>
          </el-col>
        </el-row>
      </el-col>
    </div>
    <div @click="goTo('distributionIndex')">
      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <el-row :gutter="40" class="panel-group">
          <el-col :span="8" :offset="3">
            <div class="demo-image__error">
              <div class="block">
                <el-image>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <h1>团队分红</h1>
            <div style="margin-top: 100px">拓展销售渠道，提升团队人员宣传积极性，打造人气商城</div>
          </el-col>
        </el-row>
      </el-col>
    </div>
  </el-row>
</template>

<script>

  export default {
    data() {
      return {}
    },
    methods: {
      goTo(type) {
        this.$router.push({ name: type })
      }
    }
  }
</script>

<style>


  .demo-image__error .image-slot, .demo-image__placeholder .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 14px;
  }

  .demo-image__error .image-slot {
    font-size: 30px;
  }

  .demo-image__error .el-image, .demo-image__placeholder .el-image {
    width: 300px;
    height: 200px;
  }

  .demo-image .block, .demo-image__error .block, .demo-image__placeholder .block {
    text-align: center;
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
  }

  .demo-image__error .block, .demo-image__placeholder .block {
    width: 49%;
  }

  .el-image {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }

  .demo-image__error .el-image, .demo-image__placeholder .el-image {
    width: 200px;
    height: 200px;
  }


</style>
<style lang="scss" scoped>

  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;

    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
