<template>
  <div id="news-header" class="mb-3">
    <v-row>
      <v-slide-x-transition>
        <v-col v-if="back_route" cols="auto" class="d-flex align-center">
          <router-link :to="back_route" v-slot="{ href }">
            <v-btn icon link color="gray" :to="href">
              <v-icon color="white">mdi-chevron-left</v-icon>
            </v-btn>
          </router-link>
        </v-col>
      </v-slide-x-transition>

      <v-col>
        <h1>Notícias</h1>
      </v-col>

      <v-col cols="12" md="3" sm="5" class="d-flex align-center">
        <v-text-field
          name="search"
          v-model="search"
          placeholder="Pesquisar por..."
          append-icon="mdi-magnify"
          background-color="white"
          width="100"
          outlined
          clearable
          dense
          :hide-details="true"
          @keyup.enter="searchNews"
          @click:append="searchNews"
          :disabled="searching"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    back_route: Object,
    value: {
      type: String,
    },
    searching: Boolean,
  },
  data() {
    return {
      search: this.value,
    };
  },
  watch: {
    value(val) {
      this.search = val;
    },
    back_route(val, oldVal) {
      console.log(val, oldVal);
    },
  },
  methods: {
    searchNews() {
      if (this.$router.currentRoute.name == "news") {
        this.$emit("input", this.search);
      } else {
        this.$router.push({ name: "news", query: { search: this.search } });
      }
    },
  },
};
</script>

<style></style>
