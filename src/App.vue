<template>
  <div id="app">
    <!---->
    <wlVueSelect
      v-model="value"
      :props="props"
      :data="data"
      multiple
      collapse-tags
      default-select
      noCheckedClose
    ></wlVueSelect>
    <p>----------分割线------------</p>
    <wlTreeSelect
      width="240"
      checkbox
      size="small"
      noCheckedClose
      collapse-tags
      :data="treeData"
      @change="hindleChanged"
      v-model="selected"
    ></wlTreeSelect>
  </div>
</template>

<script>
import wlTreeSelect from "./pages/wl-tree/wl-tree-select.vue";
import wlVueSelect from "./pages/wl-select/wl-vue-select.vue";

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
      }, // 配置
      treeData: [
        {
          id: "love",
          name: "所有和你走过的风光",
          children: [
            {
              id: 1,
              name: "海边",
              children: [
                {
                  id: 5,
                  name: "蓬莱"
                },
                {
                  id: 6,
                  name: "威海"
                }
              ]
            },
            {
              id: 2,
              name: "森林",
              children: []
            },
            {
              id: 3,
              name: "草原"
            },
            {
              id: 4,
              name: "古城"
            }
          ]
        }
      ],
      selected: ["2", "3"] // 树下拉框选中数据
    };
  },
  methods: {
    hindleChanged(val) {
      // console.log(val,2)
      // console.log(this.selected)
    }
  },
  components: {
    wlVueSelect,
    wlTreeSelect
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
