import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
import router from "./router";
import { i18n } from "@/i18n";
import { setupStore } from "@/store";

const app = createApp(App);
app.use(i18n);
setupStore(app);
app.use(router);
app.mount("#app");
