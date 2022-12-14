<template>
  <div class="header">
    <router-link :to="{ name: 'home' }">home</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  color: white;
  background-color: #4267b8;
  padding: 8px;
  text-align: center;
  /* display: flex; */
}
.header .router-link-exact-active router-link-active {
  color: #35495e;
}
.header a {
  color: white;
}
</style>
