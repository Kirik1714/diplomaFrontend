import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('../views/Main.vue')
    },
    {
      path: '/medicines', 
      name: 'medicines',
      component: ()=>import('../views/Assortment.vue')
    },
    {
      path: '/medicines/:id',
      name: 'fullMedicine',
      component: ()=>import('../views/FullMedicine.vue')
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: ()=>import('../views/Delivery.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: ()=>import('../views/Payment.vue')
    },
    {
      path: '/refund',
      name: 'refund',
      component: ()=>import('../views/Refund.vue')
    },
    {
      path: '/responsibility',
      name: 'responsibility',
      component: ()=>import('../views/Responsable.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: ()=>import('../views/Registration.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('../views/Login.vue')
    },
    {
      path:'/basket',
      name:'basket',
      component:()=>import('../views/Basket.vue')       
    },
    {
      path: "/orders/:id",
      name: "Orders",
      component: () => import("../views/Order.vue"),

    },

 
  ]
})
router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem("access_token");
  if(access_token){
    if(to.name ==="login" ||to.name ==="registration" ){
      return next({ name: "home" })
    }
  }
  if(!access_token){
    if(to.name ==="Orders"){
      return next({ name: "home" })
    }
  }
 

  next();
});

export default router
