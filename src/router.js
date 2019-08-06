import Vue from 'vue';
import VueRouter from 'vue-router';
import Feed from './views/Feed';
import FourOFour from './views/FourOFour';
import Post from './views/Post';
import Home from './components/Home';
import Departments from './views/Departments';
import DepartmentPost from './views/DepartmentPost';
import Instagram from './components/Instagram';
import bus from './bus';

Vue.use(VueRouter);

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Cities',
    path: '/cities',
    component: Feed
  },
  {
    name: 'post',
    path: '/city/:slug',
    component: Post
  },
  {
    name: 'Departments',
    path: '/departments/',
    component: Departments
  },
  {
    name: 'DepartmentPost',
    path: '/Departments/:slug',
    component: DepartmentPost
  },
  {
    name: 'Instagram',
    path: '/instagram',
    component: Instagram
  },
  {
    name: '404',
    path: '/404',
    component: FourOFour
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.afterEach((to, from) => {
  //-- Bump the key on App component to force component to update on route change.
  bus.$emit('bumpViewKey');
})

export default router;
