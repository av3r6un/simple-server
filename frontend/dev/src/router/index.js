import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Index from '../views/Index';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Главная',
      component: Index,
    },
  ],
});


router.beforeEach((to, from, next) => {
  const isAuth = store.getters.isAuth;
  if (to.matched.some(route => route.meta.requiresAuth) && !isAuth) {
    next('/login');
  } else {
    next();
  }
});

export default router;
