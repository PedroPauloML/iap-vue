<template>
  <div id="news">
    <div v-if="search" class="d-flex mb-5">
      <span v-if="searching" class="mr-1 text-nowrap">
        Aguarde um momento, estamos pesquisando por
      </span>
      <span v-else class="mr-1 text-nowrap">
        Encontramos 10 resultados para a busca
      </span>
      <span class="text-truncate-1-line mr-1 font-weight-medium">
        {{ search }}
      </span>
    </div>

    <v-row v-if="!searching">
      <v-col
        v-for="(news, group_index) in grouped_news"
        :key="group_index"
        cols="12"
        sm="6"
      >
        <div v-if="Array.isArray(news)">
          <NewsPoster
            v-for="(single_new, i) in news"
            :key="i"
            :title="single_new.title"
            :caption="single_new.caption"
            :image="{
              url: single_new.image_url,
              ratio: $vuetify.breakpoint.xs ? '1.2' : '2.1',
            }"
            :route="single_new.route"
            :class="{ 'mt-7': i % 2 != 0 }"
          />
        </div>
        <NewsPoster
          v-else
          :title="news.title"
          :caption="news.caption"
          :image="{
            url: news.image_url,
            ratio: $vuetify.breakpoint.xs ? '1.2' : '1',
          }"
          :route="news.route"
        />
      </v-col>
    </v-row>

    <v-row v-else align="center" justify="center">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </v-row>
  </div>
</template>

<script>
import NewsPoster from "../../components/news/NewsPoster";

export default {
  components: { NewsPoster },
  props: { search: String, searching: Boolean },
  data() {
    return {
      news_list: new Array(10).fill({
        title: "Título da Notícia",
        caption:
          "Legenda/curta descrição da notícia. Não deve ser muito grande para não quebrar linha.",
        image_url: "https://picsum.photos/510/300?random",
        route: { name: "news_show", params: { id: 1 } },
      }),
    };
  },
  created() {
    if (this.$route.query.search) {
      this.$emit("search", this.$route.query.search);
    }
  },
  methods: {
    generateRatio(row, col) {
      return row % 2 == 0 ? (col == 0 ? "1" : "2") : col == 2 ? "1" : "2";
    },
  },
  watch: {
    search() {
      this.$emit("searching", true);
      setTimeout(() => {
        this.$emit("searching", false);
      }, 1000);
    },
  },
  computed: {
    grouped_news() {
      let group = [];

      this.news_list.forEach((_, index) => {
        if (index % 3 == 0 && index < this.news_list.length) {
          let new_array = this.news_list.slice(
            index,
            Math.min(index + 3, this.news_list.length)
          );

          if (index % 6 == 0) {
            group.push(
              new_array[0],
              new_array.slice(1, 3).filter((value) => value)
            );
          } else {
            group.push(
              new_array.slice(0, 2).filter((value) => value),
              new_array[2]
            );
          }
        }
      });

      group = group.filter((value) => value);

      return group;
    },
  },
  beforeRouteLeave(to, from, next) {
    next();
    if (this.search) {
      this.$emit("clearInputSearch");
    }
  },
};
</script>

<style></style>
