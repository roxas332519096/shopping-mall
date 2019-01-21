<template>
  <div id="app">
    <router-view/>
    <nav-bar/>
  </div>
</template>

<script>
import navBar from "./components/navBar";

export default {
  name: "App",
  components: {
    navBar
  }
};
</script>


<style lang="scss">
</style>
