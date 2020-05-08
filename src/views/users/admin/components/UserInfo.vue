<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>会员资料</span>
      <el-button v-if="user.status==1" @click="handleUserBlock(user.status)" style="float: right;" type="danger" size="mini">加入黑名单</el-button>
      <el-button v-if="user.status==2" @click="handleUserBlock(user.status)" style="float: right;" type="danger" size="mini">移除黑名单</el-button>
    </div>

    <div class="user-profile">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="card-panel-text">
              挖矿卷
            </div>
            <span>{{user.mine_count}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="card-panel-text">
              金币
            </div>
            <span>{{user.left_gold_coin}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="card-panel-text">
              消费券
            </div>
            <span>{{user.share_mine}}</span>
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
            <b>手机号</b>
            <span>{{user.mobile}}</span>
          </div>
          <div class="progress-item">
            <b>注册时间</b>
            <span>{{user.create_at}}</span>
          </div>
          <div class="progress-item">
            <b>默认收货人</b>
            <span>{{user.address_name}}</span>
          </div>
          <div class="progress-item">
            <b>默认收货地址</b>
            <span>{{user.total_address}}</span>
          </div>
          <div class="progress-item">
            <b>邀请人</b>
            <span>{{user.invite_user}}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>

  import { userBlack } from '../../../../api/user'

  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {
            status: '',
            share_mine: '',
            left_gold_coin: '',
            mobile: '',
            create_at: '',
            address_name: '',
            total_address: '',
            mine_count: '',
            invite_user: ''
          }
        }
      }
    },
  methods:{
      handleUserBlock(status){

        userBlack(this.$route.query.id).then(res=>{
          this.user.status=status==1?2:1;
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
