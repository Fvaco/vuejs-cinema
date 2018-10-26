<template>
    <div id="overview">
        <div class="main">
            <movie-list 
            :movies="movies" 
            :genre="genre" 
            :time="time" 
            :day="day">
        </movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
</template>

<script>
import MovieList from './MovieList.vue';
import MovieFilter from './MovieFilter.vue';

export default {
  name: "Overview",
  props: ["genre", "time", "movies", "day"],
  components: {
    MovieList,
    MovieFilter
  }
};
</script>

<style>
</style>
