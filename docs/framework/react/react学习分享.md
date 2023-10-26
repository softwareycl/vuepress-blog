# react学习分享

## 目录

- [react学习分享](#react学习分享)
  - [目录](#目录)
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
    - [在下次渲染前多次更新同一个 state](#在下次渲染前多次更新同一个-state)
  - [更新 state 中的对象](#更新-state-中的对象)
    - [什么是 mutation？](#什么是-mutation)
    - [使用展开语法复制对象](#使用展开语法复制对象)
    - [使用 Immer 编写简洁的更新逻辑](#使用-immer-编写简洁的更新逻辑)
  - [更新 state 中的数组](#更新-state-中的数组)
    - [在没有 mutation 的前提下更新数组](#在没有-mutation-的前提下更新数组)
      - [向数组中添加元素](#向数组中添加元素)
      - [从数组中删除元素](#从数组中删除元素)
      - [转换/替换数组](#转换替换数组)
      - [向数组插入元素](#向数组插入元素)
      - [更新数组内部的对象](#更新数组内部的对象)

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

这个过程是递归的：如果更新后的组件会返回某个另外的组件，那么 React 接下来就会渲染那个组件，以此类推

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

**React 会等到事件处理函数中的所有代码都运行完毕再处理你的 state 更新。**

这让你可以更新多个 state 变量——甚至来自多个组件的 state 变量——而不会触发太多的 重新渲染。但这也意味着只有在你的事件处理函数及其中任何代码执行完成 之后，UI 才会更新。这种特性也就是 **批处理**。

### 在下次渲染前多次更新同一个 state

如果你想在下次渲染之前多次更新同一个 state，你可以像 ``setNumber(n => n + 1)`` 这样传入一个根据队列中的前一个 state 计算下一个 state 的 函数，而不是像 ``setNumber(number + 1)`` 这样传入 下一个 state 值

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

在这里，n => n + 1 被称为 **更新函数**。当你将它传递给一个 state 设置函数时：

1. React 会将此函数加入队列，以便在事件处理函数中的所有其他代码运行后进行处理。
2. 在下一次渲染期间，React 会遍历队列并给你更新之后的最终 state。


## 更新 state 中的对象

state 中可以保存任意类型的 JavaScript 值，包括对象。但是，你不应该直接修改存放在 React state 中的对象。相反，当你想要更新一个对象时，你需要创建一个新的对象（或者将其拷贝一份），然后将 state 更新为此对象。

### 什么是 mutation？

数字、字符串和布尔值，这些类型的值在 JavaScript 中是不可变（immutable）的，这意味着它们不能被改变或是只读的。你可以通过替换它们的值以触发一次重新渲染。

现在考虑 state 中存放对象的情况：

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

从技术上来讲，可以改变对象自身的内容。当你这样做时，就制造了一个 mutation：

```js
position.x = 5;
```

虽然严格来说 React state 中存放的对象是可变的，但你应该像处理数字、布尔值、字符串一样将它们视为不可变的。因此你应该替换它们的值，而不是对它们进行修改。

### 使用展开语法复制对象

下面的代码中，输入框并不会正常运行，因为 onChange 直接修改了 state (直接修改不会触发渲染)：

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}

```

想要实现你的需求，最可靠的办法就是创建一个新的对象并将它传递给 setPerson。但是在这里，你还需要 把当前的数据复制到新对象中，因为你只改变了其中一个字段：

```js
setPerson({
  firstName: e.target.value, // 从 input 中获取新的 first name
  lastName: person.lastName,
  email: person.email
});
```

可以使用 ... 对象展开 语法，这样你就不需要单独复制每个属性。

```js
setPerson({
  ...person, // 复制上一个 person 中的所有字段
  firstName: e.target.value // 但是覆盖 firstName 字段 
});
```

现在表单可以正常运行了！

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}

```

### 使用 Immer 编写简洁的更新逻辑 

Immer 是一个非常流行的库，它可以让你使用简便但可以直接修改的语法编写代码，并会帮你处理好复制的过程。

尝试使用 Immer:

运行 npm install use-immer 添加 Immer 依赖

用 import { useImmer } from 'use-immer' 替换掉 import { useState } from 'react'

下面我们把上面的例子用 Immer 实现一下：

```js
import { useImmer } from 'use-immer'

export default function Form() {
  const [person, updatePerson] = useImmer({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    updatePerson(draft => {
      draft.firstName = e.target.value;
    });
  }

  function handleLastNameChange(e) {
    updatePerson(draft => {
      draft.lastName = e.target.value;
    });
  }

  function handleEmailChange(e) {
    updatePerson(draft => {
      draft.email = e.target.value;
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```


## 更新 state 中的数组

### 在没有 mutation 的前提下更新数组

在 JavaScript 中，数组只是另一种对象。同对象一样，你需要将 React state 中的数组视为只读的。这意味着你不应该使用类似于 ``arr[0] = 'bird'`` 这样的方式来重新分配数组中的元素，也不应该使用会直接修改原始数组的方法，例如 ``push()`` 和 ``pop()``。

相反，每次要更新一个数组时，你需要把一个新的数组传入 state 的 setting 方法中。为此，你可以通过使用像 ``filter()`` 和 ``map()`` 这样不会直接修改原始值的方法，从原始数组生成一个新的数组。然后你就可以将 state 设置为这个新生成的数组。

或者，你可以使用 Immer 。

#### 向数组中添加元素

```js
let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

···

const [artists, setArtists] = useState(
  initialArtists
);

setArtists( // 替换 state
  [ // 是通过传入一个新数组实现的
    ...artists, // 新数组包含原数组的所有元素
    { id: 3, name: 'test' } // 并在末尾添加了一个新的元素
  ]
);
```

#### 从数组中删除元素 

```js
setArtists(
  artists.filter(a => a.id !== 1)
);
```

#### 转换/替换数组

```js
const nextArtists = artists.map(artist => {
  return {
    id: artist.id + 1,
    name: artist.name
  }
})
setArtists(nextArtists);
```

#### 向数组插入元素

```js
const insertAt = 1; // 可能是任何索引
const nextArtists = [
// 插入点之前的元素：
...artists.slice(0, insertAt),
// 新的元素：
{ id: nextId++, name: name },
// 插入点之后的元素：
...artists.slice(insertAt)
];
setArtists(nextArtists);
```

#### 更新数组内部的对象

```js
setArtists(artists.map(artist => {
  if (artist.id === 0) {
    // 创建包含变更的*新*对象
    return { ...artist, name: "test" };
  } else {
    // 没有变更
    return artist;
  }
}));
```