<template>
  <div class="d-flex">
    <v-menu v-model="signUpMenu" :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text :icon="$vuetify.breakpoint.mobile" v-bind="attrs" v-on="on">
          <span v-if="$vuetify.breakpoint.mobile">
            <v-icon dark>mdi-account-plus</v-icon>
          </span>
          <span v-else>Cadastrar-se</span>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Cadastrar-se no Portal IAP
        </v-card-title>

        <v-card-subtitle>
          Informe os seus dados para cadastrar-se
        </v-card-subtitle>

        <v-divider />

        <v-form
          ref="signUpForm"
          v-model="signUpValid"
          lazy-validation
          class="px-5 py-3"
        >
          <p v-if="signUpError" class="red--text body-2 text-center">
            Ocorreu um erro ao tentar cadastrar-se
          </p>

          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nome"
            required
            @keyup.enter="signUpByEmail"
            autocomplete="new-name"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            @keyup.enter="signUpByEmail"
            autocomplete="new-email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Senha"
            @click:append="showPassword = !showPassword"
            @keyup.enter="signUpByEmail"
            autocomplete="new-password"
          ></v-text-field>

          <v-text-field
            v-model="passwordConfirmation"
            :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordConfirmationRules"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            label="Confirmação de senha"
            @click:append="showPasswordConfirmation = !showPasswordConfirmation"
            @keyup.enter="signUpByEmail"
            autocomplete="new-password-confirmation"
          ></v-text-field>
        </v-form>

        <div class="d-flex px-5 pb-5">
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="closeSignUpMenu"
            class="mr-2"
            :disabled="signingUpByEmail"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            @click="signUpByEmail"
            :disabled="!signUpValid || signingUpByOAuth"
            :loading="signingUpByEmail"
          >
            Cadastrar
          </v-btn>
        </div>

        <!-- <v-divider class="mx-5" />

        <div class="d-flex flex-column align-center px-5 py-3">
          <p class="body-2">Cadastrar-se com a conta social</p>

          <v-btn
            text
            @click="signUpByOAuth"
            :loading="signingUpByOAuth"
            :disabled="signingUpByEmail"
          >
            Google
          </v-btn>
        </div> -->
      </v-card>
    </v-menu>

    <v-menu v-model="signInMenu" :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          color="primary"
          :icon="$vuetify.breakpoint.mobile"
          v-bind="attrs"
          v-on="on"
        >
          <span v-if="$vuetify.breakpoint.mobile">
            <v-icon>mdi-login</v-icon>
          </span>
          <span v-else>Entrar</span>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Acessar o Portal IAP
        </v-card-title>

        <v-card-subtitle>
          Informe o e-mail e senha do seu usuário
        </v-card-subtitle>

        <v-divider />

        <v-form
          ref="signInForm"
          v-model="signInValid"
          lazy-validation
          class="px-5 py-3"
        >
          <p v-if="signInError" class="red--text body-2 text-center">
            E-mail ou senha inválida
          </p>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            @keyup.enter="signInByEmail"
            autocomplete="new-email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Senha"
            @click:append="showPassword = !showPassword"
            @keyup.enter="signInByEmail"
            autocomplete="new-password"
          ></v-text-field>
        </v-form>

        <router-link
          :to="{ name: 'password_recover_request' }"
          v-slot="{ href }"
        >
          <v-btn :to="href" color="primary" link text small class="mx-5 mb-3">
            Esqueceu a sua senha?
          </v-btn>
        </router-link>

        <div class="d-flex px-5 pb-5">
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="closeSignInMenu"
            class="mr-2"
            :disabled="signingInByEmail"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            @click="signInByEmail"
            :disabled="!signInValid || signingInByOAuth"
            :loading="signingInByEmail"
          >
            Entrar
          </v-btn>
        </div>

        <!-- <v-divider class="mx-5" />

        <div class="d-flex flex-column align-center px-5 py-3">
          <p class="body-2">Acessar com a conta social</p>

          <v-btn
            text
            @click="signInByOAuth"
            :loading="signingInByOAuth"
            :disabled="signingInByEmail"
          >
            Google
          </v-btn>
        </div> -->
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signUpMenu: false,
      signUpValid: true,
      signingUpByEmail: false,
      signingUpByOAuth: false,
      signUpError: false,

      signInMenu: false,
      signInValid: true,
      signingInByEmail: false,
      signingInByOAuth: false,
      signInError: false,

      name: "",
      nameRules: [(v) => !!v || "Nome é obrigatório"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido",
      ],
      password: "",
      showPassword: false,
      passwordRules: [
        (v) => !!v || "Senha é obrigatório",
        (v) => v.length >= 8 || "Deve ter conter, no mínimo, 8 caracteres",
      ],
      passwordConfirmation: "",
      showPasswordConfirmation: false,
      passwordConfirmationRules: [
        (v) => !!v || "Confirmação de senha é obrigatório",
        (v) => v == this.password || "Senhas não coincidem",
      ],
    };
  },
  methods: {
    closeSignUpMenu() {
      this.signUpMenu = false;
      this.showPassword = false;
      this.name = null;
      this.$refs.signUpForm.reset();
      this.$refs.signUpForm.resetValidation();
    },
    closeSignInMenu() {
      this.signInMenu = false;
      this.showPassword = false;
      this.name = null;
      this.$refs.signInForm.reset();
      this.$refs.signInForm.resetValidation();
    },
    signInByEmail() {
      this.signInError = false;

      if (this.$refs.signInForm.validate()) {
        const users = require("../../data/users.json");

        this.signingInByEmail = true;

        setTimeout(() => {
          let user = users.find(
            (u) => u.email == this.email && u.password == this.password
          );

          if (user) {
            let jwt = user.token;
            this.closeSignInMenu();
            this.$cookies.set("jwt", jwt);
            this.$store.dispatch("user/setUser", user);
            // location.reload();
          } else {
            this.signInError = true;
          }

          this.signingInByEmail = false;
        }, 1000);
      }
    },
    // signInByOAuth() {
    //   this.signInError = false;
    //   this.signingInByOAuth = true;

    //   setTimeout(() => {
    //     this.signingInByOAuth = false;
    //   }, 1000);
    // },
    signUpByEmail() {
      if (this.$refs.signUpForm.validate()) {
        this.signingUpByEmail = true;

        setTimeout(() => {
          // let user = {
          //   token: "user-2",
          //   email: this.email,
          //   password: this.password,
          //   profile: {
          //     name: this.name,
          //   },
          // };

          // if (user) {
          //   let jwt = user.token;
          //   this.$cookies.set("jwt", jwt);
          //   this.$store.dispatch("user/setUser", user);
          //   this.closeSignUpMenu();
          //   // location.reload();
          // } else {
          //   this.signUpError = true;
          // }
          // this.signingUpByEmail = false;

          this.$router.push({
            name: "confirmation_email",
            params: {
              email: this.email,
              password: this.password,
              profile: {
                name: this.name,
              },
            },
          });
        }, 1000);
      }
    },
    // signUpByOAuth() {
    //   this.signInError = false;
    //   this.signingUpByOAuth = true;

    //   setTimeout(() => {
    //     this.signingUpByOAuth = false;
    //   }, 1000);
    // },
  },
};
</script>

<style scoped></style>
