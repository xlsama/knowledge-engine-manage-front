import { createRouter, createWebHashHistory } from 'vue-router'
import ProjectList from '../pages/project/list.vue'
import ProjectDetail from '../pages/project/detail.vue'
import Dashboard from '../pages/dashboard/index.vue'
import NotFound from '../pages/404/index.vue'

export const routes = [
  { path: '/', redirect: '/project/list' },
  { path: '/dashboard', component: Dashboard },
  {
    path: '/project',
    children: [
      { path: 'list', component: ProjectList },
      { path: 'detail', component: ProjectDetail }
    ]
  },
  { path: '/404', component: NotFound },
  { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/404' }
]

// toto: 404 跳出 route

const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
})

export default router
