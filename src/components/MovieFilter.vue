<template>
    <div id="movie-filter">
        <h2>Filter results</h2>
        <div class="filter-group">
            <check-filter :key="genre" @check-filter="checkFilter" :title="genre" v-for="genre in genres"></check-filter>
        </div>
    </div>
</template>
<script>
import genres from "../util/genres";
import CheckFilter from './CheckFilter.vue'

export default {
  name: "MovieFilter",
  data() {
    return {
      genres
    };
  },
  methods: {
    checkFilter(category, title, checked) {
      this.$emit("check-filter", category, title, checked);
    }
  },
  components: {
    CheckFilter
  }
};
</script>
