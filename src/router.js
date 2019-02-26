import Vue from 'vue';
import VueRouter from 'vue-router';
import Feed from './views/Feed';
import FourOFour from './views/FourOFour';
import Post from './views/Post';
import Updater from './components/Updater';
import Home from './components/Home';
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
    path: '/Cities',
    component: Feed
  },
  {
    name: 'post',
    path: '/City/:slug',
    component: Post
  },
  {
    name: 'page',
    path: '/page/:page',
    component: Feed
  },
  {
    name: '404',
    path: '/404',
    component: FourOFour
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    name: 'test',
    path: '/test',
    component: Instagram
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
