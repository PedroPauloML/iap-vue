<template>
  <div id="home">
    <v-row>
      <v-col
        v-for="(news, group_index) in grouped_news"
        :key="group_index"
        cols="12"
        md="6"
      >
        <div v-if="Array.isArray(news)">
          <NewsPoster
            v-for="(single_new, i) in news"
            :key="i"
            :title="single_new.title"
            :caption="single_new.caption"
            :image="{
              url: single_new.image_url,
              ratio: '2.1',
            }"
            :route="single_new.route"
            :class="{ 'rounded-lg': true, 'mt-7': i % 2 != 0 }"
          />
        </div>
        <NewsPoster
          v-else
          :title="news.title"
          :caption="news.caption"
          :image="{
            url: news.image_url,
            ratio: '1',
          }"
          :route="news.route"
          class="rounded-lg"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NewsPoster from "../../components/news/NewsPoster";

export default {
  components: { NewsPoster },
  data() {
    return {
      news: new Array(3).fill({
        title: "Título da Notícia",
        caption:
          "Legenda/curta descrição da notícia. Não deve ser muito grande para não quebrar linha.",
        image_url: "https://picsum.photos/510/300?random",
        route: { name: "news_show", params: { id: 1 } },
      }),
    };
  },
  created() {
    console.log(this.grouped_news);
  },
  methods: {
    generateRatio(row, col) {
      return row % 2 == 0 ? (col == 0 ? "1" : "2") : col == 2 ? "1" : "2";
    },
  },
  computed: {
    grouped_news() {
      let group = [];

      this.news.forEach((_, index) => {
        if (index % 3 == 0 && index < this.news.length) {
          let new_array = this.news.slice(
            index,
            Math.min(index + 3, this.news.length)
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
};
</script>

<style></style>
