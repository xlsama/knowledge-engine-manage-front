<script setup>
import { Search, UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { getDataSets, getConfigs, upload, saveProject } from '../api/project'

const props = defineProps({
  dialogVisible: Boolean,
  editId: Number | null
})
const emit = defineEmits(['update:dialogVisible', 'fetchProjectList', 'setEditId'])

const formRef = ref()
const form = reactive({
  project_name: '',
  description: '',
  dataset_ids: [],
  custom_upload_file_ids: []
})
const rules = reactive({
  project_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
  description: [{ required: true, message: '不能为空', trigger: 'blur' }],
  dataset_ids: [{ required: true, message: '不能为空', trigger: 'blur' }]
})
const datasets = reactive({
  values: [],
  options: [],
  loading: false
})
const configTableData = ref([])
const uploadRef = ref()

const open = () => emit('update:dialogVisible', true)
const close = () => {
  emit('update:dialogVisible', false)
  emit('setEditId', null)
}

const remoteMethod = query => {
  if (query) {
    datasets.loading = true
    setTimeout(() => {
      datasets.loading = false
      datasets.values = datasets.options.filter(item => item.name.includes(query))
    }, 200)
  } else {
    datasets.values = datasets.options
  }
}

const uploadChange = uploadFile => {
  const formData = new FormData()
  formData.append('file', uploadFile.raw)
  upload(formData).then(res => {
    console.log(res)
  })
}

const submit = async isBuild => {
  await formRef.value.validate()

  const params = {
    ...form,
    // project_id: 1, // 项目id, 新增时不传,编辑时传
    save_to_draw: !isBuild,
    start_build: isBuild,
    search_config: configTableData.value.map(item => ({
      search_type: item.search_type,
      model_id: item.selectedModelId
    }))
  }

  saveProject(params).then(res => {
    if (res.data.code) {
      ElMessage.error(res.data.message)
      return
    }
    ElMessage.success(res.data.message)
    close()
    emit('fetchProjectList')
  })
}

onMounted(() => {
  getDataSets().then(res => {
    if (res.data.code) {
      ElMessage.error(res.data.message)
      return
    }
    datasets.options = res.data.result.datasets
  })
  getConfigs().then(res => {
    if (res.data.code) {
      ElMessage.error(res.data.message)
      return
    }

    const { datas } = res.data.result.enums_zh_list[0]

    configTableData.value = res.data.result.search_type_configs.map((item, index) => ({
      ...item,
      ...datas[index],
      search_demo_checked: false,
      selectedModelId: null
    }))
  })
})

watchEffect(() => {
  console.log(props.editId)
})
</script>

<template>
  <el-dialog
    :model-value="dialogVisible"
    @open="open"
    @close="close"
    :title="`${editId || editId === 0 ? '编辑' : '新增'}项目`"
    width="700"
  >
    <el-form :model="form" label-width="80" :rules="rules" ref="formRef">
      <el-form-item label="项目标题" props="project_name">
        <el-input v-model="form.project_name" />
      </el-form-item>
      <el-form-item label="项目描述" props="description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="数据集" props="dataset_ids">
        <section class="dataset">
          <el-select
            v-model="form.dataset_ids"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入"
            :remote-method="remoteMethod"
            :loading="datasets.loading"
          >
            <el-option
              v-for="item in datasets.values"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <!-- <el-button type="info" :icon="Search" plain @click="remoteMethod">内容库</el-button> -->
          <el-upload ref="uploadRef" action="" :auto-upload="false" :on-change="uploadChange">
            <el-button type="info" :icon="UploadFilled" plain>手动上传</el-button>
          </el-upload>
        </section>
      </el-form-item>

      <el-form-item label="检索配置">
        <el-table :data="configTableData" style="width: 100%" border>
          <el-table-column label="检索demo">
            <template #default="scope">
              <el-checkbox v-model="scope.row.search_demo_checked">{{
                scope.row.enum_zh
              }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="检索模型">
            <template #default="scope">
              <el-select
                placeholder="请选择"
                :disabled="!scope.row.search_demo_checked"
                v-model="scope.row.selectedModelId"
              >
                <el-option
                  v-for="item in scope.row.models"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit(true)">确定建库</el-button>
        <el-button @click="submit(false)">暂存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dataset {
  width: 100%;
  position: relative;

  :deep(.el-upload.el-upload--text) {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
