<script setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'

const form = reactive({
  pn: 1,
  ps: 10,
  search_condition_type: 'all',
  search_condition_value: '',
  rangeTime: []
})

const onSubmit = () => {
  console.log(form)
}
</script>

<template>
  <el-form :model="form" label-width="0" class="form">
    <div class="left">
      <el-form-item>
        <el-select v-model="form.search_condition_type" placeholder="全部">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.search_condition_value" placeholder="请输入" />
      </el-form-item>
    </div>
    <el-form-item>
      <el-date-picker
        v-model="form.rangeTime"
        type="daterange"
        range-separator="To"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
      <el-button :icon="Search" circle style="margin-left: 10px" @click="onSubmit" />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
  }
}
</style>
