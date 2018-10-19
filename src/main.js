import Vue from "vue";
import "./style.scss";

import genres from "./util/genres";

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
    "movie-list": {
      template: `<div id="movie-list">
                        <div v-for="movie in filteredMovies" class="movie">{{movie.title}}</div>
                      </div>`,
      props: ['genre', 'time'],
      data() {
        return {
          movies: [
            { title: "Pulp fiction" , genre: genres.CRIME},
            { title: "Home Alone", genre: genres.COMEDY},
            { title: "Austin Powers", genre: genres.COMEDY }
          ]
        };
      },
      methods:{
        moviePassesGenreFilter(movie){
          if(!this.genre.length) return true;
          return this.genre.findIndex(genre => genre === movie.genre) > -1;
        }
      },
      computed:{
        filteredMovies(){
          return this.movies.filter(this.moviePassesGenreFilter);
        }
      }
    },
    "movie-filter": {
      data() {
        return {
          genres
        };
      },
      template: `<div id="movie-filter">
                <h2>Filter results</h2>
                <div class="filter-group">
                    <check-filter @check-filter="checkFilter" :title="genre" v-for="genre in genres"></check-filter>
                </div>
                </div>`,
      methods: {
        checkFilter(category, title, checked) {
          this.$emit("check-filter", category, title, checked);
        }
      },
      components: {
        "check-filter": {
          data() {
            return {
              checked: false
            };
          },
          methods: {
            checkFilter() {
              this.checked = !this.checked;
              this.$emit("check-filter", "genre", this.title, this.checked);
            }
          },
          props: ["title"],
          template: `<div :class="{'check-filter': true, active: checked}" 
                        @click="checkFilter">
                        <span class="checkbox"></span>
                        <span class="check-filter-title">{{title}}</span>
                    </div>`
        }
      }
    }
  }
});
