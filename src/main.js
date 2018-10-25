import Vue from "vue";
import VueResource from 'vue-resource';
import moment from 'moment-timezone';
import "./style.scss";

import MovieList from "./components/MovieList.vue";
import MovieFilter from "./components/MovieFilter.vue";
import {checkFilter} from './util/bus';

Vue.use(VueResource);

moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get(){ return this.$root.moment} });

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {get(){return this.$root.bus}});

new Vue({
  el: "#app",
  components: {
    MovieList,
    MovieFilter
  },
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
