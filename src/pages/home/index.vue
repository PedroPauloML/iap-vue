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
              :route="schedule.route"
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
          class="ma-2"
        />
      </v-carousel-item>
    </v-carousel>

    <Message
      :route="message.route"
      :title="message.title"
      :caption="message.caption"
      :content="message.content"
      :metadata="message.metadata"
      :tags="message.tags"
      class="mb-10"
    />
  </div>
</template>

<script>
import NewsPoster from "../../components/news/NewsPoster";
import VerseOfDay from "../../components/verse_of_day/Component";
import Message from "../../components/messages/Component";
import Schedule from "../../components/schedules/Component";

export default {
  components: { NewsPoster, VerseOfDay, Message, Schedule },
  data() {
    return {
      news_list: new Array(3).fill({
        title: "Título da Notícia",
        caption:
          "Legenda/curta descrição da notícia. Não deve ser muito grande para não quebrar linha.",
        image_url: "https://picsum.photos/510/300?random",
        route: { name: "news_show", params: { id: 1 } },
      }),
      schedules_list: [],
      schedule_page: 0,
      verses_of_day_list: [],
      verses_of_day_page: 0,
      message: {
        route: { name: "message", params: { id: 1 } },
        title: "Conectadas com a palavra",
        caption:
          "Como tem sido o seu relacionamento com Deus? A sua conexão está clara, direta e sem interferências? Ele está presente no seu dia a dia?",
        content: `
          <p>“Um dia o sumo sacerdote Hilquias foi ver Safã, o secretário do rei, e disse: ‘Encontrei um livro no templo do Senhor, e esse livro é o livro da lei!’…” II Reis 22:8 NBV-P</p>
          <img src="https://portaliap.org/wp-content/uploads/2020/07/bible-800x570.png" />
          <p>No livro de II Reis capítulos 22 e 23 encontramos a história do reinado de Josias. Ele estava reinando há dezoito anos quando resolveu consertar os estragos do templo. Safã, seu secretário, foi até o sacerdote Hilquias e repassou suas orientações. Ao executar tal ordem, o sacerdote encontrou o livro da lei do Senhor.</p>
          <p>Como assim? O livro da lei do Senhor estava perdido? Pode parecer estranho, mas é o que está registrado nas sagradas escrituras. E, da mesma forma que aconteceu nessa história durante o reinado de Josias, é possível que muitos de nós tenhamos perdido a palavra de Deus.</p>
          <p>Os zeladores de igreja que o digam. Quantas Bíblias são esquecidas nos bancos das igrejas e muitas vezes seus donos nem sentem falta…</p>
          <p>Nesse momento muitos podem até dizer, eu não perdi minha Bíblia. Ok, pode ser que você a tenha na sua casa guardada em algum lugar, em alguma gaveta, bolsa, no smartphone, no computador ou até mesmo ela esteja em cima de um móvel aberta no Salmo 91. Mas, será que a palavra do Senhor não está “perdida”?</p>
          <p>Se nós temos a Bíblia mas não a lemos, paramos de praticá-la ou ainda não permitimos que ela produza efeito em nossas vidas, então está perdida.</p>
          <p>Não adianta termos a palavra de Deus à nossa disposição em todas as versões possíveis se a deixamos pelos cantos e não meditamos em seus ensinamentos.</p>
          <p>O Senhor nos convida a nos conectarmos com a sua palavra, de tal modo que ela produza em nossas vidas o efeito que produziu na vida de Josias.</p>
          <p>Quando o rei ouviu as palavras do livro, rasgou as suas vestes, abriu seu coração, se humilhou diante do Senhor e tomou a atitude de renovar a sua aliança e do povo com o seu Senhor.</p>
          <p>Não deixemos a palavra de Deus esquecida. Precisamos todos os dias desse encontro com a palavra do Senhor. A leitura e a prática dos ensinamentos que esse livro maravilhoso contém irá produzir em nós mudança de comportamento, restauração e renovo.</p>`,
        metadata: {
          read_time: true,
          published_at: "2020-07-05T03:37:00-03:00",
          author: "Pedro Paulo",
        },
        tags: [
          {
            text: "Mulheres",
            route: { name: "news", query: { search: "Mulheres" } },
          },
          {
            text: "Mulheres",
            route: { name: "news", query: { search: "Mulheres" } },
          },
          {
            text: "Mulheres",
            route: { name: "news", query: { search: "Mulheres" } },
          },
        ],
      },
    };
  },
  created() {
    let schedules = [];
    for (let index = 1; index < 10; index++) {
      schedules = schedules.concat({
        route: { name: "schedule", params: { id: index + 10 } },
        title: "Retiro de final de ano",
        description: `
        O Retiro de final de ano é um momento de alegria entre os irmãos,
        momento de confraternização e, também, de adoração e agradecimento ao senhor.
        Aproveite esse momento para se alegrar juntamente com sua igreja e
        agradecer ao senhor por mais um ano debaixo da graça do senhor.
        Venha e participe conosco!`,
        date_start: this.$moment()
          .add(index, "days")
          .format(),
        date_end: this.$moment()
          .add(index, "days")
          .add(10, "hours")
          .format(),
        image: "/images/schedule.png",
        location: "Chácara Santo Antônio",
      });
    }
    this.schedules_list = schedules;

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
