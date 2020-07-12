<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="center">
          <slot></slot>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
  <!-- background.jpg -->
</template>
<script>
export default {};
</script>

<style scoped>
#inspire {
  background-image: url("/imgs/background.jpg");
  background-size: cover;
  background-position: center;
}
</style>
