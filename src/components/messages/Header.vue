<template>
  <div id="messages-header" class="mb-3">
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
        <h1>Mensagens</h1>
      </v-col>

      <v-col cols="12" md="5" sm="7" class="d-flex align-center">
        <div class="d-flex flex flex-column flex-sm-row">
          <v-menu
            v-model="menu"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                placeholder="Pesquisar por data..."
                append-icon="mdi-calendar"
                background-color="white"
                class="mr-3"
                readonly
                outlined
                clearable
                dense
                hide-details
                v-bind="attrs"
                v-on="on"
                @click:clear="value.date = null"
                :disabled="searching"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="value.date"
              locale="pt-br"
              no-title
              scrollable
              @change="
                (date) => {
                  filters.date = date;
                  filterMessages();
                }
              "
            >
            </v-date-picker>
          </v-menu>

          <v-text-field
            name="search"
            v-model="filters.search"
            placeholder="Pesquisar por..."
            append-icon="mdi-magnify"
            background-color="white"
            max-width="100"
            outlined
            clearable
            dense
            :hide-details="true"
            @keyup.enter="filterMessages"
            @click:append="filterMessages"
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
  },
  computed: {
    dateFormatted: {
      get() {
        return this.parseDate(this.value.date) || "";
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    filterMessages() {
      if (this.$router.currentRoute.name == "messages") {
        this.$emit("input", this.filters);
      } else {
        this.$router.push({
          name: "messages",
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
  },
};
</script>

<style></style>
