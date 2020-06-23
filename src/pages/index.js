import WlVueSelect from "./wl-select/";
import WlTreeSelect from "./wl-tree/";

const components = [WlVueSelect, WlTreeSelect];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export {
  WlVueSelect,
  WlTreeSelect
}

export default {
  install,
  WlVueSelect,
  WlTreeSelect
};
