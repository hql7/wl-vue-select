// 树形下拉框
<template>
  <div class="wl-tree-select" :style="{ width: width + 'px' }">
    <!-- 选中框区 -->
    <el-popover placement="bottom" trigger="click" :width="width">
      <el-tree
        ref="tree-select"
        class="wl-options-tree"
        highlight-current
        :default-expand-all="defaultExpandAll"
        :default-expanded-keys="defaultExpandedKeys"
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
      <!---->
      <div slot="reference" class="selected-box">
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
import { valInDeep } from "@/util/array";
export default {
  name: "wl-tree-select",
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
    selected: [String, Number, Array],
    // 是否可多选
    checkbox: {
      type: Boolean,
      default: false
    },
    // 宽度
    width: String,
    //是否展开全部
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    //默认展开的节点的 key 的数组
    defaultExpandedKeys: {
      type: Boolean,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    // 树节点-checkbox选中
    handleCheckChange(val) {
      let nodes = this.$refs["tree-select"].getCheckedNodes(true);
      this.selecteds = nodes;
    },
    // 树节点-点击选中
    treeItemClick(item, node) {
      if (this.checkbox || node.level <= 1) {
        return;
      }

      this.selecteds = [data];
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
    // 查询节点
    querySelectedItem(data, val) {
      if (val == this.guid) return;
      this.selecteds = valInDeep(data, val, this.nodeKey, this.props.children);
    },
    // 处理默认选中数据
    chaeckDefaultValue() {
      if (!this.selected) return;
      if (this.checkbox) {
        this.checked_keys = this.selected;
        this.$nextTick(() => {
          this.selecteds = this.$refs["tree-select"].getCheckedNodes(true);
        });
      } else {
        this.querySelectedItem(this.selfData, this.selected);
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

.wl-options-tree .el-tree-node__content {
  height: 34px;
  line-height: 34px;
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
