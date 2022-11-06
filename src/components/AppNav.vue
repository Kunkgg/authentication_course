<template>
  <div id="nav">
    <div>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="loggedIn" to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </div>
    <RouterLink v-if="!loggedIn" to="/login" class="button">Login</RouterLink>
    <button v-else class="logoutButton" @click="logout">Logout</button>
  </div>
</template>
<script>
import { authComputed } from '../store/helpers';
export default {
  name: 'AppNav',
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }

}
</script>
<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-height: 50px;
  padding: 0.2em 1em;
  background: linear-gradient(to right, #16c0b0, #84cf6a);
}

a {
  font-weight: bold;
  color: #2c3e50;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
}

#nav .button,
#nav .logoutButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
  height: 2em;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 5px;
  background: #fefefe;
  font-size: 1em;
  color: #2c3e50;
  border: none;
  outline: none;
}

</style>