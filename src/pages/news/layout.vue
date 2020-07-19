<template>
  <div id="news-layout">
    <NewsHeader
      :back_route="back_route"
      v-model="search"
      :searching="searching"
    />
    <router-view
      @clearInputSearch="clearInputSearch"
      @setBackRoute="setBackRoute"
      :search="search"
      v-on:search="(value) => (search = value)"
      :searching="searching"
      v-on:searching="(value) => (searching = value)"
    ></router-view>
  </div>
</template>

<script>
import NewsHeader from "../../components/news/NewsHeader";
export default {
  data() {
    return {
      back_route: null,
      search: "",
      searching: false,
    };
  },
  components: { NewsHeader },
  methods: {
    setBackRoute(route) {
      this.back_route = route;
    },
    clearInputSearch() {
      this.search = "";
    },
  },
};
</script>

<style></style>
