<template>
  <div id="schedule">
    <Schedule
      :route="schedule.route"
      :title="schedule.title"
      :description="schedule.description"
      :date_start="schedule.date_start"
      :date_end="schedule.date_end"
      :image="schedule.image"
      :location="schedule.location"
      :solo="true"
    />
  </div>
</template>

<script>
import Schedule from "../../components/schedules/Component";

export default {
  components: { Schedule },
  data() {
    return {
      back_router: "/schedules",
      schedule: {
        route: { name: "schedule", params: { id: this.$route.params.id - 10 } },
        title: "Retiro de final de ano",
        description: `
        O Retiro de final de ano é um momento de alegria entre os irmãos,
        momento de confraternização e, também, de adoração e agradecimento ao senhor.
        Aproveite esse momento para se alegrar juntamente com sua igreja e
        agradecer ao senhor por mais um ano debaixo da graça do senhor.
        Venha e participe conosco!`,
        date_start: this.$moment()
          .add(this.$route.params.id - 10, "days")
          .format(),
        date_end: this.$moment()
          .add(this.$route.params.id - 10, "days")
          .add(10, "hours")
          .format(),
        image: "/images/schedule.png",
        location: "Chácara Santo Antônio",
      },
    };
  },
  created() {
    this.$emit("setBackRoute", { name: "schedules" });
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("setBackRoute", null);
    next();
  },
};
</script>

<style></style>
