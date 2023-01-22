<script setup>
import MENU_LIST from './constants/menu'
</script>

<template>
  <el-container class="container">
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="[]">
            <el-sub-menu :index="item.link" v-for="item in MENU_LIST" :key="item.link">
              <template #title>{{ item.title }}</template>
              <el-menu-item :index="child.link" v-for="child in item.children">{{
                child.title
              }}</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  .header {
    background: pink;
  }
}
</style>
