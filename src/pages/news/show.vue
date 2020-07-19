<template>
  <div id="new">
    <NewsPoster
      :title="news.title"
      :caption="news.caption"
      :image="{
        url: news.image_url,
        ratio: $vuetify.breakpoint.xs ? '1.2' : '2.5',
      }"
      :content="news.content"
      :metadata="news.metadata"
      :tags="news.tags"
    />
  </div>
</template>

<script>
import NewsPoster from "../../components/news/NewsPoster";

export default {
  components: { NewsPoster },
  data() {
    return {
      back_router: "/news",
      news: {
        title: "Qual a senha do wi-fi? Reconecte-se!",
        caption:
          "Como tem sido o seu relacionamento com Deus? A sua conexão está clara, direta e sem interferências? Ele está presente no seu dia a dia?",
        image_url:
          "https://portaliap.org/wp-content/uploads/2020/07/mulher-celular-800x570.png",
        content: `
          <p>“Naquele dia, quando soprava o vento suave da tarde, o homem e a sua mulher ouviram a voz do SENHOR Deus, que estava passeando pelo jardim…” Gênesis 3:8.  Sempre que leio este  texto  fico emocionada. Deus  passeava pelo Jardim do Éden e conversava com Adão e Eva. Que maravilhosa comunhão! Desde o princípio nosso Pai Eterno buscou relacionar-se  com a criação, mas a queda e a desobediência levaram o casal para longe do Éden e a convivência mudou.</p>
          <p>Como tem sido o seu relacionamento com Deus? A sua conexão está clara, direta e sem interferências? Ele está presente no seu dia a dia?</p>
          <p>A palavra conexão é muito usada no mundo virtual e vem acompanhada de termos  que já fazem parte de nossas vidas, como internet, wi-fi  e tecnologia de comunicação imediata com uma banda larga de excelência, por favor! Quando “cai a internet” em certos momentos é terrível e se os documentos não estiverem com salvamento automático,  a situação fica crítica.</p>
          <p>Como está sua internet espiritual? Sua banda larga está suprindo todas as conexões? Como está sua ligação com Deus? Plena ou com falhas?</p>
          <p>Estas perguntas são importantes se levarmos em conta a conexão direta com Deus que havia lá no princípio dos tempos… Ele passeava no Jardim e conversava com Adão e Eva. Ocorre que  também  somos a criação de Deus! Em João 3:16 lemos que Ele entregou seu único filho para que tivéssemos vida eterna, ou seja, através de Jesus nossa ligação foi restabelecida. Alegrem-se! O Pai deseja estar conosco em todo o tempo e para sempre, porque nos ama profundamente.</p>
          <p>Ah,  como nosso ser integral sente falta dessa conexão com o Criador quando, por algum motivo, nos afastamos de Sua presença!  Precisamos a cada dia renovar nossa aliança com Deus, em Cristo Jesus, e permitir que Sua graça e Sua verdade conduzam nossas ações, reconhecendo nossos erros, pedindo perdão, num processo diário de aprendizado e compreensão de Seu infinito amor. Quanto mais próximos do Pai,  maior é a quantidade de amor, paz e harmonia que revelamos ao mundo.</p>
          <p>Jesus nos ensinou como podemos ter essa vida de relacionamento e confiança, quando nos orienta em João 14:6: “Eu sou o caminho, e a verdade e a vida; ninguém vem ao Pai, senão por mim.”</p>
          <p>Bem, eu descobri e vou compartilhar  Querem saber? Anotem aí a senha do wi-fi para reconectarem-se urgentemente com Deus: “FÉ”.</p>
          <p>“Portanto, cheguemos perto de Deus com um coração sincero e uma fé firme, com a consciência limpa das nossas culpas e com o corpo lavado com água pura.” Hebreus 10:22</p>
          <p>Escrito por Genilda Farias, casada com Silas Farias e mãe do Pedro José. Formada em Letras e Pedagogia, congrega na Igreja Adventista da Promessa em Vila Maria – SP/SP.</p>`,
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
    this.$emit("setBackRoute", { name: "news" });
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("setBackRoute", null);
    next();
  },
};
</script>

<style></style>
