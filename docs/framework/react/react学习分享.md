# react学习分享

- [react学习分享](#react学习分享)
  - [渲染和提交](#渲染和提交)
    - [步骤1：触发一次渲染](#步骤1触发一次渲染)
    - [步骤2：React 渲染您的组件](#步骤2react-渲染您的组件)
    - [步骤 3: React 把更改提交到 DOM 上](#步骤-3-react-把更改提交到-dom-上)
    - [尾声：浏览器绘制](#尾声浏览器绘制)
  - [state 如同一张快照](#state-如同一张快照)
    - [渲染会及时生成一张快照](#渲染会及时生成一张快照)
    - [随时间变化的 state](#随时间变化的-state)
  - [把一系列 state 更新加入队列](#把一系列-state-更新加入队列)
    - [React 会对 state 更新进行批处理](#react-会对-state-更新进行批处理)

## 渲染和提交

在一个 React 应用中一次屏幕更新都会发生以下三个步骤：

1. **触发** 一次渲染

2. **渲染** 组件

3. **提交** 到DOM

### 步骤1：触发一次渲染

有两种原因会导致组件的渲染:

* 组件的 初次渲染。

* 组件（或者其祖先之一）的 状态发生了改变。

### 步骤2：React 渲染您的组件

在您触发渲染后，React 会调用您的组件来确定要在屏幕上显示的内容。“渲染中” 即 React 在调用您的组件。

* 在进行初次渲染时, React 会调用根组件。

* 对于后续的渲染, React 会调用内部状态更新触发了渲染的函数组件。

这个过程是递归的：如果更新后的组件会返回某个另外的组件，那么 React 接下来就会渲染

```js
// App.js
import { useState } from 'react';

function Children() {
  console.log("children render");
  return (
    <>
      <div>children</div>
    </>
  )
}

export default function Counter() {
  console.log("parent render");
  const [number, setNumber] = useState(0);

  return (
    <>
      <Children></Children>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
      }}>+1</button>
    </>
  )
}

```

### 步骤 3: React 把更改提交到 DOM 上 

在渲染（调用）您的组件之后，React 将会修改 DOM。

* 对于初次渲染， React 会使用 ``appendChild()`` DOM API 将其创建的所有 DOM 节点放在屏幕上。
* 对于重渲染， React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配。

**React 仅在渲染之间存在差异时才会更改 DOM 节点。**

### 尾声：浏览器绘制 

在渲染完成并且 React 更新 DOM 之后，浏览器就会重新绘制屏幕。


## state 如同一张快照

### 渲染会及时生成一张快照

**“正在渲染”** 就意味着 React 正在调用你的组件——一个函数。你从该函数返回的 JSX 就像是 UI 的一张及时的快照。它的 props、事件处理函数和内部变量都是 **根据当前渲染时的 state** 被计算出来的。

```js
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

请注意，每次点击只会让 number 递增一次！

**设置 state 只会为下一次渲染变更 state 的值。** 在第一次渲染期间，number 为 0。这也就解释了为什么在 **那次渲染中的** ``onClick`` 处理函数中，即便在调用了 ``setNumber(number + 1)`` 之后，``number`` 的值也仍然是 ``0``.

### 随时间变化的 state

**一个 state 变量的值永远不会在一次渲染的内部发生变化**， 即使其事件处理函数的代码是异步的。

```js
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

到提示框运行时，React 中存储的 state 可能已经发生了更改，但它是使用用户与之交互时状态的快照进行调度的！

**React 会使 state 的值始终”固定“在一次渲染的各个事件处理函数内部。**


## 把一系列 state 更新加入队列

### React 会对 state 更新进行批处理

**React 会等到事件处理函数中的 所有 代码都运行完毕再处理你的 state 更新。**

这让你可以更新多个 state 变量——甚至来自多个组件的 state 变量——而不会触发太多的 重新渲染。但这也意味着只有在你的事件处理函数及其中任何代码执行完成 之后，UI 才会更新。这种特性也就是 批处理，它会使你的 React 应用运行得更快。它还会帮你避免处理只​​更新了一部分 state 变量的令人困惑的“半成品”渲染。