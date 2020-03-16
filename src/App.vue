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
      ref="wl-tree-select"
      width="240"
      checkbox
      size="small"
      noCheckedClose
      node-key="id"
      collapse-tags
      :data="treeData"
      @change="hindleChanged"
      v-model="selected"
    ></wlTreeSelect>
    <div class="btn">
      <el-button size="small">关闭treeSelect下拉框</el-button>
    </div>
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
      selected: ["1"] // 树下拉框选中数据
    };
  },
  methods: {
    hindleChanged(val) {
      // console.log(val,2)
      // console.log(this.selected)
    },
    // 手动关闭树形下拉框选项
    closeSelect() {
      this.$refs["wl-tree-select"].closeOptions();
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
.btn {
  margin-top: 60px;
  text-align: right;
}
</style>
