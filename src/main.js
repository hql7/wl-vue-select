import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";

// import wlVueSelect from "wl-vue-select";
// Vue.use(wlVueSelect);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
