import wlVueSelect from "./wl-select/";
import wlTreeSelect from "./wl-tree/";

const components = [wlVueSelect, wlTreeSelect];

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
  wlVueSelect,
  wlTreeSelect
};
