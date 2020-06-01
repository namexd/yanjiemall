<template>
  <div class="app-container">
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="等级" align="center">
        <template slot-scope="{row}">
          <span>默认等级</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.default_user_level_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="概述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.default_user_level_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权益" align="center">
        <template slot-scope="{row}">
          <span v-if="row.default_user_level_status==1">开启</span>
          <span v-if="row.default_user_level_status==0">关闭</span>
        </template>
      </el-table-column>
      <el-table-column label="会员数" align="center">
        <template slot-scope="{row}">
          <span>{{row.total_user}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑等级" :visible.sync="dialogFormVisible">
      <el-form :model="level" label-width="150px">
        <el-form-item label="等级名称" required>
          <el-input v-model="level.default_user_level_name" style="width:70%"></el-input>
        </el-form-item>
        <el-form-item label="等级描述" required>
          <el-input type="textarea" v-model="level.default_user_level_desc" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="消费券权益" required>
          <el-radio v-model="level.default_user_level_status" :label=1>开启</el-radio>
          <el-radio v-model="level.default_user_level_status" :label=0>关闭</el-radio>
        </el-form-item>
        <el-form-item label="等级权益" required>
          <el-input v-model="level.default_user_discount" style="width: 70%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves' // waves directive
  import { getConfigs, updateConfigLevel } from '../../api/settings' // secondary package based on el-pagination
  export default {
    name: 'UserLevel',
    directives: { waves },
    data() {
      return {
        list: [],
        dialogFormVisible: false,
        level: {}
      }
    },
    created() {
      this.getConfigs()
    },
    methods: {
      getConfigs() {
        getConfigs(this.listQuery).then(response => {
          this.list.push(response.data)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getConfigs()
      },
      handleEdit(row) {
        this.level = row
        this.dialogFormVisible = true
      },
      handleSubmit() {
        this.dialogFormVisible = false
        updateConfigLevel(this.level).then(res => {
          this.$message.success('修改成功！')
        })
      }
    }
  }
</script>
