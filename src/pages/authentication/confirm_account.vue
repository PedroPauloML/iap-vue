<template>
  <div id="confirm-account">
    <transition name="slide-y-transition" mode="out-in">
      <div v-if="checkingTokenValidity" key="1">
        <v-progress-linear indeterminate class="mb-5"></v-progress-linear>

        <h3>Estamos lhe procurando. Aguarde um momento!</h3>
      </div>

      <div
        v-else-if="!checkingTokenValidity && validToken"
        key="2"
        class="confirmed-account centered"
      >
        <v-icon class="green--text text--darken-3 mb-5" size="70">
          mdi-check-circle-outline
        </v-icon>

        <div class="mb-10 text-center">
          <h1 class="green--text text--darken-3">
            Sua conta foi confirmada!
          </h1>

          <h3>
            A partir de agora você poderá acessar sua conta no IAP Paulo Afonso.
            Aproveite!
          </h3>
        </div>

        <router-link :to="{ name: 'home' }" v-slot="{ href }">
          <v-btn :to="href" color="primary" type="button">
            Voltar para a página inicial
          </v-btn>
        </router-link>
      </div>

      <div
        v-else-if="!checkingTokenValidity && !validToken"
        key="3"
        class="not-confirmed-account"
      >
        <transition name="slide-y-transition" mode="out-in">
          <div v-if="!emailResended" key="3.1" class="centered">
            <v-icon class="warning--text text--darken-2 mb-5" size="70">
              mdi-alert-outline
            </v-icon>

            <div class="mb-10 text-center">
              <h1 class="warning--text text--darken-2">
                Ops... Não identificamos sua conta!
              </h1>

              <h3>
                Não conseguimos identificar a sua conta dentre os nossos
                usuários. Gostaria de enviar o e-mail de confirmação de conta
                novamente?
              </h3>

              <v-card class="resend-confirmation-email-container">
                <v-card-text>
                  <v-form
                    ref="form"
                    v-model="resendConfirmationEmailValid"
                    lazy-validation
                    @submit="
                      (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        resendConfirmationEmail();
                      }
                    "
                  >
                    <p>
                      Insira o e-mail cadastrado na conta do seu usuário para
                      re-enviarmos o e-mail de confirmação.
                    </p>

                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      @keyup.enter="resendConfirmationEmail"
                      class="mb-3"
                      autocomplete="new-email"
                    ></v-text-field>

                    <v-btn
                      color="primary"
                      type="submit"
                      @click="resendConfirmationEmail"
                      :disabled="!resendConfirmationEmailValid"
                      :loading="resendingConfirmationEmail"
                    >
                      Re-enviar e-mail de confirmação
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>

              <router-link :to="{ name: 'home' }" v-slot="{ href }">
                <v-btn :to="href" color="light" type="button">
                  Voltar para a página inicial
                </v-btn>
              </router-link>
            </div>
          </div>

          <div v-else key="3.2" class="centered">
            <v-icon class="green--text text--darken-3 mb-5" size="70">
              mdi-check-circle-outline
            </v-icon>

            <div class="mb-10 text-center">
              <h1 class="green--text text--darken-3">
                E-mail de confirmação re-enviado!
              </h1>

              <h3>
                Acesse o link enviado para a sua caixa de e-mail para confirmar
                a sua conta.
              </h3>
            </div>

            <router-link :to="{ name: 'home' }" v-slot="{ href }">
              <v-btn :to="href" color="primary" type="button">
                Voltar para a página inicial
              </v-btn>
            </router-link>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Page status
      checkingTokenValidity: true,
      validToken: false,

      // Resend confirmation e-mail
      resendConfirmationEmailValid: true,
      resendConfirmationEmailError: "",
      resendingConfirmationEmail: false,
      emailResended: false,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
        () =>
          !this.resendConfirmationEmailError ||
          this.resendConfirmationEmailError,
      ],
    };
  },
  created() {
    const users = require("../../data/users.json");

    setTimeout(() => {
      let token = this.$route.query.token;
      if (token && token == "123456") {
        let user = users.find((u) => u.email == "user@email.com");
        let jwt = user.token;
        this.$cookies.set("jwt", jwt);
        this.$store.dispatch("user/setUser", user);

        this.validToken = true;
        this.checkingTokenValidity = false;
      } else {
        this.validToken = false;
        this.checkingTokenValidity = false;
      }
    }, 2000);
  },
  methods: {
    resendConfirmationEmail() {
      this.resendConfirmationEmailError = "";

      if (this.$refs.form.validate()) {
        const users = require("../../data/users.json");

        this.resendingConfirmationEmail = true;

        setTimeout(() => {
          let user = users.find((u) => u.email == this.email);

          if (user) {
            this.resendConfirmationEmailError = "";
            this.emailResended = true;
          } else {
            this.resendConfirmationEmailError =
              "Não foi encontrado nenhum usuáro com esse e-mail. " +
              "Verifique se o e-mail informado está correto.";
            this.$refs.form.validate();
          }

          this.resendingConfirmationEmail = false;
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#confirm-account,
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.resend-confirmation-email-container {
  max-width: 600px;
  padding: 12px;
  margin: 20px auto;
}
</style>
