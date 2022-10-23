
export default [
  { path: '/', component: () => import('../pages/InvestMoneyList.vue'), name: "InvestMoneyList" },
  { path: '/editdetails', component: () => import('../pages/EditDetails.vue'), name: "EditDetails" },
]