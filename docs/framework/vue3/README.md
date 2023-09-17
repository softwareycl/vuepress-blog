# Vue3学习

![vue3和react知识地图](https://raw.githubusercontent.com/softwareycl/blog-image/main/img/vue3/Vue3%E7%9F%A5%E8%AF%86%E5%9B%BE.jpg)

## 前端发展史

### 前端三大框架

在前端 MVVM 模式下，不同框架的目标都是一致的，就是利用数据驱动页面，但是怎么处理数据的变化，各个框架走出了不同的路线。

![2](https://raw.githubusercontent.com/softwareycl/blog-image/main/img/vue3/2.webp)

这些框架要回答的核心问题就是，数据发生变化后，我们怎么去通知页面更新。各大框架在这个步骤上，各显神通：

Angular 1 就是最老套的脏检查。所谓的脏检查，指的是 Angular 1 在对数据变化的检查上，遵循每次用户交互时都检查一次数据是否变化，有变化就去更新 DOM 这一方法。这个方法看似简单粗暴，但算是数据驱动页面早期的实现。

而 Vue 1 的解决方案，就是使用响应式，初始化的时候，Watcher 监听了数据的每个属性，这样数据发生变化的时候，我们就能精确地知道数据的哪个 key 变了，去针对性修改对应的 DOM 即可，这一过程可以按如下方式解构：

![3](https://raw.githubusercontent.com/softwareycl/blog-image/main/img/vue3/3.webp)

在上图中，左边是实际的网页内容，我们在网页中使用{{}}渲染一个变量，Vue 1 就会在内容里保存一个监听器监控这个变量，我们称之为 Watcher，数据有变化，watcher 会收到通知去更新网页。

此外，Facebook 的 React 团队提出了不同于上面的 Angular、Vue 的的解决方案，他们设计了 React 框架，在页面初始化的时候，在浏览器 DOM 之上，搞了一个叫虚拟 DOM 的东西，也就是用一个 JavaScript 对象来描述整个 DOM 树。我们可以很方便的通过虚拟 DOM 计算出变化的数据，去进行精确的修改。

![4](https://raw.githubusercontent.com/softwareycl/blog-image/main/img/vue3/4.webp)

## Vue3新特性

### Vue 2 的核心模块和历史遗留问题

从下图你能看到，Vue 2 是一个响应式驱动的、内置虚拟 DOM、组件化、用在浏览器开发，并且有一个运行时把这些模块很好地管理起来的框架。

![5](https://raw.githubusercontent.com/softwareycl/blog-image/main/img/vue3/5.webp)

下面列举了一些 Vue 2 常见的缺陷，你可以对照你的实际开发经验，看看是否也遇到过这些问题：

首先从开发维护的角度看，Vue 2 是使用 Flow.js 来做类型校验。但现在 Flow.js 已经停止维护了，整个社区都在全面使用 TypeScript 来构建基础库，Vue 团队也不例外。

然后从社区的二次开发难度来说，Vue 2 内部运行时，是直接执行浏览器 API 的。但这样就会在 Vue 2 的跨端方案中带来问题，要么直接进入 Vue 源码中，和 Vue 一起维护，比如 Vue 2 中你就能见到 Weex 的文件夹。要么是要直接改为复制一份全部 Vue 的代码，把浏览器 API 换成客户端或者小程序的。比如 mpvue 就是这么做的，但是 Vue 后续的更新就很难享受到。

最后从我们普通开发者的角度来说，Vue 2 响应式并不是真正意义上的代理，而是基于 Object.defineProperty() 实现的。这个 API 并不是代理，而是对某个属性进行拦截，所以有很多缺陷，比如：删除数据就无法监听，需要 $delete 等 API 辅助才能监听到。

并且，Option API 在组织代码较多组件的时候不易维护。对于 Option API 来说，所有的 methods、computed 都在一个对象里配置，这对小应用来说还好。但代码超过 300 行的时候，新增或者修改一个功能，就需要不停地在 data，methods 里跳转写代码。

### 从七个方面了解 Vue 3 新特性

#### RFC 机制

Vue 3 的第一个新特性和代码无关，而是 Vue 团队开发的工作方式。

关于 Vue 的新语法或者新功能的讨论，都会先在 GitHub 上公开征求意见，邀请社区所有的人一起讨论， 你随时可以打开这个项目，我把 [链接](https://github.com/vuejs/rfcs) 放在这里。Vue 3 正在讨论中的新需求，任何人都可以围观、参与讨论和尝试实现。

#### 响应式系统

Vue 2 的响应式机制是基于 Object.defineProperty() 这个 API 实现的，此外，Vue 还使用了 Proxy，这两者看起来都像是对数据的读写进行拦截，但是 defineProperty 是拦截具体某个属性，Proxy 才是真正的“代理”。

#### 自定义渲染器

Vue 2 内部所有的模块都是揉在一起的，这样做会导致不好扩展的问题。Vue 3 是怎么解决这个问题的呢？那就是拆包，使用最近流行的 monorepo 管理方式，响应式、编译和运行时全部独立了，变成下图所示的模样：

![6](https://raw.githubusercontent.com/softwareycl/blog-image/main/img/vue3/6.webp)

我们能看到，在 Vue 3 的组织架构中，响应式独立了出来。而 Vue 2 的响应式只服务于 Vue，Vue 3 的响应式就和 Vue 解耦了，你甚至可以在 Node.js 和 React 中使用响应式。

渲染的逻辑也拆成了 ***平台无关渲染逻辑*** 和 ***浏览器渲染 API*** 两部分 。

在这个架构下，Node 的一些库，甚至 React 都可以依赖响应式。在任何时候，如果你希望数据被修改了之后能通知你，你都可以单独依赖 Vue 3 的响应式。

#### 全部模块使用 TypeScript 重构

大部分开源的框架都会引入类型系统，来对 JavaScript 进行限制。这样做的原因： ***第一点是，类型系统带来了更方便的提示；第二点是，类型系统让代码更健壮***。

#### Composition API 组合语法

使用 Composition API 后，代码看起来很烦琐，没有 Vue 2 中 Options API 的写法简单好懂，但 Options API 的写法也有几个很严重的问题：

- 由于所有数据都挂载在 this 之上，因而 Options API 的写法对 TypeScript 的类型推导很不友好，并且这样也不好做 Tree-shaking 清理代码。
- 新增功能基本都得修改 data、method 等配置，并且代码上 300 行之后，会经常上下反复横跳，开发很痛苦。
- 代码不好复用，Vue 2 的组件很难抽离通用逻辑，只能使用 mixin，还会带来命名冲突的问题。

我们使用 Composition API 后，虽然看起来烦琐了一些，但是带来了诸多好处：

- 所有 API 都是 import 引入的，用到的功能都 import 进来，对 Tree-shaking 很友好，项目里没用到功能，打包的时候会被清理掉 ，减小包的大小。
- 不再上下反复横跳，我们可以把一个功能模块的 methods、data 都放在一起书写，维护更轻松。
- 代码方便复用，可以把一个功能所有的 methods、data 封装在一个独立的函数里，复用代码非常容易。
- Composotion API 新增的 return 等语句，在实际项目中使用 `<script setup>` 特性可以清除， 我们后续项目中都会用到这样的操作。

#### 新的组件

Vue 3 还内置了 Fragment、Teleport 和 Suspense 三个新组件。它们的用途：

- Fragment: Vue 3 组件不再要求有一个唯一的根节点，清除了很多无用的占位 div。
- Teleport: 允许组件渲染在别的元素内，主要开发弹窗组件的时候特别有用。
- Suspense: 异步组件，更方便开发有异步请求的组件。

#### 新一代工程化工具 Vite

Vite 不在 Vue 3 的代码包内，和 Vue 也不是强绑定。

Vite 主要提升的是开发的体验，Webpack 等工程化工具的原理，就是根据你的 import 依赖逻辑，形成一个依赖图，然后调用对应的处理工具，把整个项目打包后，放在内存里再启动调试。

由于要预打包，所以复杂项目的开发，启动调试环境需要 3 分钟都很常见，Vite 就是为了解决这个时间资源的消耗问题出现的。

现代浏览器已经默认支持了 ES6 的 import 语法，Vite 就是基于这个原理来实现的。具体来说，在调试环境下，我们不需要全部预打包，只是把你首页依赖的文件，依次通过网络请求去获取，整个开发体验得到巨大提升，做到了复杂项目的秒级调试和热更新。

下图展示了 Webpack 的工作原理，Webpack 要把所有路由的依赖打包后，才能开始调试。

![7](https://raw.githubusercontent.com/softwareycl/blog-image/main/img/vue3/7.webp)

而下图所示的是 Vite 的工作原理，一开始就可以准备联调，然后根据首页的依赖模块，再去按需加载，这样启动调试所需要的资源会大大减少。

![8](https://raw.githubusercontent.com/softwareycl/blog-image/main/img/vue3/8.webp)
