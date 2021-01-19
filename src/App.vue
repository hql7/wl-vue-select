<template>
  <div id="app">
    <!---->
    <wl-vue-select
      v-model="value"
      :props="props"
      :data="data"
      multiple
      filterable
      collapse-tags
      noCheckedClose
      @change="hindleChanged"
    ></wl-vue-select>
    <p>----------分割线------------</p>
    <wl-tree-select
      ref="wl-tree-select"
      v-model="selected"
      checkOnClickNode
      node-key="id"
      width="240"
      leaf
      checkbox
      collapse-tags
      filterable
      noCheckedClose
      :data="treeData"
      :defaultExpandAll="false"
      :defaultExpandedKeys="[1]"
      @change="hindleChanged"
    ></wl-tree-select>
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
  components: {
    wlVueSelect,
    wlTreeSelect,
  },
  data() {
    return {
      value: [2, 1, 3, 4], // 选中值
      data: [
        {
          id: 1,
          name: "海边",
        },
        {
          id: 2,
          name: "森林",
        },
        {
          id: 3,
          name: "草原",
        },
        {
          id: 4,
          name: "古城",
        },
      ], // 数据
      props: {
        label: "name",
        value: "id",
      }, // 配置
      treeData: [
        {
          children: [
            { name: "安全运营-子类型001", id: "4028dbde729c1e0301729c1fa7390001" },
            { name: "安全运营-子1", id: "8a8be6ac72ad7a3a0172bb37f6e40001" },
            { name: "安全运营-子2", id: "8a8be6ac72ad7a3a0172bb381bbf0002" },
            { name: "安全运营-子3", id: "8a8be6ac72ad7a3a0172bb3843e60003" },
          ],
          name: "安全运营",
          id: "4028dbde729c1e0301729c1ea1560000",
        },
        {
          children: [
            { name: "测试类型二", id: "8a8be6ac72a68ea60172a7312cf30002" },
            { name: "测试类型-子1", id: "8a8be6ac72ad7a3a0172bb38804c0004" },
            { name: "测试类型-子2", id: "8a8be6ac72ad7a3a0172bb3893d30005" },
            { name: "测试类型-子3", id: "8a8be6ac72ad7a3a0172bb38a6f50006" },
          ],
          name: "测试类型",
          id: "8a8be6ac72a68ea60172a730ef8a0001",
        },
        { children: [], name: "测试类型六", id: "8a8be6ac72a68ea60172a73200340003" },
      ],
      selected: ["4028dbde729c1e0301729c1ea1560000"], // 树下拉框选中数据
    };
  },
  methods: {
    hindleChanged(val) {
      console.log(val);
      // console.log(this.selected)
    },
    // 手动关闭树形下拉框选项
    closeSelect() {
      this.$refs["wl-tree-select"].closeOptions();
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.selected = ["8a8be6ac72a68ea60172a73200340003"];
    // }, 1200);
  },
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
