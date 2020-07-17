<template>
  <div id="new">
    <h1>Notícia {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      back_router: "/news",
    };
  },
  created() {
    this.$emit("setBackRoute", { name: "news" });
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("setBackRoute", null);
    next();
  },
};
</script>

<style></style>
