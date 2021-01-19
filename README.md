# wl-vue-select，wl-tree-select

# 简介
用于vue框架的树形下拉框及带全选的普通下拉框。   
Tree drop-down box for vue framework and ordinary drop-down box with select all.   
本组件提供全选下拉框和树形下拉框功能。    
`wlVueSelect`这是一个基于 elementUi 的 el-select 组件的二次封装的下拉框，提供了全选功能和默认选中功能；   
`wlTreeSelect`这是一个基于 elementUi 的 el-tree 组件的二次封装的下拉框，提供了树形数据支持和默认选中功能；    
因这两个需求非常普遍，所以作为一个独立插件发布。    
[el-select](https://element.eleme.cn/#/zh-CN/component/select)

## [在线访问](http://wlui.com.cn/ui/select)

### 主要发布记录
> 0.4.8 修复树形下拉框，子节点全部选中时，父节点无法取消的问题

## 快速上手

`npm i wl-vue-select --save`

或

`npm i wl-vue-select -S`

使用

``` jsvascript
import wl from "wl-vue-select";`
import "wl-vue-select/lib/wl-vue-select.css"
Vue.use(wl);
```

``` template
    <wlVueSelect
      v-model="value"
      :props="props"
      :data="data"
      multiple
      default-select
    ></wlVueSelect>
    <p>----------分割线------------</p>
    <wlTreeSelect
      leaf
      width="240"
      checkbox
      :data="treeData"
      @change="hindleChanged"
      v-model="selected"
    ></wlTreeSelect>
```

``` jsvascript
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
                  name: "蓬莱",
                }
              ]
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
          ]
        }
      ],
      selected: [ "1" ]// 树下拉框选中数据
    };
  },
  methods: {
    hindleChanged(val){
      console.log(val,2)
      console.log(this.selected)
    }
  },
```

## 文档

| 序号 | 参数          | 说明                                                                                                 | 类型                | 可选值 | 默认值                             |
| ---- | ------------- | ---------------------------------------------------------------------------------------------------- | ------------------- | ------ | ---------------------------------- |
| 1    | data          | options 可选列表数据                                                                                 | Array               | -      | -                                  |
| 2    | props         | 配置项：显示名字的 label 字段和绑定值的 value 字段                                                   | Object              | -      | { label: "label", value: "value" } |
| 3    | showTotal     | 当可选项大于多少个时显示`全选`选项                                                                   | Number              | -      | 1                                  |
| 4    | defaultSelect[废弃] | 是否启用默认选中,如果开启`全部`时选中全部，无全部时选中第一个。(开启此功能请不要给 v-model 赋初始值) | Boolean             | -      | false                              |
| 5    | 其他          | [其他 el-select 提供的参数](https://element.eleme.cn/#/zh-CN/component/select)                       | -                   | -      | -                                  |
| 6    | nodeKey       | 使用树形下拉框时，必须使用 key 来解析数据                                                            | String              | -      | id                                 |
| 7    | selected[废弃]      | 使用树形下拉框时，绑定选中数据【现改为v-model 】                                                                  | String-Number-Array-Object | -      | -                                  |
| 8    | checkbox      | 使用树形下拉框时,是否开启多选                                                                        | Boolean             | -      | false                              |
| 9    | width         | 使用树形下拉框时宽度,默认单位 px                                                                     | String-Number       | -      | 240                                |
| 10 | leaf | 树形下拉框时，是否只可选叶子节点 | Boolean | - | false |
| 11 | trigger | 树形下拉框时，触发方式 | String | click/focus/hover/manual | click |
| 12 | v-model | 普通及树形下拉框绑定值，用法与普通表单元素相同 | String-Number-Array-Object | - | - |
| 13 | disabled | 是否禁用下拉框 | Boolean | - | false |
| 14 | nowrap | 是否不允许多行显示，true则只显示一行 | Boolean | - | false |
| 15 | noCheckedClose | 多选时，是否全部取消选中时，自动关闭选项区域 | Boolean | - | false |
| 16 | size | 尺寸，用法同elementui | String | - | medium |
| 17 | defaultExpandAll | 树形时，是否默认展开全部选项 | Boolean | - | true |
| 18 | defaultExpandedKeys | 树形时，默认展开节点keys | Array | - | - |
| 19 | filterable | 是否开启搜索功能(增加树形下拉时，和普通下拉框一样的功能) | Boolean | - | false |
| 20 | filterFnc | 树形时，可选自定义搜索逻辑，不传则根据props内的label对应的字段搜索。function(value,data) | Function | - | - |
| 21 | checkStrictly | 树形时，是否父子不关联 | Boolean | - | false |
| 22 | expandOnClickNode | 树形时，是否点击节点能展开收缩 | Boolean | - | false |
| 23 | checkOnClickNode | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点 | Boolean | - | false | 

## Methods 方法
| 序号 | name | 说明 | 参数 |
| ---- | ---- | ---- | ---- |
| 1 | closeOptions | 关闭树形下拉框的选项区 | - |

## 版本记录

> 0.5.8 树形下拉框增加父子不关联配置

> 0.5.5 修复树形下拉框初始绑定值为简单数组时的自动选中逻辑错误；修复垂直居中样式；

> 0.5.4 修复初始时选中全部数据，显示区列出来每一项而不是显示'全部'的问题；增加script引入使用功能

> 0.5.3 调整组件名为大驼峰；增加按需引入

> 0.5.2 优化树形下拉框，增加搜索及自定义搜索功能

> 0.5.1 优化树形下拉框，选项显示过度效果

> 0.5.0 增加树形树形下拉框defaultExpandAll，defaultExpandedKeys字段

> 0.4.9 增加关闭树形下拉框的选项区closeOptions方法

> 0.4.8 修复树形下拉框，子节点全部选中时，父节点无法取消的问题

> 0.4.7 优化树形下拉框，支持[el-select](https://element.eleme.cn/#/zh-CN/component/select)的collapse-tags

> 0.4.6 优化树形下拉框，使size属性生效

> 0.4.5 优化树形下拉框placeholder，增加参数管理全部取消选中时收起选项

> 0.4.2 优化树形下拉框，增加是否不允许多行显示字段

> 0.4.1 优化树形下拉框，增加禁用字段

> 0.3.9 优化树形下拉框默认传进来的选中数据为复杂型数组时，提取id；

> 0.3.8 修复树形下拉框多选时，数据为空时只清理了显示区未清理树chekcbox的问题

> 0.3.7 修改树形下拉框单选时默然选中是否只选子节点根据leaf字段

> 0.3.5 修复树形下拉框单选时的默认选择的缺陷【绑定值为数组时】

> 0.3.4 修复树形下拉框el-tree默认选中字段为空，getNodes方法还能获取到上次值的问题，更新rademe示例

> 0.3.3 修复树形下拉框开启多选时无限循环的问题，优化多选时根据`leaf`字段来确定是否只返回叶子节点

> 0.3.2 优化树形下拉框横向超出不显示问题

> 0.3.0 优化树形下拉框，增加触发显示方式字段

> 0.2.7 优化树形下拉框单选时，可选层级，并增加`leaf`参数设置是否只可选择叶子节点，优化树形单选时，默认选中为object类型时的高亮效果

> 0.2.5 优化树形下拉框筛选算法，优化树形下拉框在可选项太长时增加滚动效果

> 0.2.4 修复showTotal大于data长度时，出现了empty的问题

> 0.2.3 更新示例

> 0.2.2 增加树形下拉框

> 0.1.2 更新算法，全选转单选时无需手动取消全选选项

> 0.1.0 初次发布，在基于 el-select 上增加全选和默认选中功能
