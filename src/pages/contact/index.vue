<template>
  <div id="contact" class="mb-5">
    <h1 class="mb-3">Contato</h1>

    <p>
      A Igreja Adventista da Promessa é o resultado de uma oração feita com fé.
      A IAP baseia-se nas doutrinas bíblicas que considera fundamentais para
      satisfazer as exigências divinas de restauração do ser humano. É uma
      Igreja que crê, que recebe e que depende do poder do Espírito Santo.
    </p>

    <p>
      Nossa missão é adorar a Deus, proclamar a Jesus Cristo e fazer discípulos
      no poder do Espírito Santo. Nossa visão é que cada promessista seja
      missionário no poder do Espírito Santo.
    </p>

    <p>
      Hoje, estamos em 18 países e totalizamos cerca de 80 mil membros. Nossa
      atuação se dá por meio de diferentes ministérios: Ensino, Junta de
      Missões, Música e Adoração, Mulheres, Jovens, Crianças e Adolescentes e
      Vida Pastoral.
    </p>

    <p>
      Na cidade de <b>Paulo Afonso/BA</b> estamos localizados na
      <b>R. 13 de Maio, 42 - Centenário</b>. Você pode entender melhor nossa
      localização no mapa abaixo.
    </p>

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.429330050006!2d-38.23084368521069!3d-9.38366299327536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7093a030e8ca5ff%3A0xbfc888c7a70febb9!2sR.%2013%20de%20maio%2C%2042%20-%20Centenario%2C%20Paulo%20Afonso%20-%20BA%2C%2048605-600!5e0!3m2!1spt-BR!2sbr!4v1596210950708!5m2!1spt-BR!2sbr"
      frameborder="0"
      style="border:0;"
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
      class="rounded mb-5"
    ></iframe>

    <p>
      Nossa igreja local é gerenciada por um grupo de pessoas. Dentre elas:
    </p>

    <div
      id="representatives"
      class="d-flex flex-column flex-sm-row justify-space-around"
    >
      <div class="d-flex flex flex-sm-column align-start align-sm-center mb-5">
        <v-img
          src="https://picsum.photos/id/1012/150/150"
          aspect-ratio="1"
          :width="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :max-width="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :height="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :max-height="$vuetify.breakpoint.smAndUp ? 150 : 80"
          class="rounded-circle mb-4 mr-3 mr-sm-0"
        ></v-img>
        <div class="flex text-center">
          <span class="d-block display-1 font-weight-thin">Nome do pastor</span>
          <span class="d-block font-weight-bold">Pastor</span>
          <span class="d-block overline">(xx) x xxxx-xxxx</span>
        </div>
      </div>

      <div class="d-flex flex flex-sm-column align-start align-sm-center mb-5">
        <v-img
          src="https://picsum.photos/id/1012/150/150"
          aspect-ratio="1"
          :width="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :max-width="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :height="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :max-height="$vuetify.breakpoint.smAndUp ? 150 : 80"
          class="rounded-circle mb-4 mr-3 mr-sm-0"
        ></v-img>
        <div class="flex text-center">
          <span class="d-block display-1 font-weight-thin"
            >Nome do presbitero</span
          >
          <span class="d-block font-weight-bold">Presbitero</span>
          <span class="d-block overline">(xx) x xxxx-xxxx</span>
        </div>
      </div>

      <div class="d-flex flex flex-sm-column align-start align-sm-center mb-5">
        <v-img
          src="https://picsum.photos/id/1012/150/150"
          aspect-ratio="1"
          :width="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :max-width="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :height="$vuetify.breakpoint.smAndUp ? 150 : 80"
          :max-height="$vuetify.breakpoint.smAndUp ? 150 : 80"
          class="rounded-circle mb-4 mr-3 mr-sm-0"
        ></v-img>
        <div class="flex text-center">
          <span class="d-block display-1 font-weight-thin">
            Nome do secretário(a)
          </span>
          <span class="d-block font-weight-bold">Secretário(a)</span>
          <span class="d-block overline">(xx) x xxxx-xxxx</span>
        </div>
      </div>
    </div>

    <p>
      Faça-nos uma visita! Estramos de braços abertos para recebê-lo e a
      disposição para orar por você e compartilhar o que Deus tem a nos falar.
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
iframe {
  width: 100%;
  height: 500px;
  max-height: 70vh;
}
</style>
