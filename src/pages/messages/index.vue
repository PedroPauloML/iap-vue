<template>
  <div id="messages">
    <div v-if="value.search || value.date" class="d-flex flex-wrap mb-5">
      <span v-if="searching" class="mr-1 text-nowrap">
        Aguarde um momento, estamos pesquisando por
      </span>
      <span v-else class="mr-1 text-nowrap">
        Encontramos {{ messages.length }} resultados para a busca
      </span>
      <span
        v-if="value.search"
        class="text-truncate-1-line mr-1 font-weight-medium"
      >
        {{ value.search }}
      </span>

      <span v-if="value.date" class="mr-1">
        no dia
      </span>
      <span
        v-if="value.date"
        class="text-truncate-1-line font-weight-medium mr-1"
      >
        {{ value.date | moment("DD/MM/YYYY") }}
      </span>
    </div>

    <div v-if="!searching">
      <Message
        v-for="(message, index) in messages"
        :key="index"
        :route="message.route"
        :title="message.title"
        :caption="message.caption"
        :content="message.content"
        :metadata="message.metadata"
        :tags="message.tags"
        @filterMessages="(search) => (value.search = search)"
        class="mb-10"
      />
    </div>

    <v-row v-else align="center" justify="center">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </v-row>
  </div>
</template>

<script>
import Message from "../../components/messages/Component";

export default {
  components: { Message },
  props: {
    value: {
      search: String,
      date: String,
      required: true,
    },
    searching: Boolean,
  },
  data() {
    return {
      messages: [],
      list_of_messages: [],
    };
  },
  created() {
    let messages = [];
    for (let index = 0; index < 10; index++) {
      messages = messages.concat({
        route: { name: "message", params: { id: 10 - index } },
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
          published_at: this.$moment("2020-07-05T03:37:00-03:00")
            .subtract(index, "days")
            .format(),
          author: "Pedro Paulo",
        },
        tags: [
          {
            text: "Mulheres",
            route: { name: "messages", query: { search: "Mulheres" } },
          },
          {
            text: "Mulheres",
            route: { name: "messages", query: { search: "Mulheres" } },
          },
          {
            text: "Mulheres",
            route: { name: "messages", query: { search: "Mulheres" } },
          },
        ],
      });
    }
    this.list_of_messages = messages;
    this.messages = this.list_of_messages;

    if (this.$route.query.search) this.value.search = this.$route.query.search;
    if (this.$route.query.date) this.value.date = this.$route.query.date;

    this.filterMessages(this.value);
  },
  watch: {
    value: {
      handler: function() {
        this.filterMessages(this.value);
      },
      deep: true,
    },
  },
  methods: {
    filterMessages(filters) {
      if (!this.searching) {
        this.$emit("searching", true);

        let search = (filters.search || "")
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        let date = filters.date
          ? this.$moment(filters.date).format("DD/MM/YYYY")
          : "";

        this.messages = this.list_of_messages.filter(
          (message) =>
            (message.title
              .toLocaleLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(search) ||
              message.tags.find((tag) =>
                tag.text
                  .toLocaleLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(search)
              )) &&
            (date
              ? this.$moment(message.metadata.published_at).format(
                  "DD/MM/YYYY"
                ) == date
              : true)
        );

        setTimeout(() => {
          this.$emit("searching", false);
        }, 1000);
      }
    },
  },
};
</script>

<style></style>
