## 文件说明

- **center.exe** 该文件是本地中心服务，是主程序。
- **http_server.exe** 该文件是一个测试程序（对应客户的上位机程序），主要用于接收来自center.exe的推送信息，其中包括设备状态的推送和识别结果的推送。
- **config.json** 该文件是配置文件，后面具体介绍。

## 配置说明

目前center.exe提供的数据均为**模拟数据**，config.json主要用于配置模拟多少台设备，推送识别结果的间隔时间，内容如下：
```
{
    "devices":[
        {
            "sn": "00000000-00000000",
            "ip": "192.168.100.0",
            "enable": true,
            "plate_push_interval": 1
        },
        {
            "sn": "11111111-11111111",
            "ip": "192.168.100.1",
            "enable": true,
            "plate_push_interval": 2
        }
    ]
}
```
`devices`是一个数组，里面的每个对象对应于一台模拟设备，`sn`代表设备的序列号，`ip`代表设备的IP地址，这两项都可以随意填写，不具备实际含义，但每台设备不能重复。`enable`控制是否启用此设备，如果不需要这台设备，可以将`enable`设置为`false`。`plate_push_interval`为识别结果推送时间，单位为秒。

## 使用说明

- 运行center.exe即可。
- 可以启动http_server.exe查看推送的设备状态及识别结果，也可以不启动，如果不启动，center.exe推送将会失败。
- [http://127.0.0.1:8080](http://127.0.0.1:8080)是center.exe提供的配置页面，可在浏览器打开并使用。

## 流程说明

该模块会在运行后按照config.json中的配置模拟设备，每一台设备首先会发送一个online消息，随后按照配置的间隔时间推送车牌识别结果，为了模拟离线消息，每台设备在上线后的10-20分钟内（随机）会发送offline消息，然后10秒后再次上线，如此循环下去。

## 配置页面说明

### 停车场配置

![image](https://note.youdao.com/yws/public/resource/e0c7bb12d57ada0327870eee70ea2628/xmlnote/9F047F0B074C42FA9A25FC3DFAB92D71/9889)

- 选中`PARK`选项卡
- 点击`create park`可创建车库
- 可从下方拖动设备到车库里，并可在中间区域配置每台设备的出入口
- 点击`save`即可保存配置

### HTTP推送配置

![image](https://note.youdao.com/yws/public/resource/e0c7bb12d57ada0327870eee70ea2628/xmlnote/1DFB1E0A211C4378B7C5FAABBCA73989/9891)

- 选中`HTTP`选项卡，既可看到HTTP相关的推送配置。

### 协议文档

[中心服务模块协议](http://note.youdao.com/noteshare?id=e9715f8316f2a4f36428a188391faebc&sub=AF9FEDA7B0214656A5F40ECA83AC86F2)

