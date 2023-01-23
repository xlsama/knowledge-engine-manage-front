<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 当前路由的匹配记录
const routers = computed(() => {
  // 过滤掉没有meta的
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="bread">
    <el-breadcrumb-item v-for="item in routers" :key="item.path" :to="{ path: item?.path }">
      {{ item?.meta?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style>
/* 这里为了跟收起图标对其 */
.bread {
  margin-top: 8px;
}
</style>
