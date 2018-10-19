<template>
    <div id="movie-list">
        <div class="no-results">
            <template v-if="movies.length && !filteredMovies.length">
                No results<span v-if="genre.length"> for {{genre.join(', ')}}</span>.
            </template>
            <template v-if="!movies.length">Loading...</template>
        </div>
        
        <movie-item :key="movie.id" :sessions="movie.sessions" :movie="movie.movie" v-for="movie in filteredMovies" class="movie"></movie-item>
    </div>
</template>
<script>
import genres from "../util/genres";
import MovieItem from "./MovieItem.vue";

export default {
  name: "MovieList",
  props: ["genre", "time", "movies", 'day'],
  components: {
    MovieItem
  },
  data() {
    return {};
  },
  methods: {
    moviePassesGenreFilter(movie) {
      if (!this.genre.length) return true;

      return this.genre.every(genre => {
        return movie.movie.Genre.includes(genre);
      });
    }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(this.moviePassesGenreFilter);
    }
  },
  created(){
      
  }
};
</script>
