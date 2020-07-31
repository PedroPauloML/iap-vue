<template>
  <v-card class="schedule" light>
    <v-card-text>
      <div class="d-flex justify-space-between">
        <p class="text-uppercase black--text text-caption font-weight-bold">
          {{ date_start | moment("DD [de] MMMM [de] YYYY") }}
        </p>

        <p
          v-if="!futureEvent"
          class="red--text text-uppercase caption font-weight-bold"
        >
          Evento já encerrado
        </p>
      </div>

      <router-link v-if="route" :to="route">
        <v-img :src="image" aspect-ratio="2" class="rounded mb-3">
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
      </router-link>
      <v-img v-else :src="image" aspect-ratio="2" class="rounded mb-3">
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

      <p class="title primary--text">
        <router-link v-if="route" :to="route" class="text-decoration-none">
          {{ title }}
        </router-link>
        <span v-else>{{ title }}</span>
      </p>

      <p class="mb-0">
        <v-icon small>mdi-map-marker-outline</v-icon>
        {{ location }}
      </p>
      <p>
        <v-icon small>mdi-clock-outline</v-icon>
        {{ date_start | moment("DD/MM/YYYY HH:mm") }} -
        {{ date_end | moment("DD/MM/YYYY HH:mm") }}
      </p>

      <p v-if="!mini" class="text-justify black--text mb-0">
        {{ description }}
      </p>
    </v-card-text>

    <div
      v-if="futureEvent && !mini"
      class="
        px-3
        pt-3
        d-flex
        flex-column
        align-stretch,
      "
    >
      <v-divider class="mb-3"></v-divider>

      <div v-if="updating" class="mb-3 body-2">
        <p class="text-center grey--text">
          Estamos atualizando sua decisão...
        </p>
        <v-progress-linear indeterminate></v-progress-linear>
      </div>

      <p class="body-2">Podemos contar com sua presença?</p>

      <div
        :class="{
          'd-flex': true,
          'flex-column': !solo || $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-btn
          v-if="presence == null || presence == true"
          color="primary"
          :class="{
            'mb-3': true,
            flex: true,
            'mr-3': !!solo && $vuetify.breakpoint.mdAndUp,
          }"
          :outlined="presence == true"
          :disabled="updating"
          @click="changePresence(true)"
        >
          <v-icon small class="mr-2">mdi-thumb-up</v-icon>
          Presença confirmada!
        </v-btn>

        <v-btn
          v-if="presence == null || presence == false"
          color="grey"
          :dark="updating == false"
          class="mb-3 flex"
          :outlined="presence == false"
          :disabled="updating"
          @click="changePresence(false)"
        >
          <v-icon small class="mr-2">mdi-help</v-icon>
          Não tenho certeza se irei
        </v-btn>
      </div>

      <p v-if="presence != null" class="body-2">
        Deseja ficar informado sobre esse evento?
      </p>

      <div
        :class="{
          'd-flex': true,
          'flex-column': !solo || $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-btn
          v-if="presence != null && (notify == null || notify == true)"
          color="primary"
          :class="{
            'mb-3': true,
            flex: true,
            'mr-3': !!solo && $vuetify.breakpoint.mdAndUp,
          }"
          :outlined="notify == true"
          :disabled="updating"
          @click="changeNotify(true)"
        >
          <v-icon small class="mr-2">mdi-bell-ring-outline</v-icon>
          Mantenha-me informado
        </v-btn>

        <v-btn
          v-if="presence != null && (notify == null || notify == false)"
          color="grey"
          :dark="updating == false"
          class="mb-3 flex"
          :outlined="notify == false"
          :disabled="updating"
          @click="changeNotify(false)"
        >
          <v-icon small class="mr-2">mdi-bell-off-outline</v-icon>
          Não preciso ser informado
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date_start: {
      type: String,
      required: true,
    },
    date_end: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    route: Object,
    solo: { type: Boolean, default: false },
    mini: { type: Boolean, default: false },
  },
  data() {
    return {
      presence: null,
      notify: null,
      updating: false,
    };
  },
  computed: {
    futureEvent() {
      return this.$moment(this.date_start) > this.$moment();
    },
  },
  methods: {
    changePresence(presence) {
      if (this.presence == presence) {
        this.presence = null;

        if (this.notify != null) {
          this.notify = null;
          this.updating = true;

          setTimeout(() => {
            this.updating = false;
          }, 1000);
        }
      } else {
        this.presence = presence;
      }
    },
    changeNotify(notify) {
      if (this.notify == notify) {
        this.notify = null;
      } else {
        this.notify = notify;
      }

      this.updating = true;

      setTimeout(() => {
        this.updating = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
