<template>
  <v-card
    :class="{
      message: true,
      rounded: true,
      'full-content': !!full_content || !showReadMore,
    }"
  >
    <v-card-text class="header">
      <router-link v-if="route" :to="route" v-slot="{ href }">
        <a
          class="primary--text my-2 pa-0 text-h4 text-decoration-none font-weight-medium"
          :href="href"
        >
          {{ title }}
        </a>
      </router-link>
      <h1 v-else class="primary--text my-3">{{ title }}</h1>

      <div class="d-flex justify-center">
        <div class="flex metadata">
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
        </div>

        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              color="accent"
              @click="saved = !saved"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{
                saved ? "mdi-bookmark" : "mdi-bookmark-outline"
              }}</v-icon>
            </v-btn>
          </template>
          <span>{{ saved ? "Remover marcação" : "Marcar publicação" }}</span>
        </v-tooltip>
      </div>
    </v-card-text>

    <v-divider />

    <div class="content-wrapper">
      <v-card-text v-if="content">
        <div
          class="content black--text body-1 d-flex align-center flex-column"
          v-html="content"
        />
      </v-card-text>

      <div v-if="showReadMore" class="show-more d-flex align-end">
        <v-col class="background pa-4 white--text">
          <div class="d-flex justify-center">
            <v-btn
              text
              link
              class="primary--text font-weight-bold title"
              @click="showReadMore = !showReadMore"
            >
              Continuar lendo
            </v-btn>
          </div>
        </v-col>
      </div>
    </div>

    <v-divider v-if="content && tags" />

    <v-card-text v-if="tags">
      <v-chip
        v-for="(tag, index) in tags"
        :key="index"
        link
        class="ma-2 font-weight-medium"
        color="accent"
        label
        text-color="white"
        @click="filterMessages(tag)"
      >
        <v-icon left>mdi-label</v-icon>
        {{ tag.text }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    route: Object,
    content: { type: String, required: true },
    full_content: Boolean,
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
  data() {
    return {
      saved: false,
      showReadMore: !this.full_content,
    };
  },
  methods: {
    filterMessages(tag) {
      if (this.$router.currentRoute.name == "messages") {
        this.$emit("filterMessages", tag.text);
      } else {
        this.$router.push(tag.route);
      }
    },
  },
};
</script>

<style lang="scss">
.message {
  .show-more {
    background: rgb(255, 255, 255);
    background: -moz-linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background: -webkit-linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 0) 100%
    );
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
  .content {
    p {
      width: 100%;
    }
    img {
      border-radius: 5px;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      margin: 15px 0;
      max-width: 100%;
      max-height: 50vh;
    }
  }

  &:not(.full-content) {
    .content {
      height: 50vh;
      overflow: hidden;
    }

    .content-wrapper {
      position: relative;
      .show-more {
        position: absolute;
        width: 100%;
        bottom: 0;
      }
    }
  }
}
</style>
