// 树形下拉框
<template>
  <div class="wl-tree-select" :style="{ width: width + 'px' }">
    <!-- 选中框区 -->
    <el-popover
      placement="bottom"
      :trigger="trigger"
      :disabled="disabled"
      :width="width"
      v-model="options_show"
    >
      <el-scrollbar class="wl-treeselect-popover">
        <el-tree
          ref="tree-select"
          class="wl-options-tree"
          highlight-current
          :data="selfData"
          :props="selfProps"
          :node-key="nodeKey"
          :show-checkbox="checkbox"
          :expand-on-click-node="false"
          :default-checked-keys="checked_keys"
          :default-expand-all="defaultExpandAll"
          :default-expanded-keys="defaultExpandedKeys"
          @check="handleCheckChange"
          @node-click="treeItemClick"
        ></el-tree>
      </el-scrollbar>
      <!---->
      <div
        slot="reference"
        class="selected-box"
        :class="[{'wl-disabled': disabled, 'no-wrap': nowrap }, sizeClass]"
      >
        <div class="tag-box">
          <div v-show="selecteds.length > 0">
            <template v-if="!collapseTags">
              <el-tag
                closable
                :size="size"
                class="wl-select-tag"
                v-for="item in selecteds"
                :title="item[selfProps.label]"
                :key="item[nodeKey]"
                @close="tabClose(item[nodeKey])"
              >{{ item[selfProps.label] }}</el-tag>
            </template>
            <template v-else>
              <el-tag
                closable
                :size="size"
                class="wl-select-tag"
                :title="collapseTagsItem[selfProps.label]"
                @close="tabClose(collapseTagsItem[nodeKey])"
              >{{ collapseTagsItem[selfProps.label] }}</el-tag>
              <el-tag
                v-if="this.selecteds.length>1"
                :size="size"
                class="wl-select-tag"
              >+{{ this.selecteds.length-1}}</el-tag>
            </template>
          </div>
          <p class="wl-placeholder-box" v-show="selecteds.length == 0">{{placeholder}}</p>
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
    value: [String, Number, Array, Object],
    // 是否可多选
    checkbox: {
      type: Boolean,
      default: false
    },
    // 多选时是否将选中值按文字的形式展示
    collapseTags: {
      type: Boolean,
      default: false
    },
    // 是否只可选叶子节点
    leaf: {
      type: Boolean,
      default: false
    },
    // 宽度
    width: String,
    // 触发方式 click/focus/hover/manual
    trigger: {
      type: String,
      default: "click"
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否允许多行显示
    nowrap: {
      type: Boolean,
      default: false
    },
    // 多选时，清空选项关闭
    noCheckedClose: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    size: {
      type: String,
      default: "medium"
    },
    //是否展开全部
    defaultExpandAll: {
      type: Boolean,
      default: true
    },
    //默认展开的节点的 key 的数组
    defaultExpandedKeys: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  model: {
    prop: "value", //这里使我们定义的v-model属性
    event: "change"
  },
  methods: {
    // 树节点-checkbox选中
    handleCheckChange(val, { checkedNodes, checkedKeys }) {
      /* let nodes = [];
      if (this.leaf) {
        nodes = this.$refs["tree-select"].getCheckedNodes(this.leaf);
      } else {
        checkedNodes.forEach(i => {
          let parent_node =
            Array.isArray(i[this.selfProps.children]) &&
            i[this.selfProps.children].length > 0;
          nodes.push();
        });
      }
      */
      let nodes = this.$refs["tree-select"].getCheckedNodes(this.leaf);
      this.selecteds = nodes;
      this.$emit("change", nodes);
      if (checkedKeys.length === 0 && this.noCheckedClose)
        this.options_show = false;
    },
    // 树节点-点击选中
    treeItemClick(item, node) {
      if (this.checkbox || (this.leaf && !node.isLeaf)) {
        return;
      }
      this.selecteds = [item];
      this.options_show = false;
      this.$emit("change", this.selecteds);
    },
    // tag标签关闭
    tabClose(Id) {
      if (this.disabled) return;
      if (this.checkbox) {
        this.$refs["tree-select"].setChecked(Id, false, true);
        this.selecteds = this.$refs["tree-select"].getCheckedNodes()
        if (this.selecteds.length === 0 && this.noCheckedClose)
          this.options_show = false;
      } else {
        this.selecteds = [];
        this.$refs["tree-select"].setCurrentKey(null);
        this.options_show = false;
      }
      this.$emit("change", this.selecteds);
    },
    // 清空数据
    clear() {
      this.selecteds = [];
    },
    // 处理默认选中数据
    chaeckDefaultValue() {
      let val = this.value;

      if (!val || (Array.isArray(val) && val.length === 0)) {
        this.selecteds = [];
        if (!this.checkbox) return;
        this.checked_keys = [];
        this.$nextTick(() => {
          this.$refs["tree-select"].setCheckedKeys([]);
        });
        return;
      }
      // 多选处理
      if (this.checkbox) {
        this.checked_keys =
          typeof val[0] === "object" ? val.map(i => i[this.nodeKey]) : val;
        this.$nextTick(() => {
          this.selecteds = this.$refs["tree-select"].getCheckedNodes(this.leaf);
        });
        return;
      }
      // 单选处理
      if (typeof val === "object") {
        let _val = Array.isArray(val) ? val[0] : val;
        this.selecteds = [_val];
        this.$nextTick(() => {
          this.$refs["tree-select"].setCurrentNode(_val);
        });
      } else {
        this.$nextTick(() => {
          this.$refs["tree-select"].setCurrentKey(val);
          let _node = this.$refs["tree-select"].getCurrentNode();
          this.selecteds = _node ? [_node] : [];
        });
      }
    },
    // 关闭
    closeOptions(){
      this.options_show = false;
    }
  },
  created() {
    this.chaeckDefaultValue();
  },
  watch: {
    value(val) {
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
    },
    sizeClass() {
      let size_class = "size-medium";
      switch (this.size) {
        case "medium":
          size_class = "size-medium";
          break;
        case "small":
          size_class = "size-small";
          break;
        case "default":
          size_class = "size-default";
          break;
        case "mini":
          size_class = "size-mini";
          break;
        default:
          size_class = "size-medium";
          break;
      }
      return size_class;
    },
    // 开启collapseTags时首个选中值
    collapseTagsItem() {
      return this.selecteds[0] || {};
    }
  }
};
</script>

<style lang="scss">
.wl-tree-select {
  position: relative;
  display: inline-block;
  width: 240px;
  vertical-align: middle;
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

  .selected-box.size-small {
    min-height: 32px;
    line-height: 30px;
  }
  .selected-box.size-mini {
    min-height: 28px;
    line-height: 26px;
  }
  .selected-box.size-default {
    min-height: 40px;
    line-height: 38px;
  }

  .no-wrap {
    height: 36px;
    > .tag-box {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .wl-disabled {
    background: #eee;
    cursor: no-drop;
    &:focus {
      border-color: #dcdfe6;
    }
    .el-tag__close {
      cursor: no-drop;
    }
  }

  .wl-select-tag {
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    vertical-align: middle;
  }

  .wl-select-tag + .wl-select-tag {
    margin-left: 4px;
  }
}

.wl-treeselect-popover {
  height: 360px;
  > .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.wl-options-tree {
  display: inline-block !important;
  min-width: 100%;

  .el-tree-node__content {
    height: 34px;
    line-height: 34px;
  }
}

.wl-placeholder-box {
  color: #c0c4cc;
  margin: 0;
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
