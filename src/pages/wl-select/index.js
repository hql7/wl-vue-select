import wlVueSelect from "./wl-vue-select.vue";

wlVueSelect.install = function(Vue) {
  Vue.component(wlVueSelect.name, wlVueSelect);
};

export default wlVueSelect;
