<template>
  <div id="app">
    <router-view name="header" />
      <div class="wrapper">
        <router-view />
      </div>
    <router-view name="footer" />
  </div>
</template>
<style media="screen">

</style>
<script>
export default {
  name: 'App',
  components: {
  },
}
</script>
