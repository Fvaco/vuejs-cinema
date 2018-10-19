<template>
<div>
    <div class="movie-col-left">
        <img :src="movie.Poster" alt="">
    </div>
    <div class="movie-col-right">
        <div class="movie-title">
            <h2>{{movie.Title}}</h2>
            <span class="movie-rating">{{movie.Rated}}</span>
        </div>
        <div class="movie-sessions">
            <div :key="session.id" v-for="session in filteredSessions(sessions)" class="session-time-wrapper">
                <div class="session-time">{{ sessionTimeFormat(session.time) }}</div>
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
export default {
  name: "MovieItem",
  props: ["movie", "sessions"],
  methods: {
    sessionTimeFormat(raw) {
      return this.$moment(raw).format("h:mm A");
    },
    filteredSessions(sessions) {
      return sessions.filter(session => {
          return this.$moment(session.time).isSame(this.day, 'day');
      });
    }
  }
};
</script>
