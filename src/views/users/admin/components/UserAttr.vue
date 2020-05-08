<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>会员属性</span>

    </div>

    <div class="user-profile">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="progress-item">
              <span>会员等级</span>
              <span>{{user.user_level}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="progress-item">
              <b>账号权重</b>
              <span>{{user.user_power}}</span>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>
  </el-card>
</template>

<script>


  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {
          }
        }
      }
    },
    methods:{
    }
  }
</script>

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
