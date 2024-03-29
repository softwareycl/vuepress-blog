/*
 * @Author: 颜常霖
 * @Date: 2022-09-20 09:51:55
 * @LastEditors: CL
 * @LastEditTime: 2023-09-16 22:17:56
 * @Description:  
 */
import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  { text: '首页', link: '/' },
  {
    text: '框架',
    children: [
      {
        text: 'Vue3',
        children: [
          '/framework/vue3/README.md'
        ]
      },
      {
        text: 'React',
        children: [
          '/framework/react/react学习分享.md'
        ]
      },
      {
        text: '其他',
        children: [
          '/framework/other/Vue-I18n.md'
        ],
      },
    ],
  },
  {
    text: '前端',
    children: [
      // 说明：以下所有link的值只是在相应md文件头部定义的永久链接（不是什么特殊编码）。另外，注意结尾是有斜杠的
      {
        text: 'WebRTC',
        children: [
          '/pages/web端扫码功能实现.md'
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
      { 
        text: 'chrome 调试技巧',
        link: '/technology/chrome调试技巧.md'
      },
    ],
  },
  {
    text: '更多',
    link: '/more/',
    children: [
      { text: '学习', link: '/pages/f2a556/' },
      { text: '面试', link: '/more/interview/js.md' },
      { text: '实用技巧', link: '/pages/baaa02/' },
    ],
  },
  { text: '关于', link: '/about/' },
  { text: '收藏', link: '/collection/CL网站.md' },
]