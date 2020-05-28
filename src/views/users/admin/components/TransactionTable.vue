<template>
  <el-table :data="area_data" style="width: 100%;padding-top: 15px;">
    <el-table-column label="排名"  align="center">
      <template slot-scope="scope">
        {{ scope.$index +1 }}
      </template>
    </el-table-column>
    <el-table-column label="省份"  align="center">
      <template slot-scope="scope">
        {{ scope.row.area_name }}
      </template>
    </el-table-column>
    <el-table-column label="会员数"  align="center">
      <template slot-scope="scope">
        {{ scope.row.user_num }}
      </template>
    </el-table-column>
    <el-table-column label="占比"  align="center">
      <template slot-scope="scope">
       {{ scope.row.user_prop }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props:{
    area_data:{
      type: Array,
      default: () => {
        return []
      }
    },
  },
}
</script>
