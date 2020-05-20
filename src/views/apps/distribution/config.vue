<template>
  <div class="app-container">

  <el-form :model="configItem"  ref="configItem" label-width="150px" class="demo-configItem">
    <h5>成为分销商的条件</h5>
    <el-form-item>
      <el-checkbox-group v-model="configItem.type">
        <el-checkbox label="累计消费" name="type"></el-checkbox>
        <el-checkbox label="购买指定类型商品" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="消费金额"  >
      <el-input v-model="configItem.delivery" style="width: 20%"></el-input>元
    </el-form-item>
    <el-form-item label="购买商品"  >
      <el-input v-model="configItem.desc" style="width: 20%"></el-input>
    </el-form-item>
    <h5>佣金比例</h5>
    <el-form-item label="一级佣金比例" required>
      <el-input v-model="configItem.first_promote_fee" style="width: 20%"></el-input>
    </el-form-item>
    <el-form-item label="二级佣金比例" required>
      <el-input v-model="configItem.second_promote_fee" style="width: 20%"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm('configItem')">重置</el-button>
      <el-button type="primary" @click="submitForm('configItem')">保存</el-button>

    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  import { getConfigs } from '../../../api/settings'

  export default {
    data() {
      return {
        configItem: {
        },
      };
    },
    created(){
      this.getConfig()
    },
    methods: {
      getConfig(){
        getConfigs().then(res=>{
          this.configItem=res.data
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
