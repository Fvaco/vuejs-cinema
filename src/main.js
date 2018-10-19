import Vue from "vue";
import VueResource from 'vue-resource';
import moment from 'moment-timezone';
import "./style.scss";

import MovieList from "./components/MovieList.vue";
import MovieFilter from "./components/MovieFilter.vue";

moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get(){ return this.$root.moment} });
Vue.use(VueResource);

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
      moment,
      day: moment()
    };
  },
  methods: {
    checkFilter(category, title, checked) {
      if (checked) return this[category].push(title);
      return this[category].splice(
        this[category].findIndex(item => item === title),1);
    }
  },
  created(){
    this.$http.get('/api')
    .then(({data}) => {
      this.movies = data;
    })
  }
  
});
