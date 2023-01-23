<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProjecDetailById } from '../../api/project'
import Breadcrumb from '../../components/Breadcrumb.vue'
import { CircleCheckFilled } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
const route = useRoute()

const detail = ref({})

onMounted(() => {
  getProjecDetailById(route.query.id).then(res => {
    detail.value = res.data.result
    console.log(detail.value)
  })
})
</script>

<template>
  <Breadcrumb />
  <h2>当前进度</h2>
  <el-steps :active="1">
    <el-step title="项目" :icon="CircleCheckFilled" />
    <el-step title="Step 2" :icon="CircleCheckFilled" />
    <el-step title="Step 3" :icon="CircleCheckFilled" />
  </el-steps>
  <div>
    <h2>项目信息</h2>
    <div>
      <el-button type="primary">编辑项目信息</el-button>
      <el-button type="info" plain>删除项目</el-button>
    </div>
  </div>
  <el-descriptions :column="1">
    <el-descriptions-item label="项目名称">{{ detail.project_name }}</el-descriptions-item>
    <el-descriptions-item label="项目描述">{{ detail.description }}</el-descriptions-item>
    <el-descriptions-item label="数据集" class="dataset">
      <el-descriptions :column="1" direction="vertical" :colon="false">
        <el-descriptions-item label="内容库">
          <ul class="content-sum">
            <i class="el-icon-document" style="letter-spacing: 3px; color: #328aff"></i>
            <li v-for="item in detail.datasets" :key="item.dataset_id" class="content-list">
              {{ item.dataset_name }}
            </li>
          </ul>
        </el-descriptions-item>
        <el-descriptions-item label="手动上传">
          <ul class="file-sum">
            <i class="el-icon-document" style="letter-spacing: 3px; color: #328aff"></i>
            <li
              v-for="item in detail.custom_upload_file?.slice(0, 5)"
              :key="item.file_id"
              class="file-list"
            >
              <a :href="item.file_url">{{ item.file_name }}</a>
            </li>
          </ul>
          <span v-if="detail.custom_upload_file?.length >= 5">...+10</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-descriptions-item>
    <el-descriptions-item label="检索配置">{{
      detail.search_config?.map(item => item.model.name).join('、')
    }}</el-descriptions-item>
    <el-descriptions-item label="创建时间">{{
      dayjs(detail.create_time).format('YYYY-MM-DD HH:mm')
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<style lang="scss" scoped>
.dataset {
  display: flex;
}
</style>
