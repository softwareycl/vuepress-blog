/*
 * @Author: CL
 * @Date: 2022-09-18 22:14:11
 * @LastEditors: 颜常霖
 * @LastEditTime: 2023-03-20 15:25:20
 * @Description: 
 */
import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/vue/vue3': [
    {
      text: 'VUE3',
      collapsible: true,
      children: [
        '/vue/vue3/README.md',
      ],
    },
  ],
  '/vue/other': [
    {
      text: '国际化',
      collapsible: true,
      children: [
        '/vue/other/Vue-I18n.md',
      ],
    },
  ],
  '/note/': [
    {
      text: '工作',
      collapsible: true,
      children: [
        '/note/work/首脑.md',
        {
          text: '广交会数字化平台项目',
          children: [
            '/note/work/广交会-知识产权投诉系统.md',
          ]
        }
      ],
    },
  ],
  '/technology/': [
    {
      text: '技术',
      collapsible: true,
      children: [
        '/technology/github-pages.md',
        '/technology/vuePress.md',
        '/technology/chrome调试技巧.md',
      ],
    },
  ],
  '/more/interview/': [
    {
      text: '面试',
      collapsible: true,
      children: [
        '/more/interview/js.md',
      ],
    },
  ],
  '/collection/': [
    {
      text: '网站',
      collapsible: true,
      children: [
        '/collection/CL网站.md',
      ],
    }
  ],
}