<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>其他信息</span>
    </div>
    <div class="user-bio" style="min-height: 160px">
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-body">
          <div class="progress-item" v-if="order.express_no">
            <b>快递单号</b>
            <span>{{order.express_no}}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      order: {
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
