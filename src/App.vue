<template>
  <div id="app">
    <router-view />
    <nav-bar />
  </div>
</template>

<script>
import navBar from './components/navBar'
import './css/index.css'
import './css/common.css'

export default {
  name:'App',
  components:{
    navBar,
  }
}
</script>


<style lang="scss">

</style>
