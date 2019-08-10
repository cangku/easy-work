## websocket 心跳检测

初始化 websocket 连接，自动定时心跳检测，错误断开自动重连。

### 如何使用

```javascript
import WebSocketHeartbeat from "@unofficial/websocket";
const ws = new WebSocketHeartbeat({ url });

// or

import { initWs } from "@unofficial/websocket";
const ws = initWs({ url });
```

### 参数说明

| 参数        | 说明                                     | 类型     | 默认值 |
| ----------- | ---------------------------------------- | -------- | ------ |
| url         | 建立 ws 连接的链接                       | string   |        |
| pingData    | 心跳检测发送的内容                       | string   | ""     |
| pingTime    | 定时发送心跳检测，消息的接受也视为心跳   | number   | 15000  |
| pongOutTime | 心跳发送以后定时没有收到响应自动断开重连 | number   | 10000  |
| onclose     | 钩子函数 onclose                         | function |        |
| onconnect   | 钩子函数 onconnect                       | function |        |
| onerror     | 钩子函数 onerror                         | function |        |
| onmessage   | 钩子函数 onmessage                       | function |        |
| onopen      | 钩子函数 onopen                          | function |        |
