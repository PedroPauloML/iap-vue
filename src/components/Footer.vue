<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <router-link
        v-for="(route, index) in routes"
        :key="index"
        :to="{ name: route.path_name }"
        v-slot="{ href }"
      >
        <v-btn :to="href" color="white" text rounded link class="my-2">
          {{ route.title }}
        </v-btn>
      </router-link>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        Igreja Adventista da Promessa — <strong>Paulo Afonso</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          path_name: "home",
          title: "Início",
        },
        {
          path_name: "news",
          title: "Notícias",
        },
        {
          path_name: "verses_of_day",
          title: "Versículos do dia",
        },
        {
          path_name: "messages",
          title: "Mensagens",
        },
        {
          path_name: "schedules",
          title: "Agenda",
        },
        {
          path_name: "contact",
          title: "Contato",
        },
      ],
    };
  },
};
</script>

<style></style>
