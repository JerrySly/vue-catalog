import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/views/MainView.vue"),
  },
  {
    path: "/category/:slug",
    name: "Category",
    component: () => import("@/views/CategoriesView.vue"),
    props: true,
    children: [
      {
        path: ":subcategorySlug",
        name: "SubCategory",
        component: () => import("@/views/CategoriesView.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
