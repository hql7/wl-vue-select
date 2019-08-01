import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";

import wlSelect from "wl-vue-select";
Vue.use(wlSelect);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
