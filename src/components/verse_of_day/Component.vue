<template>
  <v-card class="verse-of-day">
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

    <v-card-text v-if="commentary" class="d-flex">
      <v-img
        src="https://picsum.photos/id/1012/100/100"
        aspect-ratio="1"
        width="60px"
        height="60px"
        max-width="60px"
        max-height="60px"
        class="rounded-circle mr-4"
      ></v-img>

      <div class="flex">
        <span class="overline">
          {{ commentary.author }}
        </span>
        <div class="black--text body-1" v-html="commentary.text" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    verse: String,
    reference: String,
    date: String,
    route: Object,
    commentary: {
      text: { type: String, required: true },
      author: { type: String, required: true },
    },
  },
};
</script>

<style lang="scss" scoped></style>
