## 如何快速构建自己的项目

基于 webpack 打包工具，组织公共打包依赖，按照不同框架配置各自依赖。

### webpack

```
yarn add webpack webpack-cli -D
```

## compiler

### babel

```
yarn add @babel/core @babel/preset-env babel-loader -D
```

### typescript

```
yarn add typescript ts-loader -D
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

## Main Library

### React
