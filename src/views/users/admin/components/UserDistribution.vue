<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>分销信息</span>
      <b style="margin-left: 100px">队长信息(团队分红)</b>
    </div>

    <div class="user-profile">
      <div class="progress-item">
        <b>分销等级</b>
        <span>{{user.user_level}}</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="card-panel-text">
              累计佣金
            </div>
            <span>{{user.total_balance}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="card-panel-text">
              已提现佣金
            </div>
            <span>{{(user.total_balance)-(user.balance)}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="card-panel-text">
              分销订单
            </div>
            <span>{{user.total_balance_order}}</span>
          </div>
        </el-col>
      </el-row>

    </div>
    <div class="user-bio">
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill"/>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <b>成为分销商时间</b>
            <span>{{user.promot_at}}</span>
          </div>
          <div class="progress-item">
            <b>分销下级</b>
            <span>{{(user.first_relation)+(user.second_relation)}}人</span>  <el-button   @click="getUserRelations"  type="text" size="mini">查看下线列表</el-button>

          </div>
          <div class="progress-item">
            <b>  一级</b>
            <span>{{user.first_relation}}人(分销商:{{user.first_relation_promote}}人)</span>
          </div>
          <div class="progress-item">
            <b>  二级</b>
            <span>{{user.second_relation}}人(分销商:{{user.second_relation_promote}}人)</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>


  import { getUserRelations } from '../../../../api/user'

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
      getUserRelations(){
        this.$router.push({
          name:'usersRelations',
          query:{
            id:this.$route.query.id
          }
        })
      }
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
