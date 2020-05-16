<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-page-header @back="goBack" content="会员详情">
      </el-page-header>
    </div>

    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="12" :xs="24">
          <user-info :user="user.user_info" />
        </el-col>

        <el-col :span="12" :xs="24">
          <user-distribution :user="user.user_distribution" />

        </el-col>

      </el-row>
      <el-row :gutter="20">

        <el-col :span="12" :xs="24">
          <user-attr :user="user.user_attr" />
        </el-col>

        <el-col :span="12" :xs="24">
          <user-order :user="user.user_order" />
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
  import UserInfo from './admin/components/UserInfo'
  import UserAttr from './admin/components/UserAttr'
  import UserDistribution from './admin/components/UserDistribution'
  import UserOrder from './admin/components/UserOrder'
  import { getUser } from '../../api/user'

  export default {
    name: 'Detail',
    components: { UserInfo, UserAttr, UserDistribution, UserOrder },
    data() {
      return {
        user: {
          user_info:{},
          user_distribution:{},
          user_attr:{},
          user_order:{},
        },
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      goBack()
      {
        this.$router.back()
      },
      getUser() {
        let id=this.$route.query.id
        getUser(id).then(res=>{
          this.user=res.data
        })
      }
    }
  }
</script>
