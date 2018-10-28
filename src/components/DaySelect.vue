<template>
    <div id="day-select">
        <ul class="days">
            <li class="day" 
                :key="day" 
                :class="{active: isActive(day)}"
                @click="selectDay(day)"
                v-for="day in days">{{formatDay(day)}}
            </li>
            <li class="day-selector">
                <span class="dec" @click="changeDay(-1)"></span>
                <span class="inc" @click="changeDay(+1)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ["selected"],
  data() {
    return {
      days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, "days"))
    };
  },
  methods: {
    formatDay(raw) {
      if (raw.isSame(this.$moment(), "day")) return "Today";
      return raw.format("ddd DD/MM");
    },
    isActive(day) {
      return day.isSame(this.selected, "day");
    },
    changeDay(change){
        let newDay = this.$moment(this.selected).add(change, 'days');
        if(this.days.find(day => newDay.isSame(day, 'day'))) this.selectDay(newDay); 
    },
    selectDay(day) {
      this.$bus.$emit("set-day", day);
    }
  }
};
</script>