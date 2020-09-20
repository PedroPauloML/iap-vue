<template>
  <div class="d-flex commentary">
    <v-scroll-x-reverse-transition>
      <v-img
        v-show="!showEditForm || (!showEditForm && $vuetify.breakpoint.smAndUp)"
        :src="commentary.author.avatar"
        aspect-ratio="1"
        width="60px"
        height="60px"
        max-width="60px"
        max-height="60px"
        class="rounded-circle mr-4"
      ></v-img>
    </v-scroll-x-reverse-transition>

    <div class="flex">
      <div class="d-flex align-center justify-space-between">
        <span class="overline">
          {{ commentary.author.name }}
        </span>

        <v-scroll-x-transition v-if="userSigned" mode="out-in">
          <div v-show="!showEditForm" class="actions">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  :disabled="deleting"
                  @click="showUpdatingForm"
                >
                  <v-icon small>mdi-pencil-outline</v-icon>
                </v-btn>
              </template>
              <span>Editar</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="red"
                  icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  @click="deleteCommentary"
                  :loading="deleting"
                >
                  <v-icon small>mdi-delete-outline</v-icon>
                </v-btn>
              </template>
              <span>Excluir</span>
            </v-tooltip>
          </div>
        </v-scroll-x-transition>
      </div>

      <v-scroll-x-transition v-if="userSigned" mode="out-in">
        <div key="commentary-form" v-if="showEditForm">
          <Editor ref="content" v-model="commentaryEdited" />

          <div class="text-right mt-4">
            <v-btn
              color="grey"
              :dark="!updating"
              class="mr-2"
              @click="closeUpdatingForm"
              :disabled="updating"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              @click="updateCommentary"
              :loading="updating"
            >
              Atualizar
            </v-btn>
          </div>
        </div>

        <div
          key="commentary-text"
          v-else
          class="black--text body-1 mce-content-body"
          v-html="commentary.text"
        />
      </v-scroll-x-transition>
    </div>
  </div>
</template>

<script>
import Editor from "../../Editor";

export default {
  props: {
    commentary: {
      id: { type: Number, required: true },
      text: { type: String, required: true },
      author: {
        name: { type: String, required: true },
        avatar: { type: String, required: true },
      },
    },
    deleting: Boolean,
    updating: Boolean,
  },
  components: { Editor },
  data() {
    return {
      showEditForm: false,
      commentaryEdited: this.commentary.text,
    };
  },
  watch: {
    commentary: {
      handler: function(val) {
        this.showEditForm = false;
        this.commentaryEdited = val.text;
      },
      deep: true,
    },
  },
  computed: {
    userSigned() {
      return (
        !!this.$store.state.user.user &&
        Object.keys(this.$store.state.user.user).length > 0
      );
    },
  },
  methods: {
    showUpdatingForm() {
      this.showEditForm = true;
    },
    closeUpdatingForm() {
      this.showEditForm = false;
    },
    updateCommentary() {
      this.$emit("update", {
        id: this.commentary.id,
        text: this.commentaryEdited,
      });
    },
    deleteCommentary() {
      this.$emit("delete", this.commentary.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
