# Github Pages

## 前言

在日常工作中, 我们经常会遇到要做 demo 展示的情况. 做 demo 展示不同于做项目开发, 我们需要的是快速轻便的开发和部署, 而不是完备的一整套开发流程。

尤其对于数据可视化工作, 能快速的创建一个 demo 来验证自己的想法, 并且方便的和同伴分享自己作品是非常重要的.

在这里介绍一种用来做 demo 的方法: Github Pages。

GitHub Pages 是通过 GitHub 托管和发布的公共网页，你可以使用 GitHub Pages 来展示一些开源项目、个人博客或者分享你的简历等。

## 选择 github pages 的理由

1. **使用零成本:** github pages 集成在 github 中, 直接和代码管理绑定在一起, 随着代码更新自动重新部署, 使用非常方便.
2. **免费:** 免费提供 username.github.io 的域名, 免费的静态网站服务器.
3. **无数量限制:** github pages 没有使用的数量限制, 每一个 github repository 都可以部署为一个静态网站.

## 使用方法

### 一、部署静态网页

首先我们介绍一下部署最基础的静态网页, 最终的效果是展示出一个 Hello, github pages ！ 页面.
 
> demo效果
> 
> 代码地址

#### 1.1 创建一个github项目

前往 [github 官网](https://github.com), 点击 `New repository` 创建新项目. 填入项目基本信息, 点击 `Create Repository` 确认.

> 注意：仓库需要选择 `public` 公开，选择 `private` 无法部署GitHub Pages

![](./images/1.png)

#### 1.2 代码 clone 到本地, 创建 index.html 文件，提交代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, github pages !</h1>
</body>
</html>
```

## 参考资料

[1. 使用 github pages, 快速部署你的静态网页](https://blog.csdn.net/baidu_25464429/article/details/80805237)

[2. GitHub Pages官方中文文档](https://docs.github.com/cn/pages)