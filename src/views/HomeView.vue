<template>
  <div class="home">
    <h1>Welcome to the App!</h1>
  </div>
  <template v-if="!loggedIn">
    <div>
      To use this app you'll need to
      <RouterLink to="/login">
        Login
      </RouterLink>
      or
      <RouterLink to="/register">
        Register
      </RouterLink>
    </div>
  </template>
</template>

<script>
import { authComputed } from '../store/helpers';

export default {
  computed: {
    ...authComputed
  }
}

</script>
