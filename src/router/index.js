
export default [
  { path: '/InvestMoneyList', component: () => import('../pages/InvestMoneyList.vue'), name: "InvestMoneyList" },
  { path: '/editdetails', component: () => import('../pages/EditDetails.vue'), name: "EditDetails" },
  { path: '/', component: () => import('../pages/Home'), name: 'home'}
]