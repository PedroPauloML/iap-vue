import Vue from "vue";
import Router from "vue-router";

// import store from "./store/store";

// Lazy load of components
// This components will be loaded just when used, improving your site performance
// const Login = () => import("./pages/Login");
const HomeIndex = () => import("./pages/home/index");
const NewsLayout = () => import("./pages/news/layout");
const NewsIndex = () => import("./pages/news/index");
const NewsNew = () => import("./pages/news/new");
const NewsShow = () => import("./pages/news/show");
const NewsEdit = () => import("./pages/news/edit");
const VerseOfDayLayout = () => import("./pages/verse_of_day/layout");
const VerseOfDayIndex = () => import("./pages/verse_of_day/index");
const VerseOfDayShow = () => import("./pages/verse_of_day/show");
const MessagesLayout = () => import("./pages/messages/layout");
const MessagesIndex = () => import("./pages/messages/index");
const MessagesNew = () => import("./pages/messages/new");
const MessagesShow = () => import("./pages/messages/show");
const MessagesEdit = () => import("./pages/messages/edit");
const SchedulesLayout = () => import("./pages/schedules/layout");
const SchedulesIndex = () => import("./pages/schedules/index");
const SchedulesNew = () => import("./pages/schedules/new");
const SchedulesShow = () => import("./pages/schedules/show");
const SchedulesEdit = () => import("./pages/schedules/edit");
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
          name: "news_new",
          path: "/news/new",
          component: NewsNew,
          meta: { title: `Nova Notícia | ${site_name}` },
        },
        {
          name: "news_show",
          path: "/news/:id",
          component: NewsShow,
          meta: { title: `Notícias | ${site_name}` },
        },
        {
          name: "news_edit",
          path: "/news/:id/edit",
          component: NewsEdit,
          meta: { title: `Editando Notícia | ${site_name}` },
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
      path: "/messages",
      component: MessagesLayout,
      children: [
        {
          name: "messages",
          path: "",
          component: MessagesIndex,
          meta: { title: `Mensagens | ${site_name}` },
        },
        {
          name: "messages_new",
          path: "/messages/new",
          component: MessagesNew,
          meta: { title: `Nova Mensagem | ${site_name}` },
        },
        {
          name: "messages_show",
          path: "/messages/:id",
          component: MessagesShow,
          meta: { title: `Mensagens | ${site_name}` },
        },
        {
          name: "messages_edit",
          path: "/messages/:id/edit",
          component: MessagesEdit,
          meta: { title: `Editando Mensagem | ${site_name}` },
        },
      ],
    },

    // SCHEDULES
    {
      path: "/schedules",
      component: SchedulesLayout,
      children: [
        {
          name: "schedules",
          path: "",
          component: SchedulesIndex,
          meta: { title: `Agendas | ${site_name}` },
        },
        {
          name: "schedules_new",
          path: "/schedules/new",
          component: SchedulesNew,
          meta: { title: `Nova Agenda | ${site_name}` },
        },
        {
          name: "schedules_show",
          path: "/schedules/:id",
          component: SchedulesShow,
          meta: { title: `Agendas | ${site_name}` },
        },
        {
          name: "schedules_edit",
          path: "/schedules/:id/edit",
          component: SchedulesEdit,
          meta: { title: `Editando Agenda | ${site_name}` },
        },
      ],
    },

    // CONTACT
    {
      name: "contact",
      path: "/contact",
      component: ContactIndex,
      meta: { title: `Contato | ${site_name}` },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
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
