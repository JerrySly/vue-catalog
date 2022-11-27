import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./main.css";

let originalSetItem = localStorage.setItem;
localStorage.setItem = function (name) {
  let event = new Event("selectedCitySet", { bubbles: true });
  if (name == "selectedCity") document.dispatchEvent(event);
  originalSetItem.apply(this, arguments);
};

const Vue = createApp(App);
Vue.use(router).mount("#app");
