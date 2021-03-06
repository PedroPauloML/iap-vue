<template>
  <v-card class="news-poster rounded-lg">
    <v-img :src="image.url || ''" :aspect-ratio="image.ratio">
      <div class="fill-height d-flex align-end">
        <v-col class="background pa-4 white--text">
          <div class="d-flex align-center">
            <v-card-title
              :class="{
                flex: true,
                title: true,
                'text-truncate-1-line': route ? true : false,
                'pa-0': true,
                'mb-2': true,
              }"
            >
              {{ title }}
            </v-card-title>

            <router-link
              v-if="!noActions && !caption && route"
              :to="route"
              v-slot="{ href }"
            >
              <v-btn icon x-large link color="white" :to="href">
                <v-icon size="40">mdi-chevron-right</v-icon>
              </v-btn>
            </router-link>
          </div>

          <div v-if="caption" class="d-flex align-center">
            <v-card-subtitle
              :class="{
                flex: true,
                'white--text': true,
                'subtitle-1': true,
                'pa-0': true,
                'text-truncate-2-line': route ? true : false,
              }"
            >
              {{ caption }}
            </v-card-subtitle>

            <router-link
              v-if="!noActions && route"
              :to="route"
              v-slot="{ href }"
            >
              <v-btn icon x-large link color="white" :to="href">
                <v-icon size="40">mdi-chevron-right</v-icon>
              </v-btn>
            </router-link>

            <v-menu
              v-if="!noActions && userSigned"
              v-model="optionsMenu"
              bottom
              left
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon x-large color="white" v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list dense flat>
                <v-list-item
                  :to="{
                    name: 'news_edit',
                    params: { id: id },
                  }"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Editar
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="destroy">
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Excluir
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
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

    <v-card-text
      v-if="metadata"
      class="d-flex align-center metadata flex-column flex-sm-row"
    >
      <span v-if="metadata.read_time" class="overline">
        Tempo de leitura:
        {{ Math.ceil(content.split(" ").length / 5 / 60) }} minuto(s)
      </span>

      <span v-if="metadata.published_at" class="overline">
        Publicado em:
        {{
          $moment(metadata.published_at, "DD/MM/YYYY")
            | moment("DD/MM/YYYY hh:mm")
        }}
      </span>

      <span v-if="metadata.author" class="overline">
        Autor: {{ metadata.author }}
      </span>
    </v-card-text>

    <v-divider v-if="metadata" />

    <v-card-text v-if="content">
      <div
        class="content mce-content-body black--text body-1"
        v-html="content"
      />
    </v-card-text>

    <v-divider v-if="content && tags" />

    <v-card-text v-if="tags">
      <router-link
        v-for="(tag, index) in tags"
        :key="index"
        :to="tagRoute(tag)"
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
          {{ tag }}
        </v-chip>
      </router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import userMixins from "../../mixins/user";

export default {
  props: {
    id: Number,
    title: String,
    caption: String,
    image: {
      url: String,
      ratio: String,
    },
    content: String,
    metadata: {
      read_time: Boolean,
      published_at: String,
      author: String,
    },
    tags: Array,
    noActions: { type: Boolean, default: false },
  },
  mixins: [userMixins],
  data() {
    return {
      optionsMenu: false,
      route:
        this.$router.currentRoute.name != "news_show" && this.id
          ? { name: "news_show", params: { id: this.id } }
          : null,
    };
  },
  methods: {
    tagRoute(tag) {
      return { name: "news", query: { search: tag } };
    },
    edit() {
      this.$router.push();
    },
    destroy() {
      if (confirm("Tem certeza que deseja remover essa notícia?")) {
        this.$store
          .dispatch("news/removeNews", this.id)
          .then(() => this.$emit("onDestroy"));
      }
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
