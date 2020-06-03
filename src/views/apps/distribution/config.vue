<template>
  <div class="app-container">

    <el-form :model="configItem" ref="configItem" label-width="150px" class="demo-configItem">
      <h5>成为分销商的条件</h5>
      <el-form-item>
          <el-checkbox label="购买指定类型商品" name="type" checked></el-checkbox>
      </el-form-item>
      <el-form-item label="购买商品">
        <el-select v-model="goods" placeholder="请选择">
          <el-option
            key="分销商品"
            label="分销商品"
            value="分销商品">
          </el-option>
        </el-select>
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
        <el-button type="primary" @click="submitForm()">保存</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getConfigs, updateConfigPromoter } from '../../../api/settings'

  export default {
    data() {
      return {
        configItem: {},
        goods: '分销商品'
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      getConfig() {
        getConfigs().then(res => {
          this.configItem = res.data
        })
      },
      submitForm() {
        updateConfigPromoter(this.configItem).then(res => {
          res.code == 0 ? this.$message.success('修改成功！') : this.$message.error('修改失败！')
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
