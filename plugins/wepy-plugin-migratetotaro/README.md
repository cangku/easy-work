## 迁移 wepy 到 taro 插件

wepy 项目中使用 `wepy-plugin-migrate2taro` 插件直接编译 wepy 项目到 taro 项目中使用。

### 背景介绍

原小程序使用 wepy 开发，新小程序使用 taro 开发，新的小程序需要使用原小程序的流程页面。不希望用户从新小程序中跳转到原小程序中使用流程，直接编译原小程序到新的小程序中，同一份代码作为新的小程序。

渐进式使用 taro 重构 wepy 项目，编译后以 `callback` 的形式修改页面跳转逻辑，然后跳转到的 taro 的页面中。例如：原小程序中开发来一个订单页面 pages/order/list ，迁移后的地址 wepy/pages/order/list ，个人中心查看订单列表时跳转地址应该是 /wepy/pages/order/list 。如果我们新小程序中也开发了一个新的订单页面 pages/order/list ，只需要在迁移插件回调中按照业务实际需求替换到跳转 path 中的 wepy 。（实际情况以配置位置，这里的 wepy 仅做演示命名）

原小程序需要使用 taro 开发的组件。

两个小程序独立运行。

### 如何安装

因为 wepy 2.0 目前正式版本还未发布，暂时仅在 1.7.\* 版本中测试使用，如果后续 2.0 正式版发布不能使用再做功能修复。

```
npm i wepy-plugin-migrate2taro -D
```

### 如何配置

wepy.config.js 中配置插件

```javascript
plugins: {
    migrate2taro: {
    }
}
```

### 参数说明

| 参数           | 说明                                                                                        | 类型    | 默认值 |
| -------------- | ------------------------------------------------------------------------------------------- | ------- | ------ |
| outputRoot     | 同编译输出目录 target，建议配置到 taro 编译目录一级目录                                     | string  | -      |
| pages          | 仅使用项目中指定页面（不使用的页面暂时也会被编译需要手动清理）                              | array   | -      |
| needComponents | 项目中指定的页面或组件需要使用 taro 开发的组件                                              | array   | -      |
| sub            | 编译到主包或者子模块，默认编译到子模块（监控模式开启下修改该值请重新编译 taro 再编译 wepy） | boolean | true   |

### 项目演示

```
cd example/wepy2taro
npm i
cd wepyproject
npm i
cd ../
npm run migrate
```
