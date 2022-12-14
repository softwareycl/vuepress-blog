import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  { text: '首页', link: '/' },
  {
    text: 'VUE相关',
    children: [
      {
        text: 'VUE3',
        children: [
          '/vue/vue3/README.md'
        ]
      },
      {
        text: '其他',
        children: [
          '/vue/other/Vue-I18n.md'
        ],
      },
    ],
  },
  {
    text: '前端',
    children: [
      // 说明：以下所有link的值只是在相应md文件头部定义的永久链接（不是什么特殊编码）。另外，注意结尾是有斜杠的
      {
        text: '前端文章',
        children: [
          { text: 'JavaScript', link: '/pages/' },
        ],
      },
    ],
  },
  {
    text: '笔记',
    children: [
      { text: '工作', link: '/note/work/首脑.md' },
    ],
  },
  {
    text: '技术',
    children: [
      { 
        text: '博客搭建',
        link: '/technology/github-pages.md'
      },
    ],
  },
  {
    text: '更多',
    link: '/more/',
    children: [
      { text: '学习', link: '/pages/f2a556/' },
      { text: '面试', link: '/pages/aea6571b7a8bae86/' },
      { text: '实用技巧', link: '/pages/baaa02/' },
    ],
  },
  { text: '关于', link: '/about/' },
  { text: '收藏', link: '/collection/CL网站.md' },
]