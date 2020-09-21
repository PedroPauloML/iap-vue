<template>
  <v-card
    :class="{
      message: true,
      rounded: true,
      'full-content': !!full_content || !showReadMore,
    }"
  >
    <v-card-text class="header">
      <router-link
        v-if="id && $router.currentRoute.name != 'messages_show'"
        :to="{ name: 'messages_show', params: { id: id } }"
        v-slot="{ href }"
      >
        <h1 class="primary--text my-3">
          <a class="text-decoration-none" :href="href">
            {{ title }}
          </a>
        </h1>
      </router-link>
      <h1 v-else class="primary--text my-3">{{ title }}</h1>

      <div class="d-flex justify-center">
        <div class="flex metadata">
          <span v-if="metadata.read_time" class="overline">
            Tempo de leitura:
            {{ Math.ceil(content.split(" ").length / 5 / 60) }} minuto(s)
          </span>

          <span v-if="published_at" class="overline">
            Publicado em:
            {{ published_at | moment("DD/MM/YYYY hh:mm") }}
          </span>

          <span v-if="author" class="overline"> Autor: {{ author }} </span>
        </div>

        <div v-if="!noActions" class="actions">
          <v-tooltip bottom>
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

          <v-menu v-if="userSigned" v-model="optionsMenu" bottom left offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense flat>
              <v-list-item
                :to="{
                  name: 'messages_edit',
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
        {{ tag }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import userMixins from "../../mixins/user";

export default {
  props: {
    id: Number,
    title: { type: String, required: true },
    content: { type: String, required: true },
    full_content: Boolean,
    published_at: String,
    author: String,
    metadata: {
      read_time: Boolean,
    },
    tags: Array,
    noActions: Boolean,
  },
  mixins: [userMixins],
  data() {
    return {
      saved: false,
      showReadMore: !this.full_content,
      optionsMenu: false,
    };
  },
  methods: {
    filterMessages(tag) {
      if (this.$router.currentRoute.name == "messages") {
        this.$emit("filterMessages", tag);
      } else {
        this.$router.push({ name: "messages", query: { search: tag } });
      }
    },
    destroy() {
      if (confirm("Tem certeza que deseja remover essa mensagem?")) {
        this.$store
          .dispatch("messages/removeMessages", this.id)
          .then(() => this.$emit("onDestroy"));
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
      min-height: 100px;
      max-height: 50vh;
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
