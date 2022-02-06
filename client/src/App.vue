<template>
  <div id="app">
     <Header />
    <div class="container main mt-5">
      <router-view  />
    </div>
      <Footer />
    
  </div>
</template>

<script>
import Header from './components/partials/Header.vue'
import Footer from './components/partials/Footer.vue'
export default {
  name: "app",
   components: {
    Header,
    Footer
  },
};
</script>

<style>
.container.main {
  height: 55vh;
}
</style>