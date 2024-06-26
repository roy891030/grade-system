import { createRouter, createWebHistory } from 'vue-router';
import GradeInput from '../components/GradeInput.vue';
import MissingAssignments from '../components/MissingAssignments.vue';
import StatisticsView from '../components/StatisticsView.vue';
import GradeChinese from '../components/GradeChinese.vue';
import GradeMath from '../components/GradeMath.vue';
import GradeSocial from '../components/GradeSocial.vue';
import GradeHealth from '../components/GradeHealth.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
