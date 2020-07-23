<template>
  <div id="news-layout">
    <NewsHeader
      :back_route="back_route"
      v-model="search"
      :searching="searching"
    />
    <transition name="slide-y-transition" mode="out-in">
      <router-view
        @clearInputSearch="clearInputSearch"
        @setBackRoute="setBackRoute"
        :search="search"
        v-on:search="(value) => (search = value)"
        :searching="searching"
        v-on:searching="(value) => (searching = value)"
      ></router-view>
    </transition>
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
