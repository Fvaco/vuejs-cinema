import Vue from "vue";
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';
import "./style.scss";

import {checkFilter} from './util/bus';
import routes from './util/routes';

Vue.use(VueResource);
Vue.use(VueRouter);

moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get(){ return this.$root.moment} });

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get(){return this.$root.bus}});

const router = new VueRouter({
  routes
})

new Vue({
  el: "#app",
  router,
  data() {
    return {
      genre: [],
      time: [],
      movies:[],
      day: moment(),
      moment,
      bus
    };
  },
  methods: {},
  created(){
    this.$http.get('/api')
    .then(({data}) => {
      this.movies = data;
    });
    this.$bus.$on('check-filter', checkFilter.bind(this));
  }
});
