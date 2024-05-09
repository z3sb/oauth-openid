import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import config from "./config";
import { OktaAuth } from "@okta/okta-auth-js";
import OktaVue from "@okta/okta-vue";
import router from "./router";

const oktaAuth = new OktaAuth(config.openIdConfig);

createApp(App)
  .use(router)
  .use(OktaVue, {
    oktaAuth,
  })
  .mount("#app");
