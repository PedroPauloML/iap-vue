import Vue from "vue";
import Router from "vue-router";

// import store from "./store/store";

// Lazy load of components
// This components will be loaded just when used, improving your site performance
// const Login = () => import(/* webPackChunkName: "login" */ "./pages/Login");
const Home = () => import(/* webPackChunkName: "mainPages" */ "./pages/Home");
const News = () => import(/* webPackChunkName: "mainPages" */ "./pages/News");
const VerseOfDay = () =>
  import(/* webPackChunkName: "mainPages" */ "./pages/VerseOfDay");
const Messages = () =>
  import(/* webPackChunkName: "mainPages" */ "./pages/Messages");
const Schedule = () =>
  import(/* webPackChunkName: "mainPages" */ "./pages/Schedule");
const Contact = () =>
  import(/* webPackChunkName: "mainPages" */ "./pages/Contact");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    // AUTHENTICATION
    // { name: "login", path: "/login", component: Login },

    // HOME
    { name: "home", path: "/", component: Home },
    { name: "news", path: "/news", component: News },
    { name: "verse_of_day", path: "/verse_of_day", component: VerseOfDay },
    { name: "messages", path: "/messages", component: Messages },
    { name: "schedule", path: "/schedule", component: Schedule },
    { name: "contact", path: "/contact", component: Contact },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.name == "login" || store.state.user) {
//     next();
//   } else {
//     next({ name: "login" });
//   }
// });

export default router;
