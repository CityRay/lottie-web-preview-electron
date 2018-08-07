import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'animation-page',
      component: require('@/components/AnimationPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
