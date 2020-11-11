<template>
  <component :is="$store.state.general.layout"></component>
</template>

<script>
import Site from "./pages/layouts/Site";
import Authentication from "./pages/layouts/Authentication";

export default {
  components: {
    Site,
    Authentication,
  },
};
</script>

<style></style>
