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
  这是一个基于elementUi的el-select组件的二次封装的下拉框，增加了全选功能和默认选中功能，因这两个需求非常普遍，所以作为一个独立插件发布。
  [el-select](https://element.eleme.cn/#/zh-CN/component/select)

## [在线访问](https://hql7.github.io/)

## 快速上手

`npm i wl-vue-select --save`

或

`npm i wl-vue-select -S`

`import wlSelect from 'wl-vue-select'`

`Vue.use(wlSelect)`

## 文档

  | 序号 | 参数 | 说明 | 类型 | 可选值 | 默认值 |
  | ---- | ---- | ---- | ---- | ---- | ---- |
  | 1 | data | options可选列表数据 | Array | - | - |
  | 2 | props | 配置项：显示名字的label字段和绑定值的value字段 | Object | - | { label: "label", value: "value" } |
  | 3 | showTotal | 当可选项大于多少个时显示`全选`选项 | Number | - | 1 |
  | 4 | defaultSelect | 是否启用默认选中,如果开启`全部`时选中全部，无全部时选中第一个。(开启此功能请不要给v-model赋初始值) | Boolean | - | false |
  | 5 | 其他 | [其他el-select提供的参数](https://element.eleme.cn/#/zh-CN/component/select) | - | - | -|

## 版本记录

> 0.1.2 更新算法，全选转单选时无需手动取消全选选项

> 0.1.0 初次发布，在基于el-select上增加全选和默认选中功能
  