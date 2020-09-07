<template>
  <div id="schedules">
    <div v-if="value.search || value.date" class="d-flex flex-wrap mb-5">
      <span v-if="searching" class="mr-1 text-nowrap">
        Aguarde um momento, estamos pesquisando por
      </span>
      <span v-else class="mr-1 text-nowrap">
        Encontramos {{ schedules.length }} resultados para a busca
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

    <v-row v-if="!searching">
      <v-col
        v-for="(schedule, index) in schedules"
        :key="index"
        md="4"
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
        />
      </v-col>
    </v-row>

    <v-row v-else align="center" justify="center">
      <v-progress-linear indeterminate color="primary"></v-progress-linear>
    </v-row>
  </div>
</template>

<script>
import Schedule from "../../components/schedules/Component";

export default {
  components: { Schedule },
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
      schedules: [],
      list_of_schedules: [],
    };
  },
  created() {
    let schedules = [];
    for (let index = 10; index > 0; index--) {
      schedules = schedules.concat({
        route: { name: "schedule", params: { id: 10 + index } },
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
    for (let index = 0; index < 10; index++) {
      schedules = schedules.concat({
        route: { name: "schedule", params: { id: 10 - index } },
        title: "Retiro de final de ano",
        description: `
        O Retiro de final de ano é um momento de alegria entre os irmãos,
        momento de confraternização e, também, de adoração e agradecimento ao senhor.
        Aproveite esse momento para se alegrar juntamente com sua igreja e
        agradecer ao senhor por mais um ano debaixo da graça do senhor.
        Venha e participe conosco!`,
        date_start: this.$moment()
          .subtract(index, "days")
          .format(),
        date_end: this.$moment()
          .subtract(index, "days")
          .add(10, "hours")
          .format(),
        image: "/images/schedule.png",
        location: "Chácara Santo Antônio",
      });
    }
    this.list_of_schedules = schedules;
    this.schedules = this.list_of_schedules;

    if (this.$route.query.search) this.value.search = this.$route.query.search;
    if (this.$route.query.date) this.value.date = this.$route.query.date;

    this.filterSchedules(this.value);
  },
  watch: {
    value: {
      handler: function() {
        this.filterSchedules(this.value);
      },
      deep: true,
    },
  },
  methods: {
    filterSchedules(filters) {
      if (!this.searching) {
        this.$emit("searching", true);

        let search = (filters.search || "")
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        let date = filters.date
          ? this.$moment(filters.date).format("DD/MM/YYYY")
          : "";

        this.schedules = this.list_of_schedules.filter(
          (schedule) =>
            schedule.title
              .toLocaleLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(search) &&
            (date
              ? [
                  this.$moment(schedule.date_start).format("DD/MM/YYYY"),
                  this.$moment(schedule.date_start).format("DD/MM/YYYY"),
                ].includes(date)
              : true)
        );

        this.$emit("searching", false);
      }
    },
  },
};
</script>

<style></style>
