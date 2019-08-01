import wlVueSelect from "./wl-select/";

const components = [wlVueSelect];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  wlVueSelect
};
