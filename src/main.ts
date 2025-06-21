import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
import router from "./router";
import { i18n } from "@/i18n";
import { setupStore } from "@/store";

const app = createApp(App);
setupStore(app);
app.use(router);
app.use(i18n);
app.mount("#app");
