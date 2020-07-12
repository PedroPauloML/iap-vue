<template>
  <v-app>
    <Header />

    <v-main class="secondary">
      <v-container>
        <transition name="slide-y-transition" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style></style>
