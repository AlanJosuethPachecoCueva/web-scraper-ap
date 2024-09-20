<template>
  <div id="big-container">
    <div id="top">
      <img alt="Vue logo" src="./assets/logo.png">
      <div id="options">

        <input class="btn" type="button" value="Filter <=5 words and order by points"
          v-on:click="filterAndSortByPoints()">
        <input class="btn" type="button" value="Get Data" v-on:click="getWebsiteData()">
        <input class="btn" type="button" value="Clear Filter" v-on:click="clearFilter()">
        <input class="btn" type="button" value="Filter >5 words and order by number of comments"
          v-on:click="filterAndSortByComments()">

      </div>

    </div>
    <div id="bottom" v-if="dataLoaded">
      <div class="container mt-4">
        <h2 class="mb-4">Hacker News</h2>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Nro</th>
              <th>Rank</th>
              <th>Title</th>
              <th>Score</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in news" :key="item.rank">
              <td class="table-data">{{ index + 1 }}</td>
              <td class="table-data">{{ item.rank }}</td>
              <td class="table-data" id="td-title">{{ item.title }}</td>
              <td class="table-data">{{ item.score }}</td>
              <td class="table-data">{{ item.comments }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      news: [],
      dataLoaded: false,
      originalNews: [],
    }
  },
  methods: {
    getWebsiteData() {
      let scrapeUrl = "https://news.ycombinator.com";
      let apiUrl = "http://localhost:3000/api/scrape";

      axios.get(apiUrl, {
        params: {
          url: scrapeUrl // Pasamos la URL como parámetro
        }
      })
        .then((response) => {
          let res = response.data;
          console.log("response api: ", res); // Muestra los datos de la respuesta
          this.news = res;
          this.originalNews = res;
          this.dataLoaded = true;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.dataLoaded = false;
        });

    },

    filterAndSortByComments() {
      this.news = this.originalNews;
      console.log("filter by comments")

      this.news = this.news.filter(entry => {
        // Aquí se filtran las entradas con más de cinco palabras en el título
        const wordCount = entry.title.split(/\s+/).filter(word => word.trim()).length;
        return wordCount > 5;
      })
        // Aquí se Ordenan por la cantidad de comentarios
        .sort((a, b) => {
          return parseInt(b.comments) - parseInt(a.comments);
        });
    },
    filterAndSortByPoints() {
      this.news = this.originalNews;
      console.log("filter by points")
      this.news = this.news.filter(entry => {
        const wordCount = entry.title.split(/\s+/).filter(word => word.trim()).length;
        return wordCount <= 5;
      })
        // Ordenar por la cantidad de puntos
        .sort((a, b) => {
          return parseInt(b.score) - parseInt(a.score);
        });
    },
    clearFilter() {
      this.news = this.originalNews;
    }
  },
  created() {
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#big-container {
  width: 100vw;
  min-height: 100vh;
  width: 100%;
  background-color: black;
}

#top {
  /* background-color: gray; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

#top img {
  width: 15%;
  padding: 2% 0 2% 0;
}

#options {
  display: flex;
  width: 60%;
  background-color: rgba(198, 202, 202, 0.5);
  justify-content: space-around;
  margin: 30px;

  padding: 30px;
  border-radius: 20px;
}

#bottom {
  display: flex;
  /* background-color: blue; */

  justify-content: center;

  padding: 0 0 3% 0;

  color: white;
}

.table-data {
  border: 1px solid white;
  padding: 10px 5px 10px 5px;
}

#td-title {
  text-align: left;
}

.btn {

  background-color: #ffffff;

  border-radius: 10px;

  padding: 6px 10px 6px 10px;

  cursor: pointer;

  font-weight: bold;
}
</style>
