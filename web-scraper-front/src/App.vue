<template>

  <div class="top">
    <img alt="Vue logo" src="./assets/logo.png">
    <input type="button" value = "Get Data">
  </div>
  



</template>

<script>
const axios = require("axios");

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      lastestArticles: [],
    }
  },
  methods: {
    getWebsiteData() {
      let scrapeUrl = "https://news.ycombinator.com";
      //let scrapeUrl ="https://www.msn.com/";

      axios.get(`http://localhost:3000/api/scrape`, {
        params: {
          url: scrapeUrl // Pasamos la URL como parámetro
        }
      })
        .then(function (response) {
          console.log("response api: ", response.data); // Muestra los datos de la respuesta
        })
        .catch(function (error) {
          console.error("Error fetching data:", error);
        });

    }
  },
  created() {
    this.getWebsiteData();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
