<template>
  <div ref="container" class="new-commentary">
    <p class="primary--text font-weight-bold mb-0">
      Novo comentário
    </p>
    <p v-if="showError" class="red--text">
      Para inserir um novo comentário é preciso inserir o conteúdo do comentário
    </p>
    <p v-else>
      Insira a baixo o comentário que você deseja fazer a esse versículo.
    </p>

    <Editor ref="content" v-model="commentaryContent" />

    <div class="text-right mt-4">
      <v-btn
        color="grey"
        :dark="!sending"
        class="mr-2"
        @click="cancelCommentary"
        :disabled="sending"
      >
        Cancelar
      </v-btn>
      <v-btn color="primary" @click="sendCommentary" :loading="sending">
        Publicar
      </v-btn>
    </div>
  </div>
</template>

<script>
import Editor from "../../Editor";

export default {
  props: {
    commentary: {
      type: String,
      required: true,
    },
    sending: Boolean,
  },
  components: { Editor },
  data() {
    return {
      commentaryContent: this.commentary,
      showError: false,
    };
  },
  watch: {
    commentary(val) {
      this.commentaryContent = val;

      if (val && this.showError) {
        this.showError = false;
      }
    },
    commentaryContent(val) {
      if (val && this.showError) {
        this.showError = false;
      }
    },
  },
  methods: {
    cancelCommentary() {
      this.$emit("cancelCommentary");
    },
    sendCommentary() {
      if (this.commentaryContent) {
        this.$emit("sendCommentary", this.commentaryContent);
      } else {
        this.showError = true;

        window.scrollTo({
          top: this.$refs.container.offsetTop,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style></style>
