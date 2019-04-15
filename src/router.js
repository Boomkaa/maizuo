import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: 'films',
          component: () => import('./views/Film.vue'),
          children: [
            {
              path: 'nowPlaying',
              component: () => import('./components/FilmNowPlaying.vue')
            },
            {
              path: 'comingSoon',
              component: () => import('./components/FilmsComingSoon.vue')
            },
            { path: '', redirect: '/films/nowPlaying' }
          ]
        },
        { path: 'cinemas', component: () => import('./views/Cinema.vue') },
        { path: 'center', component: () => import('./views/Center.vue') },
        { path: '', redirect: '/films/nowPlaying' }
      ]
    },
    {
      path: '/film/:id',
      name: 'detail',
      component: () => import('./views/Detail.vue')
    },
    { path: '*', redirect: '/films/nowPlaying' }
  ]
})
