<template>
  <v-card class="news-poster rounded-lg">
    <v-img :src="image.url" :aspect-ratio="image.ratio">
      <div class="fill-height d-flex align-end">
        <v-col class="background pa-4 white--text">
          <v-card-title class="title text-truncate-1-line pa-0 mb-2">
            {{ title }}
          </v-card-title>

          <div class="d-flex align-center">
            <v-card-subtitle
              class="flex white--text subtitle-1 pa-0 text-truncate-2-line"
            >
              {{ caption }}
            </v-card-subtitle>

            <router-link v-if="route" :to="route" v-slot="{ href }">
              <v-btn icon x-large link color="white" :to="href">
                <v-icon size="40">mdi-chevron-right</v-icon>
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

    <v-card-text v-if="metadata" class="metadata">
      <span v-if="metadata.read_time" class="overline">
        Tempo de leitura:
        {{ Math.ceil(content.split(" ").length / 5 / 60) }} minuto(s)
      </span>

      <span v-if="metadata.published_at" class="overline">
        Publicado em:
        {{ metadata.published_at | moment("DD/MM/YYYY hh:mm") }}
      </span>

      <span v-if="metadata.author" class="overline">
        Autor: {{ metadata.author }}
      </span>
    </v-card-text>

    <v-divider v-if="metadata" />

    <v-card-text v-if="content">
      <div class="content black--text body-1" v-html="content" />
    </v-card-text>

    <v-divider v-if="content && tags" />

    <v-card-text v-if="tags">
      <router-link
        v-for="(tag, index) in tags"
        :key="index"
        :to="tag.route"
        v-slot="{ href }"
      >
        <v-chip
          link
          :to="href"
          class="ma-2 font-weight-medium"
          color="accent"
          label
          text-color="white"
        >
          <v-icon left>mdi-label</v-icon>
          {{ tag.text }}
        </v-chip>
      </router-link>
    </v-card-text>
  </v-card>
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
    content: String,
    metadata: {
      read_time: Boolean,
      published_at: String,
      author: String,
    },
    tags: {
      text: String,
      route: Object,
    },
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
.metadata span:not(:last-child):after {
  content: "\F09DE";
  display: inline-block;
  font: normal normal normal 24px/1 "Material Design Icons";
  font-size: inherit;
  text-rendering: auto;
  line-height: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
