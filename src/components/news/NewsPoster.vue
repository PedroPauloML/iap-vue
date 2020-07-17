<template>
  <v-img :src="image.url" :aspect-ratio="image.ratio">
    <div class="fill-height d-flex align-end">
      <v-col class="background pa-4 white--text">
        <p class="title text-truncate-1-line mb-0">
          {{ title }}
        </p>

        <div class="d-flex align-center">
          <div class="flex">
            <p class="subtitle-2 mb-0 text-truncate-2-line">
              {{ caption }}
            </p>
          </div>

          <router-link :to="route" v-slot="{ href }">
            <v-btn icon link color="white" :to="href">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </router-link>
        </div>
      </v-col>
    </div>

    <template v-slot:placeholder>
      <v-row
        class="fill-height ma-0 secondary darken-1"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    title: String,
    caption: String,
    image: {
      url: String,
      ratio: String,
    },
    route: Object,
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: rgb(0, 0, 0);
  background: -moz-linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
}
</style>
