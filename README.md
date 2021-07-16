# 🧑‍💻 代码阅读指南

## 📈 统计

> power by VScode Count

### Languages
| language | files | code | comment | blank | total |
| :--- | ---: | ---: | ---: | ---: | ---: |
| TypeScript | 12 | 614 | 216 | 136 | 966 |
| TypeScript React | 1 | 13 | 2 | 2 | 17 |

### Directories
| path | files | code | comment | blank | total |
| :--- | ---: | ---: | ---: | ---: | ---: |
| . | 13 | 627 | 218 | 138 | 983 |
| advance-defined-plugin | 1 | 45 | 3 | 9 | 57 |
| plugin-themes | 12 | 582 | 215 | 129 | 926 |
| plugin-themes/plugins | 5 | 286 | 97 | 63 | 446 |
| plugin-themes/plugins/helper | 2 | 143 | 60 | 31 | 234 |
| plugin-themes/plugins/postcss | 3 | 143 | 37 | 32 | 212 |
| plugin-themes/utils | 2 | 154 | 68 | 40 | 262 |
| plugin-themes/workflow | 2 | 39 | 6 | 9 | 54 |

## 🏗 目录结构

```
.
├── README.md
├── advance-defined-plugin
│   └── index.ts
└── plugin-themes
    ├── constant.ts
    ├── index.ts
    ├── plugins
    │   ├── helper
    │   │   ├── resolver.ts
    │   │   └── walkers.ts
    │   └── postcss
    │       ├── decl-var-plugin.ts
    │       ├── func-collect-plugin.ts
    │       └── get-theme-vars-plugin.ts
    ├── runtime.tsx
    ├── utils
    │   ├── common.ts
    │   └── themes.ts
    └── workflow
        ├── setExposeAPI.ts
        └── watcher.ts
```

## 📑 介绍

### 1. Build Plugin Themes

> icejs 2.0 动态通用多主题方案

设计草案：[[RFC] 通用动态多主题方案](https://github.com/alibaba/ice/issues/4223)


### 2. Advance Define Plugin

> 更好的 DefinePlugin 的实现，并实现在 loader 之后注入代码的插件（仅支持 webpack5）

仓库地址：https://github.com/FuzzyFade/advance-variable-plugin

#### 使用方法

webpack 配置文件  (eg: webpack.config.js)
```js
import AdvanceDefinedPlugin from 'advance-define-plugin'

module.exports = {
  ...
  plugins: [
    ...
    new AdvanceDefinedPlugin({
      getCode: () => `const time = ${new Date()}`
    }),
  ]
}
```

工程代码
```tsx
import React from 'react'

// 此 time 的时间大于 loader 结束的时间
const App = () => {
  return <div>{time}</div>
}
```

#### 特性

Webpack 自带的 [DefinePlugin](https://www.webpackjs.com/plugins/define-plugin/) 不能够做到在 loader 之后获取代码并注入到 loader 产物的能力。

而本插件能够做到将 loader 阶段处理和计算的一些产物的数据通过某种形式在 loader 之后注入到产物代码当中，使得在代码运行时能够拿到数据。

#### 参数

|  参数名   |  默认值  |  是否必选  | 备注  |
| ---- | ---- | ---- | ---- |
| getCode  | - | ✅ | 会在相应阶段触发回调注入该函数返回值于代码中 |
| filter  | `(name) => name.includes('.js')` | - | 判断产物的哪些文件需要注入该段代码 |