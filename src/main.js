import Vue from "vue";
import "./style.scss";

import MovieList from "./components/MovieList.vue";
import MovieFilter from "./components/MovieFilter.vue";
new Vue({
  el: "#app",
  data() {
    return {
      genre: [],
      time: []
    };
  },
  methods: {
    checkFilter(category, title, checked) {
      if (checked) return this[category].push(title);
      return this[category].splice(
        this[category].findIndex(item => item === title),
        1
      );
    }
  },
  components: {
    MovieList,
    MovieFilter
  }
});
