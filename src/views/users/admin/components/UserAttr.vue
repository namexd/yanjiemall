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
              <b>会员等级</b>
              <span>普通会员</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="progress-item">
              <b>账号总权重</b>
              <span>{{user.total_score}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="card-panel-description">
            <div class="progress-item">
              <b>可修改权重</b>
              <span>{{user.trust_score}}</span>
              <el-button type="text" @click="handelEdit" style="padding: 0">编辑</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        title="修改权重"
        :visible.sync="dialogVisible"
      >
        <el-form label-width="150px">
          <el-form-item label="账号权重">
            <el-input v-model="user.trust_score" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
  import { changePower } from '../../../../api/user'

  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      handelEdit() {
        this.dialogVisible=true
      },
      submit(){
        changePower(this.$route.query.id, { trust_score: this.user.trust_score }).then(res => {
          res.code == 0 ? this.$message.success('权重修改成功！') : this.$message.success('权重修改失败！')
          this.dialogVisible = false
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
    margin-bottom: 5px;
    font-size: 14px;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    span {
      padding: 0 5px;
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
