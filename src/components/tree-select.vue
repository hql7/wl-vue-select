// 树形下拉框
<template>
  <div class="tree-select">
    <!-- 选中框区 -->
    <div
      class="selected-box"
      tabindex="1"
      @click.stop="options_show = !options_show"
    >
      <!-- tab盒子 -->
      <div class="tag-box">
        <el-tag
          size="small"
          v-for="item in selecteds"
          :key="item[nodeKey]"
          @close="tabClose(item[nodeKey])"
          closable
        >
          {{ item[props.label] }}
        </el-tag>
      </div>
      <!-- 旋转图标盒子 -->
      <div class="icon-box">
        <transition name="fade-rotate" mode="out-in">
          <i class="el-icon-arrow-down" v-if="!options_show" key="top"></i>
          <i class="el-icon-arrow-up" v-else key="btm"></i>
        </transition>
      </div>
    </div>
    <!-- 选项区 -->
    <transition name="fade-in">
      <el-scrollbar class="options-tree-scroll" v-show="options_show">
        <el-tree
          ref="tree-select"
          class="options-tree"
          :default-checked-keys="checked_keys"
          :props="props"
          :data="selfData"
          default-expand-all
          :show-checkbox="checkbox"
          :node-key="nodeKey"
          :expand-on-click-node="false"
          highlight-current
          @check-change="handleCheckChange"
          @node-click="treeItemClick"
        >
        </el-tree>
      </el-scrollbar>
    </transition>
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
  data() {
    return {
      selecteds: [], // 选中数据
      options_show: false, // 是否显示下拉选项
      checked_keys: [] // 默认选中
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
        return {
          label: "Name",
          children: "Children",
          disabled: data => {
            return data.Disabled;
          }
        };
      }
    },
    // node-key
    nodeKey: {
      type: String,
      default: "Id"
    },
    // 选中数据
    selected: [String, Number],
    // 是否可多选
    checkbox: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 树节点-checkbox选中
    handleCheckChange(val) {
      let nodes = this.$refs["tree-select"].getCheckedNodes(true);
      this.selecteds = nodes;
    },
    // 树节点-点击选中
    treeItemClick(data, node) {
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
      if (val == _gc_.guid) return;
      this.selecteds = valInDeep(data, val, this.nodeKey, this.props.children);
    }
  },
  watch: {
    selecteds(val) {
      this.$emit("selected", val);
    },
    selected(val) {
      if (this.checkbox) {
        this.checked_keys = val;
        this.$nextTick(() => {
          this.selecteds = this.$refs["tree-select"].getCheckedNodes(true);
        });
      } else {
        this.querySelectedItem(this.selfData, val);
      }
    }
  },
  computed: {
    selfData() {
      return this.data;
    }
  }
};
</script>

<style lang="scss">
.tree-select {
  position: relative;
  outline: none;

  > .selected-box {
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
      margin-top: 0px;
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
  > .options-tree-scroll {
    position: absolute;
    width: 100%;
    height: 460px;
    z-index: 9;
    background-color: #fbfbfb;
    border-radius: 4px;
    box-sizing: border-box;

    > .el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .options-tree {
      border: 1px solid #f5f5f5;

      padding: 10px;
    }
  }
}

.fade-rotate-enter-active {
  animation: rotate 0.3s;
}

.fade-rotate-leave-active {
  animation: rotate 0.3s reverse;
}

.fade-in-enter-active {
  animation: fade-in 0.3s;
}

.fade-in-leave-active {
  animation: fade-in 0.3s reverse;
}

@keyframes rotate {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
