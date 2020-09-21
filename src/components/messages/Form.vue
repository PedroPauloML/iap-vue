<template>
  <v-card class="mb-8">
    <v-card-title>
      Criando nova mensagem
    </v-card-title>
    <v-card-subtitle>
      Insira as informações abaixo para criar uma nova mensagem. É possível
      pré-visualizar como a mensagem ficará antes de criá-la clicando em
      "Pré-visualização".
    </v-card-subtitle>

    <v-card-text>
      <div ref="previewContainer" v-show="preview">
        <p class="body-1 primary--text font-weight-bold">Pré-visualização</p>
        <Message
          :title="title"
          :caption="caption"
          :content="content"
          :author="author"
          :published_at="published_at"
          :tags="tags"
          :metadata="{ read_time: true }"
          @filterMessages="(search) => (value.search = search)"
          class="mb-10"
          no-actions
        />
      </div>
      <v-form v-show="!preview" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          ref="title"
          v-model="title"
          :rules="requiredRules.title"
          label="Título"
          required
          @keyup.enter="createNews"
        ></v-text-field>

        <v-text-field
          ref="caption"
          v-model="caption"
          :rules="requiredRules.caption"
          label="Legenda"
          required
          @keyup.enter="createNews"
        ></v-text-field>

        <p
          :class="{
            'body-2': true,
            'mt-2': true,
            'mb-1': true,
            'red--text': contentPrintError,
          }"
        >
          Conteúdo
        </p>
        <p
          ref="contentLabelError"
          v-show="contentPrintError"
          class="red--text mb-1"
        >
          O conteúdo da notícia é obrigatório(a)
        </p>
        <div class="mb-5">
          <Editor ref="content" v-model="content" />
        </div>

        <v-combobox
          ref="tags"
          v-model="tags"
          :items="tagsSuggestions"
          :search-input.sync="tagsSearch"
          hide-selected
          hint="Máximo de 5 tags"
          label="Tags (opcional)"
          multiple
          persistent-hint
          small-chips
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  Nenhum resultado encontrado para "<strong>{{
                    tagsSearch
                  }}</strong
                  >". Pressione <kbd>enter</kbd> para criar uma nova tag.
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-combobox>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="$vuetify.breakpoint.smAndUp"
        color="primary"
        outlined
        @click="preview = !preview"
        :disabled="loading"
      >
        {{ preview ? "Formulário" : "Pré-visualizar" }}
      </v-btn>
      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            color="primary"
            outlined
            @click="preview = !preview"
            :disabled="loading"
          >
            <v-icon>
              {{ preview ? "mdi-file" : "mdi-file-find" }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ preview ? "Formulário" : "Pré-visualizar" }}</span>
      </v-tooltip>

      <v-spacer></v-spacer>
      <v-btn color="grey" dark @click="closeForm" :disabled="loading">
        Cancelar
      </v-btn>

      <v-btn
        v-if="id"
        color="primary"
        @click="updateMessage"
        :loading="loading"
      >
        Atualizar
      </v-btn>
      <v-btn v-else color="primary" @click="createMessage" :loading="loading">
        Criar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Message from "./Component";
import Editor from "../Editor";

export default {
  components: { Editor, Message },
  props: { data: Object, default: {} },
  data() {
    return {
      // General
      preview: false,

      // Fields
      id: this.data ? this.data.id : null,
      title: this.data ? this.data.title : "",
      caption: this.data ? this.data.caption : "",
      content: this.data ? this.data.content : "",
      contentPrintError: false,
      author: this.$store.state.user.user.profile.name,
      published_at: this.data
        ? this.data.published_at
        : this.$moment().format(),
      tags: this.data ? Array.from(new Set(this.data.tags)) || [] : null,
      tagsSuggestions: Array.from(
        new Set(
          this.$store.state.messages.messages
            .map((el) => el.tags)
            .filter((el) => el != null)
            .flat()
        )
      ),
      tagsSearch: null,

      // Rules
      requiredRules: [
        { field: "title", name: "Título" },
        { field: "caption", name: "Legenda" },
        { field: "content", name: "Conteúdo" },
      ].reduce((acc, val) => {
        acc[val.field] = [(v) => !!v || `${val.name} é obrigatório(a)`];
        return acc;
      }, {}),

      // Form variables
      valid: true,
      loading: false,
    };
  },
  watch: {
    preview(val) {
      setTimeout(() => {
        if (val) {
          let y =
            this.$refs.previewContainer.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        } else {
          let y =
            this.$refs.form.$el.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 200);
    },
    content: function(val) {
      this.contentPrintError = !val;
    },
    tags(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.tags.pop());
      }
    },
  },
  methods: {
    createMessage() {
      if (this.checkFormValidity()) {
        let data = {
          title: this.title,
          caption: this.caption,
          content: this.content,
          tags: this.tags,
          published_at: this.$moment().format(),
          author: this.author,
        };

        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.$emit("createMessage", data);
        }, 1000);
      }
    },
    updateMessage() {
      if (this.checkFormValidity()) {
        let data = {
          title: this.title,
          caption: this.caption,
          content: this.content,
          tags: this.tags,
          published_at: this.published_at,
          author: this.author,
        };

        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.$emit("updateMessage", { id: this.id, data });
        }, 1000);
      }
    },
    checkFormValidity() {
      if (this.$refs.form.validate() && this.content) {
        return true;
      } else {
        if (!this.content) this.contentPrintError = true;

        if (!this.title) {
          let y =
            this.$refs.title.$el.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
          return;
        }
        if (!this.caption) {
          let y =
            this.$refs.caption.$el.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
          return;
        }
        if (!this.content) {
          let y =
            this.$refs.contentLabelError.getBoundingClientRect().top +
            window.pageYOffset -
            60;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
          return;
        }
        return false;
      }
    },
    closeForm() {
      this.$emit("closeForm");
    },
  },
};
</script>

<style></style>
