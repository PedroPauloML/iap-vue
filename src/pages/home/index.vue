<template>
  <div id="home">
    <div class="d-flex justify-space-between align-center mb-2">
      <span class="title">Últimas Notícias</span>

      <router-link :to="{ name: 'news' }" v-slot="{ href }">
        <v-btn :to="href" height="100%" text link color="primary" class="pa-3">
          Ver mais
        </v-btn>
      </router-link>
    </div>
    <v-row class="mb-5">
      <v-col
        v-for="(news, group_index) in grouped_news"
        :key="group_index"
        cols="12"
        sm="6"
      >
        <div v-if="Array.isArray(news)">
          <News
            v-for="(single_new, i) in news"
            :key="i"
            :id="single_new.id"
            :title="single_new.title"
            :caption="single_new.caption"
            :image="{
              url: single_new.image,
              ratio: '2.1',
            }"
            :class="{ 'mt-7': i % 2 != 0 }"
          />
        </div>
        <News
          v-else
          :id="news.id"
          :title="news.title"
          :caption="news.caption"
          :image="{
            url: news.image,
            ratio: '1',
          }"
        />
      </v-col>
    </v-row>

    <div class="d-flex justify-space-between align-center mb-2">
      <span class="title">Nossa Agenda</span>

      <router-link :to="{ name: 'schedules' }" v-slot="{ href }">
        <v-btn :to="href" height="100%" text link color="primary" class="pa-3">
          Ver mais
        </v-btn>
      </router-link>
    </div>
    <v-carousel
      v-model="schedule_page"
      class="mb-5"
      height="auto"
      hide-delimiters
      hide-delimiter-background
      :continuous="false"
    >
      <v-carousel-item
        v-for="(schedules, index) in grouped_schedules"
        :key="index"
        class="px-8"
      >
        <v-row no-gutters>
          <v-col
            v-for="(schedule, i) in schedules"
            :key="index * 3 + i"
            md="4"
            sm="6"
            cols="12"
          >
            <Schedule
              :id="schedule.id"
              :title="schedule.title"
              :description="schedule.description"
              :date_start="schedule.date_start"
              :date_end="schedule.date_end"
              :image="schedule.image"
              :location="schedule.location"
              mini
              class="ma-2"
            />
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <div class="d-flex justify-space-between align-center mb-2">
      <span class="title">Versículos do Dia</span>

      <router-link :to="{ name: 'verses_of_day' }" v-slot="{ href }">
        <v-btn :to="href" height="100%" text link color="primary" class="pa-3">
          Ver mais
        </v-btn>
      </router-link>
    </div>
    <v-carousel
      v-model="verses_of_day_page"
      class="mb-10"
      height="auto"
      hide-delimiters
      hide-delimiter-background
      :continuous="false"
      reverse
    >
      <v-carousel-item
        v-for="(verse_of_day, index) in verses_of_day_list"
        :key="index"
        class="px-8"
      >
        <VerseOfDay
          :verse="verse_of_day.verse"
          :reference="verse_of_day.reference"
          :date="verse_of_day.date"
          :route="verse_of_day.route"
          no-actions
          no-commentaries
          class="ma-2"
        />
      </v-carousel-item>
    </v-carousel>

    <Message
      v-if="message"
      :id="message.id"
      :title="message.title"
      :caption="message.caption"
      :content="message.content"
      :author="message.author"
      :published_at="message.published_at"
      :tags="Array.from(new Set(message.tags))"
      :metadata="{ read_time: true }"
      class="mb-10"
    />
  </div>
</template>

<script>
import News from "../../components/news/Component";
import VerseOfDay from "../../components/verse_of_day/Component";
import Message from "../../components/messages/Component";
import Schedule from "../../components/schedules/Component";

export default {
  components: { News, VerseOfDay, Message, Schedule },
  data() {
    return {
      news_list: [],
      schedules_list: [],
      schedule_page: 0,
      verses_of_day_list: [],
      verses_of_day_page: 0,
      message: null,
    };
  },
  created() {
    this.$store.dispatch("news/loadNews").then(() => {
      this.news_list = this.$store.state.news.news.slice(0, 3);
    });

    this.$store.dispatch("messages/loadMessages").then(() => {
      this.message = this.$store.state.messages.messages[0];
    });

    this.$store.dispatch("schedules/loadSchedules").then(() => {
      this.schedules_list = this.$store.state.schedules.schedules.filter(
        (el) => {
          return el.date_end
            ? this.$moment(el.date_end) > this.$moment()
            : false;
        }
      );
    });

    let verses = [];
    for (let index = 0; index < 10; index++) {
      verses = verses.concat({
        verse: `Elevo os meus olhos para os montes; de onde me vem o socorro? O meu
        socorro vem do Senhor, que fez os céus e a terra. Não deixará vacilar o
        teu pé; aquele que te guarda não dormitará.`,
        reference: `Salmos 121:1-3`,
        date: this.$moment("2020-07-05T03:37:00-03:00")
          .subtract(index, "days")
          .format(),
        route: { name: "verse_of_day", params: { id: 10 - index } },
      });
    }
    this.verses_of_day_list = verses;
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
    grouped_schedules() {
      const group_by = this.$vuetify.breakpoint.mdAndUp
        ? 3
        : this.$vuetify.breakpoint.smAndUp
        ? 2
        : 1;

      return this.schedules_list.reduce((accumulator, item, index) => {
        index % group_by
          ? accumulator[accumulator.length - 1].push(item)
          : accumulator.push([item]);
        return accumulator;
      }, []);
    },
  },
};
</script>

<style lang="scss">
.v-window__prev,
.v-window__next {
  margin: 0;
  transform: scale(0.7);
}
</style>
