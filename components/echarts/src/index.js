import Taro from "@tarojs/taro";

Taro.initPxTransform({ designWidth: 750 });

export { Echart, echarts } from "./components/echart";
export { default as Hello } from "./components/hello";
