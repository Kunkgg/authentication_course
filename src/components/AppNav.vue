<template>
  <div id="nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/dashboard">Dashboard</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div>
</template>
<script>
export default {
  name: 'AppNav'
}
</script>
<style>
#nav {
    display: flex;
    align-items: center;
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

</style>