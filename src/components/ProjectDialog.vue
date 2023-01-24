<script setup>
import { Search, UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { getDataSets, getConfigs } from '../api/project'

defineProps({
  dialogVisible: Boolean,
  isEdit: Boolean
})
const emit = defineEmits(['update:dialogVisible'])

const form = reactive({
  project_id: 1,
  save_to_draw: false,
  start_build: false,
  project_name: '直流知识库',
  description: '直流知识库项目描述',
  dataset_ids: [],
  custom_upload_file_ids: [111, 222],
  search_config: [
    {
      search_type: 'comprehensive|content|summary|resource', //检索demo ,对应 "综合检索|内容检索|富摘要检索|普通资源检索" 必传
      model_id: 1
    }
  ]
})
const datasetSelectVisible = ref(false)
const datasetList = ref([])
const searchConfig = ref({ enums_zh_list: [], search_type_configs: [] })
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]

const open = () => emit('update:dialogVisible', true)
const close = () => emit('update:dialogVisible', false)

onMounted(() => {
  getDataSets().then(res => {
    if (res.data.code) {
      ElMessage.error(res.data.message)
      return
    }
    datasetList.value = res.data.result.datasets
  })
  getConfigs().then(res => {
    if (res.data.code) {
      ElMessage.error(res.data.message)
      return
    }
    searchConfig.value = res.data.result
  })
})
</script>

<template>
  <el-dialog
    :model-value="dialogVisible"
    @open="open"
    @close="close"
    :title="`${isEdit ? '编辑' : '新增'}项目`"
  >
    <el-form :model="form" label-width="80">
      <el-form-item label="项目标题">
        <el-input v-model="form.project_name" />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="数据集">
        <section class="dataset">
          <div class="content-container">
            <el-input
              v-model="form.dataset_ids"
              placeholder="请输入"
              @click="datasetSelectVisible = !datasetSelectVisible"
            />
            <el-button type="info" :icon="Search" plain>内容库</el-button>

            <el-checkbox-group
              v-model="datasetList"
              class="content-select"
              v-if="datasetSelectVisible"
            >
              <el-checkbox v-for="item in datasetList" :label="item.name" :key="item.id" />
            </el-checkbox-group>
          </div>
          <el-button type="info" :icon="UploadFilled" plain>手动上传</el-button>
        </section>
      </el-form-item>
      <el-form-item label="检索配置">
        <div class="title">
          <span>检索demo</span>
          <span>检索模型</span>
        </div>

        <el-checkbox-group v-model="searchConfig.enums_zh_list" class="search-demo-list">
          <!-- <el-checkbox
            v-for="item in searchConfig.enums_zh_list"
            :label="item"
            class="search-demo-item"
          /> -->
        </el-checkbox-group>

        <div class="search-model-list">
          <el-select
            v-for="item in searchConfig.search_type_configs"
            :key="item.search_type"
            placeholder="请选择"
            class="search-modal-item"
          >
            <el-option
              v-for="model in item.models"
              :key="model.id"
              :label="model.name"
              :value="model.id"
            />
          </el-select>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="close">确定建库</el-button>
        <el-button @click="close">暂存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dataset {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .content-container {
    display: flex;
    position: relative;

    .content-select {
      position: absolute;
      top: 34px;
      height: 120px;
      z-index: 10;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 17px;
      padding: 12px;
      overflow-y: auto;
    }
  }
}
.title {
  width: 100%;
  background: #eee;
  span {
    display: inline-block;
    width: 50%;
    text-align: center;
    font-weight: bold;
  }
}

.search-demo-list {
  display: flex;
  flex-direction: column;
  width: 50%;

  .search-demo-item {
    height: 45px;
    padding-left: 20px;
    gap: 10px;
    border: 1px solid #ccc;
    border-top: none;
    margin: 0;
  }
}

.search-model-list {
  width: 50%;

  .search-modal-item {
    height: 45px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-top: none;
    border-left: none;
    padding: 20px;
  }
}
</style>
