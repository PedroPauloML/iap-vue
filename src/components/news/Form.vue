<template>
  <v-card class="mb-8">
    <v-card-title>
      Criando nova notícia
    </v-card-title>
    <v-card-subtitle>
      Insira as informações abaixo para criar uma nova notícia. É possível
      pré-visualizar como a notícia ficará antes de criá-la clicando em
      "Pré-visualização".
    </v-card-subtitle>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <Cropper ref="image" v-model="image" :currentImage="currentImage" />
        <p v-if="imagePrintError" class="red--text">
          A imagem da notícia é obrigatório(a)
        </p>
        <!-- <v-file-input
          v-model="image"
          label="Imagem de capa"
          show-size
          prepend-icon="mdi-camera"
          required
          :rules="requiredRules['image']"
        ></v-file-input> -->

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

        <p class="body-1 mt-2">Conteúdo</p>
        <p ref="contentLabelError" v-show="contentPrintError" class="red--text">
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
          label="Tags"
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
      <v-spacer></v-spacer>
      <v-btn color="grey" dark @click="closeForm" :disabled="loading">
        Cancelar
      </v-btn>

      <v-btn v-if="id" color="primary" @click="updateNews" :loading="loading">
        Atualizar
      </v-btn>
      <v-btn v-else color="primary" @click="createNews" :loading="loading">
        Criar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Editor from "../Editor";
import Cropper from "../Cropper";

export default {
  components: { Editor, Cropper },
  props: { data: Object, default: {} },
  data() {
    return {
      // Fields
      id: this.data ? this.data.id : null,
      title: this.data ? this.data.title : null,
      caption: this.data ? this.data.caption : null,
      image: "",
      currentImage: this.data ? this.data.image : null,
      imagePrintError: false,
      content: this.data ? this.data.content : "",
      contentPrintError: false,
      tags: this.data ? this.data.tags || [] : null,
      tagsSuggestions: Array.from(
        new Set(
          this.$store.state.news.news
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
        { field: "image", name: "Imagem" },
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
    content: function(val) {
      this.contentPrintError = !val;
    },
    image: function(val) {
      this.imagePrintError = !val;
    },
    tags(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.tags.pop());
      }
    },
  },
  methods: {
    createNews() {
      if (!this.content) this.contentPrintError = true;
      if (!this.image) this.imagePrintError = true;

      if (this.$refs.form.validate() && this.content && this.image) {
        let data = {
          title: this.title,
          caption: this.caption,
          image: this.image,
          content: this.content,
          tags: this.tags,
        };

        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.$emit("createNews", data);
        }, 1000);
      } else {
        if (!this.image) {
          window.scrollTo({
            top: this.$refs.image.$el.offsetTop,
            behavior: "smooth",
          });
          return;
        }
        if (!this.title) {
          window.scrollTo({
            top: this.$refs.title.$el.offsetTop,
            behavior: "smooth",
          });
          return;
        }
        if (!this.caption) {
          window.scrollTo({
            top: this.$refs.caption.$el.offsetTop,
            behavior: "smooth",
          });
          return;
        }
        if (!this.content) {
          window.scrollTo({
            top: this.$refs.contentLabelError.offsetTop,
            behavior: "smooth",
          });
          return;
        }
      }
    },
    updateNews() {
      if (!this.content) this.contentPrintError = true;

      if (this.$refs.form.validate() && this.content) {
        let data = {
          title: this.title,
          caption: this.caption,
          image: this.image || this.currentImage,
          content: this.content,
          tags: this.tags,
          metadata: {
            read_time: true,
            published_at: this.$moment.format("DD/MM/YYYY"),
          },
        };

        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.$emit("updateNews", { id: this.id, data });
        }, 1000);
      }
    },
    closeForm() {
      this.$emit("closeForm");
    },
  },
};
</script>

<style></style>
