<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getProjectList } from '../../api/project'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
const router = useRouter()

const form = reactive({
  pn: 1,
  ps: 10,
  search_condition_type: 'all',
  search_condition_value: '',
  rangeTime: []
})

const tableData = reactive({
  datas: [],
  total: 0
})

const fetchProjectList = () => {
  const [start_create_time, end_create_time] = form.rangeTime
  if (start_create_time) {
    form.start_create_time = dayjs(start_create_time).format('YYYY-MM-DD')
  }
  if (end_create_time) {
    form.end_create_time = dayjs(end_create_time).format('YYYY-MM-DD')
  }

  getProjectList(form).then(res => {
    if (res.data.code) {
      ElMessage.error(res.data.message)
      return
    }
    const { datas, total } = res.data.result
    tableData.datas = datas
    tableData.total = total
  })
}

const onSubmit = () => fetchProjectList()

const goDetail = id => router.push(`/project/detail?id=${id}`)

const handleEdit = () => {}

const handleDelete = () => {}

onMounted(() => fetchProjectList())
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

  <el-table :data="tableData.datas" style="width: 100%">
    <el-table-column prop="project_name" label="项目名称" />
    <el-table-column prop="description" label="项目描述" />
    <el-table-column prop="search_types" label="检索demo配置" />
    <el-table-column prop="create_time" label="创建时间" />
    <el-table-column prop="status" label="状态" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="primary" @click="goDetail(scope.row.id)">查看</el-button>
        <el-button link type="primary" @click="handleEdit">编辑</el-button>
        <el-button link type="primary" @click="handleDelete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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
