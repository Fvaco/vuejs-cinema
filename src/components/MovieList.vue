<template>
    <div id="movie-list">
        <div :key="movie.title" v-for="movie in filteredMovies" class="movie">{{movie.title}}</div>
    </div>
</template>
<script>
import genres from '../util/genres'

export default {
  name: "MovieList",
  props: ["genre", "time"],
  data() {
    return {
      movies: [
        { title: "Pulp fiction", genre: genres.CRIME },
        { title: "Home Alone", genre: genres.COMEDY },
        { title: "Austin Powers", genre: genres.COMEDY }
      ]
    };
  },
  methods: {
    moviePassesGenreFilter(movie) {
      if (!this.genre.length) return true;
      return this.genre.findIndex(genre => genre === movie.genre) > -1;
    }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(this.moviePassesGenreFilter);
    }
  }
};
</script>
<style lang="scss">
</style>
