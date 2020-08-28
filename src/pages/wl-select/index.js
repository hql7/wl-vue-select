import WlVueSelect from "./wl-vue-select.vue";

WlVueSelect.install = function (Vue) {
  Vue.component(WlVueSelect.name, WlVueSelect);
};

export default WlVueSelect;
