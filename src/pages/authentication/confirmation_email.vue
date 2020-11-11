<template>
  <div id="sended-confirmation-email">
    <v-icon class="green--text text--darken-3 mb-5" size="70">
      mdi-check-circle-outline
    </v-icon>

    <div class="mb-10 text-center">
      <h1 class="green--text text--darken-3">
        Um e-mail de confirmação foi enviado para o seu endereço de e-mail!
      </h1>

      <h3>
        Acesse o link enviado para a sua caixa de e-mail para confirmar a sua
        conta
      </h3>
    </div>

    <router-link :to="{ name: 'home' }" v-slot="{ href }">
      <v-btn :to="href" color="primary" type="button">
        Voltar para a página inicial
      </v-btn>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#sended-confirmation-email {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
