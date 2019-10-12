## 如何快速构建自己的项目

基于 parcel 打包工具，组织公共打包依赖，按照不同框架配置各自依赖。

### parcel

```
yarn add parcel-bundler -D
```

## compiler

### babel

```
yarn add @babel/core @babel/preset-env -D
```

### typescript

```
yarn add typescript -D
```

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "strict": true,
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es5",
    "allowJs": true
  },
  "include": ["./src/**/*"]
}
```
