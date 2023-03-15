<!--
 * @Author: 颜常霖
 * @Date: 2023-03-13 11:34:36
 * @LastEditors: 颜常霖
 * @LastEditTime: 2023-03-15 15:02:32
 * @Description:  
-->
# web端扫码功能实现

## 涉及技术

### WebRTC API

WebRTC（Web Real-Time Communications）是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC 包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。

扫码主要使用了getUserMedia：

MediaDevices.getUserMedia() 会提示用户给予使用媒体输入的许可，媒体输入会产生一个MediaStream，里面包含了请求的媒体类型的轨道。此流可以包含一个视频轨道（来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）、一个音频轨道（同样来自硬件或虚拟音频源，比如麦克风、A/D 转换器等等），也可能是其他轨道类型。

它返回一个 Promise 对象，成功后会resolve回调一个 MediaStream 对象。若用户拒绝了使用权限，或者需要的媒体源不可用，promise会reject回调一个 PermissionDeniedError 或者 NotFoundError 。

> getUserMedia()方法仅在安全上下文中可用. 安全上下文是指浏览器有把握地确定其包含使用HTTPS / TLS安全加载的文档，并且对不安全上下文的暴露程度有限. 如果未在安全的上下文中加载文档，则navigator.mediaDevices属性是undefined ，使得无法访问getUserMedia() .
> 
> 即通过 MediaDevices.getUserMedia() 获取用户多媒体权限时，需要注意其只工作于以下三种环境：
> * localhost 域
> * 开启了 HTTPS 的域
> * 使用 file:/// 协议打开的本地文件

### adapter.js

在WebRTC 1.0规范出来之前，各个浏览器厂商都在按照自己的计划在使用WebRTC，推动自己的API，这样就使得各个浏览器厂商它使用的getUserMedia的名字是不一样的，它都增加了一个自己的前缀。

随着WebRTC在各个浏览器厂商中推进，google开源了一个库adapter.js, adapter.js的主要作用是适配各个不同浏览器的API，就是给它定义一个统一的接口，会根据不同的浏览器来调用它底层对应的API。

但是随着各个浏览器厂商都按照WebRTC 1.0规范越来越严格，后面有可能这个adapter.js就不用了，但是就目前而言adapter.js还是起到非常大的效果的。

```shell
# 安装
npm install webrtc-adapter
```

```js
// 只需要引入即可，不需要做任何配置和多余的操作。
import 'webrtc-adapter'
```

### jsqr.js

jsQR 是一个纯 JavaScript 二维码解析库，该库读取原始图像或者是摄像头，并将定位，提取和解析其中的QR码。

如果要使用 jsQR 扫描网络摄像头流，需要从视频流中提取 ImageData，然后可以将其传递给 jsQR。

imageData：格式为 [r0, g0, b0, a0, r1, g1, b1, a1, ...] 的 Uint8ClampedArray（ 8位无符号整型固定数组） 的 rgba 像素值。

jsQR 提供一个方法，该方法接受 4 个参数，分别是解码的图像数据 imageData，宽 width、高 height 以及 可选的对象 options。

```js
const code = jsQR(imageData, width, height, options?);

if (code) {
  console.log("Found QR code", code);
}
```

## 功能实现流程

![流程图](./images/过程.png)



## 参考文章

1. [MDN-WebRTC](https://developer.mozilla.org/zh-CN/docs/Glossary/WebRTC)
2. [前端实现很哇塞的浏览器端扫码功能](https://www.cnblogs.com/dragonir/p/15405141.html)
3. [Web Api MediaDevices .getUserMedia() navigator.mediaDevices is undefined](https://www.vicw.com/groups/code_monkey/topics/326)
4. [jsQR库](https://github.com/cozmo/jsQR)