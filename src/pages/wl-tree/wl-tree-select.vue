// 树形下拉框
<template>
  <div class="wl-tree-select" :style="{ width: width + 'px' }">
    <!-- 选中框区 -->
    <el-popover placement="bottom" trigger="manual" :width="width" v-model="options_show">
      <el-scrollbar class="wl-treeselect-popover">
      <el-tree
        ref="tree-select"
        class="wl-options-tree"
        highlight-current
        default-expand-all
        :data="selfData"
        :props="selfProps"
        :node-key="nodeKey"
        :show-checkbox="checkbox"
        :expand-on-click-node="false"
        :default-checked-keys="checked_keys"
        @check-change="handleCheckChange"
        @node-click="treeItemClick"
      >
      </el-tree>
      </el-scrollbar>
      <!---->
      <div slot="reference" class="selected-box" @click="options_show = !options_show">
        <div class="tag-box">
          <el-tag
            size="medium"
            v-for="item in selecteds"
            closable
            :key="item[nodeKey]"
            @close="tabClose(item[nodeKey])"
          >
            {{ item[selfProps.label] }}
          </el-tag>
        </div>
        <div class="icon-box">
          <transition name="fade-rotate" mode="out-in">
            <i class="el-icon-arrow-down" v-if="!options_show" key="top"></i>
            <i class="el-icon-arrow-up" v-else key="btm"></i>
          </transition>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
/**
 * name:"树形select"
 * description:"基于element-ui的tab和tree的树形下拉选项框"
 * auth:weilan
 * github: https://github.com/hql7
 * props:
 * data -> 数据
 * props -> 数据options
 * nodeKey -> 数据key字段
 * selected -> 选中数据
 * checkbox -> 是否多选
 * emit:
 * selected -> 选中数据
 */
export default {
  name: "wlTreeSelect",
  data() {
    return {
      selecteds: [], // 选中数据
      options_show: false, // 是否显示下拉选项
      checked_keys: [], // 默认选中
      guid: "00000000-0000-0000-0000-000000000000"
    };
  },
  props: {
    // 数据
    data: {
      type: Array,
      default: () => []
    },
    // 树结构配置
    props: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // node-key
    nodeKey: {
      type: String,
      default: "id"
    },
    // 选中数据
    selected: [String, Number, Array, Object],
    // 是否可多选
    checkbox: {
      type: Boolean,
      default: false
    },
    // 是否只可选叶子节点
    leaf: {
      type: Boolean,
      default: false
    },
    // 宽度
    width: String
  },
  methods: {
    // 树节点-checkbox选中
    handleCheckChange(val) {
      let nodes = this.$refs["tree-select"].getCheckedNodes(true);
      this.selecteds = nodes;
    },
    // 树节点-点击选中
    treeItemClick(item, node) {
      if (this.checkbox || (this.leaf && !node.isLeaf)) {
        return;
      }
      this.selecteds = [item];
      this.options_show = false;
    },
    // tag标签关闭
    tabClose(Id) {
      this.selecteds.splice(
        this.selecteds.findIndex(item => item[this.nodeKey] === Id),
        1
      );
      this.checkbox
        ? this.$refs["tree-select"].setChecked(Id, false)
        : this.$refs["tree-select"].setCurrentKey(null);
    },
    // 清空数据
    clear() {
      this.selecteds = [];
    },
    // 处理默认选中数据
    chaeckDefaultValue() {
      let val = this.selected;
      if (!val) return;
      if (this.checkbox) {
        this.checked_keys = val;
        this.$nextTick(() => {
          this.selecteds = this.$refs["tree-select"].getCheckedNodes(true);
        });
      } else {
        if(typeof val === 'object'){
          this.selecteds = [val];
          this.$nextTick(() => {
            this.$refs["tree-select"].setCurrentNode(val);
          });
        }else{
          this.$nextTick(() => {
            this.$refs["tree-select"].setCurrentKey(val);
            let _node = this.$refs["tree-select"].getCurrentNode();
            this.selecteds = [_node];
          });
        }
      }
    }
  },
  created() {
    this.chaeckDefaultValue();
  },
  watch: {
    selecteds(val) {
      this.$emit("selected", val);
    },
    selected(val) {
      this.chaeckDefaultValue();
    }
  },
  computed: {
    selfData() {
      return this.data;
    },
    selfProps() {
      return {
        label: "name",
        children: "children",
        disabled: data => {
          return data.disabled;
        },
        ...this.props
      };
    }
  }
};
</script>

<style lang="scss">
.wl-tree-select {
  position: relative;
  display: inline-block;
  width: 240px;
  outline: none;

  .selected-box {
    display: flex;
    border: 1px solid #dcdfe6;
    padding: 0 10px;
    width: 100%;
    min-height: 36px;
    line-height: 34px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    &:focus {
      border-color: #409eff;
    }

    > .tag-box {
      display: inline-block;
      width: calc(100% - 20px);
      text-align: left;
    }

    > .icon-box {
      float: right;
      display: flex;
      width: 20px;
      justify-content: center;
      align-items: Center;
      color: #c0c4cc;
    }
  }

  .el-tag + .el-tag {
    margin-left: 4px;
  }
}

.wl-treeselect-popover{
  height: 360px;
  >.el-scrollbar__wrap{
    overflow-x: hidden;
  }
}

.wl-options-tree {
  .el-tree-node__content {
    height: 34px;
    line-height: 34px;
  }
}


.fade-rotate-enter-active {
  animation: rotate 0.3s;
}

.fade-rotate-leave-active {
  animation: rotate 0.3s reverse;
}

@keyframes rotate {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
