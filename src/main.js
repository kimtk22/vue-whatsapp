import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import vue3GoogleLogin from "vue3-google-login";
import "./style.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId:
    "607162455873-k0u19f6ushglpkp9l0vt2t8hgg20856a.apps.googleusercontent.com",
});

app.mount("#app");
