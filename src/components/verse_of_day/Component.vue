<template>
  <v-card class="verse-of-day" light>
    <v-card-text class="d-flex flex-column flex-sm-row">
      <div
        :class="{
          header: true,
          'd-flex': true,
          'align-center': true,
          'mb-3': $vuetify.breakpoint.xs,
        }"
      >
        <img
          src="/bible.svg"
          alt="Bíblia"
          :width="$vuetify.breakpoint.xs ? '30' : '55'"
          class="mr-3"
        />
        <p
          v-if="$vuetify.breakpoint.xs"
          class="title font-weight-bold primary--text mb-0"
        >
          Versículo do dia
        </p>
      </div>

      <div class="content mr-3">
        <p
          v-if="$vuetify.breakpoint.smAndUp"
          class="title font-weight-bold mb-2 primary--text"
        >
          Versículo do dia
        </p>
        <p>
          {{ verse }}
        </p>
        <p class="mb-0 overline">
          {{ reference }}
        </p>
      </div>

      <div class="d-flex flex-sm-column align-center justify-center">
        <img
          src="/calendar.svg"
          alt="Bíblia"
          :width="$vuetify.breakpoint.xs ? '25' : '55'"
          :class="{
            'mr-1': $vuetify.breakpoint.xs,
          }"
        />
        <span
          :class="{
            'text-uppercase': true,
            'font-weight-bold': true,
            'body-2': true,
            'mb-3': $vuetify.breakpoint.smAndUp,
          }"
          >{{ date | moment("DD/MMM") }}</span
        >
        <v-divider v-if="$vuetify.breakpoint.xs" class="mx-3"></v-divider>
        <router-link v-if="route" :to="route" v-slot="{ href }">
          <v-btn small link color="primary" :to="href" class="py-4 pl-2 pr-0">
            Ver mais <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </router-link>
      </div>
    </v-card-text>

    <v-divider />

    <v-card-text
      ref="commentariesContainer"
      class="d-flex align-center justify-space-between"
    >
      <span v-if="fetchingCommentaries">
        <v-progress-circular
          indeterminate
          color="primary"
          class="mr-3"
          size="18"
          width="2"
        ></v-progress-circular>
        Buscando os comentários desse versículo
      </span>
      <span v-else>
        <v-icon class="mr-3">mdi-comment-outline</v-icon>
        <span v-if="isCommentariesPresent">
          {{ commentaries.length }}
          {{
            $vuetify.breakpoint.smAndUp
              ? commentaries.length > 1
                ? "comentários"
                : "comentário"
              : ""
          }}
        </span>
        <span v-else-if="commentaries_count">
          {{ commentaries_count }}
          {{ commentaries_count > 1 ? "comentários" : "comentário" }}
        </span>
        <span v-else>
          Nenhum comentário adicionado a esse versículo
        </span>
      </span>

      <v-btn
        v-if="userSigned && !noActions"
        color="primary"
        text
        tile
        small
        @click="openCommentaryForm"
      >
        Adicionar novo comentário
      </v-btn>
    </v-card-text>

    <v-scroll-y-transition v-if="userSigned && !noActions" group>
      <v-divider v-show="showCommentaryForm" key="divider" />
      <NewCommetary
        key="form"
        v-show="showCommentaryForm"
        class="ma-4"
        :commentary="''"
        @cancelCommentary="closeCommentaryForm"
        @sendCommentary="createNewCommentary"
        :sending="sendingCommentary"
      />
    </v-scroll-y-transition>

    <v-divider v-if="isCommentariesPresent" />

    <span v-if="fetchingCommentaries" class="d-block pa-5">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </span>

    <v-card-text
      v-if="!noCommentaries && !fetchingCommentaries && isCommentariesPresent"
      class="commentaries"
    >
      <Commentary
        v-for="(commentary, index) in commentaries"
        :key="index"
        :commentary="commentary"
        @update="updateCommentary"
        :updating="commentaryIdToUpdate == commentary.id && updatingCommentary"
        @delete="deleteCommentary"
        :deleting="commentaryIdToDelete == commentary.id && deletingCommentary"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Commentary from "./commentaries/Component";
import NewCommetary from "./commentaries/Form";
import userMixins from "../../mixins/user";

export default {
  props: {
    verse: String,
    reference: String,
    date: String,
    route: Object,
    commentaries_count: Number,
    noActions: { type: Boolean, default: false },
    noCommentaries: { type: Boolean, default: false },
  },
  mixins: [userMixins],
  components: { Commentary, NewCommetary },
  data() {
    return {
      showCommentaryForm: false,
      sendingCommentary: false,
      fetchingCommentaries: false,
      commentaryIdToDelete: null,
      deletingCommentary: false,
      commentaryIdToUpdate: null,
      updatingCommentary: false,
      commentaries: [
        {
          id: 1,
          text: `
            <p>Bela reflexão e ensiamento para as nossas vidas.</p>
            <p>Em momentos de ângustia e necessidade, busque ao Senhor.</p>
            `,
          author: {
            name: "Pedro Paulo",
            avatar: "https://picsum.photos/id/1012/100/100",
          },
        },
        {
          id: 2,
          text: `
            <p>O salmista nos deixou o ensinamento que o nosso porto seguro e salvador
            é aquele que criou os céus e a terra.</p>
            <p>Louvado seja Deus.</p>
            `,
          author: {
            name: "Paulo Pedro",
            avatar: "https://picsum.photos/id/1013/100/100",
          },
        },
      ],
    };
  },
  created() {
    setTimeout(() => (this.fetchingCommentaries = false), 2000);
  },
  computed: {
    isCommentariesPresent() {
      return (
        this.commentaries &&
        Array.isArray(this.commentaries) &&
        this.commentaries.length > 0
      );
    },
  },
  methods: {
    openCommentaryForm() {
      this.showCommentaryForm = true;
    },
    closeCommentaryForm() {
      this.showCommentaryForm = false;
    },
    createNewCommentary(commentary) {
      this.sendingCommentary = true;
      setTimeout(() => {
        this.commentaries = [
          {
            id: this.commentaries.length + 1,
            text: commentary,
            author: {
              name: this.$store.state.user.user.profile.name,
              avatar: "https://picsum.photos/id/1012/100/100",
            },
          },
          ...this.commentaries,
        ];
        this.sendingCommentary = false;
        this.closeCommentaryForm();

        window.scrollTo({
          top: this.$refs.commentariesContainer.offsetTop,
          behavior: "smooth",
        });
      }, 1000);
    },
    updateCommentary(data) {
      this.updatingCommentary = true;
      this.commentaryIdToUpdate = data.id;
      setTimeout(() => {
        this.updatingCommentary = false;
        this.commentaryIdToUpdate = null;
        this.commentaries.forEach((el) => {
          if (el.id == data.id) {
            el.text = data.text;
          }
        });
      }, 1000);
    },
    deleteCommentary(id) {
      if (confirm("Tem certeza que deseja excluir esse comentário?")) {
        this.deletingCommentary = true;
        this.commentaryIdToDelete = id;
        setTimeout(() => {
          this.deletingCommentary = false;
          this.commentaryIdToDelete = null;
          this.commentaries = this.commentaries.filter((el) => el.id != id);
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.commentaries > .commentary:not(:last-child) {
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
</style>
