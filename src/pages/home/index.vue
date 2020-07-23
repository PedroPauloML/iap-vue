<template>
  <div id="home">
    <v-row class="mb-5">
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
            :class="{ 'mt-7': i % 2 != 0 }"
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
        />
      </v-col>
    </v-row>

    <VerseOfDay
      :verse="verse_of_day.verse"
      :reference="verse_of_day.reference"
      :date="verse_of_day.date"
      :route="verse_of_day.route"
    />
  </div>
</template>

<script>
import NewsPoster from "../../components/news/NewsPoster";
import VerseOfDay from "../../components/verse_of_day/Component";

export default {
  components: { NewsPoster, VerseOfDay },
  data() {
    return {
      news_list: new Array(3).fill({
        title: "Título da Notícia",
        caption:
          "Legenda/curta descrição da notícia. Não deve ser muito grande para não quebrar linha.",
        image_url: "https://picsum.photos/510/300?random",
        route: { name: "news_show", params: { id: 1 } },
      }),
      verse_of_day: {
        verse: `Elevo os meus olhos para os montes; de onde me vem o socorro? O meu
        socorro vem do Senhor, que fez os céus e a terra. Não deixará vacilar o
        teu pé; aquele que te guarda não dormitará.`,
        reference: `Salmos 121:1-3`,
        date: "2020-07-05T03:37:00-03:00",
        route: { name: "verses_of_day" },
      },
    };
  },
  methods: {
    generateRatio(row, col) {
      return row % 2 == 0 ? (col == 0 ? "1" : "2") : col == 2 ? "1" : "2";
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
};
</script>

<style></style>
