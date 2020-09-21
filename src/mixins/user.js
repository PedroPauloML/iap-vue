export default {
  computed: {
    userSigned() {
      return (
        !!this.$store.state.user.user &&
        Object.keys(this.$store.state.user.user).length > 0
      );
    },
  },
};
