
<template>
  <div>
    <h1>Dashboard</h1>
    <template v-if="!isLoading">
      <EventCard v-for="event, index in events" :event="event" :key="index" />
    </template>
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import axios from 'axios'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      isLoading: true,
      events: []
    }
  },
  created() {
    axios.get('//localhost:3000/dashboard').then(({ data }) => {
      this.events = data.events.events
      this.isLoading = false
    })
    
  }
}

</script>