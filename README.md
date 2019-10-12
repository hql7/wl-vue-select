# wl-vue-select

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

#简介

本组件提供全选下拉框和树形下拉框功能。
`wlVueSelect`这是一个基于 elementUi 的 el-select 组件的二次封装的下拉框，提供了全选功能和默认选中功能；
`wlTreeSelect`这是一个基于 elementUi 的 el-tree 组件的二次封装的下拉框，提供了树形数据支持和默认选中功能；
因这两个需求非常普遍，所以作为一个独立插件发布。
[el-select](https://element.eleme.cn/#/zh-CN/component/select)

## [在线访问](https://hql7.github.io/)

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
      checkbox
      width="240"
      :data="treeData"
      :selected="selected"
    ></wlTreeSelect>
```
## 文档

| 序号 | 参数          | 说明                                                                                                 | 类型                | 可选值 | 默认值                             |
| ---- | ------------- | ---------------------------------------------------------------------------------------------------- | ------------------- | ------ | ---------------------------------- |
| 1    | data          | options 可选列表数据                                                                                 | Array               | -      | -                                  |
| 2    | props         | 配置项：显示名字的 label 字段和绑定值的 value 字段                                                   | Object              | -      | { label: "label", value: "value" } |
| 3    | showTotal     | 当可选项大于多少个时显示`全选`选项                                                                   | Number              | -      | 1                                  |
| 4    | defaultSelect | 是否启用默认选中,如果开启`全部`时选中全部，无全部时选中第一个。(开启此功能请不要给 v-model 赋初始值) | Boolean             | -      | false                              |
| 5    | 其他          | [其他 el-select 提供的参数](https://element.eleme.cn/#/zh-CN/component/select)                       | -                   | -      | -                                  |
| 6    | nodeKey       | 使用树形下拉框时，必须使用 key 来解析数据                                                            | String              | -      | id                                 |
| 7    | selected      | 使用树形下拉框时，绑定选中数据,未开启checkbox时不可使用Array类型                                                                   | String-Number-Array-Object | -      | -                                  |
| 8    | checkbox      | 使用树形下拉框时,是否开启多选                                                                        | Boolean             | -      | false                              |
| 9    | width         | 使用树形下拉框时宽度,默认单位 px                                                                     | String-Number       | -      | 240                                |
| 10 | leaf | 树形下拉框时，是否只可选叶子节点 | Boolean | - | false |

## 版本记录

> 0.2.7 优化树形下拉框单选时，可选层级，并增加`leaf`参数设置是否只可选择叶子节点，优化树形单选时，默认选中为object类型时的高亮效果

> 0.2.5 优化树形下拉框筛选算法，优化树形下拉框在可选项太长时增加滚动效果

> 0.2.4 修复showTotal大于data长度时，出现了empty的问题

> 0.2.3 更新示例

> 0.2.2 增加树形下拉框

> 0.1.2 更新算法，全选转单选时无需手动取消全选选项

> 0.1.0 初次发布，在基于 el-select 上增加全选和默认选中功能
