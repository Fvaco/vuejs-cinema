<template>
    <div id="movie-list">
        <div class="no-results">
            <template v-if="movies.length && !filteredMovies.length">
                No results<span v-if="genre.length || time.length"> for {{time.concat(genre).join(', ')}}</span>.
            </template>
            <template v-if="!movies.length">Loading...</template>
        </div>
        <movie-item 
        :key="movie.id" 
        :movie="movie.movie" 
        v-for="movie in filteredMovies" 
        class="movie">
         <div class="movie-sessions">
            <div :key="session.id" v-for="session in filteredSessions(movie.sessions)" class="session-time-wrapper">
                <div class="session-time">{{ formatSessionTime(session.time) }}</div>
            </div>
        </div>
        </movie-item>
    </div>
</template>
<script>
import genres from "../util/genres";
import times from "../util/times";
import MovieItem from "./MovieItem.vue";

export default {
  name: "MovieList",
  props: ["genre", "time", "movies", "day"],
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
    },
    sessionPassesTimeFilter(session) {
      if (!this.day.isSame(this.$moment(session.time), "day")) return false;
      if (!this.time.length || this.time.length === 2) return true;
      if (this.time[0] === times.AFTER_6PM)
        return this.$moment(session.time).hour() >= 18;
      if (this.time[0] === times.BEFORE_6PM)
        return this.$moment(session.time).hour() < 18;
    },
    formatSessionTime(raw) {
      return this.$moment(raw).format("h:mm A");
    },
    filteredSessions(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter);
    }
  },
  computed: {
    filteredMovies() {
      return this.movies
        .filter(this.moviePassesGenreFilter)
        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
    }
  },
  created() {}
};
</script>
