<template>
    <div id="overview">
        <day-select :selected="day"></day-select>
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
import MovieList from "./MovieList.vue";
import MovieFilter from "./MovieFilter.vue";
import DaySelect from "./DaySelect.vue";

export default {
  name: "Overview",
  props: ["genre", "time", "movies", "day"],
  components: {
    MovieList,
    MovieFilter,
    DaySelect
  }
};
</script>

<style>
</style>
