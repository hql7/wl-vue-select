<template>
  <div id="app">
    <wlVueSelect
      v-model="value"
      :props="props"
      :data="data"
      multiple
      default-select
    ></wlVueSelect>
  </div>
</template>

<script>
import wlVueSelect from "./components/wl-vue-select.vue";

export default {
  name: "app",
  data() {
    return {
      value: [], // 选中值
      data: [
        {
          id: 1,
          name: "海边"
        },
        {
          id: 2,
          name: "森林"
        },
        {
          id: 3,
          name: "草原"
        },
        {
          id: 4,
          name: "古城"
        }
      ], // 数据
      props: {
        label: "name",
        value: "id"
      } // 配置
    };
  },
  components: {
    wlVueSelect
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
