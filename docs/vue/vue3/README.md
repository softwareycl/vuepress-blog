# Vue3学习

[[toc]]

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