import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class Demo extends Component {
  render() {
    return <View>{this.props.text}</View>;
  }
}
