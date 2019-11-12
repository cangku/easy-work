import Taro from "@tarojs/taro";

Taro.initPxTransform({ designWidth: 750 });

export { default, Echart, echarts } from "./components/echart";
export { default as Hello } from "./components/hello";
