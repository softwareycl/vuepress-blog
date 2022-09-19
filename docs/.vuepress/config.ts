import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from '@vuepress/cli'
import {
  head,
  navbarZh,
  sidebarZh,
} from './configs/index.js'

export default defineUserConfig({
  base: "/vuepress-blog/",
  title: 'CL鱼塘',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/vuepress-blog/images/favicon.ico`,
      },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/vuepress-blog/images/logo.png` },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  theme: defaultTheme({
    logo: "/images/logo.png",
    home: "/",
    repo: "softwareycl",
    navbar: navbarZh,
    sidebar: sidebarZh,
    lastUpdatedText: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
    docsDir: 'docs', // 编辑的文件夹
    // docsBranch: 'master', // 编辑的文件所在分支，默认master。 注意：如果你的分支是main则修改为main
    editLink: false, // 启用编辑
    editLinkText: '编辑',
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',
    contributors: false
  }),
});
