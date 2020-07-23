import Vue from "vue";
import Router from "vue-router";

// import store from "./store/store";

// Lazy load of components
// This components will be loaded just when used, improving your site performance
// const Login = () => import("./pages/Login");
const HomeIndex = () => import("./pages/home/index");
const NewsLayout = () => import("./pages/news/layout");
const NewsIndex = () => import("./pages/news/index");
const NewsShow = () => import("./pages/news/show");
const VerseOfDayLayout = () => import("./pages/verse_of_day/layout");
const VerseOfDayIndex = () => import("./pages/verse_of_day/index");
const VerseOfDayShow = () => import("./pages/verse_of_day/show");
const MessagesIndex = () => import("./pages/messages/index");
const ScheduleIndex = () => import("./pages/schedule/index");
const ContactIndex = () => import("./pages/contact/index");

Vue.use(Router);

const site_name = "Portal IAP Paulo Afonso";

const router = new Router({
  mode: "history",
  routes: [
    // AUTHENTICATION
    // { name: "login", path: "/login", component: Login },

    // HOME
    {
      name: "home",
      path: "/",
      component: HomeIndex,
      meta: { title: `Início | ${site_name}` },
    },

    // NEWS
    {
      path: "/news",
      component: NewsLayout,
      meta: { title: `Notícias | ${site_name}` },
      children: [
        {
          name: "news",
          path: "",
          component: NewsIndex,
          meta: { title: `Notícias | ${site_name}` },
        },
        {
          name: "news_show",
          path: "/news/:id",
          component: NewsShow,
          meta: { title: `Notícias | ${site_name}` },
        },
      ],
    },

    // VERSE OF DAY
    {
      path: "/verses_of_day",
      component: VerseOfDayLayout,
      children: [
        {
          name: "verses_of_day",
          path: "",
          component: VerseOfDayIndex,
          meta: { title: `Versículos do dia | ${site_name}` },
        },
        {
          name: "verse_of_day",
          path: "/verses_of_day/:id",
          component: VerseOfDayShow,
          meta: { title: `Versículos do dia | ${site_name}` },
        },
      ],
    },

    // MESSAGES
    {
      name: "messages",
      path: "/messages",
      component: MessagesIndex,
      meta: { title: `Mensagens | ${site_name}` },
    },

    // SCHEDULE
    {
      name: "schedule",
      path: "/schedule",
      component: ScheduleIndex,
      meta: { title: `Agenda | ${site_name}` },
    },

    // CONTACT
    {
      name: "contact",
      path: "/contact",
      component: ContactIndex,
      meta: { title: `Contato | ${site_name}` },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || site_name;

  // if (to.name == "login" || store.state.user) {
  //   next();
  // } else {
  //   next({ name: "login" });
  // }

  next();
});

export default router;
