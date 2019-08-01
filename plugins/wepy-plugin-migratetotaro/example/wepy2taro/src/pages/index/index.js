import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.styl";

import Demo from "../../components/demo";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  navigateTo = () => {
    Taro.navigateTo({
      url: "/wepy/pages/demo"
    });
  };

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
        <Demo text="Index Demo Component Prop Text" />
        <View onClick={this.navigateTo}> wepy page demo </View>
      </View>
    );
  }
}
