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

      <v-col cols="12" md="6" sm="7" class="d-flex align-center">
        <div class="d-flex flex flex-column flex-sm-row">
          <v-menu
            v-model="menu"
            transition="scale-transition"
            offset-y
            min-width="290px"
            :close-on-content-click="false"
            :return-value="filters.date"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                placeholder="Pesquisar por data..."
                append-icon="mdi-calendar"
                background-color="white"
                :class="{
                  'mr-3': $vuetify.breakpoint.mdAndUp,
                  'mb-3': $vuetify.breakpoint.smAndDown,
                }"
                readonly
                outlined
                clearable
                dense
                hide-details
                v-bind="attrs"
                v-on="on"
                @click:clear="
                  filters.date = null;
                  filterNews();
                "
                :disabled="searching"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="filters.date"
              locale="pt-br"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="gray" @click="menu = false">Cancelar</v-btn>
              <v-btn text color="primary" @click="changeDate">Selecionar</v-btn>
            </v-date-picker>
          </v-menu>

          <v-text-field
            name="search"
            v-model="filters.search"
            placeholder="Pesquisar por..."
            append-icon="mdi-magnify"
            background-color="white"
            width="100"
            outlined
            clearable
            dense
            :hide-details="true"
            @keyup.enter="filterNews"
            @click:append="filterNews"
            :disabled="searching"
          ></v-text-field>
        </div>

        <v-tooltip v-if="userSigned" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              fab
              small
              @click="
                $router.push({
                  name:
                    $router.currentRoute.name == 'news_new'
                      ? 'news'
                      : 'news_new',
                })
              "
              class="ml-5"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon
                :class="{ rotateZ: $router.currentRoute.name == 'news_new' }"
              >
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <span v-if="$router.currentRoute.name == 'news_new'"
            >Cancelar notícia</span
          >
          <span v-else>Criar notícia</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userMixins from "../../mixins/user";

export default {
  props: {
    back_route: Object,
    value: {
      search: String,
      date: String,
    },
    searching: Boolean,
    showForm: Boolean,
  },
  mixins: [userMixins],
  data() {
    return {
      menu: false,
      filters: { ...this.value },
    };
  },
  watch: {
    value: {
      handler: function(val) {
        this.filters = { ...val };
      },
      deep: true,
    },
    menu(val) {
      if (!val) this.filters.date = this.value.date;
    },
  },
  computed: {
    dateFormatted: {
      get() {
        return this.parseDate(this.filters.date) || "";
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    filterNews() {
      if (this.$router.currentRoute.name == "news") {
        this.$emit("input", this.filters);
      } else {
        this.$router.push({
          name: "news",
          query: {
            search: this.filters.search,
            date: this.filters.date,
          },
        });
      }
    },
    parseDate(date) {
      if (!date) return null;
      return this.$moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    },
    changeDate() {
      this.$emit("input", this.filters);
      this.filterNews();
      this.menu = false;
    },
  },
};
</script>

<style scoped>
.rotateZ {
  transition: all 1s;
  transform: rotateZ(45deg);
}
</style>
