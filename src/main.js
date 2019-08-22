import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";

import wl from "wl-vue-select";
import "wl-vue-select/lib/wl-vue-select.css"
Vue.use(wl);
// Vue.use(wl.wlVueSelect);
// Vue.use(wl.wlTreeSelect);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
