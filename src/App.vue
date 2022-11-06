<script>
import AppNav from './components/AppNav.vue'
export default {
  components: {
    AppNav,
  }
}
</script>

<template>
  <AppNav />
  <RouterView />
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 56px);
}
</style>
