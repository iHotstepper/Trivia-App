import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
// import Welcome from './components/Welcome.vue';
import Questions from './components/Questions.vue';
import Leaderboard from './components/Leaderboard.vue';
import vuetify from './plugins/vuetify'
// import '~styles/variables.scss';

export const eventBus = new Vue();

Vue.use(VueRouter);

const routes = [
  { path: '', component: App },
  { path: '/trivia', component: Questions },
  { path: '/leaderboard', component: Leaderboard}
]



const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  vuetify,
  router,
  render: h => h(App)
})
