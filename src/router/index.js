import { createRouter, createWebHistory } from 'vue-router';
import GradeInput from '../components/GradeInput.vue';
import MissingAssignments from '../components/MissingAssignments.vue';
import StatisticsView from '../components/StatisticsView.vue';
import GradeChinese from '../components/GradeChinese.vue';
import GradeMath from '../components/GradeMath.vue';
import GradeSocial from '../components/GradeSocial.vue';
import GradeHealth from '../components/GradeHealth.vue';
import GradeCalculation from '../components/GradeCalculation.vue'; // 导入新的组件


const routes = [
  {
    path: '/',
    redirect: '/grade-input'
  },
  {
    path: '/grade-input',
    component: GradeInput,
    children: [
      {
        path: 'chinese',
        component: GradeChinese
      },
      {
        path: 'math',
        component: GradeMath
      },
      {
        path: 'social',
        component: GradeSocial
      },
      {
        path: 'health',
        component: GradeHealth
      }
    ]
  },
  {
    path: '/missing-assignments',
    component: MissingAssignments
  },
  {
    path: '/statistics',
    component: StatisticsView
  },
  { path: '/grade-calculation', 
    component: GradeCalculation }, // 添加新的路由

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
