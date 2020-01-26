<template>
   <b-container fluid id="app">
    <b-row>
      <b-col>
        <!-- <navbar/> -->
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'
export default {
  name: 'App',
  components: {
    // Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font: 1.3rem "YS Text",sans-serif;
  color: #2b2b2b;
}
</style>
