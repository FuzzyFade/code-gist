# ๐งโ๐ป ไปฃ็ ้่ฏปๆๅ

## ๐ ็ป่ฎก

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

## ๐ ็ฎๅฝ็ปๆ

```
.
โโโ README.md
โโโ advance-defined-plugin
โย ย  โโโ index.ts
โโโ plugin-themes
    โโโ constant.ts
    โโโ index.ts
    โโโ plugins
    โย ย  โโโ helper
    โย ย  โย ย  โโโ resolver.ts
    โย ย  โย ย  โโโ walkers.ts
    โย ย  โโโ postcss
    โย ย      โโโ decl-var-plugin.ts
    โย ย      โโโ func-collect-plugin.ts
    โย ย      โโโ get-theme-vars-plugin.ts
    โโโ runtime.tsx
    โโโ utils
    โย ย  โโโ common.ts
    โย ย  โโโ themes.ts
    โโโ workflow
        โโโ setExposeAPI.ts
        โโโ watcher.ts
```

## ๐ ไป็ป

### 1. Build Plugin Themes

> icejs 2.0 ๅจๆ้็จๅคไธป้ขๆนๆก

่ฎพ่ฎก่ๆก๏ผ[[RFC] ้็จๅจๆๅคไธป้ขๆนๆก](https://github.com/alibaba/ice/issues/4223)


### 2. Advance Define Plugin

> ๆดๅฅฝ็ DefinePlugin ็ๅฎ็ฐ๏ผๅนถๅฎ็ฐๅจ loader ไนๅๆณจๅฅไปฃ็ ็ๆไปถ๏ผไปๆฏๆ webpack5๏ผ

ไปๅบๅฐๅ๏ผhttps://github.com/FuzzyFade/advance-variable-plugin

#### ไฝฟ็จๆนๆณ

webpack ้็ฝฎๆไปถ  (eg: webpack.config.js)
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

ๅทฅ็จไปฃ็ 
```tsx
import React from 'react'

// ๆญค time ็ๆถ้ดๅคงไบ loader ็ปๆ็ๆถ้ด
const App = () => {
  return <div>{time}</div>
}
```

#### ็นๆง

Webpack ่ชๅธฆ็ [DefinePlugin](https://www.webpackjs.com/plugins/define-plugin/) ไธ่ฝๅคๅๅฐๅจ loader ไนๅ่ทๅไปฃ็ ๅนถๆณจๅฅๅฐ loader ไบง็ฉ็่ฝๅใ

่ๆฌๆไปถ่ฝๅคๅๅฐๅฐ loader ้ถๆฎตๅค็ๅ่ฎก็ฎ็ไธไบไบง็ฉ็ๆฐๆฎ้่ฟๆ็งๅฝขๅผๅจ loader ไนๅๆณจๅฅๅฐไบง็ฉไปฃ็ ๅฝไธญ๏ผไฝฟๅพๅจไปฃ็ ่ฟ่กๆถ่ฝๅคๆฟๅฐๆฐๆฎใ

#### ๅๆฐ

|  ๅๆฐๅ   |  ้ป่ฎคๅผ  |  ๆฏๅฆๅฟ้  | ๅคๆณจ  |
| ---- | ---- | ---- | ---- |
| getCode  | - | โ | ไผๅจ็ธๅบ้ถๆฎต่งฆๅๅ่ฐๆณจๅฅ่ฏฅๅฝๆฐ่ฟๅๅผไบไปฃ็ ไธญ |
| filter  | `(name) => name.includes('.js')` | - | ๅคๆญไบง็ฉ็ๅชไบๆไปถ้่ฆๆณจๅฅ่ฏฅๆฎตไปฃ็  |