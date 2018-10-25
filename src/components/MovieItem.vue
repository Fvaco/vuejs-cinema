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
import times from "../util/times";

export default {
  name: "MovieItem",
  props: ["movie", "sessions", "day", "time"],
  methods: {
      sessionPassesTimeFilter(session) {
        if (!this.day.isSame(this.$moment(session.time), 'day')) return false;
        if (!this.time.length || this.time.length === 2) return true;
        if (this.time[0] === times.AFTER_6PM) return this.$moment(session.time).hour() >= 18;
        if (this.time[0] === times.BEFORE_6PM) return this.$moment(session.time).hour() < 18;
    },
    sessionTimeFormat(raw) {
      return this.$moment(raw).format("h:mm A");
    },
    filteredSessions(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter);
    }
  }
};
</script>
